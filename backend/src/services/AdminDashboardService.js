/**
 * Admin Dashboard Service
 *
 * Aggregates platform-wide stats for the admin overview:
 * - User counts by role
 * - Booking breakdown by status
 * - Revenue & earnings summary
 * - Payout stats
 * - Recent activity feed
 */

import { prisma } from '../config/database.js';

class AdminDashboardService {
  /**
   * Get all dashboard stats in one call.
   */
  async getStats() {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const [
      // User counts
      totalUsers,
      mentorCount,
      menteeCount,
      adminCount,
      activeMentors,
      pendingMentors,

      // Booking counts
      totalBookings,
      monthBookings,
      bookingsByStatus,

      // Revenue
      revenueAgg,
      monthRevenueAgg,
      refundAgg,

      // Payouts
      pendingPayouts,
      completedPayoutsAgg,

      // Recent activity
      recentBookings,
      recentApplications,
    ] = await Promise.all([
      // ─── Users ───────────────────────────────────────────────
      prisma.user.count(),
      prisma.user.count({ where: { role: 'MENTOR' } }),
      prisma.user.count({ where: { role: 'MENTEE' } }),
      prisma.user.count({ where: { role: 'ADMIN' } }),
      prisma.mentorProfile.count({
        where: { approvalStatus: 'APPROVED', isVerified: true },
      }),
      prisma.mentorProfile.count({
        where: { approvalStatus: 'PENDING' },
      }),

      // ─── Bookings ───────────────────────────────────────────
      prisma.booking.count(),
      prisma.booking.count({
        where: { createdAt: { gte: monthStart } },
      }),
      prisma.booking.groupBy({
        by: ['status'],
        _count: { id: true },
      }),

      // ─── Revenue ────────────────────────────────────────────
      prisma.payment.aggregate({
        where: { paymentStatus: 'SUCCESS' },
        _sum: { amount: true, platformFee: true, mentorAmount: true },
        _count: { id: true },
      }),
      prisma.payment.aggregate({
        where: {
          paymentStatus: 'SUCCESS',
          paidAt: { gte: monthStart },
        },
        _sum: { amount: true, platformFee: true },
      }),
      prisma.payment.aggregate({
        where: { paymentStatus: { in: ['REFUNDED', 'PARTIALLY_REFUNDED'] } },
        _sum: { refundedAmount: true },
        _count: { id: true },
      }),

      // ─── Payouts ────────────────────────────────────────────
      prisma.payout.count({
        where: { status: { in: ['REQUESTED', 'APPROVED', 'PROCESSING'] } },
      }),
      prisma.payout.aggregate({
        where: { status: 'COMPLETED' },
        _sum: { netAmount: true },
        _count: { id: true },
      }),

      // ─── Recent Activity ────────────────────────────────────
      prisma.booking.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          status: true,
          startTime: true,
          createdAt: true,
          mentee: { select: { name: true } },
          mentorProfile: {
            select: { user: { select: { name: true } } },
          },
          mentorService: { select: { title: true } },
        },
      }),
      prisma.mentorProfile.findMany({
        where: { approvalStatus: 'PENDING' },
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          createdAt: true,
          user: { select: { name: true, email: true } },
        },
      }),
    ]);

    // Build status breakdown map
    const statusBreakdown = {};
    for (const row of bookingsByStatus) {
      statusBreakdown[row.status] = row._count.id;
    }

    return {
      users: {
        total: totalUsers,
        mentors: mentorCount,
        mentees: menteeCount,
        admins: adminCount,
        activeMentors,
        pendingMentors,
      },
      bookings: {
        total: totalBookings,
        thisMonth: monthBookings,
        byStatus: statusBreakdown,
      },
      revenue: {
        totalCollected: revenueAgg._sum.amount ?? 0,
        platformEarnings: revenueAgg._sum.platformFee ?? 0,
        mentorEarnings: revenueAgg._sum.mentorAmount ?? 0,
        totalTransactions: revenueAgg._count.id,
        thisMonthCollected: monthRevenueAgg._sum.amount ?? 0,
        thisMonthPlatformFee: monthRevenueAgg._sum.platformFee ?? 0,
        totalRefunded: refundAgg._sum.refundedAmount ?? 0,
        refundCount: refundAgg._count.id,
      },
      payouts: {
        pending: pendingPayouts,
        completedTotal: completedPayoutsAgg._sum.netAmount ?? 0,
        completedCount: completedPayoutsAgg._count.id,
      },
      recentBookings: recentBookings.map((b) => ({
        id: b.id,
        status: b.status,
        startTime: b.startTime,
        createdAt: b.createdAt,
        menteeName: b.mentee?.name || 'Unknown',
        mentorName: b.mentorProfile?.user?.name || 'Unknown',
        serviceName: b.mentorService?.title || 'Session',
      })),
      recentApplications: recentApplications.map((p) => ({
        id: p.id,
        name: p.user?.name || 'Unknown',
        email: p.user?.email || '',
        createdAt: p.createdAt,
      })),
    };
  }
}

export default new AdminDashboardService();
