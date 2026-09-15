/**
 * SMS Service
 *
 * Transactional SMS via Twilio. Every method is fire-and-forget and never
 * throws — a failed SMS must not fail the booking that triggered it.
 * No-ops entirely when Twilio credentials are absent.
 */

import { smsEnabled, sendTwilioMessage } from '../config/sms.js';

const IST = 'Asia/Kolkata';

const formatIst = (value) =>
  new Date(value).toLocaleString('en-IN', {
    timeZone: IST,
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

/**
 * Normalise to E.164. Indian 10-digit numbers are the common case here, so a
 * bare 10-digit string gets the +91 country code.
 */
export const toE164 = (raw, defaultCountryCode = '91') => {
  if (!raw) return null;

  const digits = String(raw).replace(/[^\d+]/g, '');
  if (digits.startsWith('+')) return digits;

  const bare = digits.replace(/^0+/, '');
  if (bare.length === 10) return `+${defaultCountryCode}${bare}`;
  if (bare.length > 10) return `+${bare}`;

  return null;
};

class SmsService {
  async _send(to, body) {
    if (!smsEnabled) return null;

    const recipient = toE164(to);
    if (!recipient) {
      console.warn('[SmsService] skipped — unusable phone number');
      return null;
    }

    try {
      return await sendTwilioMessage({ to: recipient, body });
    } catch (error) {
      console.error('[SmsService] send failed:', error.message);
      return null;
    }
  }

  async sendBookingConfirmed({ phone, menteeName, mentorName, startTime }) {
    return this._send(
      phone,
      `Hi ${menteeName || 'there'}, your PeerSupport session with ${mentorName} is confirmed for ${formatIst(startTime)} IST. You'll get a join link before the call.`
    );
  }

  async sendNewBookingToMentor({ phone, mentorName, menteeName, startTime }) {
    return this._send(
      phone,
      `Hi ${mentorName || 'there'}, ${menteeName} booked a PeerSupport session with you on ${formatIst(startTime)} IST.`
    );
  }

  /** Reminder ahead of a session — the contract asks for 24h and 1h. */
  async sendSessionReminder({ phone, name, counterpartName, startTime, hoursBefore }) {
    const lead = hoursBefore === 1 ? 'in 1 hour' : `in ${hoursBefore} hours`;
    return this._send(
      phone,
      `Reminder: your PeerSupport session with ${counterpartName} starts ${lead} (${formatIst(startTime)} IST). Join from your dashboard.`
    );
  }

  async sendBookingCancelled({ phone, name, counterpartName, startTime }) {
    return this._send(
      phone,
      `Your PeerSupport session with ${counterpartName} on ${formatIst(startTime)} IST has been cancelled. Any refund due will be processed automatically.`
    );
  }

  async sendGroupSessionReminder({ phone, title, startTime, hoursBefore }) {
    const lead = hoursBefore === 1 ? 'in 1 hour' : `in ${hoursBefore} hours`;
    return this._send(
      phone,
      `Reminder: "${title}" starts ${lead} (${formatIst(startTime)} IST) on PeerSupport.`
    );
  }
}

export default new SmsService();
