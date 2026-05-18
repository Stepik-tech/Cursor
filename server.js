const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();

app.use(cors());
app.use(express.json());

// Cache
let collectionsCache = null;
let priceHistoryCache = {}; // slug -> [{time, price}]
let lastFetch = 0;
const CACHE_TTL = 20000; // 20 секунд

// ── Portal Market — основной источник ────────────────────────────
async function fetchPortal() {
  try {
    const r = await fetch('https://portal-market.com/api/collections?limit=300', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; GiftMarketBot/1.0)',
        'Accept': 'application/json',
        'Referer': 'https://portal-market.com/'
      },
      timeout: 10000
    });
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

// ── TON/USD rate ──────────────────────────────────────────────────
let tonUsd = 5.5;
async function fetchTonRate() {
  try {
    const r = await fetch('https://tonapi.io/v2/rates?tokens=ton&currencies=usd', { timeout: 5000 });
    const j = await r.json();
    const rate = j?.rates?.TON?.prices?.USD;
    if (rate > 0) tonUsd = parseFloat(parseFloat(rate).toFixed(4));
  } catch(e) {}
}

// ── Price history from Portal sales ──────────────────────────────
async function fetchPortalHistory(slug, limit = 100) {
  try {
    const r = await fetch(`https://portal-market.com/api/market-activity?gift_name=${encodeURIComponent(slug)}&type=sale&limit=${limit}&sort=latest`, {
      headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'application/json' },
      timeout: 8000
    });
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
  } catch(e) {
    return [];
  }
}

// ── Update loop ───────────────────────────────────────────────────
async function updateAll() {
  const now = Date.now();
  if (now - lastFetch < CACHE_TTL) return;
  lastFetch = now;

  console.log('[Proxy] Updating prices...');
  const [portalData] = await Promise.allSettled([fetchPortal(), fetchTonRate()]);

  if (portalData?.value) {
    collectionsCache = portalData.value;

    // Сохраняем точки в историю
    collectionsCache.forEach(c => {
      if (!priceHistoryCache[c.slug]) priceHistoryCache[c.slug] = [];
      priceHistoryCache[c.slug].push({ time: now, price: c.floor });
      // Держим 7 дней данных при 20с интервале = 30240 точек
      if (priceHistoryCache[c.slug].length > 30240) {
        priceHistoryCache[c.slug] = priceHistoryCache[c.slug].slice(-10000);
      }
    });

    console.log(`[Proxy] Updated ${collectionsCache.length} collections, TON=$${tonUsd}`);
  }
}

// Запускаем сразу и потом каждые 20 секунд
updateAll();
setInterval(updateAll, 20000);
setInterval(fetchTonRate, 60000);

// ── API Routes ────────────────────────────────────────────────────

// GET /api/prices — все цены сразу
app.get('/api/prices', async (req, res) => {
  await updateAll();
  if (!collectionsCache) return res.json({ error: 'loading', collections: [], ton_usd: tonUsd });

  res.json({
    collections: collectionsCache,
    ton_usd: tonUsd,
    updated_at: lastFetch,
    count: collectionsCache.length
  });
});

// GET /api/history/:slug — история цен конкретного подарка
app.get('/api/history/:slug', async (req, res) => {
  const { slug } = req.params;
  const { hours = 72 } = req.query;

  let history = priceHistoryCache[slug] || [];

  // Если история пустая — пробуем загрузить с Portal
  if (history.length < 5) {
    const fresh = await fetchPortalHistory(slug, 200);
    if (fresh.length > 0) {
      priceHistoryCache[slug] = [...fresh, ...history].sort((a,b) => a.time - b.time);
      history = priceHistoryCache[slug];
    }
  }

  // Фильтруем по периоду
  const cutoff = hours == 99999 ? 0 : Date.now() - parseFloat(hours) * 3600000;
  const filtered = history.filter(p => p.time >= cutoff);

  res.json({
    slug,
    history: filtered.length > 1 ? filtered : history,
    count: filtered.length,
    source: 'portal'
  });
});

// GET /api/ton — курс TON/USD
app.get('/api/ton', (req, res) => {
  res.json({ usd: tonUsd, updated: Date.now() });
});

// GET /api/health
app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    collections: collectionsCache?.length || 0,
    ton_usd: tonUsd,
    last_update: new Date(lastFetch).toISOString()
  });
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`\n🚀 GiftMarket Proxy running on :${PORT}`);
  console.log(`   GET http://localhost:${PORT}/api/prices`);
  console.log(`   GET http://localhost:${PORT}/api/history/:slug`);
  console.log(`   GET http://localhost:${PORT}/api/ton\n`);
});
