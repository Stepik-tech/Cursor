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
        onlineUsers.set(userId, { id: userId, name: msg.name||'User', avatar: msg.avatar||null, lastSeen: Date.now() });
        broadcastOnline();
      }
    } catch(e) {}
  });
  ws.on('close', () => { if(userId){ onlineUsers.delete(userId); broadcastOnline(); } });
  ws.send(JSON.stringify({ type:'online', count:onlineUsers.size, users:getOnlineList() }));
});
function getOnlineList() { return Array.from(onlineUsers.values()).slice(0,20); }
function broadcastOnline() {
  const msg = JSON.stringify({ type:'online', count:onlineUsers.size, users:getOnlineList() });
  wss.clients.forEach(c => { if(c.readyState===1) c.send(msg); });
}
setInterval(() => {
  const cutoff = Date.now()-35000;
  for(const [id,u] of onlineUsers) if(u.lastSeen<cutoff) onlineUsers.delete(id);
  broadcastOnline();
}, 30000);

// ── Cache ─────────────────────────────────────────────────────────
let collectionsCache = null;
let priceHistory = {};    // slug -> [{time,price,vol}]  накапливается с запуска
let lastFetch = 0;
let tonUsd = 2.0;
const CACHE_TTL = 20000;

// NFT attrs cache
const nftAttrsCache = {};
const attrsLock = new Set();

// User profiles
const userProfiles = {};

// ── Portal Market ─────────────────────────────────────────────────
async function fetchPortal() {
  try {
    const r = await fetch('https://portal-market.com/api/collections?limit=300', {
      headers: { 'User-Agent':'Mozilla/5.0','Accept':'application/json','Referer':'https://portal-market.com/' },
      timeout: 12000
    });
    if (!r.ok) throw new Error('HTTP '+r.status);
    const j = await r.json();
    const cols = j.collections||[];
    const changes = j.floor_changes||{};
    const volChanges = j.volume_changes||{};
    return cols.map(c => ({
      id: c.id, name: c.name, slug: c.short_name,
      photo: `https://fragment.com/file/gifts/${c.short_name}/thumb.webp`,
      portalPhoto: c.photo_url,
      floor: parseFloat(c.floor_price)||0,
      change24h: parseFloat((parseFloat(changes[c.id]||0)*100).toFixed(2)),
      vol24h: parseFloat(c.day_volume)||0,
      volChange: parseFloat((parseFloat(volChanges[c.id]||0)*100).toFixed(2)),
      listed: c.listed_count||0, supply: c.supply||0,
      marketCap: parseFloat(c.market_cap)||0,
      sales24h: c.sales_24h_count||0, isNew: c.is_new||false,
      source: 'portal'
    }));
  } catch(e) { console.error('[Portal]', e.message); return null; }
}

async function fetchTonRate() {
  try {
    const r = await fetch('https://tonapi.io/v2/rates?tokens=ton&currencies=usd', { timeout:5000 });
    const j = await r.json();
    const rate = j?.rates?.TON?.prices?.USD;
    if (rate>0) tonUsd = parseFloat(parseFloat(rate).toFixed(4));
  } catch(e) {}
}

// ── История продаж с Portal ────────────────────────────────────────
async function fetchPortalSales(slug, limit=200) {
  try {
    const r = await fetch(
      `https://portal-market.com/api/market-activity?gift_name=${encodeURIComponent(slug)}&type=sale&limit=${limit}&sort=oldest`,
      { headers:{'User-Agent':'Mozilla/5.0','Accept':'application/json'}, timeout:10000 }
    );
    if (!r.ok) return [];
    const j = await r.json();
    const items = j.activities||j.sales||j.data||[];
    return items
      .filter(i => parseFloat(i.price||i.ton_price||0)>0)
      .map(i => ({
        time: new Date(i.created_at||i.sold_at||i.time||Date.now()).getTime(),
        price: parseFloat(i.price||i.ton_price||0),
        vol: 1,
        source: 'portal_sale'
      }))
      .sort((a,b) => a.time-b.time);
  } catch(e) { return []; }
}

