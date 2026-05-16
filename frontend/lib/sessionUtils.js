/**
 * Check if a session's Join button should be enabled.
 * The button is enabled only within 5 minutes before the start time
 * through the end of the session.
 *
 * @param {string|Date} startTime - session start time
 * @param {string|Date} endTime   - session end time (optional, defaults to startTime + 60min)
 * @returns {boolean}
 */
export function canJoinSession(startTime, endTime) {
  const now = new Date();
  const start = new Date(startTime);
  const end = endTime ? new Date(endTime) : new Date(start.getTime() + 60 * 60 * 1000);

  const fiveMinBefore = new Date(start.getTime() - 5 * 60 * 1000);

  return now >= fiveMinBefore && now <= end;
}

/**
 * Returns a human-readable label for why the join button is disabled.
 *
 * @param {string|Date} startTime
 * @returns {string}
 */
export function joinDisabledReason(startTime) {
  const now = new Date();
  const start = new Date(startTime);
  const diff = start.getTime() - now.getTime();

  if (diff <= 0) return "Session has started";

  const mins = Math.ceil(diff / 60000);
  if (mins < 60) return `Opens in ${mins} min`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `Opens in ${hours}h ${mins % 60}m`;
  const days = Math.floor(hours / 24);
  return `Opens in ${days}d`;
}

