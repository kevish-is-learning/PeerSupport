import { prisma } from "../config/database.js";
import { CANCELLED_STATUSES } from "../utils/bookingStateMachine.js";
import { RATES } from "../utils/financialCalculator.js";

const createServiceError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

class MentorAnalyticsService {
  /**
   * Full analytics data for the mentor analytics page.
   * Returns 5 sections: sessions, earnings, ratings, demand, utilisation.
   */
  async getFullAnalytics(mentorProfileId) {
    if (!mentorProfileId)
      throw createServiceError(404, "Mentor profile not found");

    const now = new Date();

    // ── Date boundaries ──
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    // 6 months ago for trend
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

    // ── Run ALL queries in parallel ──
    const [
      // Session Analytics
      totalSessions,
      monthSessions,
      completedSessions,
      cancelledSessions,
      noShowSessions,
      upcomingSessions,
      allBookingsForType,

      // Earnings Analytics
      totalPayments,
      monthPayments,
      allPaymentsForBreakdown,

      // Ratings & Feedback
      profile,
      allReviews,

      // Demand Insights
      allBookingsForDemand,

      // Utilisation
      availabilityWindows,
      cancellationStat,
      allBookingsForUtil,
    ] = await Promise.all([
      // ─── Session Analytics ───
      prisma.booking.count({
        where: {
          mentorProfileId,
          status: { in: ["COMPLETED", "CONFIRMED", "IN_PROGRESS"] },
        },
      }),
      prisma.booking.count({
        where: {
          mentorProfileId,
          status: { in: ["COMPLETED", "CONFIRMED", "IN_PROGRESS"] },
          startTime: { gte: monthStart },
        },
      }),
      prisma.booking.count({
        where: { mentorProfileId, status: "COMPLETED" },
      }),
      prisma.booking.count({
        where: {
          mentorProfileId,
          status: { in: CANCELLED_STATUSES },
        },
      }),
      prisma.booking.count({
        where: {
          mentorProfileId,
          status: { in: ["NO_SHOW_MENTOR", "NO_SHOW_MENTEE"] },
        },
      }),
      prisma.booking.count({
        where: {
          mentorProfileId,
          status: { in: ["CONFIRMED", "PAYMENT_PENDING"] },
          startTime: { gte: now, lte: sevenDaysFromNow },
        },
      }),
      prisma.booking.findMany({
        where: {
          mentorProfileId,
          status: { notIn: ["PAYMENT_PENDING"] },
        },
        select: {
          id: true,
          mentorServiceId: true,
          mentorService: { select: { title: true } },
        },
      }),

      // ─── Earnings Analytics ───
      prisma.payment.aggregate({
        where: {
          paymentStatus: "SUCCESS",
          booking: { mentorProfileId },
        },
        _sum: { mentorAmount: true, amount: true },
        _count: true,
      }),
      prisma.payment.aggregate({
        where: {
          paymentStatus: "SUCCESS",
          booking: { mentorProfileId, startTime: { gte: monthStart } },
        },
        _sum: { mentorAmount: true, amount: true },
      }),
      prisma.payment.findMany({
        where: {
          paymentStatus: "SUCCESS",
          booking: { mentorProfileId, startTime: { gte: sixMonthsAgo } },
        },
        select: {
          amount: true,
          mentorAmount: true,
          paidAt: true,
          createdAt: true,
          booking: {
            select: {
              startTime: true,
              mentorServiceId: true,
              mentorService: { select: { title: true } },
            },
          },
        },
      }),

      // ─── Ratings ───
      prisma.mentorProfile.findUnique({
        where: { id: mentorProfileId },
        select: { averageRating: true, totalSessions: true },
      }),
      prisma.review.findMany({
        where: { mentorProfileId },
        select: {
          id: true,
          rating: true,
          review: true,
          createdAt: true,
          author: {
            select: { name: true, profilePicture: true },
          },
        },
        orderBy: { createdAt: "desc" },
        take: 20,
      }),

      // ─── Demand Insights ───
      prisma.booking.findMany({
        where: {
          mentorProfileId,
          status: { notIn: ["PAYMENT_PENDING", ...CANCELLED_STATUSES] },
        },
        select: {
          id: true,
          menteeId: true,
          mentorServiceId: true,
          startTime: true,
          mentorService: { select: { title: true } },
        },
      }),

      // ─── Utilisation ───
      prisma.availabilityWindow.findMany({
        where: { mentorProfileId },
        select: {
          id: true,
          dayOfWeek: true,
          startTime: true,
          endTime: true,
        },
      }),
      prisma.mentorCancellationStat.findFirst({
        where: { mentorProfileId },
        select: { cancellationCount: true, year: true },
      }),
      prisma.booking.findMany({
        where: { mentorProfileId },
        select: { id: true, status: true, startTime: true, endTime: true },
      }),
    ]);

    // ══════════════════════════════════════════════════════════════════
    // 1. SESSION ANALYTICS
    // ══════════════════════════════════════════════════════════════════
    const totalOutcomes = completedSessions + cancelledSessions + noShowSessions;
    const completionRate =
      totalOutcomes > 0
        ? Math.round((completedSessions / totalOutcomes) * 100)
        : 0;

    // Sessions by type
    const typeMap = {};
    for (const b of allBookingsForType) {
      const name = b.mentorService?.title || "Other";
      typeMap[name] = (typeMap[name] || 0) + 1;
    }
    const totalByType = allBookingsForType.length;
    const sessionsByType = Object.entries(typeMap)
      .map(([name, count]) => ({
        name,
        count,
        share: totalByType > 0 ? Math.round((count / totalByType) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count);

    // ══════════════════════════════════════════════════════════════════
    // 2. EARNINGS ANALYTICS
    // ══════════════════════════════════════════════════════════════════
    const totalEarningsGross = totalPayments._sum.amount ?? 0;
    const totalEarningsNet =
      totalPayments._sum.mentorAmount ??
      +(totalEarningsGross * RATES.MENTOR_EARNING_RATE).toFixed(2);

    const monthEarningsGross = monthPayments._sum.amount ?? 0;
    const monthEarningsNet =
      monthPayments._sum.mentorAmount ??
      +(monthEarningsGross * RATES.MENTOR_EARNING_RATE).toFixed(2);

    const completedPaymentCount = totalPayments._count || 0;
    const avgPerSession =
      completedPaymentCount > 0
        ? Math.round(totalEarningsNet / completedPaymentCount)
        : 0;

    // Top earning service
    const earningsByServiceMap = {};
    for (const p of allPaymentsForBreakdown) {
      const name = p.booking?.mentorService?.title || "Other";
      const amount =
        p.mentorAmount ?? +(p.amount * RATES.MENTOR_EARNING_RATE).toFixed(2);
      earningsByServiceMap[name] = (earningsByServiceMap[name] || 0) + amount;
    }
    const earningsByService = Object.entries(earningsByServiceMap)
      .map(([name, amount]) => ({ name, amount: Math.round(amount) }))
      .sort((a, b) => b.amount - a.amount);

    const topEarningService =
      earningsByService.length > 0 ? earningsByService[0].name : "N/A";

    // Earnings trend — last 6 months
    const earningsTrend = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      const label = d.toLocaleString("en-IN", { month: "short" });
      earningsTrend.push({ month: monthKey, label, amount: 0 });
    }
    for (const p of allPaymentsForBreakdown) {
      const pDate = p.booking?.startTime || p.paidAt || p.createdAt;
      if (!pDate) continue;
      const d = new Date(pDate);
      const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      const entry = earningsTrend.find((e) => e.month === monthKey);
      if (entry) {
        const amount =
          p.mentorAmount ?? +(p.amount * RATES.MENTOR_EARNING_RATE).toFixed(2);
        entry.amount += amount;
      }
    }
    earningsTrend.forEach((e) => (e.amount = Math.round(e.amount)));

    // Month-over-month change
    const lastMonthEarnings =
      earningsTrend.length >= 2
        ? earningsTrend[earningsTrend.length - 2].amount
        : 0;
    const monthChangePercent =
      lastMonthEarnings > 0
        ? Math.round(
            ((monthEarningsNet - lastMonthEarnings) / lastMonthEarnings) * 100
          )
        : 0;

    // ══════════════════════════════════════════════════════════════════
    // 3. RATINGS & FEEDBACK
    // ══════════════════════════════════════════════════════════════════
    const averageRating = profile?.averageRating || 0;
    const totalReviewCount = allReviews.length;

    // Star distribution
    const starDistribution = [5, 4, 3, 2, 1].map((star) => {
      const count = allReviews.filter((r) => r.rating === star).length;
      return {
        star,
        count,
        percentage:
          totalReviewCount > 0
            ? Math.round((count / totalReviewCount) * 100)
            : 0,
      };
    });

    // Recent reviews (top 4)
    const recentReviews = allReviews.slice(0, 4).map((r) => ({
      id: r.id,
      rating: r.rating,
      review: r.review,
      createdAt: r.createdAt,
      authorName: r.author?.name || "Anonymous",
      authorPicture: r.author?.profilePicture || null,
    }));

    // ══════════════════════════════════════════════════════════════════
    // 4. DEMAND INSIGHTS
    // ══════════════════════════════════════════════════════════════════

    // Most booked service
    const serviceBookingMap = {};
    for (const b of allBookingsForDemand) {
      const name = b.mentorService?.title || "Other";
      serviceBookingMap[name] = (serviceBookingMap[name] || 0) + 1;
    }
    const mostBookedService =
      Object.entries(serviceBookingMap).sort((a, b) => b[1] - a[1])[0]?.[0] ||
      "N/A";
    const mostBookedServiceCount =
      Object.entries(serviceBookingMap).sort((a, b) => b[1] - a[1])[0]?.[1] || 0;

    // Client repeat rate
    const menteeBookingCounts = {};
    for (const b of allBookingsForDemand) {
      menteeBookingCounts[b.menteeId] =
        (menteeBookingCounts[b.menteeId] || 0) + 1;
    }
    const totalUniqueMentees = Object.keys(menteeBookingCounts).length;
    const repeatMentees = Object.values(menteeBookingCounts).filter(
      (c) => c >= 2
    ).length;
    const clientRepeatRate =
      totalUniqueMentees > 0
        ? Math.round((repeatMentees / totalUniqueMentees) * 100)
        : 0;

    // Peak booking days
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayCountMap = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    for (const b of allBookingsForDemand) {
      const day = new Date(b.startTime).getDay();
      dayCountMap[day]++;
    }
    const peakBookingDays = dayNames.map((name, idx) => ({
      day: name.slice(0, 3),
      fullDay: name,
      count: dayCountMap[idx],
    }));

    // ══════════════════════════════════════════════════════════════════
    // 5. UTILISATION METRICS
    // ══════════════════════════════════════════════════════════════════

    // Calculate total available slots per week from availability windows
    // Each window has startTime/endTime — assume 30min slots as rough estimate
    let totalWeeklySlots = 0;
    for (const w of availabilityWindows) {
      const start = new Date(w.startTime);
      const end = new Date(w.endTime);
      const durationMins = (end.getTime() - start.getTime()) / (1000 * 60);
      // Rough: each 30-min block is a slot
      totalWeeklySlots += Math.max(1, Math.floor(durationMins / 30));
    }

    // Approximate total available slots in last 30 days: weekly slots * ~4.3 weeks
    const totalAvailableSlots30d = Math.round(totalWeeklySlots * 4.3);

    // Bookings in last 30 days
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const bookingsLast30d = allBookingsForUtil.filter(
      (b) => new Date(b.startTime) >= thirtyDaysAgo
    );
    const bookedSlots30d = bookingsLast30d.filter(
      (b) =>
        !CANCELLED_STATUSES.includes(b.status) &&
        b.status !== "PAYMENT_PENDING"
    ).length;

    const slotUtilisationRate =
      totalAvailableSlots30d > 0
        ? Math.round((bookedSlots30d / totalAvailableSlots30d) * 100)
        : 0;

    // Cancellation rate
    const totalBookingsForRate = allBookingsForUtil.filter(
      (b) => b.status !== "PAYMENT_PENDING"
    ).length;
    const totalCancelled = allBookingsForUtil.filter((b) =>
      CANCELLED_STATUSES.includes(b.status)
    ).length;
    const cancellationRate =
      totalBookingsForRate > 0
        ? Math.round((totalCancelled / totalBookingsForRate) * 100)
        : 0;

    // Cancellation quota
    const currentYear = now.getFullYear();
    const freeCancellationsUsed =
      cancellationStat?.year === currentYear
        ? cancellationStat.cancellationCount
        : 0;
    const freeCancellationsTotal = RATES.FREE_CANCELLATIONS_PER_YEAR;

    return {
      sessionAnalytics: {
        totalSessions,
        monthSessions,
        completionRate,
        upcoming7Days: upcomingSessions,
        sessionsByType,
        totalByType,
      },
      earningsAnalytics: {
        totalEarnings: totalEarningsNet,
        monthEarnings: monthEarningsNet,
        monthChangePercent,
        avgPerSession,
        topEarningService,
        earningsTrend,
        earningsByService,
      },
      ratingsAndFeedback: {
        averageRating,
        totalReviewCount,
        starDistribution,
        recentReviews,
      },
      demandInsights: {
        mostBookedService,
        mostBookedServiceCount,
        clientRepeatRate,
        totalUniqueMentees,
        repeatMentees,
        peakBookingDays,
      },
      utilisationMetrics: {
        slotUtilisationRate: Math.min(slotUtilisationRate, 100),
        cancellationRate,
        sessionsCompleted: completedSessions,
        sessionsCancelled: totalCancelled,
        freeCancellationsUsed,
        freeCancellationsTotal,
      },
    };
  }
}

export default new MentorAnalyticsService();
