/**
 * Meeting Service
 *
 * Generates Agora RTC tokens for video sessions.
 * Uses the booking ID as the channel name (guaranteed unique per session).
 */

import agoraToken from 'agora-token';
const { RtcTokenBuilder, RtcRole } = agoraToken;
import { prisma } from '../config/database.js';
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
   * Mark a booking as COMPLETED.
   *
   * Called when a participant leaves the meeting after the session
   * end time has passed, or when both participants have left.
   * Only transitions CONFIRMED → COMPLETED.
   *
   * @param {string} userId - Authenticated user's ID
   * @param {string} bookingId
   */
  async completeBooking(userId, bookingId) {
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        mentorProfile: { select: { userId: true } },
      },
    });

    if (!booking) {
      throw createServiceError(404, 'Booking not found');
    }

    // Must be a participant
    const isMentee = booking.menteeId === userId;
    const isMentor = booking.mentorProfile?.userId === userId;
    if (!isMentee && !isMentor) {
      throw createServiceError(403, 'Not a participant of this session');
    }

    // Only transition from CONFIRMED
    if (booking.status !== 'CONFIRMED') {
      return { message: 'Booking is already ' + booking.status, bookingId };
    }

    // Update to COMPLETED
    await prisma.booking.update({
      where: { id: bookingId },
      data: { status: 'COMPLETED' },
    });

    return { message: 'Session marked as completed', bookingId };
  }
}

export default new MeetingService();
