/**
 * Admin Mentor Service
 *
 * Extended mentor management beyond the waitlist:
 * - List all mentors (any status)
 * - Full mentor detail with wallet, stats, bookings
 * - Suspend / unsuspend mentors
 */

import { prisma } from '../config/database.js';

const createServiceError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

class AdminMentorService {
  /**
   * List all mentors with filters and pagination.
   */
  async listMentors({ page = 1, limit = 20, search, approvalStatus } = {}) {
    const where = {};

    if (approvalStatus) where.approvalStatus = approvalStatus;

    if (search) {
      where.OR = [
        { user: { name: { contains: search, mode: 'insensitive' } } },
        { user: { email: { contains: search, mode: 'insensitive' } } },
        { username: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [mentors, total] = await Promise.all([
      prisma.mentorProfile.findMany({
        where,
        include: {
          user: {
            select: { id: true, name: true, email: true, profilePicture: true, isActive: true },
          },
          wallet: {
            select: { pendingBalance: true, availableBalance: true, withdrawnBalance: true },
          },
          cancellationStat: {
            select: { cancellationCount: true, year: true },
          },
          _count: {
            select: { mentorBookings: true, reviews: true, mentorServices: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.mentorProfile.count({ where }),
    ]);

    return {
      mentors: mentors.map((m) => ({
        id: m.id,
        userId: m.userId,
        username: m.username,
        name: m.user?.name || 'Unknown',
        email: m.user?.email || '',
        profilePicture: m.user?.profilePicture,
        isActive: m.user?.isActive ?? true,
        approvalStatus: m.approvalStatus,
        isVerified: m.isVerified,
        averageRating: m.averageRating,
        totalSessions: m._count.mentorBookings,
        totalReviews: m._count.reviews,
        totalServices: m._count.mentorServices,
        wallet: m.wallet
          ? {
              pending: m.wallet.pendingBalance,
              available: m.wallet.availableBalance,
              withdrawn: m.wallet.withdrawnBalance,
            }
          : null,
        bio: m.bio || '',
        contactNumber: m.contactNumber || '',
        linkedInUrl: m.linkedInUrl || '',
        pgProfile: m.pgCollegeProfile || '',
        ugCollegeProfile: m.ugCollegeProfile || '',
        workExperience: m.workExperience || '',
        expertiseTags: m.expertiseTags || [],
        mentoringQA: m.mentoringQA || null,
        education: m.education || null,
        professionalExperience: m.professionalExperience || null,
        collegeDocumentUrl: m.collegeDocumentUrl || null,
        adminReviewNotes: m.adminReviewNotes || null,
        reviewedAt: m.reviewedAt || null,
        cancellations: m.cancellationStat?.cancellationCount ?? 0,
        createdAt: m.createdAt,
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get full mentor detail.
   */
  async getMentorDetail(profileId) {
    const mentor = await prisma.mentorProfile.findUnique({
      where: { id: profileId },
      include: {
        user: {
          select: {
            id: true, name: true, email: true, profilePicture: true,
            isActive: true, provider: true, createdAt: true, lastLoginAt: true,
          },
        },
        mentorServices: { orderBy: { createdAt: 'asc' } },
        wallet: { include: { transactions: { take: 10, orderBy: { createdAt: 'desc' } } } },
        cancellationStat: true,
        reviews: {
          take: 10,
          orderBy: { createdAt: 'desc' },
          include: {
            author: { select: { name: true } },
            booking: { select: { startTime: true } },
          },
        },
        payouts: {
          take: 5,
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!mentor) throw createServiceError(404, 'Mentor profile not found');

    // Get booking stats
    const [totalBookings, completedBookings, earningsAgg] = await Promise.all([
      prisma.booking.count({ where: { mentorProfileId: profileId } }),
      prisma.booking.count({ where: { mentorProfileId: profileId, status: 'COMPLETED' } }),
      prisma.payment.aggregate({
        where: { paymentStatus: 'SUCCESS', booking: { mentorProfileId: profileId } },
        _sum: { amount: true, mentorAmount: true, platformFee: true },
      }),
    ]);

    return {
      ...mentor,
      stats: {
        totalBookings,
        completedBookings,
        totalRevenue: earningsAgg._sum.amount ?? 0,
        totalMentorEarnings: earningsAgg._sum.mentorAmount ?? 0,
        totalPlatformFee: earningsAgg._sum.platformFee ?? 0,
      },
    };
  }

  /**
   * Suspend a mentor — sets approvalStatus to SUSPENDED.
   */
  async suspendMentor(profileId, { reason } = {}) {
    const mentor = await prisma.mentorProfile.findUnique({
      where: { id: profileId },
      select: { id: true, approvalStatus: true },
    });

    if (!mentor) throw createServiceError(404, 'Mentor profile not found');
    if (mentor.approvalStatus === 'SUSPENDED') {
      throw createServiceError(400, 'Mentor is already suspended');
    }

    const updated = await prisma.mentorProfile.update({
      where: { id: profileId },
      data: { approvalStatus: 'SUSPENDED', isVerified: false },
      include: { user: { select: { name: true, email: true } } },
    });

    return {
      id: updated.id,
      name: updated.user?.name,
      email: updated.user?.email,
      approvalStatus: updated.approvalStatus,
      message: 'Mentor suspended successfully',
    };
  }

  /**
   * Unsuspend a mentor — restores approvalStatus to APPROVED.
   */
  async unsuspendMentor(profileId) {
    const mentor = await prisma.mentorProfile.findUnique({
      where: { id: profileId },
      select: { id: true, approvalStatus: true },
    });

    if (!mentor) throw createServiceError(404, 'Mentor profile not found');
    if (mentor.approvalStatus !== 'SUSPENDED') {
      throw createServiceError(400, 'Mentor is not suspended');
    }

    const updated = await prisma.mentorProfile.update({
      where: { id: profileId },
      data: { approvalStatus: 'APPROVED', isVerified: true },
      include: { user: { select: { name: true, email: true } } },
    });

    return {
      id: updated.id,
      name: updated.user?.name,
      email: updated.user?.email,
      approvalStatus: updated.approvalStatus,
      message: 'Mentor unsuspended successfully',
    };
  }
}

export default new AdminMentorService();