async function updateAll() {
  const now = Date.now();
  if (now-lastFetch < CACHE_TTL) return;
  lastFetch = now;
  console.log('[Proxy] Updating...');
  const [portalData] = await Promise.allSettled([fetchPortal(), fetchTonRate()]);
  if (portalData?.value) {
    collectionsCache = portalData.value;
    collectionsCache.forEach(c => {
      if (!priceHistory[c.slug]) priceHistory[c.slug] = [];
      priceHistory[c.slug].push({ time:now, price:c.floor, vol:c.vol24h });
      if (priceHistory[c.slug].length > 43200) priceHistory[c.slug] = priceHistory[c.slug].slice(-20000);
    });
    console.log(`[Proxy] ${collectionsCache.length} gifts, TON=$${tonUsd}`);
    broadcastPrices();
  }
}

function broadcastPrices() {
  if (!collectionsCache) return;
  const msg = JSON.stringify({
    type: 'prices',
    collections: collectionsCache,
    ton_usd: tonUsd,
    updated_at: Date.now()
  });
  wss.clients.forEach(c => { if(c.readyState===1) c.send(msg); });
}

updateAll();
setInterval(updateAll, 20000);
setInterval(fetchTonRate, 30000); // курс TON каждые 30 сек

// ── NFT attributes ─────────────────────────────────────────────────
async function fetchNftAttributes(slug) {
  if (nftAttrsCache[slug] || attrsLock.has(slug)) return nftAttrsCache[slug]||null;
  attrsLock.add(slug);
  try {
    const supply = collectionsCache?.find(c=>c.slug===slug)?.supply||1000;
    const step = Math.max(1, Math.floor(supply/50));
    const nums = [];
    for (let i=1; i<=Math.min(supply,50*step); i+=step) nums.push(i);
    const models=new Map(), bgs=new Map(), symbols=new Map();
    for (let i=0; i<nums.length; i+=10) {
      const batch = nums.slice(i,i+10);
      const results = await Promise.allSettled(batch.map(n=>
        fetch(`https://nft.fragment.com/gift/${slug}-${n}.json`,{timeout:5000}).then(r=>r.ok?r.json():null)
      ));
      results.forEach(r=>{
        if(r.status!=='fulfilled'||!r.value)return;
        (r.value.attributes||[]).forEach(a=>{
          const v=a.value,tt=a.trait_type;
          if(tt==='Model') models.set(v,(models.get(v)||0)+1);
          else if(tt==='Backdrop') bgs.set(v,(bgs.get(v)||0)+1);
          else if(tt==='Symbol') symbols.set(v,(symbols.get(v)||0)+1);
        });
      });
      if(i+10<nums.length) await new Promise(r=>setTimeout(r,300));
    }
    const toArr = map => Array.from(map.entries()).sort((a,b)=>a[1]-b[1]).map(([name,count])=>({name,count,rarity:parseFloat((count/nums.length*100).toFixed(1))}));
    nftAttrsCache[slug] = { models:toArr(models), backdrops:toArr(bgs), symbols:toArr(symbols), scanned:nums.length };
    console.log(`[Attrs] ${slug}: ${models.size} models, ${bgs.size} backdrops`);
  } catch(e) { console.error('[Attrs]',slug,e.message); }
  attrsLock.delete(slug);
  return nftAttrsCache[slug]||null;
}

// ── Routes ─────────────────────────────────────────────────────────
app.get('/', (req,res) => res.json({name:'CursorGift Proxy v3',ok:true,collections:collectionsCache?.length||0,ton_usd:tonUsd,online:onlineUsers.size}));

app.get('/api/prices', async (req,res) => {
  await updateAll();
  if (!collectionsCache) return res.json({error:'loading',collections:[],ton_usd:tonUsd});
  res.json({collections:collectionsCache,ton_usd:tonUsd,updated_at:lastFetch,count:collectionsCache.length});
});

