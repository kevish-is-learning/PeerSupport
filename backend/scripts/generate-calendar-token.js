#!/usr/bin/env node

/**
 * One-time script to authorize your Google account for Calendar access.
 *
 * Usage:
 *   node scripts/generate-calendar-token.js
 *
 * Prerequisites:
 *   1. In Google Cloud Console → APIs & Services → OAuth consent screen,
 *      add the scope: https://www.googleapis.com/auth/calendar
 *   2. In Credentials → your OAuth 2.0 Client ID, add this redirect URI:
 *      http://localhost:3939/callback
 *   3. Make sure GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are set in .env
 *
 * What it does:
 *   - Opens your browser to Google's OAuth consent page
 *   - You log in and grant Calendar access
 *   - Captures the auth code and exchanges it for tokens
 *   - Saves the refresh token to google-calendar-token.json
 */

import dotenv from 'dotenv';
dotenv.config();

import { google } from 'googleapis';
import http from 'http';
import { URL } from 'url';
import fs from 'fs';
import { exec } from 'child_process';

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:3939/callback';
const TOKEN_FILE = './google-calendar-token.json';

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('❌ GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET must be set in .env');
  process.exit(1);
}

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  prompt: 'consent', // Force consent to always get a refresh token
  scope: ['https://www.googleapis.com/auth/calendar'],
});

console.log('\n🔐 Google Calendar OAuth Setup\n');
console.log('Opening your browser to authorize...\n');
console.log('If the browser does not open, visit this URL manually:\n');
console.log(authUrl);
console.log('');

// Open browser
const openCmd = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
exec(`${openCmd} "${authUrl}"`);

// Start a tiny HTTP server to capture the callback
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost:3939');

  if (url.pathname !== '/callback') {
    res.writeHead(404);
    res.end('Not found');
    return;
  }

  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');

  if (error) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`<h1>❌ Authorization failed</h1><p>${error}</p>`);
    console.error(`\n❌ Authorization failed: ${error}`);
    server.close();
    process.exit(1);
  }

  if (!code) {
    res.writeHead(400, { 'Content-Type': 'text/html' });
    res.end('<h1>❌ No authorization code received</h1>');
    return;
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);

    if (!tokens.refresh_token) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end('<h1>⚠️ No refresh token received</h1><p>Try revoking access at <a href="https://myaccount.google.com/permissions">Google Account Permissions</a> and run this script again.</p>');
      console.error('\n⚠️  No refresh token received. Revoke access and try again.');
      server.close();
      process.exit(1);
    }

    // Save tokens
    fs.writeFileSync(TOKEN_FILE, JSON.stringify(tokens, null, 2));

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
      <html>
        <body style="font-family: system-ui; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background: #0a0a0a; color: #fff;">
          <div style="text-align: center;">
            <h1>✅ Google Calendar Authorized!</h1>
            <p>Refresh token saved to <code>${TOKEN_FILE}</code></p>
            <p>You can close this tab.</p>
          </div>
        </body>
      </html>
    `);

    console.log('\n✅ Authorization successful!');
    console.log(`   Refresh token saved to ${TOKEN_FILE}`);
    console.log('\n   You can now restart your backend server.\n');

    server.close();
    process.exit(0);
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/html' });
    res.end(`<h1>❌ Token exchange failed</h1><p>${err.message}</p>`);
    console.error(`\n❌ Token exchange failed: ${err.message}`);
    server.close();
    process.exit(1);
  }
});

server.listen(3939, () => {
  console.log('⏳ Waiting for authorization callback on http://localhost:3939/callback ...\n');
});
