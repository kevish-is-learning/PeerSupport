/**
 * Google Calendar API Configuration
 *
 * Uses a Google Service Account to authenticate server-to-server.
 * The service account must have calendar access (either domain-wide
 * delegation or the calendar must be shared with the service account email).
 *
 * Required env vars:
 *   GOOGLE_SERVICE_ACCOUNT_KEY_FILE — path to the JSON key file
 *   GOOGLE_CALENDAR_ID             — calendar to create events on (default: "primary")
 *   GOOGLE_ADMIN_EMAIL             — admin email added as attendee
 */

import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

let calendarClient = null;
let isConfigured = false;

/**
 * Initialise (lazily) the Google Calendar v3 client.
 * Returns null when credentials are missing — callers must handle gracefully.
 */
const getCalendarClient = () => {
  if (calendarClient) return calendarClient;

  const keyFilePath = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE;

  if (!keyFilePath) {
    console.warn('⚠️  GOOGLE_SERVICE_ACCOUNT_KEY_FILE not set — Google Calendar integration disabled');
    return null;
  }

  const resolvedPath = path.resolve(keyFilePath);

  if (!fs.existsSync(resolvedPath)) {
    console.warn(`⚠️  Google service-account key file not found at ${resolvedPath} — Calendar integration disabled`);
    return null;
  }

  try {
    const keyFile = JSON.parse(fs.readFileSync(resolvedPath, 'utf-8'));

    const auth = new google.auth.JWT(
      keyFile.client_email,
      null,
      keyFile.private_key,
      ['https://www.googleapis.com/auth/calendar'],
      // If domain-wide delegation is set up, impersonate admin email
      process.env.GOOGLE_ADMIN_EMAIL || undefined,
    );

    calendarClient = google.calendar({ version: 'v3', auth });
    isConfigured = true;
    console.log('✅ Google Calendar client initialised');
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
