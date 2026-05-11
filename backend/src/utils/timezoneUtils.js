/**
 * Timezone utility functions.
 *
 * All datetimes are stored in UTC. The client sends IST (Asia/Kolkata, UTC+5:30),
 * and we convert on input. On output, we convert back to IST.
 *
 * IST offset: +5 hours 30 minutes = +330 minutes
 */

const IST_OFFSET_MINUTES = 330; // +5:30

/**
 * Convert an IST datetime string to a UTC Date.
 * Accepts ISO-like strings: "2026-05-15T09:00:00" (interpreted as IST)
 *
 * @param {string} istDateTimeStr - e.g. "2026-05-15T09:00:00"
 * @returns {Date} UTC Date
 */
export function istToUtc(istDateTimeStr) {
  if (!istDateTimeStr) {
    return new Date(NaN);
  }

  // If the string already includes a timezone (Z or +/-HH:MM), trust native parsing.
  if (/[zZ]|[+-]\d{2}:\d{2}$/.test(istDateTimeStr)) {
    return new Date(istDateTimeStr);
  }

  // Parse as IST without timezone suffix and subtract IST offset.
  const [datePart, timePartRaw] = istDateTimeStr.split('T');
  const timePart = (timePartRaw || '00:00:00').split(/[+-]/)[0];
  const [year, month, day] = datePart.split('-').map(Number);
  const [h, m, sRaw = '0'] = timePart.split(':');
  const [seconds] = sRaw.split('.');
  const hours = Number(h);
  const minutes = Number(m);
  const secs = Number(seconds || 0);

  // Create a UTC date then subtract IST offset to get actual UTC
  const istMs = Date.UTC(year, month - 1, day, hours, minutes, secs);
  const utcMs = istMs - IST_OFFSET_MINUTES * 60 * 1000;

  return new Date(utcMs);
}

/**
 * Convert a UTC Date to an IST datetime string.
 *
 * @param {Date} utcDate
 * @returns {string} ISO string in IST, e.g. "2026-05-15T14:30:00+05:30"
 */
export function utcToIst(utcDate) {
  const d = new Date(utcDate);
  const istMs = d.getTime() + IST_OFFSET_MINUTES * 60 * 1000;
  const istDate = new Date(istMs);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    `${istDate.getUTCFullYear()}-${pad(istDate.getUTCMonth() + 1)}-${pad(istDate.getUTCDate())}` +
    `T${pad(istDate.getUTCHours())}:${pad(istDate.getUTCMinutes())}:${pad(istDate.getUTCSeconds())}` +
    `+05:30`
  );
}

/**
 * Convert "HH:mm" (IST) + a date string "YYYY-MM-DD" into a UTC Date.
 *
 * @param {string} dateStr - "YYYY-MM-DD"
 * @param {string} timeStr - "HH:mm" in IST
 * @returns {Date} UTC Date
 */
export function istTimeAndDateToUtc(dateStr, timeStr) {
  return istToUtc(`${dateStr}T${timeStr}:00`);
}

/**
 * Format a UTC Date to "HH:mm" in IST.
 *
 * @param {Date} utcDate
 * @returns {string} "HH:mm" in IST
 */
export function utcToIstTimeString(utcDate) {
  const d = new Date(utcDate);
  const istMs = d.getTime() + IST_OFFSET_MINUTES * 60 * 1000;
  const istDate = new Date(istMs);
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(istDate.getUTCHours())}:${pad(istDate.getUTCMinutes())}`;
}

/**
 * Get the IST date string (YYYY-MM-DD) from a UTC Date.
 *
 * @param {Date} utcDate
 * @returns {string}
 */
export function utcToIstDateString(utcDate) {
  const d = new Date(utcDate);
  const istMs = d.getTime() + IST_OFFSET_MINUTES * 60 * 1000;
  const istDate = new Date(istMs);
  const pad = (n) => String(n).padStart(2, '0');
  return `${istDate.getUTCFullYear()}-${pad(istDate.getUTCMonth() + 1)}-${pad(istDate.getUTCDate())}`;
}
