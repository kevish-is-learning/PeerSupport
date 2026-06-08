/**
 * Admin User Service
 *
 * Manage all users on the platform:
 * - List with search, filter, pagination
 * - View detail
 * - Deactivate / reactivate
 */

import { prisma } from '../config/database.js';

const createServiceError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

class AdminUserService {
  /**
   * List all users with pagination, search, and filters.
   */
  async listUsers({ page = 1, limit = 20, search, role, isActive, provider } = {}) {
    const where = {};

    if (role) where.role = role;
    if (typeof isActive === 'boolean') where.isActive = isActive;
    if (provider) where.provider = provider;

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          provider: true,
          isActive: true,
          isVerified: true,
          profilePicture: true,
          lastLoginAt: true,
          createdAt: true,
          menteeProfile: { select: { id: true } },
          mentorProfile: {
            select: {
              id: true,
              approvalStatus: true,
              isVerified: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.user.count({ where }),
    ]);

    return {
      users: users.map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role,
        provider: u.provider,
        isActive: u.isActive,
        isVerified: u.isVerified,
        profilePicture: u.profilePicture,
        lastLoginAt: u.lastLoginAt,
        createdAt: u.createdAt,
        hasProfile: u.role === 'MENTOR' ? !!u.mentorProfile : !!u.menteeProfile,
        mentorApprovalStatus: u.mentorProfile?.approvalStatus || null,
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
   * Get detailed user view.
   */
  async getUserDetail(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        menteeProfile: true,
        mentorProfile: {
          include: {
            wallet: true,
            cancellationStat: true,
            _count: {
              select: {
                mentorBookings: true,
                reviews: true,
                mentorServices: true,
              },
            },
          },
        },
      },
    });

    if (!user) throw createServiceError(404, 'User not found');

    // Get booking & payment stats
    const [bookingCount, paymentTotal] = await Promise.all([
      prisma.booking.count({
        where: user.role === 'MENTOR'
          ? { mentorProfileId: user.mentorProfile?.id }
          : { menteeId: userId },
      }),
      prisma.payment.aggregate({
        where: {
          paymentStatus: 'SUCCESS',
          booking: user.role === 'MENTOR'
            ? { mentorProfileId: user.mentorProfile?.id }
            : { menteeId: userId },
        },
        _sum: { amount: true },
      }),
    ]);

    const { password, ...safeUser } = user;

    return {
      ...safeUser,
      stats: {
        bookingCount,
        paymentTotal: paymentTotal._sum.amount ?? 0,
      },
    };
  }

  /**
   * Admin toggle user active state.
   */
  async toggleUserActive(userId, { isActive }) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, role: true },
    });

    if (!user) throw createServiceError(404, 'User not found');
    if (user.role === 'ADMIN') {
      throw createServiceError(400, 'Cannot deactivate admin accounts');
    }

    const updated = await prisma.user.update({
      where: { id: userId },
      data: { isActive },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
      },
    });

    return updated;
  }
}

export default new AdminUserService();
