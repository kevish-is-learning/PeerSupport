/**
 * Google Calendar API Configuration — OAuth 2.0
 *
 * Uses OAuth 2.0 with a stored refresh token so the app can act as
 * the real Google account owner.  This enables:
 *   - Google Meet link generation
 *   - Adding attendees & sending invite emails
 *
 * One-time setup:
 *   node scripts/generate-calendar-token.js
 *
 * Required env vars:
 *   GOOGLE_CLIENT_ID           — OAuth 2.0 client ID
 *   GOOGLE_CLIENT_SECRET       — OAuth 2.0 client secret
 *   GOOGLE_CALENDAR_ID         — calendar to create events on (default: "primary")
 *   GOOGLE_ADMIN_EMAIL         — admin email added as attendee
 */

import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

const TOKEN_FILE = path.resolve('google-calendar-token.json');

let calendarClient = null;
let isConfigured = false;

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

  if (!fs.existsSync(TOKEN_FILE)) {
    console.warn(`⚠️  Token file not found at ${TOKEN_FILE}`);
    console.warn('   Run: node scripts/generate-calendar-token.js');
    return null;
  }

  try {
    const tokens = JSON.parse(fs.readFileSync(TOKEN_FILE, 'utf-8'));

    if (!tokens.refresh_token) {
      console.warn('⚠️  No refresh_token in token file — run the auth script again');
      return null;
    }

    const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
    oauth2Client.setCredentials(tokens);

    // Auto-refresh: when the access token expires, googleapis will use
    // the refresh_token to get a new one automatically.  Persist it so
    // we always have the latest tokens on disk.
    oauth2Client.on('tokens', (newTokens) => {
      const merged = { ...tokens, ...newTokens };
      fs.writeFileSync(TOKEN_FILE, JSON.stringify(merged, null, 2));
    });

    calendarClient = google.calendar({ version: 'v3', auth: oauth2Client });
    isConfigured = true;
    console.log('✅ Google Calendar client initialised (OAuth 2.0)');
    return calendarClient;
  } catch (err) {
    console.error('❌ Failed to initialise Google Calendar client:', err.message);
    return null;
  }
};

const getCalendarId = () => process.env.GOOGLE_CALENDAR_ID || 'primary';
const getAdminEmail = () => process.env.GOOGLE_ADMIN_EMAIL || '';
const isCalendarConfigured = () => isConfigured || !!getCalendarClient();

export { getCalendarClient, getCalendarId, getAdminEmail, isCalendarConfigured };
