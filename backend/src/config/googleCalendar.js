/**
 * Google Calendar API Configuration — OAuth 2.0
 *
 * Uses OAuth 2.0 with a stored refresh token so the app can act as
 * the real Google account owner.  This enables:
 *   - Google Meet link generation
 *   - Adding attendees & sending invite emails
 *
 * One-time setup (run once, on any machine that can reach a browser):
 *   node scripts/generate-calendar-token.js
 * The script prints the resulting token both as a local file AND as a
 * ready-to-paste GOOGLE_CALENDAR_TOKEN_JSON value for production.
 *
 * Token storage — checked in this order:
 *   1. GOOGLE_CALENDAR_TOKEN_JSON env var (raw JSON or base64-encoded JSON).
 *      Use this in production / any deployment without a persisted disk
 *      (containers, serverless, PaaS) — a local token file does not
 *      survive redeploys or restarts there.
 *   2. google-calendar-token.json file on disk next to the backend root.
 *      Convenient for local development only.
 *
 * Required env vars:
 *   GOOGLE_CLIENT_ID           — OAuth 2.0 client ID
 *   GOOGLE_CLIENT_SECRET       — OAuth 2.0 client secret
 *   GOOGLE_CALENDAR_TOKEN_JSON — refresh token JSON (see above; production)
 *   GOOGLE_CALENDAR_ID         — calendar to create events on (default: "primary")
 *   GOOGLE_ADMIN_EMAIL         — admin email added as attendee
 */

import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TOKEN_FILE = path.resolve(__dirname, '../../google-calendar-token.json');

let calendarClient = null;
let meetClient = null;
let isConfigured = false;

/**
 * Load the stored OAuth tokens from whichever source is available.
 * Prefers the env var (works on stateless/ephemeral deployments) and
 * falls back to the local file (local dev convenience).
 *
 * @returns {{ tokens: object, source: 'env' | 'file' } | null}
 */
const loadStoredTokens = () => {
  const envValue = process.env.GOOGLE_CALENDAR_TOKEN_JSON;
  if (envValue) {
    try {
      return { tokens: JSON.parse(envValue), source: 'env' };
    } catch {
      try {
        const decoded = Buffer.from(envValue, 'base64').toString('utf-8');
        return { tokens: JSON.parse(decoded), source: 'env' };
      } catch (err) {
        console.error('❌ GOOGLE_CALENDAR_TOKEN_JSON is set but is not valid JSON or base64-encoded JSON:', err.message);
        return null;
      }
    }
  }

  if (fs.existsSync(TOKEN_FILE)) {
    try {
      return { tokens: JSON.parse(fs.readFileSync(TOKEN_FILE, 'utf-8')), source: 'file' };
    } catch (err) {
      console.error(`❌ Failed to parse token file at ${TOKEN_FILE}:`, err.message);
      return null;
    }
  }

  return null;
};

/**
 * Initialise (lazily) the Google Calendar v3 client using OAuth 2.0.
 * Returns null when credentials or tokens are missing.
 */
const getCalendarClient = () => {
  if (calendarClient) return calendarClient;

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    console.warn('⚠️  GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET not set — Google Calendar disabled');
    return null;
  }

  const stored = loadStoredTokens();

  if (!stored) {
    console.warn('⚠️  No Google Calendar token found (checked GOOGLE_CALENDAR_TOKEN_JSON env var and google-calendar-token.json)');
    console.warn('   Run: node scripts/generate-calendar-token.js');
    return null;
  }

  const { tokens, source } = stored;

  try {
    if (!tokens.refresh_token) {
      console.warn('⚠️  No refresh_token in stored token — run the auth script again');
      return null;
    }

    const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
    oauth2Client.setCredentials(tokens);

    // Auto-refresh: when the access token expires, googleapis will use
    // the refresh_token to get a new one automatically. When the token
    // came from the local file we persist the refreshed values back to
    // disk. When it came from the env var, there's nowhere at runtime to
    // persist it — the refresh_token itself does not rotate on a normal
    // refresh, so this is safe; the in-memory client just keeps using the
    // new access token until the process restarts and re-reads the env var.
    if (source === 'file') {
      oauth2Client.on('tokens', (newTokens) => {
        const merged = { ...tokens, ...newTokens };
        fs.writeFileSync(TOKEN_FILE, JSON.stringify(merged, null, 2));
      });
    }

    calendarClient = google.calendar({ version: 'v3', auth: oauth2Client });
    meetClient = google.meet({ version: 'v2', auth: oauth2Client });
    isConfigured = true;
    console.log(`✅ Google Calendar client initialised (OAuth 2.0, token source: ${source})`);
    return calendarClient;
  } catch (err) {
    console.error('❌ Failed to initialise Google Calendar client:', err.message);
    return null;
  }
};

// Env UIs sometimes leave stray whitespace, newlines or wrapping quotes on
// pasted values, which makes Google answer 404 for an otherwise valid ID.
const cleanEnv = (value) => (value || '').trim().replace(/^(['"])(.*)\1$/, '$2').trim();

const getCalendarId = () => cleanEnv(process.env.GOOGLE_CALENDAR_ID) || 'primary';
const getAdminEmail = () => cleanEnv(process.env.GOOGLE_ADMIN_EMAIL);
// Google Meet REST client (shares the Calendar OAuth credentials). Used to
// open meetings to anyone with the link; null when Calendar isn't configured.
const getMeetClient = () => {
  getCalendarClient();
  return meetClient;
};
const isCalendarConfigured = () => isConfigured || !!getCalendarClient();

export { getCalendarClient, getMeetClient, getCalendarId, getAdminEmail, isCalendarConfigured };
