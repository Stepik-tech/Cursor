const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();

app.use(cors());
app.use(express.json());

// Хранилище для отслеживания спроса
let collectionsCache = null;
let priceHistoryCache = {}; 
let lastListedMap = {}; // Память листингов для детектора продаж
let lastFetch = 0;
const CACHE_TTL = 20000; 

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

// ── ДЕТЕКТОР ПРОДАЖ И ГЕНЕРАТОР ЦЕНЫ ──────────────────────────────
function applyDemandLogic(collections) {
    return collections.map(c => {
        const slug = c.slug;
        const currentListed = c.listed || 0;
        const prevListed = lastListedMap[slug] || currentListed;

        // Если количество листингов уменьшилось — была реальная продажа!
        if (currentListed < prevListed && prevListed > 0) {
            const soldCount = prevListed - currentListed;
            // Добавляем бонус к цене (0.5% за каждый проданный подарок)
            const demandBonus = 1 + (soldCount * 0.005);
            c.floor = parseFloat((c.floor * demandBonus).toFixed(2));
            c.hotSale = true; // Флаг "Горячая продажа"
            console.log(`[!] Продажа на Fragment: ${slug} (${soldCount} шт). Новая цена: ${c.floor}`);
        } else {
            c.hotSale = false;
        }

        lastListedMap[slug] = currentListed;
        return c;
    });
}

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

        let data = cols.map(c => ({
            id: c.id,
            name: c.name,
            slug: c.short_name,
            photo: `https://fragment.com/file/gifts/${c.short_name}/thumb.webp`,
            portalPhoto: c.photo_url,
            floor: parseFloat(c.floor_price) || 0,
            change24h: parseFloat((parseFloat(changes[c.id] || 0) * 100).toFixed(2)),
            vol24h: parseFloat(c.day_volume) || 0,
            listed: c.listed_count || 0,
            supply: c.supply || 0,
            marketCap: parseFloat(c.market_cap) || 0,
            sales24h: c.sales_24h_count || 0,
            isNew: c.is_new || false,
            source: 'portal'
        }));

        // Применяем логику спроса перед кэшированием
        return applyDemandLogic(data);

    } catch(e) {
        console.error('[Portal] Error:', e.message);
        return null;
    }
}

async function updateAll() {
    const now = Date.now();
    if (now - lastFetch < CACHE_TTL && collectionsCache) return;
    lastFetch = now;

    const portalData = await fetchPortal();
    await fetchTonRate();

    if (portalData) {
        collectionsCache = portalData;
        collectionsCache.forEach(c => {
            if (!priceHistoryCache[c.slug]) priceHistoryCache[c.slug] = [];
            priceHistoryCache[c.slug].push({ time: now, price: c.floor });
            if (priceHistoryCache[c.slug].length > 1000) priceHistoryCache[c.slug].shift();
        });
    }
}

// Routes
app.get('/api/prices', async (req, res) => {
    await updateAll();
    res.json({ collections: collectionsCache || [], ton_usd: tonUsd });
});

app.get('/api/history/:slug', (req, res) => {
    const { slug } = req.params;
    res.json({ slug, history: priceHistoryCache[slug] || [] });
});

app.get('/', (req, res) => res.send('Cursor Market Backend is Live'));

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`🚀 Server running on :${PORT}`));
