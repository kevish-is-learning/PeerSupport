/**
 * iCalendar (.ics) generation — RFC 5545.
 *
 * Produces a single-event VCALENDAR that mail clients surface as an invite.
 * Times are emitted as UTC instants so the recipient's client renders them in
 * whatever timezone they use.
 */

const PRODID = '-//PeerSupport//Mentorship Booking//EN';

/** RFC 5545 date-time in UTC form: 20260916T093000Z */
const toIcsUtc = (value) =>
  new Date(value).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

/** Escape per RFC 5545 §3.3.11 — backslash, semicolon, comma, newline. */
const escapeText = (value) =>
  String(value ?? '')
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');

/**
 * Fold lines at 75 octets, continuing with a leading space (RFC 5545 §3.1).
 * Long descriptions silently break some clients without this.
 */
const foldLine = (line) => {
  if (Buffer.byteLength(line, 'utf8') <= 75) return line;

  const chunks = [];
  let current = '';

  for (const char of line) {
    const candidate = current + char;
    const limit = chunks.length === 0 ? 75 : 74;
    if (Buffer.byteLength(candidate, 'utf8') > limit) {
      chunks.push(current);
      current = char;
    } else {
      current = candidate;
    }
  }
  chunks.push(current);

  return chunks.map((c, i) => (i === 0 ? c : ` ${c}`)).join('\r\n');
};

/**
 * Build a calendar invite for a mentoring session.
 *
 * @param {object} event
 * @param {string} event.uid           Stable id — reuse it so updates replace the event
 * @param {Date|string} event.startTime
 * @param {Date|string} event.endTime
 * @param {string} event.title
 * @param {string} [event.description]
 * @param {string} [event.location]    Usually the meeting URL
 * @param {string} [event.organizerName]
 * @param {string} [event.organizerEmail]
 * @param {Array<{name?: string, email: string}>} [event.attendees]
 * @param {number} [event.sequence]    Bump on each update
 * @param {'REQUEST'|'CANCEL'} [event.method]
 * @param {number|null} [event.reminderMinutes] Popup alarm lead time
 * @returns {string} ics file contents
 */
export function generateSessionIcs({
  uid,
  startTime,
  endTime,
  title,
  description,
  location,
  organizerName = 'PeerSupport',
  organizerEmail = process.env.SMTP_FROM_ADDRESS || 'no-reply@peersupport.co.in',
  attendees = [],
  sequence = 0,
  method = 'REQUEST',
  reminderMinutes = 30,
}) {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    `PRODID:${PRODID}`,
    'CALSCALE:GREGORIAN',
    `METHOD:${method}`,
    'BEGIN:VEVENT',
    `UID:${escapeText(uid)}`,
    `DTSTAMP:${toIcsUtc(new Date())}`,
    `DTSTART:${toIcsUtc(startTime)}`,
    `DTEND:${toIcsUtc(endTime)}`,
    `SEQUENCE:${sequence}`,
    `SUMMARY:${escapeText(title)}`,
    `STATUS:${method === 'CANCEL' ? 'CANCELLED' : 'CONFIRMED'}`,
    'TRANSP:OPAQUE',
    `ORGANIZER;CN=${escapeText(organizerName)}:mailto:${organizerEmail}`,
  ];

  if (description) lines.push(`DESCRIPTION:${escapeText(description)}`);
  if (location) lines.push(`LOCATION:${escapeText(location)}`);
  if (location) lines.push(`URL:${escapeText(location)}`);

  for (const attendee of attendees) {
    if (!attendee?.email) continue;
    lines.push(
      `ATTENDEE;CN=${escapeText(attendee.name || attendee.email)};ROLE=REQ-PARTICIPANT;` +
        `PARTSTAT=NEEDS-ACTION;RSVP=TRUE:mailto:${attendee.email}`
    );
  }

  if (reminderMinutes && method !== 'CANCEL') {
    lines.push(
      'BEGIN:VALARM',
      `TRIGGER:-PT${reminderMinutes}M`,
      'ACTION:DISPLAY',
      `DESCRIPTION:${escapeText(title)}`,
      'END:VALARM'
    );
  }

  lines.push('END:VEVENT', 'END:VCALENDAR');

  return lines.map(foldLine).join('\r\n');
}

/**
 * Wrap an invite as a Nodemailer attachment.
 * `method=REQUEST` is what makes Gmail/Outlook show Accept/Decline buttons.
 */
export function icsAttachment(icsContent, filename = 'session.ics', method = 'REQUEST') {
  return {
    filename,
    content: icsContent,
    contentType: `text/calendar; charset=utf-8; method=${method}`,
  };
}
