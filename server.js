const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

// ── Cache ─────────────────────────────────────────────────────────
let collectionsCache = null;
let priceHistoryCache = {};
let lastFetch = 0;
let tonUsd = 2.05;
const CACHE_TTL = 20000;

// ── Portal Market ─────────────────────────────────────────────────
async function fetchPortal() {
  try {
    const r = await fetch('https://portal-market.com/api/collections?limit=300', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; GiftMarketBot/1.0)',
        'Accept': 'application/json',
        'Referer': 'https://portal-market.com/'
      },
      timeout: 12000
    });
    if (!r.ok) throw new Error('Portal HTTP ' + r.status);
    const j = await r.json();
    const cols = j.collections || [];
    const changes = j.floor_changes || {};
    const volChanges = j.volume_changes || {};

    return cols.map(c => ({
      id: c.id,
      name: c.name,
      slug: c.short_name,
      photo: `https://fragment.com/file/gifts/${c.short_name}/thumb.webp`,
      portalPhoto: c.photo_url,
      floor: parseFloat(c.floor_price) || 0,
      change24h: parseFloat((parseFloat(changes[c.id] || 0) * 100).toFixed(2)),
      vol24h: parseFloat(c.day_volume) || 0,
      volChange: parseFloat((parseFloat(volChanges[c.id] || 0) * 100).toFixed(2)),
      listed: c.listed_count || 0,
      supply: c.supply || 0,
      marketCap: parseFloat(c.market_cap) || 0,
      sales24h: c.sales_24h_count || 0,
      isNew: c.is_new || false,
      source: 'portal'
    }));
  } catch(e) {
    console.error('[Portal] Error:', e.message);
    return null;
  }
}

async function fetchTonRate() {
  try {
    const r = await fetch('https://tonapi.io/v2/rates?tokens=ton&currencies=usd', { timeout: 5000 });
    const j = await r.json();
    const rate = j?.rates?.TON?.prices?.USD;
    if (rate > 0) tonUsd = parseFloat(parseFloat(rate).toFixed(4));
  } catch(e) {}
}

async function fetchPortalHistory(slug) {
  try {
    const r = await fetch(
      `https://portal-market.com/api/market-activity?gift_name=${encodeURIComponent(slug)}&type=sale&limit=200&sort=latest`,
      { headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'application/json' }, timeout: 8000 }
    );
    if (!r.ok) return [];
    const j = await r.json();
    const items = j.activities || j.sales || j.data || [];
    return items
      .filter(i => parseFloat(i.price || i.ton_price || 0) > 0)
      .map(i => ({
        time: new Date(i.created_at || i.sold_at || i.time || Date.now()).getTime(),
        price: parseFloat(i.price || i.ton_price || 0),
        source: 'portal_sale'
      }))
      .sort((a, b) => a.time - b.time);
  } catch(e) { return []; }
}

async function updateAll() {
  const now = Date.now();
  if (now - lastFetch < CACHE_TTL) return;
  lastFetch = now;

  console.log('[Proxy] Updating from Portal Market...');
  const [portalData] = await Promise.allSettled([fetchPortal(), fetchTonRate()]);

  if (portalData?.value) {
    collectionsCache = portalData.value;
    collectionsCache.forEach(c => {
      if (!priceHistoryCache[c.slug]) priceHistoryCache[c.slug] = [];
      priceHistoryCache[c.slug].push({ time: now, price: c.floor });
      if (priceHistoryCache[c.slug].length > 30240) {
        priceHistoryCache[c.slug] = priceHistoryCache[c.slug].slice(-10000);
      }
    });
    console.log(`[Proxy] ✅ ${collectionsCache.length} collections, TON=$${tonUsd}`);
  }
}

// Запуск
updateAll();
setInterval(updateAll, 20000);
setInterval(fetchTonRate, 60000);

// ── API Routes ─────────────────────────────────────────────────────

app.get('/', (req, res) => res.json({
  name: 'GiftMarket Proxy',
  status: 'ok',
  collections: collectionsCache?.length || 0,
  ton_usd: tonUsd,
  endpoints: ['/api/prices', '/api/history/:slug', '/api/ton', '/api/health']
}));

app.get('/api/prices', async (req, res) => {
  await updateAll();
  if (!collectionsCache) return res.json({ error: 'loading', collections: [], ton_usd: tonUsd });
  res.json({ collections: collectionsCache, ton_usd: tonUsd, updated_at: lastFetch, count: collectionsCache.length });
});

app.get('/api/history/:slug', async (req, res) => {
  const { slug } = req.params;
  const { hours = 99999 } = req.query;
  let history = priceHistoryCache[slug] || [];

  if (history.length < 5) {
    const fresh = await fetchPortalHistory(slug);
    if (fresh.length > 0) {
      priceHistoryCache[slug] = [...fresh, ...history].sort((a,b) => a.time - b.time);
      history = priceHistoryCache[slug];
    }
  }

  const cutoff = hours >= 99999 ? 0 : Date.now() - parseFloat(hours) * 3600000;
  const filtered = history.filter(p => p.time >= cutoff);
  res.json({ slug, history: filtered.length > 1 ? filtered : history, count: filtered.length });
});

app.get('/api/ton', (req, res) => res.json({ usd: tonUsd, updated: Date.now() }));

app.get('/api/health', (req, res) => res.json({
  ok: true,
  collections: collectionsCache?.length || 0,
  ton_usd: tonUsd,
  last_update: new Date(lastFetch).toISOString()
}));

// ── Telegram Webhook (если нужен) ──────────────────────────────────
// Раскомментируй если хочешь webhook вместо polling
// const { handleUpdate } = require('./bot');
// app.post('/webhook', async (req, res) => {
//   await handleUpdate(req.body);
//   res.sendStatus(200);
// });

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`\n🚀 GiftMarket Proxy → http://localhost:${PORT}`);
  console.log(`   Prices: http://localhost:${PORT}/api/prices`);
  console.log(`   Health: http://localhost:${PORT}/api/health\n`);
});
