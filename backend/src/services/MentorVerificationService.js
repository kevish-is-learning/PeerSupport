/**
 * Mentor Verification Service
 *
 * Handles all business logic for scheduling, rescheduling, cancelling,
 * and completing verification calls between admin and mentor applicants.
 *
 * Integrates with GoogleCalendarService for event management and
 * sends calendar invites automatically through Google Calendar API.
 */

import { prisma } from '../config/database.js';
import googleCalendarService from './GoogleCalendarService.js';

const createServiceError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const callInclude = {
  mentorProfile: {
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          profilePicture: true,
        },
      },
    },
  },
  scheduledBy: {
    select: {
      id: true,
      name: true,
      email: true,
    },
  },
};

class MentorVerificationService {
  /**
   * Schedule a new verification call.
   *
   * @param {Object} params
   * @param {string} params.mentorProfileId
   * @param {string} params.scheduledById — admin user ID
   * @param {string} params.startsAt     — ISO datetime
   * @param {number} params.durationMinutes — default 15
   * @param {string} [params.notes]
   */
  async scheduleCall({ mentorProfileId, scheduledById, startsAt, durationMinutes = 15, notes }) {
    // 1. Validate mentor exists and is in a valid state
    const mentorProfile = await prisma.mentorProfile.findUnique({
      where: { id: mentorProfileId },
      include: {
        user: { select: { email: true, name: true } },
      },
    });

    if (!mentorProfile) {
      throw createServiceError(404, 'Mentor profile not found');
    }

    if (mentorProfile.approvalStatus === 'APPROVED') {
      throw createServiceError(400, 'Mentor is already approved — verification call not needed');
    }

    // 2. Validate start time is in the future
    const startDate = new Date(startsAt);
    if (startDate <= new Date()) {
      throw createServiceError(400, 'Start time must be in the future');
    }

    // 3. Calculate end time
    if (durationMinutes <= 0) {
      throw createServiceError(400, 'Duration must be greater than 0');
    }
    const endDate = new Date(startDate.getTime() + durationMinutes * 60 * 1000);

    // 4. Check for overlapping SCHEDULED calls for this mentor
    const overlapping = await prisma.mentorVerificationCall.findFirst({
      where: {
        mentorProfileId,
        status: 'SCHEDULED',
        OR: [
          {
            startsAt: { lt: endDate },
            endsAt: { gt: startDate },
          },
        ],
      },
    });

    if (overlapping) {
      throw createServiceError(
        409,
        `Mentor already has a scheduled verification call from ${overlapping.startsAt.toISOString()} to ${overlapping.endsAt.toISOString()}`
      );
    }

    // 5. Get admin details
    const admin = await prisma.user.findUnique({
      where: { id: scheduledById },
      select: { email: true, name: true },
    });

    // 6. Create Google Calendar event
    const mentorEmail = mentorProfile.user?.email;
    const adminEmail = admin?.email;
    const mentorName = mentorProfile.user?.name || 'Mentor';

    let googleEventData = null;
    try {
      googleEventData = await googleCalendarService.createEvent({
        summary: `PeerSupport Verification Call — ${mentorName}`,
        description: [
          `Mentor Verification Call with ${mentorName}`,
          `Mentor Email: ${mentorEmail}`,
          notes ? `\nNotes: ${notes}` : '',
          '\nThis is a verification call scheduled by the PeerSupport admin team.',
        ].filter(Boolean).join('\n'),
        startTime: startDate,
        endTime: endDate,
        attendees: [mentorEmail, adminEmail].filter(Boolean),
      });
    } catch (err) {
      console.error('Google Calendar event creation failed:', err.message);
      // Continue without Google Calendar — the call record is still created
    }

    // 7. Create database record
    const call = await prisma.mentorVerificationCall.create({
      data: {
        mentorProfileId,
        scheduledById,
        googleEventId: googleEventData?.eventId || null,
        meetingLink: googleEventData?.meetLink || null,
        startsAt: startDate,
        endsAt: endDate,
        notes: notes || null,
        status: 'SCHEDULED',
      },
      include: callInclude,
    });

    return this._mapCall(call);
  }

