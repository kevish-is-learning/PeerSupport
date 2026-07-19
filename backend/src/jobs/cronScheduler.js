/**
 * Cron Scheduler
 *
 * Automates marketplace operations:
 * 1. Auto-complete sessions past endTime + 30min
 * 2. Auto-mark no-shows (15min grace after startTime)
 *
 * Uses simple setInterval-based scheduling (no external cron dependency).
 */

import { prisma } from '../config/database.js';
import walletService from '../services/WalletService.js';
import { emitSlotUpdate } from '../config/socket.js';
import { utcToIst } from '../utils/timezoneUtils.js';

const INTERVALS = {
  AUTO_COMPLETE: 10 * 60 * 1000,     // Every 10 minutes
  NO_SHOW_CHECK: 5 * 60 * 1000,      // Every 5 minutes
  PAYMENT_EXPIRY: 5 * 60 * 1000,     // Every 5 minutes
};

class CronScheduler {
  constructor() {
    this._timers = [];
  }

  /**
   * Start all cron jobs.
   */
  start() {
    console.log('⏰ Starting cron scheduler...');

    this._timers.push(
      setInterval(() => this._autoCompleteSessions(), INTERVALS.AUTO_COMPLETE)
    );

    this._timers.push(
      setInterval(() => this._checkNoShows(), INTERVALS.NO_SHOW_CHECK)
    );

    this._timers.push(
      setInterval(() => this._expirePendingPayments(), INTERVALS.PAYMENT_EXPIRY)
    );

    console.log('⏰ Cron jobs registered: auto-complete, no-show-check, payment-expiry');
  }

  /**
   * Stop all cron jobs.
   */
  stop() {
    for (const timer of this._timers) {
      clearInterval(timer);
    }
    this._timers = [];
    console.log('⏰ Cron scheduler stopped');
  }

  /**
   * Auto-complete CONFIRMED sessions where endTime + 30min has passed.
   */
  async _autoCompleteSessions() {
    try {
      const cutoff = new Date(Date.now() - 30 * 60 * 1000); // 30 min ago

      const sessions = await prisma.booking.findMany({
        where: {
          status: { in: ['CONFIRMED', 'IN_PROGRESS'] },
          endTime: { lt: cutoff },
        },
        include: { attendance: true },
      });

      if (sessions.length === 0) return;

      // Never pay a mentor for an unattended or one-sided session. Both users
      // must have joined and shared at least 15 minutes of the call.
      const eligible = sessions.filter((session) => {
        const attendance = session.attendance;
        if (!attendance?.mentorJoinedAt || !attendance?.menteeJoinedAt) return false;
        const sharedStart = Math.max(attendance.mentorJoinedAt.getTime(), attendance.menteeJoinedAt.getTime());
        return session.endTime.getTime() - sharedStart >= 15 * 60 * 1000;
      });

      let count = 0;
      for (const session of eligible) {
        const updated = await prisma.booking.updateMany({
          where: { id: session.id, status: { in: ['CONFIRMED', 'IN_PROGRESS'] } },
          data: { status: 'COMPLETED' },
        });
        if (updated.count) {
          count += 1;
          await walletService.releaseEarningsForCompletedBooking(session.id);
        }
      }

      if (count > 0) {
        console.log(`[Cron] Auto-completed ${count} session(s)`);
      }
    } catch (err) {
      console.error('[Cron] auto-complete error:', err.message);
    }
  }

  /**
   * Check for no-shows: CONFIRMED sessions where startTime + 15min has passed
   * and no attendance record exists.
   */
  async _checkNoShows() {
    try {
      const cutoff = new Date(Date.now() - 15 * 60 * 1000); // 15 min ago

      const sessions = await prisma.booking.findMany({
        where: {
          status: { in: ['CONFIRMED', 'IN_PROGRESS'] },
          startTime: { lt: cutoff },
        },
        include: { attendance: true },
      });

      // Only process if endTime has also passed (don't mark in-progress sessions)
      const now = new Date();
      const pastSessions = sessions.filter((s) => s.endTime < now);

      for (const session of pastSessions) {
        const attendance = session.attendance;
        const mentorJoined = Boolean(attendance?.mentorJoinedAt);
        const menteeJoined = Boolean(attendance?.menteeJoinedAt);
        if (mentorJoined && menteeJoined) continue;

        // When both are absent the existing business policy treats it as a
        // mentee no-show. If only one attended, assign the no-show accurately.
        const status = menteeJoined && !mentorJoined ? 'NO_SHOW_MENTOR' : 'NO_SHOW_MENTEE';
        await prisma.booking.updateMany({
          where: { id: session.id, status: { in: ['CONFIRMED', 'IN_PROGRESS'] } },
          data: { status },
        });
      }

      if (pastSessions.length > 0) {
        console.log(`[Cron] Marked ${pastSessions.length} session(s) as no-show`);
      }
    } catch (err) {
      console.error('[Cron] no-show-check error:', err.message);
    }
  }

  /** Release abandoned checkout holds so a single unfinished payment cannot block a slot indefinitely. */
  async _expirePendingPayments() {
    try {
      const cutoff = new Date(Date.now() - 15 * 60 * 1000);
      const stale = await prisma.booking.findMany({
        where: {
          status: 'PAYMENT_PENDING',
          createdAt: { lt: cutoff },
          payment: { paymentStatus: 'PENDING' },
        },
        select: { id: true, mentorProfileId: true, mentorServiceId: true, startTime: true, endTime: true, payment: { select: { id: true } } },
      });

      for (const booking of stale) {
        const updated = await prisma.$transaction(async (tx) => {
          const bookingResult = await tx.booking.updateMany({
            where: { id: booking.id, status: 'PAYMENT_PENDING' },
            data: { status: 'CANCELLED_BY_MENTEE' },
          });
          if (!bookingResult.count) return false;
          const paymentResult = await tx.payment.updateMany({
            where: { id: booking.payment.id, paymentStatus: 'PENDING' },
            data: { paymentStatus: 'FAILED' },
          });
          if (!paymentResult.count) throw new Error('Payment was processed while expiring checkout');
          return true;
        }, { isolationLevel: 'Serializable' });

        if (updated) {
          emitSlotUpdate(booking.mentorProfileId, {
            startTime: utcToIst(booking.startTime),
            endTime: utcToIst(booking.endTime),
            serviceId: booking.mentorServiceId,
            action: 'released',
          });
        }
      }
    } catch (err) {
      console.error('[Cron] payment expiry error:', err.message);
    }
  }
}

export default new CronScheduler();
