/**
 * Meeting Service
 *
 * Generates Agora RTC tokens for video sessions.
 * Uses the booking ID as the channel name (guaranteed unique per session).
 */

import agoraToken from 'agora-token';
const { RtcTokenBuilder, RtcRole } = agoraToken;
import { prisma } from '../config/database.js';
import emailService from '../services/EmailService.js';
import attendanceService from '../services/AttendanceService.js';
import crypto from 'crypto';

const AGORA_APP_ID = process.env.AGORA_APP_ID;
const AGORA_APP_CERTIFICATE = process.env.AGORA_APP_CERTIFICATE;

const createServiceError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

/**
 * Convert a UUID/string userId into a 32-bit unsigned int for Agora UID.
 * Agora requires numeric UIDs when using token auth.
 */
function userIdToUid(userId) {
  const hash = crypto.createHash('md5').update(userId).digest();
  // Read first 4 bytes as unsigned 32-bit integer
  return hash.readUInt32BE(0);
}

class MeetingService {
  constructor() {
    // In-memory tracker: bookingId → Set<'mentor'|'mentee'>
    // Tracks which participants have signalled "finish"
    this._finishTracker = new Map();
  }

  /**
   * Generate an Agora RTC token for a booking session.
   *
   * Validates:
   * - User is mentor or mentee of this booking
   * - Booking is CONFIRMED
   * - Current time is within the join window (startTime - 15min to endTime + 30min)
   *
   * @param {string} userId - Authenticated user's ID
   * @param {string} bookingId - Booking ID (doubles as channel name)
   * @returns {{ appId, channel, token, uid, booking }}
   */
  async getToken(userId, bookingId) {
    if (!AGORA_APP_ID || !AGORA_APP_CERTIFICATE) {
      throw createServiceError(500, 'Agora credentials not configured');
    }

    // Fetch booking with participants
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        mentee: { select: { id: true, name: true, profilePicture: true } },
        mentorProfile: {
          include: {
            user: { select: { id: true, name: true, profilePicture: true } },
          },
        },
        mentorService: {
          select: { title: true, durationMinutes: true },
        },
      },
    });

    if (!booking) {
      throw createServiceError(404, 'Booking not found');
    }

    // Authorization: must be mentee or mentor of this booking
    const isMentee = booking.menteeId === userId;
    const isMentor = booking.mentorProfile?.userId === userId;

    if (!isMentee && !isMentor) {
      throw createServiceError(403, 'You are not a participant of this session');
    }

    // Booking must be confirmed
    if (booking.status !== 'CONFIRMED') {
      throw createServiceError(400, `Cannot join session — booking status is ${booking.status}`);
    }

    // Time window validation: startTime - 5min to endTime + 30min
    const now = new Date();
    const joinWindowStart = new Date(booking.startTime.getTime() - 5 * 60 * 1000);
    const joinWindowEnd = new Date(booking.endTime.getTime() + 30 * 60 * 1000);

    if (now < joinWindowStart) {
      const minsUntilOpen = Math.ceil((joinWindowStart.getTime() - now.getTime()) / 60000);
      throw createServiceError(400, `Meeting room opens in ${minsUntilOpen} minutes`);
    }

    if (now > joinWindowEnd) {
      throw createServiceError(400, 'Meeting window has expired');
    }

    // Generate token
    const uid = userIdToUid(userId);
    const channel = bookingId;
    const role = RtcRole.PUBLISHER;

    // Token expires at endTime + 30 min
    const privilegeExpireTime = Math.floor(joinWindowEnd.getTime() / 1000);

    const token = RtcTokenBuilder.buildTokenWithUid(
      AGORA_APP_ID,
      AGORA_APP_CERTIFICATE,
      channel,
      uid,
      role,
      privilegeExpireTime,
      privilegeExpireTime
    );

    // Record attendance (fire-and-forget)
    const attendanceRole = isMentor ? 'MENTOR' : 'MENTEE';
    attendanceService.recordJoin(bookingId, userId, attendanceRole).then(async () => {
      // Check if both participants have joined → transition to IN_PROGRESS
      if (booking.status === 'CONFIRMED') {
        const bothJoined = await attendanceService.bothAttended(bookingId);
        if (bothJoined) {
          await prisma.booking.update({
            where: { id: bookingId },
            data: { status: 'IN_PROGRESS' },
          }).catch(() => {});
        }
      }
    }).catch(() => {});

    return {
      appId: AGORA_APP_ID,
      channel,
      token,
      uid,
      role: isMentor ? 'mentor' : 'mentee',
      booking: {
        id: booking.id,
        startTime: booking.startTime,
        endTime: booking.endTime,
        serviceName: booking.mentorService?.title || 'Session',
        durationMinutes: booking.mentorService?.durationMinutes || 30,
        mentor: {
          name: booking.mentorProfile?.user?.name,
          profilePicture: booking.mentorProfile?.user?.profilePicture,
        },
        mentee: {
          name: booking.mentee?.name,
          profilePicture: booking.mentee?.profilePicture,
        },
      },
    };
  }

  /**
   * Signal that a participant has finished the meeting.
   *
   * Uses an in-memory tracker so each participant can independently
   * signal "I'm done". The booking transitions to COMPLETED when:
   *   - Both mentor and mentee have finished, OR
   *   - The caller finishes and endTime has already passed
   *
   * @param {string} userId - Authenticated user's ID
   * @param {string} bookingId
   * @returns {{ completed: boolean, message: string }}
   */
  async finishMeeting(userId, bookingId) {
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        mentorProfile: {
          include: {
            user: { select: { id: true, name: true, email: true } },
          },
        },
        mentee: { select: { id: true, name: true, email: true } },
        mentorService: { select: { title: true } },
      },
    });

    if (!booking) {
      throw createServiceError(404, 'Booking not found');
    }

    // Must be a participant
    const isMentee = booking.menteeId === userId;
    const isMentor = booking.mentorProfile?.user?.id === userId;
    if (!isMentee && !isMentor) {
      throw createServiceError(403, 'Not a participant of this session');
    }

    // Already completed
    if (booking.status === 'COMPLETED') {
      return { completed: true, message: 'Session is already completed' };
    }

    // Only works on CONFIRMED bookings
    if (booking.status !== 'CONFIRMED') {
      return { completed: false, message: `Booking status is ${booking.status}` };
    }

    // Track who has finished
    if (!this._finishTracker.has(bookingId)) {
      this._finishTracker.set(bookingId, new Set());
    }
    const finished = this._finishTracker.get(bookingId);
    const role = isMentor ? 'mentor' : 'mentee';
    finished.add(role);

    // Determine if we should mark as completed
    const bothFinished = finished.has('mentor') && finished.has('mentee');
    const isPastEnd = new Date() >= new Date(booking.endTime);

    if (bothFinished || isPastEnd) {
      // Mark as COMPLETED
      await prisma.booking.update({
        where: { id: bookingId },
        data: { status: 'COMPLETED' },
      });
      // Record leave for this participant
      await attendanceService.recordLeave(bookingId, userId);
      // Cleanup tracker
      this._finishTracker.delete(bookingId);

      // Fire-and-forget: send session completed emails to both parties
      const menteeEmail = booking.mentee?.email;
      const mentorEmail = booking.mentorProfile?.user?.email;
      if (menteeEmail || mentorEmail) {
        emailService.sendSessionCompletedEmails({
          menteeEmail,
          menteeName: booking.mentee?.name || 'Mentee',
          mentorEmail,
          mentorName: booking.mentorProfile?.user?.name || 'Mentor',
          serviceName: booking.mentorService?.title || 'Mentoring Session',
          startTime: booking.startTime,
          bookingId: booking.id,
        });
      }

      return { completed: true, message: 'Session marked as completed' };
    }

    // Only one participant finished so far
    return {
      completed: false,
      message: `You have finished. Waiting for the ${role === 'mentor' ? 'mentee' : 'mentor'} to finish.`,
    };
  }
}

export default new MeetingService();

