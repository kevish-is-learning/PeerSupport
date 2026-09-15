/**
 * Feedback Service
 *
 * Post-session feedback written by the mentor and shared with the mentee.
 * Submitting feedback is what unlocks a mentor's ability to mark a session
 * complete — see MeetingService.finishMeeting.
 */

import { prisma } from '../config/database.js';
import {
  submitFeedbackSchema,
  bookingIdParamSchema,
  counterpartIdParamSchema,
} from '../validators/feedback.validator.js';
import { generateFeedbackBuffer } from '../utils/feedbackGenerator.js';
import emailService from './EmailService.js';

const createServiceError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

/** Statuses where a session actually happened, so feedback makes sense. */
const FEEDBACK_ELIGIBLE_STATUSES = new Set(['IN_PROGRESS', 'COMPLETED']);

const bookingWithParticipants = {
  mentee: { select: { id: true, name: true, email: true, profilePicture: true } },
  mentorProfile: {
    select: {
      id: true,
      userId: true,
      user: { select: { id: true, name: true, email: true, profilePicture: true } },
    },
  },
  mentorService: { select: { title: true } },
};

const mapFeedback = (feedback, booking) => ({
  id: feedback.id,
  bookingId: feedback.bookingId,
  strengths: feedback.strengths,
  weaknesses: feedback.weaknesses,
  recommendations: feedback.recommendations,
  createdAt: feedback.createdAt,
  sessionDate: booking?.startTime ?? null,
  serviceName: booking?.mentorService?.title ?? null,
  mentorName: booking?.mentorProfile?.user?.name ?? null,
  menteeName: booking?.mentee?.name ?? null,
});

class FeedbackService {
  /**
   * Load a booking and work out how the caller relates to it.
   */
  async _requireParticipant(userId, bookingId) {
    const { bookingId: validId } = bookingIdParamSchema.parse({ bookingId });

    const booking = await prisma.booking.findUnique({
      where: { id: validId },
      include: bookingWithParticipants,
    });

    if (!booking) throw createServiceError(404, 'Booking not found');

    const isMentor = booking.mentorProfile?.userId === userId;
    const isMentee = booking.menteeId === userId;

    if (!isMentor && !isMentee) {
      throw createServiceError(403, 'You are not a participant of this session');
    }

    return { booking, isMentor, isMentee };
  }

  /**
   * Mentor submits (or revises) feedback for a session they ran.
   */
  async submitFeedback(userId, bookingId, payload) {
    const data = submitFeedbackSchema.parse(payload);
    const { booking, isMentor } = await this._requireParticipant(userId, bookingId);

    if (!isMentor) {
      throw createServiceError(403, 'Only the mentor can submit session feedback');
    }

    if (!FEEDBACK_ELIGIBLE_STATUSES.has(booking.status)) {
      throw createServiceError(
        400,
        `Feedback can only be submitted for a session that has taken place — this one is ${booking.status}`
      );
    }

    const isNew = !(await prisma.sessionFeedback.findUnique({
      where: { bookingId: booking.id },
      select: { id: true },
    }));

    const feedback = await prisma.sessionFeedback.upsert({
      where: { bookingId: booking.id },
      create: {
        bookingId: booking.id,
        mentorProfileId: booking.mentorProfileId,
        ...data,
      },
      update: data,
    });

    if (isNew && booking.mentee?.email) {
      emailService
        .sendFeedbackSharedEmail({
          menteeEmail: booking.mentee.email,
          menteeName: booking.mentee.name || 'there',
          mentorName: booking.mentorProfile?.user?.name || 'Your mentor',
          serviceName: booking.mentorService?.title || 'Mentoring Session',
          sessionDate: booking.startTime,
          bookingId: booking.id,
        })
        .catch((err) => console.error('[FeedbackService] email failed:', err.message));
    }

    return mapFeedback(feedback, booking);
  }

  /**
   * Read the feedback for one session. Either participant may view it.
   */
  async getFeedback(userId, bookingId) {
    const { booking } = await this._requireParticipant(userId, bookingId);

    const feedback = await prisma.sessionFeedback.findUnique({
      where: { bookingId: booking.id },
    });

    if (!feedback) throw createServiceError(404, 'No feedback has been submitted for this session yet');

    return mapFeedback(feedback, booking);
  }

