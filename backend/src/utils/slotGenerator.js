/**
 * Slot Generation Utility
 *
 * Generates bookable time slots on-demand from availability windows.
 * Slots are NEVER stored — they are computed at query time by:
 *   1. Taking a window's [startTime, endTime] range
 *   2. Stepping forward by `durationMinutes` (+ optional `bufferMinutes`)
 *   3. Excluding any slot that overlaps a CONFIRMED or PENDING booking
 *   4. Excluding any slot within 15 minutes of "now"
 *
 * Overlap rule (interval logic): startA < endB AND endA > startB
 */

/**
 * @typedef {Object} TimeWindow
 * @property {Date} startTime  — window start (UTC)
 * @property {Date} endTime    — window end (UTC)
 */

/**
 * @typedef {Object} ExistingBooking
 * @property {Date} startTime  — booking start (UTC)
 * @property {Date} endTime    — booking end (UTC)
 */

/**
 * @typedef {Object} GeneratedSlot
 * @property {Date} startTime  — slot start (UTC)
 * @property {Date} endTime    — slot end (UTC)
 */

/**
 * Check if two time intervals overlap.
 * Uses half-open interval logic: startA < endB AND endA > startB
 *
 * @param {Date} startA
 * @param {Date} endA
 * @param {Date} startB
 * @param {Date} endB
 * @returns {boolean}
 */
export function intervalsOverlap(startA, endA, startB, endB) {
  return startA < endB && endA > startB;
}

/**
 * Generate available time slots from a window, excluding booked intervals.
 *
 * @param {TimeWindow} window - The availability window (UTC datetimes)
 * @param {number} durationMinutes - Slot duration in minutes
 * @param {ExistingBooking[]} bookings - Existing PENDING/CONFIRMED bookings for this mentor on this date
 * @param {Object} [options]
 * @param {number} [options.bufferMinutes=0] - Buffer between consecutive slots
 * @param {Date}   [options.now] - Current time (for filtering out past/imminent slots). Defaults to Date.now().
 * @param {number} [options.minLeadMinutes=15] - Minimum minutes from now before a slot can be booked
 * @returns {GeneratedSlot[]}
 */
export function generateSlots(window, durationMinutes, bookings, options = {}) {
  const {
    bufferMinutes = 0,
    now = new Date(),
    minLeadMinutes = 15,
  } = options;

  const slots = [];
  const windowStartMs = window.startTime.getTime();
  const windowEndMs = window.endTime.getTime();
  const durationMs = durationMinutes * 60 * 1000;
  const stepMs = (durationMinutes + bufferMinutes) * 60 * 1000;
  const cutoffMs = now.getTime() + minLeadMinutes * 60 * 1000;

  let cursorMs = windowStartMs;

  while (cursorMs + durationMs <= windowEndMs) {
    const slotStart = new Date(cursorMs);
    const slotEnd = new Date(cursorMs + durationMs);

    // Skip slots that start within minLeadMinutes of now
    if (slotStart.getTime() < cutoffMs) {
      cursorMs += stepMs;
      continue;
    }

    // Check for conflicts with existing bookings (mentor-wide, cross-service)
    const hasConflict = bookings.some((b) =>
      intervalsOverlap(slotStart, slotEnd, new Date(b.startTime), new Date(b.endTime))
    );

    if (!hasConflict) {
      slots.push({ startTime: slotStart, endTime: slotEnd });
    }

    cursorMs += stepMs;
  }

  return slots;
}
