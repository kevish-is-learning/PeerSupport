/**
 * SMTP Mailer Configuration
 *
 * Builds a shared Nodemailer transport from environment variables.
 * Falls back gracefully if not configured (logs a warning instead of crashing);
 * EmailService treats a null transporter as "email disabled".
 *
 * Required env:
 *   SMTP_HOST   e.g. smtp.gmail.com
 *   SMTP_PORT   e.g. 587 (STARTTLS) or 465 (implicit TLS)
 *   SMTP_USER   SMTP username / login
 *   SMTP_PASS   SMTP password or app-specific password
 * Optional env:
 *   SMTP_SECURE "true" to force implicit TLS (defaults to true when port is 465)
 *   SMTP_FROM   default From header, e.g. "PeerSupport <admin@peersupport.space>"
 */

import nodemailer from 'nodemailer';

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  SMTP_SECURE,
  SMTP_FROM,
} = process.env;

const port = Number(SMTP_PORT) || 587;
const secure = SMTP_SECURE ? SMTP_SECURE === 'true' : port === 465;

const isConfigured = Boolean(SMTP_HOST && SMTP_USER && SMTP_PASS);

if (!isConfigured) {
  console.warn('⚠️  SMTP_HOST/SMTP_USER/SMTP_PASS not set — email notifications will be disabled');
}

export const transporter = isConfigured
  ? nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    })
  : null;

/**
 * Default sender address for outbound email.
 * Use an address on your verified/authenticated domain in production.
 */
export const FROM_EMAIL =
  SMTP_FROM || (SMTP_USER ? `PeerSupport <${SMTP_USER}>` : 'PeerSupport <no-reply@peersupport.space>');