// История — РЕАЛЬНАЯ с момента запуска + подгружаем с Portal если мало точек
app.get('/api/history/:slug', async (req,res) => {
  const { slug } = req.params;
  const { hours } = req.query;
  
  // Если мало данных — подгружаем реальные продажи с Portal
  let history = priceHistory[slug]||[];
  if (history.length < 20) {
    const sales = await fetchPortalSales(slug, 500);
    if (sales.length>0) {
      const merged = [...sales, ...history].sort((a,b)=>a.time-b.time)
        .filter((p,i,arr)=>i===0||p.time!==arr[i-1].time);
      priceHistory[slug] = merged;
      history = merged;
    }
  }
  
  // Фильтр по периоду
  let filtered = history;
  if (hours && parseFloat(hours)<99999) {
    const cutoff = Date.now()-parseFloat(hours)*3600000;
    filtered = history.filter(p=>p.time>=cutoff);
    if (filtered.length<3) filtered = history; // показываем всё если мало данных
  }
  
  res.json({
    slug, history:filtered, count:filtered.length,
    total:history.length,
    from: history.length ? new Date(history[0].time).toISOString() : null,
    to: history.length ? new Date(history[history.length-1].time).toISOString() : null
  });
});

// Атрибуты NFT
app.get('/api/attrs/:slug', async (req,res) => {
  const { slug } = req.params;
  if (nftAttrsCache[slug]) return res.json({slug,...nftAttrsCache[slug],cached:true});
  if (!attrsLock.has(slug)) fetchNftAttributes(slug).catch(()=>{});
  res.json({slug,models:[],backdrops:[],symbols:[],loading:true});
});

// NFT метаданные
app.get('/api/nft/:slug/:num', async (req,res) => {
  try {
    const r = await fetch(`https://nft.fragment.com/gift/${req.params.slug}-${req.params.num}.json`,{timeout:6000});
    if (!r.ok) return res.status(404).json({error:'not found'});
    const j = await r.json();
    res.json({...j, lottie:`https://nft.fragment.com/gift/${req.params.slug}-${req.params.num}.lottie.json`, image_hq:`https://nft.fragment.com/gift/${req.params.slug}-${req.params.num}.webp`});
  } catch(e) { res.status(500).json({error:e.message}); }
});

// TON курс
app.get('/api/ton', (req,res) => res.json({usd:tonUsd,updated:Date.now()}));

// Профиль
app.post('/api/profile', (req,res) => {
  const {tgId,name,username,avatar} = req.body;
  if (!tgId) return res.status(400).json({error:'tgId required'});
  const id = String(tgId);
  if (!userProfiles[id]) {
    userProfiles[id] = {id,name,username,avatar,gifts:[],joinedAt:Date.now(),games:{wins:0,losses:0}};
  } else {
    userProfiles[id] = {...userProfiles[id],name:name||userProfiles[id].name,username:username||userProfiles[id].username,avatar:avatar||userProfiles[id].avatar};
  }
  res.json(userProfiles[id]);
});

app.get('/api/profile/:tgId', (req,res) => {
  const p = userProfiles[req.params.tgId];
  if (!p) return res.status(404).json({error:'not found'});
  res.json(p);
});

// Онлайн
app.get('/api/online', (req,res) => res.json({count:onlineUsers.size,users:getOnlineList()}));

app.get('/api/health', (req,res) => res.json({
  ok:true, collections:collectionsCache?.length||0, ton_usd:tonUsd,
  online:onlineUsers.size, last_update:new Date(lastFetch).toISOString()
}));

// Telegram Bot Webhook
try {
  const { handleUpdate } = require('./bot');
  app.post('/webhook', async (req,res) => {
    res.sendStatus(200);
    await handleUpdate(req.body).catch(console.error);
  });
  console.log('[Bot] Webhook route registered');
} catch(e) { console.warn('[Bot] bot.js not found:', e.message); }

const PORT = process.env.PORT||3333;
server.listen(PORT, () => console.log(`\n🚀 CursorGift Proxy v3 → :${PORT}\n   WS broadcast enabled\n`));
