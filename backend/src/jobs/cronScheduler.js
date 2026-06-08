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

const INTERVALS = {
  AUTO_COMPLETE: 10 * 60 * 1000,     // Every 10 minutes
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
      setInterval(() => this._checkNoShows(), INTERVALS.NO_SHOW_CHECK)
    );

    console.log('⏰ Cron jobs registered: auto-complete, no-show-check');
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
        select: { id: true },
      });

      if (sessions.length === 0) return;

      const { count } = await prisma.booking.updateMany({
        where: {
          id: { in: sessions.map((s) => s.id) },
          status: { in: ['CONFIRMED', 'IN_PROGRESS'] },
        },
        data: { status: 'COMPLETED' },
      });

      // Release earnings for auto-completed sessions
      if (count > 0) {
        for (const session of sessions) {
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
