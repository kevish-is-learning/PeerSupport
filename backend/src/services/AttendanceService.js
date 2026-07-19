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
      const isMentor = role === 'MENTOR';
      const now = new Date();

      let attendance = await prisma.sessionAttendance.upsert({
        where: { bookingId },
        create: { bookingId },
        update: {},
      });

      const updateData = {};
      
      if (isMentor) {
        if (attendance.mentorJoinedAt) {
          updateData.mentorLeftAt = null;
          updateData.mentorReconnects = attendance.mentorReconnects + 1;
        } else {
          updateData.mentorJoinedAt = now;
        }
      } else {
        if (attendance.menteeJoinedAt) {
          updateData.menteeLeftAt = null;
          updateData.menteeReconnects = attendance.menteeReconnects + 1;
        } else {
          updateData.menteeJoinedAt = now;
        }
      }

      return await prisma.sessionAttendance.update({
        where: { bookingId },
        data: updateData,
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
      const attendance = await prisma.sessionAttendance.findUnique({
        where: { bookingId },
        include: {
          booking: {
            include: {
              mentorProfile: { select: { userId: true } }
            }
          }
        }
      });

      if (!attendance) return;

      const isMentor = attendance.booking?.mentorProfile?.userId === userId;
      const now = new Date();

      if (isMentor) {
        if (!attendance.mentorJoinedAt) return;
        const durationSecs = Math.round((now.getTime() - attendance.mentorJoinedAt.getTime()) / 1000);
        await prisma.sessionAttendance.update({
          where: { bookingId },
          data: {
            mentorLeftAt: now,
            mentorDurationSecs: durationSecs,
          }
        });
      } else {
        if (!attendance.menteeJoinedAt) return;
        const durationSecs = Math.round((now.getTime() - attendance.menteeJoinedAt.getTime()) / 1000);
        await prisma.sessionAttendance.update({
          where: { bookingId },
          data: {
            menteeLeftAt: now,
            menteeDurationSecs: durationSecs,
          }
        });
      }
    } catch (err) {
      console.error('[AttendanceService] Failed to record leave:', err.message);
    }
  }

  /**
   * Get attendance records for a booking.
   */
  async getAttendance(bookingId) {
    const attendance = await prisma.sessionAttendance.findUnique({
      where: { bookingId },
      include: {
        booking: {
          include: {
            mentee: { select: { id: true, name: true } },
            mentorProfile: { select: { user: { select: { id: true, name: true } } } }
          }
        }
      }
    });

    if (!attendance) return [];

    const results = [];
    const { booking } = attendance;

    if (attendance.mentorJoinedAt) {
      results.push({
        id: attendance.id + '_mentor',
        participantId: booking?.mentorProfile?.user?.id,
        participantName: booking?.mentorProfile?.user?.name || 'Mentor',
        role: 'MENTOR',
        joinTime: attendance.mentorJoinedAt,
        leaveTime: attendance.mentorLeftAt,
        durationMinutes: Math.round(attendance.mentorDurationSecs / 60),
        reconnectCount: attendance.mentorReconnects,
      });
    }

    if (attendance.menteeJoinedAt) {
      results.push({
        id: attendance.id + '_mentee',
        participantId: booking?.mentee?.id,
        participantName: booking?.mentee?.name || 'Mentee',
        role: 'MENTEE',
        joinTime: attendance.menteeJoinedAt,
        leaveTime: attendance.menteeLeftAt,
        durationMinutes: Math.round(attendance.menteeDurationSecs / 60),
        reconnectCount: attendance.menteeReconnects,
      });
    }

    return results;
  }

  /**
   * Check if both mentor and mentee attended a session.
   */
  async bothAttended(bookingId) {
    const attendance = await prisma.sessionAttendance.findUnique({
      where: { bookingId },
    });

    if (!attendance) return false;

    return !!(attendance.mentorJoinedAt && attendance.menteeJoinedAt);
  }

  /**
   * Persist a participant's completion signal. Completion is intentionally
   * durable so it survives restarts and works across multiple API instances.
   */
  async recordFinish(bookingId, role) {
    const attendance = await prisma.sessionAttendance.findUnique({ where: { bookingId } });
    if (!attendance) return null;
    if (role === 'MENTOR' && !attendance.mentorJoinedAt) return null;
    if (role === 'MENTEE' && !attendance.menteeJoinedAt) return null;

    return prisma.sessionAttendance.update({
      where: { bookingId },
      data: role === 'MENTOR' ? { mentorFinishedAt: new Date() } : { menteeFinishedAt: new Date() },
    });
  }

  /** Both participants must have attended for at least the configured period. */
  hasMinimumSharedAttendance(attendance, minimumMinutes = 15) {
    if (!attendance?.mentorJoinedAt || !attendance?.menteeJoinedAt) return false;
    const sharedStart = Math.max(
      attendance.mentorJoinedAt.getTime(),
      attendance.menteeJoinedAt.getTime(),
    );
    return Date.now() - sharedStart >= minimumMinutes * 60 * 1000;
  }
}

export default new AttendanceService();
