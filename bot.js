/**
 * CursorGift Bot
 * Отвечает на /start с баннером и двумя кнопками
 * Запускается вместе с прокси-сервером
 */

const https = require('https');

const TOKEN = process.env.BOT_TOKEN || '8835242049:AAFoXfvA6BhagyvTWZ7d_Z0xx-Wp-yuzgX0';
const WEBAPP_URL = process.env.WEBAPP_URL || 'https://stepik-tech.github.io/market/';
const CHANNEL_URL = process.env.CHANNEL_URL || 'https://t.me/CursorGift_bot'; // замени на свой канал

function apiCall(method, data) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(data);
    const req = https.request({
      hostname: 'api.telegram.org',
      path: `/bot${TOKEN}/${method}`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) }
    }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => { try { resolve(JSON.parse(d)); } catch(e) { resolve({}); } });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// Кнопки для всех сообщений
const mainKeyboard = {
  inline_keyboard: [
    [{ text: '🚀 Открыть CursorGift', web_app: { url: WEBAPP_URL } }],
    [
      { text: '📢 Наш канал', url: CHANNEL_URL },
      { text: '🏪 Рынок', web_app: { url: WEBAPP_URL } }
    ]
  ]
};

// Баннер при первом заходе (/start)
async function sendWelcome(chatId, userName) {
  const name = userName || 'друг';
  
  // Отправляем фото-баннер с описанием
  await apiCall('sendPhoto', {
    chat_id: chatId,
    photo: 'https://i.imgur.com/2b2hhDc.png',
    caption: 
      `👋 *Привет, ${name}!*\n\n` +
      `🎁 *CursorGift* — рынок Telegram NFT подарков\n\n` +
      `*Что умеет приложение:*\n` +
      `📊 Реальные цены · Portal Market\n` +
      `📈 Графики от первой продажи\n` +
      `🎡 Колесо Апгрейда подарков\n` +
      `🖼️ Оригинальные NFT анимации\n` +
      `👥 Кто сейчас онлайн\n` +
      `💹 TON/USD в реальном времени\n\n` +
      `_Нажми кнопку ниже чтобы открыть!_ 👇`,
    parse_mode: 'Markdown',
    reply_markup: mainKeyboard
  });
}

async function handleUpdate(update) {
  const msg = update.message;
  if (!msg) return;

  const chatId = msg.chat.id;
  const text = msg.text || '';
  const userName = msg.from?.first_name || msg.from?.username || 'друг';
  const cmd = text.split(' ')[0].replace(`@CursorGift_bot`, '');

  if (cmd === '/start') {
    await sendWelcome(chatId, userName);
    return;
  }

  if (cmd === '/market' || cmd === '/open') {
    await apiCall('sendMessage', {
      chat_id: chatId,
      text: '🏪 *CursorGift Market* — открывай прямо сейчас!',
      parse_mode: 'Markdown',
      reply_markup: mainKeyboard
    });
    return;
  }

  if (cmd === '/prices') {
    // Получаем цены с прокси
    try {
      const proxyUrl = process.env.PROXY_URL || 'https://web-production-ad0c.up.railway.app';
      const r = await new Promise((resolve, reject) => {
        https.get(proxyUrl + '/api/prices', res => {
          let d = '';
          res.on('data', c => d += c);
          res.on('end', () => { try { resolve(JSON.parse(d)); } catch(e) { reject(e); } });
        }).on('error', reject);
      });
      
      const cols = (r.collections || []).slice(0, 8);
      const tonUsd = r.ton_usd || 0;
      
      let txt = `💹 *Топ цены · TON = $${tonUsd.toFixed(2)}*\n\n`;
      cols.forEach(c => {
        const up = c.change24h >= 0;
        txt += `${up ? '📈' : '📉'} *${c.name}*\n`;
        txt += `   ${c.floor.toFixed(2)} TON · ${up ? '+' : ''}${c.change24h}%\n\n`;
      });
      
      await apiCall('sendMessage', {
        chat_id: chatId,
        text: txt,
        parse_mode: 'Markdown',
        reply_markup: mainKeyboard
      });
    } catch(e) {
      await apiCall('sendMessage', {
        chat_id: chatId,
        text: '⚠️ Не могу загрузить цены. Открой приложение!',
        reply_markup: mainKeyboard
      });
    }
    return;
  }

  if (cmd === '/help') {
    await apiCall('sendMessage', {
      chat_id: chatId,
      parse_mode: 'Markdown',
      text: `❓ *Команды CursorGift:*\n\n/start — Главное меню\n/market — Открыть рынок\n/prices — Топ цен\n/help — Справка`,
      reply_markup: mainKeyboard
    });
    return;
  }

  // Любое другое сообщение
  await apiCall('sendMessage', {
    chat_id: chatId,
    text: '🎁 Открой CursorGift Market!',
    reply_markup: mainKeyboard
  });
}

// Polling
let offset = 0;
async function poll() {
  try {
    const r = await apiCall('getUpdates', { offset, timeout: 30, limit: 100 });
    if (r.ok && r.result?.length) {
      for (const update of r.result) {
        offset = update.update_id + 1;
        await handleUpdate(update).catch(console.error);
      }
    }
  } catch(e) {
    await new Promise(r => setTimeout(r, 3000));
  }
  poll();
}

// Webhook handler (для Railway)
module.exports = { handleUpdate, sendWelcome };

// Запуск polling если напрямую
if (require.main === module) {
  console.log('🤖 CursorGift Bot started (polling)');
  poll();
}
