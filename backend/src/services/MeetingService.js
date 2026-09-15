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
import feedbackService from '../services/FeedbackService.js';
import groupSessionService from '../services/GroupSessionService.js';
import walletService from '../services/WalletService.js';
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

    // Booking must be confirmed or in progress
    if (booking.status !== 'CONFIRMED' && booking.status !== 'IN_PROGRESS') {
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
   * Agora token for a webinar or group-discussion room.
   *
   * Group rooms are many-to-many and have no attendance ledger, so this only
   * checks that the caller is the host or a confirmed registrant, then opens
   * the room from 15 minutes before the start until 30 minutes after the end.
   *
   * @param {string} userId
   * @param {{ webinarId?: string, groupDiscussionId?: string }} target
   */
  async getGroupRoomToken(userId, target) {
    if (!AGORA_APP_ID || !AGORA_APP_CERTIFICATE) {
      throw createServiceError(500, 'Agora credentials not configured');
    }

    const room = await groupSessionService.authorizeRoomAccess(userId, target);

    const now = new Date();
    const opensAt = new Date(new Date(room.startsAt).getTime() - 15 * 60 * 1000);
    const closesAt = new Date(new Date(room.endsAt).getTime() + 30 * 60 * 1000);

    if (now < opensAt) {
      const minsUntilOpen = Math.ceil((opensAt.getTime() - now.getTime()) / 60000);
      throw createServiceError(400, `This room opens in ${minsUntilOpen} minutes`);
    }
    if (now > closesAt) {
      throw createServiceError(400, 'This session has ended');
    }

    const uid = userIdToUid(userId);
    const privilegeExpireTime = Math.floor(closesAt.getTime() / 1000);

    const token = RtcTokenBuilder.buildTokenWithUid(
      AGORA_APP_ID,
      AGORA_APP_CERTIFICATE,
      room.roomId,
      uid,
      RtcRole.PUBLISHER,
      privilegeExpireTime,
      privilegeExpireTime
    );

    return {
      appId: AGORA_APP_ID,
      channel: room.roomId,
      token,
      uid,
      isHost: room.isHost,
      title: room.title,
      startsAt: room.startsAt,
      endsAt: room.endsAt,
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

    // Only works on CONFIRMED or IN_PROGRESS bookings
    if (booking.status !== 'CONFIRMED' && booking.status !== 'IN_PROGRESS') {
      return { completed: false, message: `Booking status is ${booking.status}` };
    }

    if (new Date() < new Date(booking.startTime)) {
      throw createServiceError(400, 'A session cannot be completed before its scheduled start time');
    }

    // Feedback is the mentor's deliverable for the session, so they cannot sign
    // off until it exists. The mentee is unaffected, and the auto-complete cron
    // still closes the booking later, so an unwritten form never strands a payout.
    if (isMentor && !(await feedbackService.hasFeedback(bookingId))) {
      throw createServiceError(
        400,
        'Submit your session feedback before marking this session complete'
      );
    }

    // Completion requires durable proof that both participants joined. This
    // prevents two clients from immediately completing a paid booking.
    const role = isMentor ? 'mentor' : 'mentee';
    const attendance = await attendanceService.recordFinish(bookingId, isMentor ? 'MENTOR' : 'MENTEE');
    if (!attendance) {
      throw createServiceError(400, 'Join the meeting before marking it finished');
    }

    // Determine if we should mark as completed
    const bothFinished = Boolean(attendance.mentorFinishedAt && attendance.menteeFinishedAt);
    const minimumDurationMet = attendanceService.hasMinimumSharedAttendance(attendance);
    const isPastEnd = new Date() >= new Date(booking.endTime);

    if ((bothFinished && minimumDurationMet) || (isPastEnd && minimumDurationMet)) {
      // Mark as COMPLETED
      await prisma.booking.update({
        where: { id: bookingId },
        data: { status: 'COMPLETED' },
      });
      // Record leave for this participant
      await attendanceService.recordLeave(bookingId, userId);
      // Instantly release mentor's pending funds to available
      await walletService.releaseEarningsForCompletedBooking(bookingId);

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
      message: !minimumDurationMet
        ? 'Both participants must attend for at least 15 minutes before completion.'
        : `You have finished. Waiting for the ${role === 'mentor' ? 'mentee' : 'mentor'} to finish.`,
    };
  }
}

export default new MeetingService();
