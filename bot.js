/**
 * CursorGift Bot — /start, persistent Open button, local banner upload
 */
const https = require('https');
const fs = require('fs');
const path = require('path');

const TOKEN = process.env.BOT_TOKEN || ''; // задаётся в Railway Variables
const WEBAPP_URL = process.env.WEBAPP_URL || 'https://stepik-tech.github.io/market/';
const CHANNEL_URL = process.env.CHANNEL_URL || 'https://t.me/CursorGift_bot';
const BANNER_FILE = process.env.BANNER_FILE || path.join(__dirname, 'banner.jpg');
const FALLBACK_BANNER_URL = process.env.BANNER_URL || ''; // можно задать file_id или стабильный URL, если нужен

function webAppUrlFor(user) {
  try {
    const u = new URL(WEBAPP_URL);
    if (user?.id) u.searchParams.set('tgId', String(user.id));
    u.searchParams.set('fromBot', '1');
    return u.toString();
  } catch(e) {
    const sep = WEBAPP_URL.includes('?') ? '&' : '?';
    return WEBAPP_URL + sep + 'tgId=' + encodeURIComponent(user?.id || '') + '&fromBot=1';
  }
}

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
      res.on('end', () => { try { resolve(JSON.parse(d)); } catch(e) { resolve({ ok:false, raw:d }); } });
    });
    req.on('error', e => resolve({ ok:false, error:e.message }));
    req.write(body); req.end();
  });
}

function apiMultipart(method, fields, fileField, filePath, filename='banner.jpg', contentType='image/jpeg') {
  return new Promise((resolve) => {
    if (!TOKEN) return resolve({ ok:false, error:'BOT_TOKEN is not set' });
    if (!fs.existsSync(filePath)) return resolve({ ok:false, error:'file not found' });

    const boundary = '----CursorGiftBoundary' + Date.now().toString(16);
    const chunks = [];
    const add = v => chunks.push(Buffer.isBuffer(v) ? v : Buffer.from(String(v)));

    for (const [key, value] of Object.entries(fields || {})) {
      add(`--${boundary}\r\n`);
      add(`Content-Disposition: form-data; name="${key}"\r\n\r\n`);
      add(typeof value === 'string' ? value : JSON.stringify(value));
      add('\r\n');
    }

    add(`--${boundary}\r\n`);
    add(`Content-Disposition: form-data; name="${fileField}"; filename="${filename}"\r\n`);
    add(`Content-Type: ${contentType}\r\n\r\n`);
    add(fs.readFileSync(filePath));
    add(`\r\n--${boundary}--\r\n`);

    const body = Buffer.concat(chunks);
    const req = https.request({
      hostname: 'api.telegram.org',
      path: `/bot${TOKEN}/${method}`,
      method: 'POST',
      headers: { 'Content-Type': `multipart/form-data; boundary=${boundary}`, 'Content-Length': body.length }
    }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => { try { resolve(JSON.parse(d)); } catch(e) { resolve({ ok:false, raw:d }); } });
    });
    req.on('error', e => resolve({ ok:false, error:e.message }));
    req.write(body); req.end();
  });
}

function captionText() {
  return ` *Cursor Market — рынок Telegram подарков*\n\n` +
}

function inlineOpenMarkup(appUrl) {
  return {
    inline_keyboard: [
      [{ text: 'Open Cursor Market', web_app: { url: appUrl } }],
      [{ text: 'Join the Community ', url: https://t.me/Cursor_Market }]
    ]
  };
}


async function setupOpenButtons(chatId, user) {
  const appUrl = webAppUrlFor(user);

  // Кнопка Menu возле поля ввода — остаётся в чате после /start.
  await api('setChatMenuButton', {
    chat_id: chatId,
    menu_button: {
      type: 'web_app',
      text: 'Открыть',
      web_app: { url: appUrl }
    }
  });

  // Команды, чтобы пользователь видел /start и /open.
  await api('setMyCommands', {
    commands: [
      { command: 'start', description: 'Запустить CursorGift' },
      { command: 'open', description: 'Открыть приложение' }
    ]
  });

  return appUrl;
}

async function sendStart(chatId, user) {
  const appUrl = await setupOpenButtons(chatId, user);
  const replyMarkup = inlineOpenMarkup(appUrl);

  // Локальный upload баннера: не зависит от Imgur и региональных блокировок.
  let sent = null;
  if (fs.existsSync(BANNER_FILE)) {
    sent = await apiMultipart('sendPhoto', {
      chat_id: String(chatId),
      caption: captionText(),
      parse_mode: 'Markdown',
      reply_markup: replyMarkup
    }, 'photo', BANNER_FILE, path.basename(BANNER_FILE), 'image/jpeg');
  }

  // Если локальный файл почему-то не отправился, пробуем env BANNER_URL/file_id.
  if ((!sent || !sent.ok) && FALLBACK_BANNER_URL) {
    sent = await api('sendPhoto', {
      chat_id: chatId,
      photo: FALLBACK_BANNER_URL,
      caption: captionText(),
      parse_mode: 'Markdown',
      reply_markup: replyMarkup
    });
  }

  // Последний fallback — обычное сообщение без картинки.
  if (!sent || !sent.ok) {
    await api('sendMessage', {
      chat_id: chatId,
      text: captionText(),
      parse_mode: 'Markdown',
      reply_markup: replyMarkup
    });
  }



async function handleUpdate(update) {
  const msg = update.message;
  if (!msg) return;

  const chatId = msg.chat.id;
  const text = (msg.text || '').split(' ')[0].replace('@CursorGift_bot', '');

  // На /start, /open и любое сообщение обновляем постоянную кнопку и показываем открытие.
  await sendStart(chatId, msg.from);
}

module.exports = { handleUpdate, setupOpenButtons, webAppUrlFor };

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