  /**
   * Render the feedback as a PDF for download/sharing.
   */
  async generateFeedbackPdf(userId, bookingId) {
    const { booking } = await this._requireParticipant(userId, bookingId);

    const feedback = await prisma.sessionFeedback.findUnique({
      where: { bookingId: booking.id },
    });

    if (!feedback) throw createServiceError(404, 'No feedback has been submitted for this session yet');

    const buffer = await generateFeedbackBuffer({
      menteeName: booking.mentee?.name,
      mentorName: booking.mentorProfile?.user?.name,
      serviceName: booking.mentorService?.title,
      sessionDate: booking.startTime,
      strengths: feedback.strengths,
      weaknesses: feedback.weaknesses,
      recommendations: feedback.recommendations,
      generatedAt: feedback.createdAt,
    });

    const datePart = new Date(booking.startTime).toISOString().split('T')[0];
    const namePart = (booking.mentee?.name || 'mentee').toLowerCase().replace(/[^a-z0-9]+/g, '-');

    return { buffer, filename: `feedback-${namePart}-${datePart}.pdf` };
  }

  /**
   * Every session between the caller and one counterpart, newest first, with
   * the feedback attached — the mentor/mentee interaction history.
   */
  async getHistoryWithCounterpart(userId, counterpartId) {
    const { counterpartId: validId } = counterpartIdParamSchema.parse({ counterpartId });

    const bookings = await prisma.booking.findMany({
      where: {
        OR: [
          { menteeId: userId, mentorProfile: { userId: validId } },
          { menteeId: validId, mentorProfile: { userId } },
        ],
      },
      include: { ...bookingWithParticipants, feedback: true, review: true },
      orderBy: { startTime: 'desc' },
    });

    if (bookings.length === 0) return { counterpart: null, sessions: [] };

    const first = bookings[0];
    const counterpartIsMentor = first.mentorProfile?.userId === validId;
    const counterpartUser = counterpartIsMentor ? first.mentorProfile.user : first.mentee;

    return {
      counterpart: {
        id: counterpartUser?.id,
        name: counterpartUser?.name,
        profilePicture: counterpartUser?.profilePicture,
        role: counterpartIsMentor ? 'MENTOR' : 'MENTEE',
      },
      sessions: bookings.map((b) => ({
        bookingId: b.id,
        startTime: b.startTime,
        endTime: b.endTime,
        status: b.status,
        serviceName: b.mentorService?.title || 'Session',
        feedback: b.feedback ? mapFeedback(b.feedback, b) : null,
        review: b.review
          ? { rating: b.review.rating, review: b.review.review, createdAt: b.review.createdAt }
          : null,
      })),
    };
  }

  /**
   * All feedback the caller has received as a mentee.
   */
  async listReceivedFeedback(userId) {
    const feedbacks = await prisma.sessionFeedback.findMany({
      where: { booking: { menteeId: userId } },
      include: { booking: { include: bookingWithParticipants } },
      orderBy: { createdAt: 'desc' },
    });

    return feedbacks.map((f) => mapFeedback(f, f.booking));
  }

  /**
   * All feedback the caller has written as a mentor.
   */
  async listGivenFeedback(userId) {
    const feedbacks = await prisma.sessionFeedback.findMany({
      where: { mentorProfile: { userId } },
      include: { booking: { include: bookingWithParticipants } },
      orderBy: { createdAt: 'desc' },
    });

    return feedbacks.map((f) => mapFeedback(f, f.booking));
  }

  /**
   * Sessions the mentor has run but not yet written feedback for.
   */
  async listPendingForMentor(userId) {
    const bookings = await prisma.booking.findMany({
      where: {
        mentorProfile: { userId },
        status: { in: ['IN_PROGRESS', 'COMPLETED'] },
        feedback: null,
      },
      include: bookingWithParticipants,
      orderBy: { startTime: 'desc' },
    });

    return bookings.map((b) => ({
      bookingId: b.id,
      startTime: b.startTime,
      endTime: b.endTime,
      status: b.status,
      serviceName: b.mentorService?.title || 'Session',
      menteeName: b.mentee?.name,
      menteePicture: b.mentee?.profilePicture,
    }));
  }

  /** Whether feedback exists — used to gate session completion. */
  async hasFeedback(bookingId) {
    const feedback = await prisma.sessionFeedback.findUnique({
      where: { bookingId },
      select: { id: true },
    });
    return Boolean(feedback);
  }
}

export default new FeedbackService();
