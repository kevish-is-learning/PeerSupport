/**
 * Booking State Machine
 *
 * Defines the valid transitions for the booking lifecycle.
 * All status changes MUST go through this module to prevent invalid transitions.
 */

// ─── Valid Transitions ──────────────────────────────────────────────────────

/**
 * Map of current status → set of allowed next statuses.
 */
const TRANSITIONS = {
  PAYMENT_PENDING: new Set([
    'CONFIRMED',             // Payment success
    'CANCELLED_BY_MENTEE',   // Payment failure / timeout / mentee cancels before paying
    'CANCELLED_BY_MENTOR',   // Mentor cancels before payment is completed
  ]),

  CONFIRMED: new Set([
    'IN_PROGRESS',           // Session starting (5 min before startTime)
    'RESCHEDULE_REQUESTED',  // Either party requests reschedule
    'CANCELLED_BY_MENTOR',   // Mentor cancels
    'CANCELLED_BY_MENTEE',   // Mentee cancels
  ]),

  IN_PROGRESS: new Set([
    'COMPLETED',             // Session ended normally
    'NO_SHOW_MENTOR',        // Mentor didn't show up
    'NO_SHOW_MENTEE',        // Mentee didn't show up
  ]),

  RESCHEDULE_REQUESTED: new Set([
    'RESCHEDULE_ACCEPTED',   // Other party accepts
    'RESCHEDULE_REJECTED',   // Other party rejects
    'CONFIRMED',             // Auto-revert on expiry (24h timeout)
  ]),

  // Terminal states — no further transitions allowed
  COMPLETED: new Set(),
  RESCHEDULE_ACCEPTED: new Set(),
  RESCHEDULE_REJECTED: new Set(),
  CANCELLED_BY_MENTOR: new Set([
    'REFUND_INITIATED',      // Refund processing started
  ]),
  CANCELLED_BY_MENTEE: new Set([
    'REFUND_INITIATED',      // Refund processing started
  ]),
  NO_SHOW_MENTOR: new Set([
    'REFUND_INITIATED',      // Full refund to mentee
  ]),
  NO_SHOW_MENTEE: new Set(),  // No refund — mentee's fault
  REFUND_INITIATED: new Set([
    'REFUND_COMPLETED',      // Refund processed
  ]),
  REFUND_COMPLETED: new Set(),
};

// ─── Status Categories ──────────────────────────────────────────────────────

/** Statuses that mean a booking is "active" and blocks the slot */
export const ACTIVE_STATUSES = [
  'PAYMENT_PENDING',
  'CONFIRMED',
  'IN_PROGRESS',
  'RESCHEDULE_REQUESTED',
];

/** Statuses that mean the booking is cancelled (any variant) */
export const CANCELLED_STATUSES = [
  'CANCELLED_BY_MENTOR',
  'CANCELLED_BY_MENTEE',
];

/** Statuses that are terminal — no further transitions */
export const TERMINAL_STATUSES = [
  'COMPLETED',
  'RESCHEDULE_ACCEPTED',
  'RESCHEDULE_REJECTED',
  'CANCELLED_BY_MENTOR',
  'CANCELLED_BY_MENTEE',
  'NO_SHOW_MENTOR',
  'NO_SHOW_MENTEE',
  'REFUND_COMPLETED',
];

/** Statuses that mean the booking slot should be released */
export const SLOT_RELEASE_STATUSES = [
  'CANCELLED_BY_MENTOR',
  'CANCELLED_BY_MENTEE',
  'NO_SHOW_MENTOR',
  'NO_SHOW_MENTEE',
  'REFUND_INITIATED',
  'REFUND_COMPLETED',
  'RESCHEDULE_ACCEPTED',
];

// ─── Transition Functions ───────────────────────────────────────────────────

/**
 * Check if a transition from `fromStatus` to `toStatus` is valid.
 *
 * @param {string} fromStatus - Current booking status
 * @param {string} toStatus   - Desired booking status
 * @returns {boolean}
 */
export function canTransition(fromStatus, toStatus) {
  const allowed = TRANSITIONS[fromStatus];
  if (!allowed) return false;
  return allowed.has(toStatus);
}

/**
 * Assert that a transition is valid. Throws if not.
 *
 * @param {string} fromStatus - Current booking status
 * @param {string} toStatus   - Desired booking status
 * @throws {Error} with statusCode 400 if transition is invalid
 */
export function assertTransition(fromStatus, toStatus) {
  if (!canTransition(fromStatus, toStatus)) {
    const error = new Error(
      `Invalid booking transition: ${fromStatus} → ${toStatus}`
    );
    error.statusCode = 400;
    throw error;
  }
}

/**
 * Check if a booking status is considered "active" (blocks the slot).
 *
 * @param {string} status
 * @returns {boolean}
 */
export function isActiveStatus(status) {
  return ACTIVE_STATUSES.includes(status);
}

/**
 * Check if a booking status is terminal (no more transitions allowed).
 *
 * @param {string} status
 * @returns {boolean}
 */
export function isTerminalStatus(status) {
  return TERMINAL_STATUSES.includes(status);
}

/**
 * Check if a booking status means the slot should be released.
 *
 * @param {string} status
 * @returns {boolean}
 */
export function shouldReleaseSlot(status) {
  return SLOT_RELEASE_STATUSES.includes(status);
}

/**
 * Get all valid next statuses from a given status.
 *
 * @param {string} status
 * @returns {string[]}
 */
export function getNextStatuses(status) {
  const allowed = TRANSITIONS[status];
  return allowed ? [...allowed] : [];
}
