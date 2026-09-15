/**
 * SMS Configuration (Twilio)
 *
 * Mirrors the mailer's contract: when credentials are absent the module exports
 * a null client and SmsService turns into a no-op rather than crashing.
 *
 * Required env:
 *   TWILIO_ACCOUNT_SID
 *   TWILIO_AUTH_TOKEN
 *   TWILIO_FROM_NUMBER   e.g. +15551234567
 * Optional env:
 *   SMS_ENABLED          "false" disables sending even when configured
 */

const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_FROM_NUMBER,
  SMS_ENABLED,
} = process.env;

const isConfigured = Boolean(
  TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN && TWILIO_FROM_NUMBER
);

export const smsEnabled = isConfigured && SMS_ENABLED !== 'false';

if (!isConfigured) {
  console.warn('⚠️  TWILIO_* not set — SMS notifications will be disabled');
}

export const FROM_NUMBER = TWILIO_FROM_NUMBER;

/**
 * Twilio's REST API over fetch — avoids pulling in the SDK for one endpoint.
 */
export async function sendTwilioMessage({ to, body }) {
  const endpoint = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`;
  const auth = Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString('base64');

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ To: to, From: FROM_NUMBER, Body: body }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Twilio responded ${response.status}: ${detail}`);
  }

  return response.json();
}
