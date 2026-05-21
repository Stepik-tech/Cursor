/**
 * CursorGift Bot — только /start с баннером
 */
const https = require('https');

const TOKEN = process.env.BOT_TOKEN || ''; // задаётся в Railway Variables
const WEBAPP_URL = process.env.WEBAPP_URL || 'https://stepik-tech.github.io/market/';
const CHANNEL_URL = process.env.CHANNEL_URL || 'https://t.me/CursorGift_bot';
const BANNER_URL = 'https://i.imgur.com/HxHHYuf.png'; // твой баннер

function api(method, data) {
  return new Promise((resolve) => {
    if (!TOKEN) { console.warn('[Bot] BOT_TOKEN is not set'); return resolve({ ok:false, error:'BOT_TOKEN is not set' }); }
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
    req.on('error', () => resolve({}));
    req.write(body); req.end();
  });
}

async function handleUpdate(update) {
  const msg = update.message;
  if (!msg) return;

  const chatId = msg.chat.id;
  const text = (msg.text || '').split(' ')[0].replace('@CursorGift_bot', '');

  // Любая команда или сообщение → баннер
  await api('sendPhoto', {
    chat_id: chatId,
    photo: BANNER_URL,
    caption:
      `🎁 *CursorGift — рынок Telegram подарков*\n\n` +
      `📊 Реальные цены · Portal Market\n` +
      `📈 Графики от первой продажи\n` +
      `🎡 Колесо Апгрейда\n` +
      `💹 TON/USD в реальном времени\n\n` +
      `👇 Нажми чтобы открыть!`,
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [
        [{ text: '🚀 Открыть CursorGift', web_app: { url: WEBAPP_URL } }],
        [
          { text: '📢 Наш канал', url: CHANNEL_URL },
        ]
      ]
    }
  });
}

module.exports = { handleUpdate };

if (require.main === module) {
  console.log('🤖 CursorGift Bot polling...');
  let offset = 0;
  async function poll() {
    try {
      const r = await api('getUpdates', { offset, timeout: 30, limit: 100 });
      if (r.ok && r.result?.length) {
        for (const u of r.result) { offset = u.update_id + 1; await handleUpdate(u).catch(console.error); }
      }
    } catch(e) { await new Promise(r => setTimeout(r, 3000)); }
    poll();
  }
  poll();
}
