/**
 * Time utility functions for the availability system.
 *
 * DESIGN DECISION: We store availability times as DateTime with a canonical date (1970-01-01).
 * This lets us use Prisma's native DateTime comparison operators (gte, lte, lt, gt)
 * instead of string parsing at the database level. The date portion is meaningless —
 * only the HH:mm time component matters for weekly recurring schedules.
 *
 * When creating actual bookings, we combine the slot's time component with the
 * requested scheduledDate to produce real DateTime values.
 */

/** Canonical date used for all time-only DateTime fields. */
const CANONICAL_DATE = '1970-01-01';

/**
 * Convert an "HH:mm" string to a canonical DateTime (1970-01-01T{HH:mm}:00.000Z).
 * @param {string} timeStr - Time in "HH:mm" format (e.g., "09:00", "14:30").
 * @returns {Date}
 */
export function timeStringToDateTime(timeStr) {
  const [h, m] = timeStr.split(':').map(Number);
  return new Date(`${CANONICAL_DATE}T${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:00.000Z`);
}

/**
 * Convert a DateTime back to an "HH:mm" string.
 * Extracts only the time component (UTC hours/minutes).
 * @param {Date} dt
 * @returns {string}
 */
export function dateTimeToTimeString(dt) {
  const d = new Date(dt);
  return `${String(d.getUTCHours()).padStart(2, '0')}:${String(d.getUTCMinutes()).padStart(2, '0')}`;
}

/**
 * Convert a time string to total minutes since midnight.
 * Useful for overlap calculations.
 * @param {string} timeStr - "HH:mm"
 * @returns {number}
 */
export function timeToMinutes(timeStr) {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

/**
 * Convert a DateTime to total minutes since midnight (UTC).
 * @param {Date} dt
 * @returns {number}
 */
export function dateTimeToMinutes(dt) {
  const d = new Date(dt);
  return d.getUTCHours() * 60 + d.getUTCMinutes();
}

/**
 * Check if two time ranges overlap.
 * Ranges are [start, end) — start inclusive, end exclusive.
 * Overlap: newStart < existEnd AND newEnd > existStart
 *
 * @param {{ startTime: Date, endTime: Date }} slotA
 * @param {{ startTime: Date, endTime: Date }} slotB
 * @returns {boolean}
 */
export function doSlotsOverlap(slotA, slotB) {
  const aStart = dateTimeToMinutes(slotA.startTime);
  const aEnd = dateTimeToMinutes(slotA.endTime);
  const bStart = dateTimeToMinutes(slotB.startTime);
  const bEnd = dateTimeToMinutes(slotB.endTime);

  return aStart < bEnd && aEnd > bStart;
}

/**
 * Given a scheduledDate (Date, date-only) and a canonical time (DateTime from slot),
 * produce a real DateTime combining the date and time.
 *
 * Example:
 *   scheduledDate = 2026-05-15
 *   slotTime = 1970-01-01T09:00:00.000Z
 *   → 2026-05-15T09:00:00.000Z
 *
 * @param {Date} scheduledDate - The calendar date (e.g., new Date('2026-05-15'))
 * @param {Date} slotTime - The canonical time (e.g., 1970-01-01T09:00:00Z)
 * @returns {Date}
 */
export function combineDateAndTime(scheduledDate, slotTime) {
  const date = new Date(scheduledDate);
  const time = new Date(slotTime);

  return new Date(Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    time.getUTCHours(),
    time.getUTCMinutes(),
    0,
    0
  ));
}

/**
 * Get the DayOfWeek enum value for a given date.
 * @param {Date} date
 * @returns {string} - One of MONDAY, TUESDAY, ..., SUNDAY
 */
export function getDayOfWeekFromDate(date) {
  const d = new Date(date);
  const dayIndex = d.getUTCDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const map = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  return map[dayIndex];
}

/**
 * Check if a date is in the future (compared to now, date-only).
 * @param {Date|string} date
 * @returns {boolean}
 */
export function isFutureDate(date) {
  const target = new Date(date);
  const today = new Date();
  // Compare date-only (strip time)
  target.setUTCHours(0, 0, 0, 0);
  today.setUTCHours(0, 0, 0, 0);
  return target >= today;
}
