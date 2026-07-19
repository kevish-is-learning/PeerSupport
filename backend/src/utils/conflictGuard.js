/**
 * Conflict Guard Utility
 *
 * Uses a PostgreSQL transaction with raw SQL `SELECT ... FOR UPDATE`
 * to prevent double-booking. The lock is held on all overlapping booking
 * rows for the mentor during the requested time interval.
 *
 * This is mentor-wide (cross-service): a mentor cannot have two bookings
 * that overlap in time, regardless of the service.
 */

import { prisma } from '../config/database.js';

/**
 * Acquire a row-level lock on overlapping bookings and check for conflicts.
 *
 * @param {import('@prisma/client').Prisma.TransactionClient} tx - Prisma transaction client
 * @param {string} mentorProfileId
 * @param {Date} startTime - Proposed booking start (UTC)
 * @param {Date} endTime   - Proposed booking end (UTC)
 * @param {string} [excludeBookingId] - Booking ID to exclude (for reschedule)
 * @returns {Promise<Array>} Array of conflicting bookings (empty if no conflict)
 */
export async function checkConflictWithLock(tx, mentorProfileId, startTime, endTime, excludeBookingId = null) {
  // Raw SQL for SELECT FOR UPDATE — Prisma doesn't support this natively.
  // Overlap logic: booking.startTime < proposedEnd AND booking.endTime > proposedStart
  // Only PAYMENT_PENDING, CONFIRMED, IN_PROGRESS, and RESCHEDULE_REQUESTED bookings block.

  if (excludeBookingId) {
    // Use parameterized query with 4 params to avoid SQL injection
    const conflicts = await tx.$queryRawUnsafe(`
      SELECT b.id, b."startTime", b."endTime", b.status, b."mentorServiceId"
      FROM "Booking" b
      WHERE b."mentorProfileId" = $1
        AND b.status IN ('PAYMENT_PENDING', 'CONFIRMED', 'IN_PROGRESS', 'RESCHEDULE_REQUESTED')
        AND b."startTime" < $2
        AND b."endTime" > $3
        AND b.id != $4
      FOR UPDATE
    `, mentorProfileId, endTime, startTime, excludeBookingId);

    return conflicts;
  }

  const conflicts = await tx.$queryRawUnsafe(`
    SELECT b.id, b."startTime", b."endTime", b.status, b."mentorServiceId"
    FROM "Booking" b
    WHERE b."mentorProfileId" = $1
      AND b.status IN ('PAYMENT_PENDING', 'CONFIRMED', 'IN_PROGRESS', 'RESCHEDULE_REQUESTED')
      AND b."startTime" < $2
      AND b."endTime" > $3
    FOR UPDATE
  `, mentorProfileId, endTime, startTime);

  return conflicts;
}

/**
 * Create a booking with conflict guard.
 *
 * Wraps the entire operation in a serializable transaction:
 * 1. SELECT FOR UPDATE on overlapping bookings
 * 2. If conflicts exist → throw 409
 * 3. If clear → INSERT booking with PAYMENT_PENDING status
 *
 * @param {Object} params
 * @param {string} params.menteeId
 * @param {string} params.mentorProfileId
 * @param {string} params.mentorServiceId
 * @param {Date}   params.startTime
 * @param {Date}   params.endTime
 * @param {string} [params.purposeOfCall]
 * @param {string} [params.notes]
 * @param {string} [params.menteePhone]
 * @param {string} [params.menteeEmail]
 * @param {string} [params.discussionTopic]
 * @param {string} [params.specificQuestions]
 * @returns {Promise<Object>} The created booking
 */
export async function createBookingWithGuard(params) {
  const {
    menteeId,
    mentorProfileId,
    mentorServiceId,
    startTime,
    endTime,
    purposeOfCall,
    notes,
    menteePhone,
    menteeEmail,
    discussionTopic,
    specificQuestions,
  } = params;

  return prisma.$transaction(async (tx) => {
    // 1. Lock and check for conflicts
    const conflicts = await checkConflictWithLock(tx, mentorProfileId, startTime, endTime);

    if (conflicts.length > 0) {
      const err = new Error('Time slot conflict: this time range overlaps with an existing booking');
      err.statusCode = 409;
      err.conflicts = conflicts.map((c) => ({
        bookingId: c.id,
        startTime: c.startTime,
        endTime: c.endTime,
        status: c.status,
      }));
      throw err;
    }

    // 2. Create the booking
    const booking = await tx.booking.create({
      data: {
        menteeId,
        mentorProfileId,
        mentorServiceId,
        startTime,
        endTime,
        status: 'PAYMENT_PENDING',
        purposeOfCall,
        notes,
        menteePhone,
        menteeEmail,
        discussionTopic,
        specificQuestions,
      },
    });

    return booking;
  }, { isolationLevel: 'Serializable' });
}

/**
 * Reschedule a booking atomically with conflict guard.
 *
 * @param {string} bookingId - The booking to reschedule
 * @param {Date} newStartTime
 * @param {Date} newEndTime
 * @returns {Promise<Object>} The updated booking
 */
export async function rescheduleBookingWithGuard(bookingId, newStartTime, newEndTime) {
  return prisma.$transaction(async (tx) => {
    // 1. Fetch the existing booking
    const existing = await tx.booking.findUnique({
      where: { id: bookingId },
    });

    if (!existing) {
      const err = new Error('Booking not found');
      err.statusCode = 404;
      throw err;
    }

    if (!['PAYMENT_PENDING', 'CONFIRMED'].includes(existing.status)) {
      const err = new Error(`Cannot reschedule a booking with status: ${existing.status}`);
      err.statusCode = 400;
      throw err;
    }

    // 2. Lock and check for conflicts (excluding this booking itself)
    const conflicts = await checkConflictWithLock(
      tx,
      existing.mentorProfileId,
      newStartTime,
      newEndTime,
      bookingId
    );

    if (conflicts.length > 0) {
      const err = new Error('New time slot conflicts with an existing booking');
      err.statusCode = 409;
      err.conflicts = conflicts.map((c) => ({
        bookingId: c.id,
        startTime: c.startTime,
        endTime: c.endTime,
        status: c.status,
      }));
      throw err;
    }

    // 3. Update the booking atomically
    const updated = await tx.booking.update({
      where: { id: bookingId },
      data: {
        startTime: newStartTime,
        endTime: newEndTime,
      },
    });

    return updated;
  }, { isolationLevel: 'Serializable' });
}
