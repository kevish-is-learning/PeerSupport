/**
 * Attendance Service
 *
 * DB-backed session attendance tracking.
 * Records join/leave times, duration, and reconnection count per participant.
 */

import { prisma } from '../config/database.js';

const createServiceError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

class AttendanceService {
  /**
   * Record a participant joining a session.
   * Creates or updates the SessionAttendance record.
   *
   * @param {string} bookingId
   * @param {string} userId
   * @param {'MENTOR'|'MENTEE'} role
   */
  async recordJoin(bookingId, userId, role) {
    try {
      const existing = await prisma.sessionAttendance.findFirst({
        where: { bookingId, participantId: userId },
      });

      if (existing) {
        // Rejoin — increment reconnect count, clear leaveTime
        await prisma.sessionAttendance.update({
          where: { id: existing.id },
          data: {
            leaveTime: null,
            reconnectCount: { increment: 1 },
          },
        });
        return existing;
      }

      // First join
      return prisma.sessionAttendance.create({
        data: {
          bookingId,
          participantId: userId,
          role,
          joinTime: new Date(),
          reconnectCount: 0,
        },
      });
    } catch (err) {
      console.error('[AttendanceService] Failed to record join:', err.message);
    }
  }

  /**
   * Record a participant leaving a session.
   * Calculates total duration.
   *
   * @param {string} bookingId
   * @param {string} userId
   */
  async recordLeave(bookingId, userId) {
    try {
      const attendance = await prisma.sessionAttendance.findFirst({
        where: { bookingId, participantId: userId },
      });

      if (!attendance) return;

      const now = new Date();
      const durationMinutes = Math.round((now.getTime() - attendance.joinTime.getTime()) / 60000);

      await prisma.sessionAttendance.update({
        where: { id: attendance.id },
        data: {
          leaveTime: now,
          durationMinutes,
        },
      });
    } catch (err) {
      console.error('[AttendanceService] Failed to record leave:', err.message);
    }
  }

  /**
   * Get attendance records for a booking.
   */
  async getAttendance(bookingId) {
    const records = await prisma.sessionAttendance.findMany({
      where: { bookingId },
      include: {
        participant: {
          select: { id: true, name: true, email: true, profilePicture: true },
        },
      },
      orderBy: { joinTime: 'asc' },
    });

    return records.map((r) => ({
      id: r.id,
      participantId: r.participantId,
      participantName: r.participant?.name || 'Unknown',
      role: r.role,
      joinTime: r.joinTime,
      leaveTime: r.leaveTime,
      durationMinutes: r.durationMinutes,
      reconnectCount: r.reconnectCount,
    }));
  }

  /**
   * Check if both mentor and mentee attended a session.
   */
  async bothAttended(bookingId) {
    const records = await prisma.sessionAttendance.findMany({
      where: { bookingId },
      select: { role: true },
    });

    const roles = new Set(records.map((r) => r.role));
    return roles.has('MENTOR') && roles.has('MENTEE');
  }
}

export default new AttendanceService();