  /**
   * Reschedule an existing verification call.
   * Marks the old call as RESCHEDULED and creates a new SCHEDULED record.
   *
   * @param {Object} params
   * @param {string} params.callId
   * @param {string} params.startsAt — new ISO datetime
   * @param {number} params.durationMinutes
   * @param {string} [params.notes]
   */
  async rescheduleCall({ callId, startsAt, durationMinutes = 15, notes }) {
    // 1. Find existing call
    const existingCall = await prisma.mentorVerificationCall.findUnique({
      where: { id: callId },
      include: {
        mentorProfile: {
          include: { user: { select: { email: true, name: true } } },
        },
        scheduledBy: { select: { email: true, name: true } },
      },
    });

    if (!existingCall) {
      throw createServiceError(404, 'Verification call not found');
    }

    if (existingCall.status !== 'SCHEDULED') {
      throw createServiceError(400, `Cannot reschedule a call with status: ${existingCall.status}`);
    }

    // 2. Validate new time
    const startDate = new Date(startsAt);
    if (startDate <= new Date()) {
      throw createServiceError(400, 'New start time must be in the future');
    }

    if (durationMinutes <= 0) {
      throw createServiceError(400, 'Duration must be greater than 0');
    }
    const endDate = new Date(startDate.getTime() + durationMinutes * 60 * 1000);

    // 3. Check overlap (exclude the call being rescheduled)
    const overlapping = await prisma.mentorVerificationCall.findFirst({
      where: {
        mentorProfileId: existingCall.mentorProfileId,
        status: 'SCHEDULED',
        id: { not: callId },
        OR: [
          {
            startsAt: { lt: endDate },
            endsAt: { gt: startDate },
          },
        ],
      },
    });

    if (overlapping) {
      throw createServiceError(409, 'Mentor already has another overlapping scheduled call');
    }

    // 4. Update Google Calendar event (if one exists)
    const mentorName = existingCall.mentorProfile?.user?.name || 'Mentor';
    let googleEventData = null;

    if (existingCall.googleEventId) {
      try {
        googleEventData = await googleCalendarService.updateEvent(existingCall.googleEventId, {
          summary: `PeerSupport Verification Call — ${mentorName} (Rescheduled)`,
          description: [
            `Rescheduled Mentor Verification Call with ${mentorName}`,
            notes ? `\nNotes: ${notes}` : '',
          ].filter(Boolean).join('\n'),
          startTime: startDate,
          endTime: endDate,
        });
      } catch (err) {
        console.error('Google Calendar event update failed:', err.message);
      }
    }

    // 5. Transaction: mark old as RESCHEDULED, create new record
    const [, newCall] = await prisma.$transaction([
      prisma.mentorVerificationCall.update({
        where: { id: callId },
        data: { status: 'RESCHEDULED' },
      }),
      prisma.mentorVerificationCall.create({
        data: {
          mentorProfileId: existingCall.mentorProfileId,
          scheduledById: existingCall.scheduledById,
          googleEventId: googleEventData?.eventId || existingCall.googleEventId || null,
          meetingLink: googleEventData?.meetLink || existingCall.meetingLink || null,
          startsAt: startDate,
          endsAt: endDate,
          notes: notes || existingCall.notes,
          status: 'SCHEDULED',
        },
        include: callInclude,
      }),
    ]);

    return this._mapCall(newCall);
  }

  /**
   * Cancel a verification call.
   */
  async cancelCall(callId) {
    const call = await prisma.mentorVerificationCall.findUnique({
      where: { id: callId },
    });

    if (!call) {
      throw createServiceError(404, 'Verification call not found');
    }

    if (call.status !== 'SCHEDULED') {
      throw createServiceError(400, `Cannot cancel a call with status: ${call.status}`);
    }

    // Delete Google Calendar event
    if (call.googleEventId) {
      try {
        await googleCalendarService.deleteEvent(call.googleEventId);
      } catch (err) {
        console.error('Google Calendar event deletion failed:', err.message);
      }
    }

    const updated = await prisma.mentorVerificationCall.update({
      where: { id: callId },
      data: { status: 'CANCELLED' },
      include: callInclude,
    });

    return this._mapCall(updated);
  }

  /**
   * Mark a verification call as completed.
   */
  async completeCall(callId) {
    const call = await prisma.mentorVerificationCall.findUnique({
      where: { id: callId },
    });

    if (!call) {
      throw createServiceError(404, 'Verification call not found');
    }

    if (call.status !== 'SCHEDULED') {
      throw createServiceError(400, `Cannot complete a call with status: ${call.status}`);
    }

    const updated = await prisma.mentorVerificationCall.update({
      where: { id: callId },
      data: { status: 'COMPLETED' },
      include: callInclude,
    });

    return this._mapCall(updated);
  }

  /**
   * Mark a verification call as no-show.
   */
  async markNoShow(callId) {
    const call = await prisma.mentorVerificationCall.findUnique({
      where: { id: callId },
    });

    if (!call) {
      throw createServiceError(404, 'Verification call not found');
    }

    if (call.status !== 'SCHEDULED') {
      throw createServiceError(400, `Cannot mark no-show for a call with status: ${call.status}`);
    }

    const updated = await prisma.mentorVerificationCall.update({
      where: { id: callId },
      data: { status: 'NO_SHOW' },
      include: callInclude,
    });

    return this._mapCall(updated);
  }

  /**
   * Get a single verification call by ID.
   */
  async getCallById(callId) {
    const call = await prisma.mentorVerificationCall.findUnique({
      where: { id: callId },
      include: callInclude,
    });

    if (!call) {
      throw createServiceError(404, 'Verification call not found');
    }

    return this._mapCall(call);
  }

  /**
   * Get all verification calls for a mentor (history).
   * Ordered by most recent first.
   */
  async getCallsForMentor(mentorProfileId) {
    const profile = await prisma.mentorProfile.findUnique({
      where: { id: mentorProfileId },
      select: { id: true },
    });

    if (!profile) {
      throw createServiceError(404, 'Mentor profile not found');
    }

    const calls = await prisma.mentorVerificationCall.findMany({
      where: { mentorProfileId },
      include: callInclude,
      orderBy: { createdAt: 'desc' },
    });

    return calls.map((c) => this._mapCall(c));
  }

  /**
   * Map a raw Prisma call record to a clean API response object.
   */
  _mapCall(call) {
    return {
      id: call.id,
      mentorProfileId: call.mentorProfileId,
      scheduledById: call.scheduledById,
      googleEventId: call.googleEventId,
      meetingLink: call.meetingLink,
      startsAt: call.startsAt,
      endsAt: call.endsAt,
      notes: call.notes,
      status: call.status,
      createdAt: call.createdAt,
      updatedAt: call.updatedAt,
      mentor: call.mentorProfile
        ? {
            id: call.mentorProfile.id,
            name: call.mentorProfile.user?.name || 'Unknown',
            email: call.mentorProfile.user?.email || '',
            profilePicture: call.mentorProfile.user?.profilePicture || null,
          }
        : null,
      scheduledBy: call.scheduledBy
        ? {
            id: call.scheduledBy.id,
            name: call.scheduledBy.name,
            email: call.scheduledBy.email,
          }
        : null,
    };
  }
}

export default new MentorVerificationService();
