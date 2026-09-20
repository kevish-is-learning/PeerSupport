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

const emailsMatch = (a, b) =>
  !!a && !!b && a.trim().toLowerCase() === b.trim().toLowerCase();

const attendeesInclude = (attendees, email) =>
  !!email && Array.isArray(attendees) && attendees.some((a) => emailsMatch(a, email));

/**
 * A "scheduled" call is only meaningful once the Meet link exists AND
 * Google actually attached both parties as attendees on the event — an
 * event can be created successfully (200 OK) while still dropping an
 * attendee (bad address, a Workspace admin's "domain restricted sharing"
 * policy, etc.), which would leave one side with no invite at all.
 * Throws with a message identifying exactly which side is missing so the
 * admin knows what to fix instead of a generic failure.
 */
const assertMeetingReachesBothParties = (googleEventData, { mentorEmail, adminEmail }, action) => {
  if (!googleEventData || !googleEventData.meetLink) {
    throw createServiceError(
      502,
      `Could not ${action} the call: Google Calendar did not return a Meet link. No changes were saved — contact an engineer to check the Google Calendar integration.`
    );
  }

  const missing = [];
  if (!attendeesInclude(googleEventData.attendees, mentorEmail)) missing.push(`the mentor (${mentorEmail || 'no email on file'})`);
  if (!attendeesInclude(googleEventData.attendees, adminEmail)) missing.push(`the scheduling admin (${adminEmail || 'no email on file'})`);

  if (missing.length) {
    throw createServiceError(
      502,
      `Could not ${action} the call: Google Calendar did not confirm the invite reached ${missing.join(' and ')}. No changes were saved — double-check the email address and try again.`
    );
  }
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

    // Both parties must have a real email before we even try — otherwise
    // Google will "succeed" while quietly inviting only one side.
    if (!mentorEmail) {
      throw createServiceError(400, 'Cannot schedule the call: this mentor has no email on file.');
    }
    if (!adminEmail) {
      throw createServiceError(500, 'Cannot schedule the call: could not determine the scheduling admin\'s email.');
    }

    let googleEventData;
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
      throw createServiceError(
        502,
        `Could not schedule the call: Google Calendar rejected the request (${err.message}). No call was scheduled — please try again.`
      );
    }

    // createEvent() returns null (rather than throwing) when Google Calendar
    // isn't configured at all — fail loudly here instead of silently
    // creating a call record with no Meet link, which would look like
    // success to the admin while the mentor never receives an invite.
    // Also verify the Meet link AND that both parties were actually
    // attached as attendees, not just that the API call returned 200.
    assertMeetingReachesBothParties(googleEventData, { mentorEmail, adminEmail }, 'schedule');

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

    // 4. Update Google Calendar event
    const mentorName = existingCall.mentorProfile?.user?.name || 'Mentor';
    const mentorEmail = existingCall.mentorProfile?.user?.email;
    const adminEmail = existingCall.scheduledBy?.email;

    // A call without an underlying Google event (e.g. a legacy row from
    // before this check existed) can't be rescheduled in place — patching
    // nothing would leave both parties' calendars showing the stale time.
    // Cancel it and have the admin schedule a fresh call instead.
    if (!existingCall.googleEventId) {
      throw createServiceError(
        409,
        'Could not reschedule the call: it has no linked Google Calendar event, so there is nothing to update. Cancel this call and schedule a new one instead.'
      );
    }

    let googleEventData;
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
      throw createServiceError(
        502,
        `Could not reschedule the call: Google Calendar rejected the update (${err.message}). The call was not rescheduled — please try again.`
      );
    }

    // Same "both parties confirmed" guard as scheduling — a patch can
    // succeed while Google quietly drops an attendee.
    assertMeetingReachesBothParties(googleEventData, { mentorEmail, adminEmail }, 'reschedule');

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
