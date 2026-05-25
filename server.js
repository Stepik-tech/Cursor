const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(cors());
app.use(express.json());

let collectionsCache = null;
let lastListedMap = {}; 
let tonUsd = 2.0;

// ЛОГИКА ДЕТЕКТОРА ПРОДАЖ
function applyDemandLogic(collections) {
    console.log(`[Analytics] Scanning ${collections.length} collections for sales...`);
    
    return collections.map(c => {
        const slug = c.slug;
        const currentListed = c.listed || 0;
        const prevListed = lastListedMap[slug] || currentListed;

        // Если подарков стало меньше — это продажа!
        if (currentListed < prevListed && prevListed > 0) {
            const sold = prevListed - currentListed;
            const bonus = 1 + (sold * 0.007); // +0.7% за продажу
            c.floor = parseFloat((c.floor * bonus).toFixed(2));
            c.hotSale = true; 
            console.log(`🔥 ВНИМАНИЕ! Продажа ${slug}: ${sold} шт. Цена выросла до ${c.floor}`);
        } else {
            c.hotSale = false;
        }

        lastListedMap[slug] = currentListed;
        return c;
    });
}

async function updateAll() {
    try {
        const r = await fetch('https://portal-market.com/api/collections?limit=300');
        const j = await r.json();
        
        // Берем данные
        let data = (j.collections || []).map(c => ({
            name: c.name,
            slug: c.short_name,
            floor: parseFloat(c.floor_price) || 0,
            listed: c.listed_count || 0,
            vol24h: parseFloat(c.day_volume) || 0,
            photo: `https://fragment.com/file/gifts/${c.short_name}/thumb.webp`
        }));

        // Запускаем наш детектор
        collectionsCache = applyDemandLogic(data);
        
        // Отправляем всем в Mini App
        const payload = JSON.stringify({ type: 'prices', collections: collectionsCache, ton_usd: tonUsd });
        wss.clients.forEach(s => { if(s.readyState === WebSocket.OPEN) s.send(payload); });
        
        console.log(`[Server] Data sent to ${wss.clients.size} users. TON: $${tonUsd}`);
    } catch(e) { 
        console.log('!!! Ошибка обновления:', e.message); 
    }
}

// TON Rate
async function updateTon() {
    try {
        const r = await fetch('https://tonapi.io/v2/rates?tokens=ton&currencies=usd');
        const j = await r.json();
        tonUsd = j?.rates?.TON?.prices?.USD || tonUsd;
    } catch(e) {}
}

setInterval(updateAll, 20000);
setInterval(updateTon, 60000);
updateAll();

app.get('/api/prices', (req, res) => res.json({ collections: collectionsCache || [], ton_usd: tonUsd }));
app.get('/', (req, res) => res.send('Cursor Market Server is Active'));

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`\n🚀 CURSOR SERVER START ON PORT ${PORT}\n`));
