/**
 * Resend Email Client Configuration
 *
 * Initializes the Resend SDK with the API key from environment variables.
 * Falls back gracefully if not configured (logs warning instead of crashing).
 */

import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY;

if (!RESEND_API_KEY) {
  console.warn('⚠️  RESEND_API_KEY not set — email notifications will be disabled');
}

export const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

/**
 * The verified sender address for outbound emails.
 * Use your verified domain in production (e.g. notifications@peersupport.in).
 * Resend provides onboarding@resend.dev for testing.
 */
export const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'PeerSupport <onboarding@resend.dev>';
