/**
 * Mentee Document Service
 *
 * Named resumes and college-specific SOPs a mentee keeps on file, plus the
 * per-booking sharing that exposes them to a mentor.
 *
 * Sharing is explicit and scoped: a mentor can only read documents the mentee
 * attached to a booking with that mentor.
 */

import { prisma } from '../config/database.js';

const createServiceError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const MAX_DOCUMENTS_PER_TYPE = 10;

const mapDocument = (doc) => ({
  id: doc.id,
  type: doc.type,
  name: doc.name,
  fileUrl: doc.fileUrl,
  targetCollege: doc.targetCollege,
  createdAt: doc.createdAt,
});

class MenteeDocumentService {
  async _requireMenteeProfile(userId) {
    const profile = await prisma.menteeProfile.findUnique({
      where: { userId },
      select: { id: true },
    });
    if (!profile) {
      throw createServiceError(404, 'Complete your mentee profile before adding documents');
    }
    return profile;
  }

  async listMyDocuments(userId) {
    const profile = await this._requireMenteeProfile(userId);

    const documents = await prisma.menteeDocument.findMany({
      where: { menteeProfileId: profile.id },
      orderBy: { createdAt: 'desc' },
    });

    return {
      resumes: documents.filter((d) => d.type === 'RESUME').map(mapDocument),
      sops: documents.filter((d) => d.type === 'SOP').map(mapDocument),
    };
  }

  async addDocument(userId, { type, name, fileUrl, targetCollege }) {
    const profile = await this._requireMenteeProfile(userId);

    const existingCount = await prisma.menteeDocument.count({
      where: { menteeProfileId: profile.id, type },
    });
    if (existingCount >= MAX_DOCUMENTS_PER_TYPE) {
      throw createServiceError(
        400,
        `You can keep at most ${MAX_DOCUMENTS_PER_TYPE} ${type === 'SOP' ? 'SOPs' : 'resumes'} — delete one first`
      );
    }

    // An SOP is written for a specific college; a resume is universal.
    if (type === 'SOP' && !targetCollege) {
      throw createServiceError(400, 'An SOP needs the college it was written for');
    }

    const document = await prisma.menteeDocument.create({
      data: {
        menteeProfileId: profile.id,
        type,
        name,
        fileUrl,
        targetCollege: type === 'SOP' ? targetCollege : null,
      },
    });

    return mapDocument(document);
  }

  async deleteDocument(userId, documentId) {
    const profile = await this._requireMenteeProfile(userId);

    const document = await prisma.menteeDocument.findFirst({
      where: { id: documentId, menteeProfileId: profile.id },
      select: { id: true },
    });
    if (!document) throw createServiceError(404, 'Document not found');

    await prisma.menteeDocument.delete({ where: { id: documentId } });
    return { id: documentId };
  }

  /**
   * Replace the set of documents shared on a booking.
   *
   * Only the mentee who owns the booking may change this, and only while the
   * session is still ahead of them.
   */
  async setSharedDocuments(userId, bookingId, documentIds = []) {
    const profile = await this._requireMenteeProfile(userId);

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      select: { id: true, menteeId: true, status: true },
    });

    if (!booking) throw createServiceError(404, 'Booking not found');
    if (booking.menteeId !== userId) {
      throw createServiceError(403, 'This is not your booking');
    }
    if (['COMPLETED', 'CANCELLED_BY_MENTEE', 'CANCELLED_BY_MENTOR'].includes(booking.status)) {
      throw createServiceError(400, 'This session is over — documents can no longer be changed');
    }

    if (documentIds.length > 0) {
      const owned = await prisma.menteeDocument.findMany({
        where: { id: { in: documentIds }, menteeProfileId: profile.id },
        select: { id: true },
      });
      if (owned.length !== documentIds.length) {
        throw createServiceError(400, 'One or more documents do not belong to you');
      }
    }

    await prisma.$transaction([
      prisma.bookingSharedDocument.deleteMany({ where: { bookingId } }),
      ...(documentIds.length > 0
        ? [
            prisma.bookingSharedDocument.createMany({
              data: documentIds.map((documentId) => ({ bookingId, documentId })),
            }),
          ]
        : []),
      prisma.booking.update({
        where: { id: bookingId },
        data: { shareProfile: documentIds.length > 0 },
      }),
    ]);

    return this.getSharedDocuments(userId, bookingId);
  }

  /**
   * Documents shared on a booking. Visible to the mentee who owns it and the
   * mentor running it — nobody else.
   */
  async getSharedDocuments(userId, bookingId) {
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      select: {
        id: true,
        menteeId: true,
        shareProfile: true,
        sharedFeedbackBookingId: true,
        mentorProfile: { select: { userId: true } },
        sharedDocuments: { include: { document: true } },
      },
    });

    if (!booking) throw createServiceError(404, 'Booking not found');

    const isMentee = booking.menteeId === userId;
    const isMentor = booking.mentorProfile?.userId === userId;
    if (!isMentee && !isMentor) {
      throw createServiceError(403, 'You are not a participant of this session');
    }

    return {
      shareProfile: booking.shareProfile,
      documents: booking.sharedDocuments.map((sd) => mapDocument(sd.document)),
      sharedFeedbackBookingId: booking.sharedFeedbackBookingId,
    };
  }

  /**
   * The mentee's most recent completed session with this mentor that has
   * feedback — the booking flow offers to resurface it, pre-checked.
   */
  async findPreviousFeedbackBooking(menteeId, mentorProfileId) {
    const previous = await prisma.booking.findFirst({
      where: {
        menteeId,
        mentorProfileId,
        status: 'COMPLETED',
        feedback: { isNot: null },
      },
      orderBy: { startTime: 'desc' },
      select: {
        id: true,
        startTime: true,
        mentorService: { select: { title: true } },
        feedback: { select: { id: true, createdAt: true } },
      },
    });

    if (!previous) return null;

    return {
      bookingId: previous.id,
      sessionDate: previous.startTime,
      serviceName: previous.mentorService?.title ?? 'Session',
      feedbackCreatedAt: previous.feedback?.createdAt ?? null,
    };
  }
}

export default new MenteeDocumentService();
