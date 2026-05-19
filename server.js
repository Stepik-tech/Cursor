const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const http = require('http');
const { WebSocketServer } = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

app.use(cors({ origin: '*' }));
app.use(express.json());

// ── Online users ──────────────────────────────────────────────────
const onlineUsers = new Map();

wss.on('connection', (ws) => {
  let userId = null;
  ws.on('message', (data) => {
    try {
      const msg = JSON.parse(data.toString());
      if (msg.type === 'ping' && msg.userId) {
        userId = String(msg.userId);
        onlineUsers.set(userId, { id: userId, name: msg.name || 'User', avatar: msg.avatar || null, lastSeen: Date.now() });
        broadcastOnline();
      }
    } catch(e) {}
  });
  ws.on('close', () => { if(userId){ onlineUsers.delete(userId); broadcastOnline(); } });
  ws.send(JSON.stringify({ type: 'online', count: onlineUsers.size, users: getOnlineList() }));
});

function getOnlineList() { return Array.from(onlineUsers.values()).slice(0, 20); }
function broadcastOnline() {
  const msg = JSON.stringify({ type: 'online', count: onlineUsers.size, users: getOnlineList() });
  wss.clients.forEach(c => { if(c.readyState === 1) c.send(msg); });
}
setInterval(() => {
  const cutoff = Date.now() - 35000;
  for(const [id, u] of onlineUsers) if(u.lastSeen < cutoff) onlineUsers.delete(id);
  broadcastOnline();
}, 30000);

// ── Price cache ───────────────────────────────────────────────────
let collectionsCache = null;
let priceHistory = {}; // slug -> [{time, price, vol}] — полная история с момента запуска
let salesHistory = {}; // slug -> [{time, price}] — реальные продажи (накапливаем)
let lastFetch = 0;
let tonUsd = 2.0;
const CACHE_TTL = 20000;

// ── NFT attributes cache ──────────────────────────────────────────
const nftAttrsCache = {}; // slug -> {models:[], backdrops:[], symbols:[]}
const attrsLock = new Set();

// ── User profiles ─────────────────────────────────────────────────
const userProfiles = {}; // tgId -> {id, name, username, avatar, gifts:[], joinedAt}

// ── Portal Market ─────────────────────────────────────────────────
async function fetchPortal() {
  try {
    const r = await fetch('https://portal-market.com/api/collections?limit=300', {
      headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'application/json', 'Referer': 'https://portal-market.com/' },
      timeout: 12000
    });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    const j = await r.json();
    const changes = j.floor_changes || {};
    const volChanges = j.volume_changes || {};
    return (j.collections || []).map(c => ({
      id: c.id, name: c.name, slug: c.short_name,
      photo: `https://fragment.com/file/gifts/${c.short_name}/thumb.webp`,
      portalPhoto: c.photo_url,
      floor: parseFloat(c.floor_price) || 0,
      change24h: parseFloat((parseFloat(changes[c.id] || 0) * 100).toFixed(2)),
      vol24h: parseFloat(c.day_volume) || 0,
      volChange: parseFloat((parseFloat(volChanges[c.id] || 0) * 100).toFixed(2)),
      listed: c.listed_count || 0, supply: c.supply || 0,
      marketCap: parseFloat(c.market_cap) || 0,
      sales24h: c.sales_24h_count || 0, isNew: c.is_new || false, source: 'portal'
    }));
  } catch(e) { console.error('[Portal]', e.message); return null; }
}

async function fetchTonRate() {
  try {
    const r = await fetch('https://tonapi.io/v2/rates?tokens=ton&currencies=usd', { timeout: 5000 });
    const j = await r.json();
    const rate = j?.rates?.TON?.prices?.USD;
    if (rate > 0) tonUsd = parseFloat(parseFloat(rate).toFixed(4));
  } catch(e) {}
}

async function updateAll() {
  const now = Date.now();
  if (now - lastFetch < CACHE_TTL) return;
  lastFetch = now;

  const [portalData] = await Promise.allSettled([fetchPortal(), fetchTonRate()]);
  if (portalData?.value) {
    collectionsCache = portalData.value;
    collectionsCache.forEach(c => {
      // Накапливаем историю цен
      if (!priceHistory[c.slug]) priceHistory[c.slug] = [];
      priceHistory[c.slug].push({ time: now, price: c.floor, vol: c.vol24h });
      // Держим 7 дней (при 20с интервале = ~30000 точек)
      if (priceHistory[c.slug].length > 30240) priceHistory[c.slug] = priceHistory[c.slug].slice(-15000);
    });
    console.log(`[Proxy] ${collectionsCache.length} gifts, TON=$${tonUsd}`);
  }
}

