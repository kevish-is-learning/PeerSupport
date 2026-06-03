/**
 * Cron Scheduler
 *
 * Automates marketplace operations:
 * 1. Auto-complete sessions past endTime + 30min
 * 2. Release pending earnings after session completion (48h hold)
 * 3. Auto-mark no-shows (15min grace after startTime)
 *
 * Uses simple setInterval-based scheduling (no external cron dependency).
 */

import { prisma } from '../config/database.js';

const INTERVALS = {
  AUTO_COMPLETE: 10 * 60 * 1000,     // Every 10 minutes
  RELEASE_EARNINGS: 60 * 60 * 1000,  // Every hour
  NO_SHOW_CHECK: 5 * 60 * 1000,      // Every 5 minutes
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
      setInterval(() => this._releasePendingEarnings(), INTERVALS.RELEASE_EARNINGS)
    );

    this._timers.push(
      setInterval(() => this._checkNoShows(), INTERVALS.NO_SHOW_CHECK)
    );

    console.log('⏰ Cron jobs registered: auto-complete, release-earnings, no-show-check');
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
          status: 'CONFIRMED',
          endTime: { lt: cutoff },
        },
        select: { id: true },
      });

      if (sessions.length === 0) return;

      const { count } = await prisma.booking.updateMany({
        where: {
          id: { in: sessions.map((s) => s.id) },
          status: 'CONFIRMED',
        },
        data: { status: 'COMPLETED' },
      });

      if (count > 0) {
        console.log(`[Cron] Auto-completed ${count} session(s)`);
      }
    } catch (err) {
      console.error('[Cron] auto-complete error:', err.message);
    }
  }

  /**
   * Release pending earnings to available after 48 hours post-completion.
   */
  async _releasePendingEarnings() {
    try {
      const cutoff = new Date(Date.now() - 48 * 60 * 60 * 1000); // 48h ago

      // Find completed bookings older than 48h with unreleased earnings
      const completedBookings = await prisma.booking.findMany({
        where: {
          status: 'COMPLETED',
          updatedAt: { lt: cutoff },
        },
        include: {
          payment: {
            select: { mentorAmount: true, paymentStatus: true },
          },
        },
      });

      for (const booking of completedBookings) {
        if (!booking.payment || booking.payment.paymentStatus !== 'SUCCESS') continue;

        const mentorAmount = booking.payment.mentorAmount;
        if (!mentorAmount || mentorAmount <= 0) continue;

        const wallet = await prisma.mentorWallet.findUnique({
          where: { mentorProfileId: booking.mentorProfileId },
        });

        if (!wallet || wallet.pendingBalance < mentorAmount) continue;

        // Check if already released (avoid duplicate releases)
        const existingRelease = await prisma.walletTransaction.findFirst({
          where: {
            walletId: wallet.id,
            bookingId: booking.id,
            description: { contains: 'released' },
          },
        });

        if (existingRelease) continue;

        await prisma.$transaction([
          prisma.mentorWallet.update({
            where: { id: wallet.id },
            data: {
              pendingBalance: { decrement: mentorAmount },
              availableBalance: { increment: mentorAmount },
            },
          }),
          prisma.walletTransaction.create({
            data: {
              walletId: wallet.id,
              bookingId: booking.id,
              type: 'EARNING',
              amount: mentorAmount,
              description: 'Earnings released after session completion',
              balanceBefore: wallet.availableBalance,
              balanceAfter: wallet.availableBalance + mentorAmount,
            },
          }),
        ]);
      }
    } catch (err) {
      console.error('[Cron] release-earnings error:', err.message);
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
          attendance: null, // No attendance record at all
        },
        select: { id: true, startTime: true, endTime: true },
      });

      // Only process if endTime has also passed (don't mark in-progress sessions)
      const now = new Date();
      const pastSessions = sessions.filter((s) => s.endTime < now);

      for (const session of pastSessions) {
        // Mark as NO_SHOW_MENTEE by default (can be overridden by admin)
        await prisma.booking.update({
          where: { id: session.id },
          data: { status: 'NO_SHOW_MENTEE' },
        });
      }

      if (pastSessions.length > 0) {
        console.log(`[Cron] Marked ${pastSessions.length} session(s) as no-show`);
      }
    } catch (err) {
      console.error('[Cron] no-show-check error:', err.message);
    }
  }
}

export default new CronScheduler();
