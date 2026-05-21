/**
 * server_profile.js — Profile routes for CursorGift NFT Market
 * Add to your existing server.js:
 *
 *   const profileRoutes = require('./server_profile');
 *   app.use('/api', profileRoutes);
 *
 * Dependencies (add to package.json):
 *   npm install better-sqlite3 node-fetch@2
 */

'use strict';

const express  = require('express');
const crypto   = require('crypto');
const path     = require('path');
const fetch    = require('node-fetch'); // v2 (CommonJS)

// ── SQLite setup ──────────────────────────────────────────────────────────────
let db;
try {
  const Database = require('better-sqlite3');
  db = new Database(path.join(__dirname, 'cursorgift.db'));

  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      tg_id       INTEGER PRIMARY KEY,
      first_name  TEXT,
      last_name   TEXT,
      username    TEXT,
      photo_url   TEXT,
      is_premium  INTEGER DEFAULT 0,
      wallet      TEXT,
      created_at  TEXT DEFAULT (datetime('now')),
      updated_at  TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS nft_cache (
      address     TEXT PRIMARY KEY,
      nfts_json   TEXT,
      cached_at   TEXT DEFAULT (datetime('now'))
    );
  `);

  console.log('[Profile] SQLite DB initialised');
} catch (err) {
  console.warn('[Profile] SQLite not available — using in-memory store:', err.message);
  // ── Fallback: plain in-memory store ────────────────────────────────────────
  const memUsers = new Map();
  const memNfts  = new Map();

  db = {
    prepare: (sql) => {
      // Minimal shim so the route code doesn't need to change
      const isSelect = sql.trim().toUpperCase().startsWith('SELECT');
      return {
        get: (...args) => {
          if (sql.includes('users') && sql.includes('tg_id = ?')) return memUsers.get(args[0]);
          return undefined;
        },
        run: (...args) => {
          if (sql.includes('users')) {
            const existing = memUsers.get(args[0]) || {};
            memUsers.set(args[0], { ...existing, tg_id: args[0], first_name: args[1], last_name: args[2], username: args[3], photo_url: args[4], is_premium: args[5], updated_at: new Date().toISOString() });
          }
        },
        all: (...args) => {
          if (sql.includes('nft_cache')) return memNfts.get(args[0]) ? [{ nfts_json: memNfts.get(args[0]) }] : [];
          return [];
        },
      };
    },
  };
}

// ── Constants ─────────────────────────────────────────────────────────────────
const BOT_TOKEN   = process.env.BOT_TOKEN || '8835242049:AAFoXfvA6BhagyvTWZ7d_Z0xx-Wp-yuzgX0';
const TONAPI_BASE = 'https://tonapi.io/v2';
const NFT_CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

const router = express.Router();

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Verify Telegram WebApp initData via HMAC-SHA256.
 * https://core.telegram.org/bots/webapps#validating-data-received-via-the-web-app
 */
function verifyInitData(initData) {
  try {
    const params  = new URLSearchParams(initData);
    const hash    = params.get('hash');
    if (!hash) return { ok: false, user: null };

    params.delete('hash');

    const dataCheckString = Array.from(params.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}=${v}`)
      .join('\n');

    const secretKey = crypto
      .createHmac('sha256', 'WebAppData')
      .update(BOT_TOKEN)
      .digest();

    const computedHash = crypto
      .createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex');

    if (computedHash !== hash) return { ok: false, user: null };

    // Check auth_date freshness (max 24 h)
    const authDate = parseInt(params.get('auth_date') || '0', 10);
    if (Date.now() / 1000 - authDate > 86400) return { ok: false, user: null };

    const user = JSON.parse(params.get('user') || '{}');
    return { ok: true, user };
  } catch (e) {
    console.error('[verifyInitData]', e.message);
    return { ok: false, user: null };
  }
}

/** Upsert user row in SQLite */
function upsertUser(user) {
  db.prepare(`
    INSERT INTO users (tg_id, first_name, last_name, username, photo_url, is_premium, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, datetime('now'))
    ON CONFLICT(tg_id) DO UPDATE SET
      first_name  = excluded.first_name,
      last_name   = excluded.last_name,
      username    = excluded.username,
      photo_url   = COALESCE(excluded.photo_url, photo_url),
      is_premium  = excluded.is_premium,
      updated_at  = datetime('now')
  `).run(
    user.id,
    user.first_name || '',
    user.last_name  || '',
    user.username   || '',
    user.photo_url  || null,
    user.is_premium ? 1 : 0,
  );
}

/** Fetch user row from DB */
function getUser(tgId) {
  return db.prepare('SELECT * FROM users WHERE tg_id = ?').get(Number(tgId));
}

// ── Middleware: parse JSON body ───────────────────────────────────────────────
router.use(express.json());

// ── Routes ────────────────────────────────────────────────────────────────────

/**
 * POST /api/profile
 * Body: { initData: "<raw initData string>" }
 * Verifies, saves and returns the full profile.
 */