// ── Fragment NFT attributes ───────────────────────────────────────
// Получаем атрибуты 50 NFT чтобы собрать все уникальные модели/фоны/символы
async function fetchNftAttributes(slug) {
  if (nftAttrsCache[slug] || attrsLock.has(slug)) return nftAttrsCache[slug] || null;
  attrsLock.add(slug);

  try {
    const models = new Map(), backdrops = new Map(), symbols = new Map();
    // Берём 50 NFT с равномерным шагом чтобы увидеть разные варианты
    const supply = collectionsCache?.find(c => c.slug === slug)?.supply || 1000;
    const step = Math.max(1, Math.floor(supply / 50));
    const nums = [];
    for (let i = 1; i <= Math.min(supply, 50 * step); i += step) nums.push(i);
    if (nums[nums.length-1] !== Math.min(supply, 9999)) nums.push(Math.min(supply, 9999));

    // Параллельно по 10
    for (let i = 0; i < nums.length; i += 10) {
      const batch = nums.slice(i, i + 10);
      const results = await Promise.allSettled(batch.map(n =>
        fetch(`https://nft.fragment.com/gift/${slug}-${n}.json`, { timeout: 5000 })
          .then(r => r.ok ? r.json() : null)
      ));
      results.forEach(r => {
        if (r.status !== 'fulfilled' || !r.value) return;
        (r.value.attributes || []).forEach(a => {
          const v = a.value, tt = a.trait_type;
          if (tt === 'Model') models.set(v, (models.get(v) || 0) + 1);
          else if (tt === 'Backdrop') backdrops.set(v, (backdrops.get(v) || 0) + 1);
          else if (tt === 'Symbol') symbols.set(v, (symbols.get(v) || 0) + 1);
        });
      });
      if (i + 10 < nums.length) await new Promise(r => setTimeout(r, 300));
    }

    // Сортируем по частоте (редкие сначала)
    const toArr = map => Array.from(map.entries())
      .sort((a, b) => a[1] - b[1])
      .map(([name, count]) => ({ name, count, rarity: parseFloat((count / nums.length * 100).toFixed(1)) }));

    nftAttrsCache[slug] = { models: toArr(models), backdrops: toArr(backdrops), symbols: toArr(symbols), scanned: nums.length };
    console.log(`[Attrs] ${slug}: ${models.size} models, ${backdrops.size} backdrops`);
  } catch(e) {
    console.error('[Attrs]', slug, e.message);
  } finally {
    attrsLock.delete(slug);
  }
  return nftAttrsCache[slug] || null;
}

updateAll();
setInterval(updateAll, 20000);
setInterval(fetchTonRate, 60000);

// ── Routes ────────────────────────────────────────────────────────
app.get('/', (req, res) => res.json({ name: 'CursorGift Proxy v2', ok: true, collections: collectionsCache?.length || 0, ton_usd: tonUsd, online: onlineUsers.size }));

app.get('/api/prices', async (req, res) => {
  await updateAll();
  if (!collectionsCache) return res.json({ error: 'loading', collections: [], ton_usd: tonUsd });
  res.json({ collections: collectionsCache, ton_usd: tonUsd, updated_at: lastFetch, count: collectionsCache.length });
});

// История цен — полная с момента запуска сервера
app.get('/api/history/:slug', (req, res) => {
  const { slug } = req.params;
  const { hours } = req.query;
  let history = priceHistory[slug] || [];
  if (hours && parseFloat(hours) < 99999) {
    const cutoff = Date.now() - parseFloat(hours) * 3600000;
    history = history.filter(p => p.time >= cutoff);
  }
  res.json({ slug, history, count: history.length, from_start: !hours || parseFloat(hours) >= 99999 });
});

// Атрибуты NFT (модели, фоны, символы)
app.get('/api/attrs/:slug', async (req, res) => {
  const { slug } = req.params;
  // Возвращаем кэш сразу если есть
  if (nftAttrsCache[slug]) return res.json({ slug, ...nftAttrsCache[slug], cached: true });
  // Запускаем загрузку в фоне
  if (!attrsLock.has(slug)) fetchNftAttributes(slug).catch(()=>{});
  // Возвращаем пустой ответ — клиент опросит снова
  res.json({ slug, models: [], backdrops: [], symbols: [], loading: true });
});

// Конкретный NFT #N
app.get('/api/nft/:slug/:num', async (req, res) => {
  try {
    const r = await fetch(`https://nft.fragment.com/gift/${req.params.slug}-${req.params.num}.json`, { timeout: 6000 });
    if (!r.ok) return res.status(404).json({ error: 'not found' });
    const j = await r.json();
    res.json({ ...j, lottie: `https://nft.fragment.com/gift/${req.params.slug}-${req.params.num}.lottie.json`, image_hq: `https://nft.fragment.com/gift/${req.params.slug}-${req.params.num}.webp` });
  } catch(e) { res.status(500).json({ error: e.message }); }
});

// Профиль пользователя
app.post('/api/profile', (req, res) => {
  const { tgId, name, username, avatar } = req.body;
  if (!tgId) return res.status(400).json({ error: 'tgId required' });
  const id = String(tgId);
  if (!userProfiles[id]) {
    userProfiles[id] = { id, name, username, avatar, gifts: [], joinedAt: Date.now(), games: { wins: 0, losses: 0 } };
  } else {
    // Обновляем имя/аватар если изменились
    userProfiles[id].name = name || userProfiles[id].name;
    userProfiles[id].username = username || userProfiles[id].username;
    userProfiles[id].avatar = avatar || userProfiles[id].avatar;
  }
  res.json(userProfiles[id]);
});

app.get('/api/profile/:tgId', (req, res) => {
  const profile = userProfiles[req.params.tgId];
  if (!profile) return res.status(404).json({ error: 'not found' });
  res.json(profile);
});

app.get('/api/ton', (req, res) => res.json({ usd: tonUsd, updated: Date.now() }));
app.get('/api/online', (req, res) => res.json({ count: onlineUsers.size, users: getOnlineList() }));
app.get('/api/health', (req, res) => res.json({ ok: true, collections: collectionsCache?.length || 0, ton_usd: tonUsd, online: onlineUsers.size, last_update: new Date(lastFetch).toISOString() }));

const PORT = process.env.PORT || 3333;
server.listen(PORT, () => console.log(`\n🚀 CursorGift Proxy v2 → :${PORT}\n`));

// ── Telegram Bot Webhook ─────────────────────────────────────────
const { handleUpdate } = require('./bot');

app.post('/webhook', async (req, res) => {
  res.sendStatus(200); // Отвечаем сразу
  await handleUpdate(req.body).catch(console.error);
});
