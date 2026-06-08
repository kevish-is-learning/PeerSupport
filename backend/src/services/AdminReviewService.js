/**
 * Admin Review Service
 *
 * Monitor and moderate reviews and session feedback:
 * - List all reviews with filters
 * - Delete inappropriate reviews (recalculate mentor rating)
 * - List session feedback
 */

import { prisma } from '../config/database.js';

const createServiceError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

class AdminReviewService {
  /**
   * List all reviews with pagination and filters.
   */
  async listReviews({ page = 1, limit = 20, mentorProfileId, minRating, maxRating } = {}) {
    const where = {};

    if (mentorProfileId) where.mentorProfileId = mentorProfileId;

    if (minRating || maxRating) {
      where.rating = {};
      if (minRating) where.rating.gte = parseInt(minRating);
      if (maxRating) where.rating.lte = parseInt(maxRating);
    }

    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where,
        include: {
          author: { select: { id: true, name: true, email: true } },
          mentorProfile: {
            include: { user: { select: { name: true, email: true } } },
          },
          booking: { select: { id: true, startTime: true, status: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.review.count({ where }),
    ]);

    return {
      reviews: reviews.map((r) => ({
        id: r.id,
        rating: r.rating,
        review: r.review,
        createdAt: r.createdAt,
        author: { id: r.author?.id, name: r.author?.name, email: r.author?.email },
        mentor: {
          id: r.mentorProfileId,
          name: r.mentorProfile?.user?.name || 'Unknown',
          email: r.mentorProfile?.user?.email || '',
        },
        booking: r.booking
          ? { id: r.booking.id, startTime: r.booking.startTime, status: r.booking.status }
          : null,
      })),
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  /**
   * Delete a review and recalculate mentor's average rating.
   */
  async deleteReview(reviewId) {
    const review = await prisma.review.findUnique({
      where: { id: reviewId },
      select: { id: true, mentorProfileId: true },
    });

    if (!review) throw createServiceError(404, 'Review not found');

    // Delete the review
    await prisma.review.delete({ where: { id: reviewId } });

    // Recalculate mentor's average rating
    const ratingAgg = await prisma.review.aggregate({
      where: { mentorProfileId: review.mentorProfileId },
      _avg: { rating: true },
      _count: { id: true },
    });

    const newAvg = ratingAgg._avg.rating ?? 0;

    await prisma.mentorProfile.update({
      where: { id: review.mentorProfileId },
      data: { averageRating: Math.round(newAvg * 100) / 100 },
    });

    return {
      deleted: true,
      mentorProfileId: review.mentorProfileId,
      newAverageRating: Math.round(newAvg * 100) / 100,
      remainingReviews: ratingAgg._count.id,
    };
  }

  /**
   * List all session feedback.
   */
  async listFeedback({ page = 1, limit = 20 } = {}) {
    const [feedbacks, total] = await Promise.all([
      prisma.sessionFeedback.findMany({
        include: {
          mentorProfile: {
            include: { user: { select: { name: true } } },
          },
          booking: {
            select: {
              id: true,
              startTime: true,
              mentee: { select: { name: true } },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.sessionFeedback.count(),
    ]);

    return {
      feedbacks: feedbacks.map((f) => ({
        id: f.id,
        strengths: f.strengths,
        weaknesses: f.weaknesses,
        recommendations: f.recommendations,
        createdAt: f.createdAt,
        mentorName: f.mentorProfile?.user?.name || 'Unknown',
        bookingId: f.booking?.id,
        sessionDate: f.booking?.startTime,
        menteeName: f.booking?.mentee?.name || 'Unknown',
      })),
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  /**
   * Manual wallet adjustment (credit/debit with admin note).
   */
  async adjustWallet(mentorProfileId, { amount, reason, type = 'credit' }) {
    if (!amount || amount <= 0) {
      throw createServiceError(400, 'Amount must be positive');
    }

    const wallet = await prisma.mentorWallet.findUnique({
      where: { mentorProfileId },
    });

    if (!wallet) throw createServiceError(404, 'Mentor wallet not found');

    const isCredit = type === 'credit';
    const txAmount = isCredit ? amount : -amount;

    await prisma.$transaction([
      prisma.mentorWallet.update({
        where: { id: wallet.id },
        data: {
          availableBalance: isCredit
            ? { increment: amount }
            : { decrement: amount },
        },
      }),
      prisma.walletTransaction.create({
        data: {
          walletId: wallet.id,
          type: isCredit ? 'EARNING' : 'PENALTY',
          amount: txAmount,
          description: `[Admin] ${reason || (isCredit ? 'Manual credit' : 'Manual debit')}`,
          balanceBefore: wallet.availableBalance,
          balanceAfter: wallet.availableBalance + txAmount,
        },
      }),
    ]);

    return {
      mentorProfileId,
      adjustment: txAmount,
      type,
      newAvailableBalance: wallet.availableBalance + txAmount,
      message: `Wallet ${type}ed ₹${amount}`,
    };
  }
}

export default new AdminReviewService();