router.post('/profile', (req, res) => {
  const { initData } = req.body || {};
  if (!initData) return res.status(400).json({ error: 'initData required' });

  const { ok, user } = verifyInitData(initData);

  // In development (no real Telegram context), allow bypass
  if (!ok) {
    const isDev = process.env.NODE_ENV !== 'production';
    if (!isDev) return res.status(403).json({ error: 'Invalid initData signature' });
    console.warn('[Profile] DEV MODE — skipping signature check');
  }

  if (!user || !user.id) {
    return res.status(400).json({ error: 'No user in initData' });
  }

  try {
    upsertUser(user);
    const saved = getUser(user.id);
    return res.json({ ok: true, profile: saved || user });
  } catch (e) {
    console.error('[POST /profile]', e);
    return res.status(500).json({ error: 'DB error' });
  }
});

/**
 * POST /api/profile/save
 * Same as POST /api/profile but explicit endpoint name.
 */
router.post('/profile/save', (req, res) => {
  const { initData, ...extra } = req.body || {};
  if (!initData) return res.status(400).json({ error: 'initData required' });

  const { ok, user } = verifyInitData(initData);
  if (!ok && process.env.NODE_ENV === 'production') {
    return res.status(403).json({ error: 'Invalid signature' });
  }

  if (!user || !user.id) return res.status(400).json({ error: 'No user' });

  try {
    upsertUser({ ...user, ...extra });
    return res.json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: 'DB error' });
  }
});

/**
 * GET /api/profile/:tgId
 * Returns stored profile by Telegram user ID.
 */
router.get('/profile/:tgId', (req, res) => {
  const profile = getUser(req.params.tgId);
  if (!profile) return res.status(404).json({ error: 'Not found' });
  return res.json({ ok: true, profile });
});

/**
 * POST /api/wallet/connect
 * Body: { initData, address }
 * Saves TON wallet address for the authenticated user.
 */
router.post('/wallet/connect', (req, res) => {
  const { initData, address } = req.body || {};
  if (!initData || !address) return res.status(400).json({ error: 'initData and address required' });

  const { ok, user } = verifyInitData(initData);
  if (!ok && process.env.NODE_ENV === 'production') {
    return res.status(403).json({ error: 'Invalid signature' });
  }
  if (!user || !user.id) return res.status(400).json({ error: 'No user' });

  try {
    db.prepare(`
      UPDATE users SET wallet = ?, updated_at = datetime('now') WHERE tg_id = ?
    `).run(address, user.id);

    // Also upsert user in case they don't exist yet
    const existing = getUser(user.id);
    if (!existing) {
      upsertUser(user);
      db.prepare(`UPDATE users SET wallet = ? WHERE tg_id = ?`).run(address, user.id);
    }

    return res.json({ ok: true, address });
  } catch (e) {
    console.error('[POST /wallet/connect]', e);
    return res.status(500).json({ error: 'DB error' });
  }
});

/**
 * GET /api/nfts/:address
 * Proxies NFT list from tonapi.io with 5-minute cache.
 */
router.get('/nfts/:address', async (req, res) => {
  const { address } = req.params;
  if (!address) return res.status(400).json({ error: 'address required' });

  // Cache check
  try {
    const row = db.prepare('SELECT * FROM nft_cache WHERE address = ?').get(address);
    if (row && (Date.now() - new Date(row.cached_at).getTime()) < NFT_CACHE_TTL_MS) {
      return res.json({ ok: true, cached: true, nfts: JSON.parse(row.nfts_json) });
    }
  } catch (_) {}

  try {
    const url = `${TONAPI_BASE}/accounts/${encodeURIComponent(address)}/nfts?limit=50&indirect_ownership=true`;
    const headers = { 'Accept': 'application/json' };
    if (process.env.TONAPI_KEY) headers['Authorization'] = `Bearer ${process.env.TONAPI_KEY}`;

    const response = await fetch(url, { headers });
    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({ error: text });
    }

    const data = await response.json();
    const nfts = data.nft_items || [];

    // Save to cache
    try {
      db.prepare(`
        INSERT INTO nft_cache (address, nfts_json, cached_at)
        VALUES (?, ?, datetime('now'))
        ON CONFLICT(address) DO UPDATE SET
          nfts_json = excluded.nfts_json,
          cached_at = datetime('now')
      `).run(address, JSON.stringify(nfts));
    } catch (_) {}

    return res.json({ ok: true, cached: false, nfts });
  } catch (e) {
    console.error('[GET /nfts]', e);
    return res.status(500).json({ error: e.message });
  }
});

/**
 * GET /api/balance/:address
 * Returns TON balance via tonapi.io
 */
router.get('/balance/:address', async (req, res) => {
  const { address } = req.params;
  try {
    const url = `${TONAPI_BASE}/accounts/${encodeURIComponent(address)}`;
    const headers = { 'Accept': 'application/json' };
    if (process.env.TONAPI_KEY) headers['Authorization'] = `Bearer ${process.env.TONAPI_KEY}`;

    const response = await fetch(url, { headers });
    if (!response.ok) return res.status(response.status).json({ error: 'TON API error' });

    const data = await response.json();
    const balanceTon = (Number(data.balance) / 1e9).toFixed(2);
    return res.json({ ok: true, balance: balanceTon, raw: data.balance, address: data.address });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

module.exports = router;
