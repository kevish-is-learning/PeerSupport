/**
 * Financial Calculator
 *
 * Pure functions for marketplace financial calculations.
 * Platform fee: 13% | Mentor earning: 87%
 *
 * All amounts are in INR (₹). Results are rounded to 2 decimal places.
 */

const PLATFORM_FEE_RATE = 0.13;
const MENTOR_EARNING_RATE = 1 - PLATFORM_FEE_RATE; // 0.87

// ─── Mentor cancellation policy ─────────────────────────────────────────────
const FREE_CANCELLATIONS_PER_YEAR = 6;
const MENTOR_PENALTY_RATE = 0.05; // 5% penalty after free quota

// ─── Mentee cancellation refund policy ──────────────────────────────────────
const MENTEE_REFUND_RATE_BEFORE_24H = 0.95;   // 95% refund if > 24h before session
const MENTEE_MENTOR_SHARE_WITHIN_24H = 0.20;  // Mentor gets 20% if < 24h
const MENTEE_PLATFORM_SHARE_WITHIN_24H = 0.05; // Platform keeps 5% if < 24h

// ─── Core Calculations ─────────────────────────────────────────────────────

/**
 * Calculate the platform fee for a given amount.
 * @param {number} amount — gross amount (what the mentee paid)
 * @returns {number} platform fee (13%)
 */
export function calculatePlatformFee(amount) {
  return round(amount * PLATFORM_FEE_RATE);
}

/**
 * Calculate the mentor's net earning from a session.
 * @param {number} amount — gross amount (what the mentee paid)
 * @returns {number} mentor earning (87%)
 */
export function calculateMentorEarning(amount) {
  return round(amount * MENTOR_EARNING_RATE);
}

/**
 * Calculate the full financial breakdown for a payment.
 * @param {number} amount — gross amount
 * @returns {{ grossAmount: number, platformFee: number, mentorEarning: number }}
 */
export function calculateBreakdown(amount) {
  const platformFee = calculatePlatformFee(amount);
  const mentorEarning = calculateMentorEarning(amount);
  return {
    grossAmount: round(amount),
    platformFee,
    mentorEarning,
  };
}

// ─── Cancellation Refund Calculations ───────────────────────────────────────

/**
 * Calculate refund breakdown when mentee cancels.
 *
 * Policy:
 *   > 24h before session: 95% refund, 5% platform keeps
 *   < 24h before session: mentor gets 20%, platform keeps 5%, remaining refunded (75%)
 *
 * @param {number} amount        — original payment amount
 * @param {Date}   sessionStart  — booking startTime
 * @param {Date}   [now]         — current time (defaults to Date.now())
 * @returns {{ menteeRefund: number, mentorShare: number, platformShare: number }}
 */
export function calculateMenteeCancellationRefund(amount, sessionStart, now = new Date()) {
  const hoursUntilSession = (new Date(sessionStart).getTime() - now.getTime()) / (1000 * 60 * 60);

  if (hoursUntilSession > 24) {
    // > 24h: 95% back to mentee, 5% platform keeps, mentor gets nothing
    const menteeRefund = round(amount * MENTEE_REFUND_RATE_BEFORE_24H);
    const platformShare = round(amount - menteeRefund);
    return { menteeRefund, mentorShare: 0, platformShare };
  }

  // < 24h: mentor gets 20%, platform keeps 5%, rest refunded
  const mentorShare = round(amount * MENTEE_MENTOR_SHARE_WITHIN_24H);
  const platformShare = round(amount * MENTEE_PLATFORM_SHARE_WITHIN_24H);
  const menteeRefund = round(amount - mentorShare - platformShare);
  return { menteeRefund, mentorShare, platformShare };
}

/**
 * Calculate refund when mentor cancels.
 * Mentee always gets a full refund.
 *
 * @param {number} amount — original payment amount
 * @returns {{ menteeRefund: number, mentorShare: number, platformShare: number }}
 */
export function calculateMentorCancellationRefund(amount) {
  return {
    menteeRefund: round(amount),
    mentorShare: 0,
    platformShare: 0,
  };
}

/**
 * Calculate mentor penalty for excessive cancellations.
 *
 * Policy: 6 free cancellations per year, then 5% penalty on the session price.
 *
 * @param {number} cancellationCount — current year cancellation count (BEFORE this cancellation)
 * @param {number} sessionAmount     — price of the cancelled session
 * @returns {{ hasPenalty: boolean, penaltyAmount: number }}
 */
export function calculateMentorPenalty(cancellationCount, sessionAmount) {
  if (cancellationCount < FREE_CANCELLATIONS_PER_YEAR) {
    return { hasPenalty: false, penaltyAmount: 0 };
  }

  const penaltyAmount = round(sessionAmount * MENTOR_PENALTY_RATE);
  return { hasPenalty: true, penaltyAmount };
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function round(value) {
  return Math.round(value * 100) / 100;
}

// ─── Exports for constants ──────────────────────────────────────────────────

export const RATES = {
  PLATFORM_FEE_RATE,
  MENTOR_EARNING_RATE,
  FREE_CANCELLATIONS_PER_YEAR,
  MENTOR_PENALTY_RATE,
};
