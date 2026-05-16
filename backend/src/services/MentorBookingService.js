import { prisma } from "../config/database.js";

const createServiceError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const mapBooking = (b) => ({
  id: b.id,
  status: b.status,
  startTime: b.startTime,
  endTime: b.endTime,
  meetingLink: b.meetingLink,
  purposeOfCall: b.purposeOfCall,
  notes: b.notes,
  cancelledReason: b.cancelledReason,
  service: b.mentorService
    ? {
        id: b.mentorService.id,
        serviceName: b.mentorService.service?.name,
        serviceSlug: b.mentorService.service?.slug,
        price: b.mentorService.price,
        durationMinutes: b.mentorService.durationMinutes,
      }
    : null,
  mentee: b.mentee
    ? {
        id: b.mentee.id,
        name: b.mentee.name,
        email: b.mentee.email,
        profilePicture: b.mentee.profilePicture,
      }
    : null,
  payment: b.payment
    ? {
        id: b.payment.id,
        amount: b.payment.amount,
        paymentStatus: b.payment.paymentStatus,
        paidAt: b.payment.paidAt,
        currency: b.payment.currency,
      }
    : null,
  createdAt: b.createdAt,
  updatedAt: b.updatedAt,
  discussionTopic: b.discussionTopic,
  specificQuestions: b.specificQuestions,
  menteeEmail: b.menteeEmail || b.mentee?.email,
  menteePhone: b.menteePhone,
  // Normalize fields for SessionDetailsModal
  mentorName: b.mentorProfile?.user?.name || "Mentor",
  mentorPicture: b.mentorProfile?.user?.profilePicture,
  serviceName:
    b.mentorService?.label ||
    b.mentorService?.serviceName ||
    "Mentoring Session",
  price: b.payment?.amount || b.mentorService?.price || 0,
  durationMinutes: b.mentorService?.durationMinutes || 60,
});

const bookingInclude = {
  mentee: {
    select: { id: true, name: true, email: true, profilePicture: true },
  },
  payment: {
    select: {
      id: true,
      amount: true,
      paymentStatus: true,
      paidAt: true,
      currency: true,
    },
  },
  mentorService: true,
  mentorProfile: {
    include: {
      user: {
        select: { name: true, profilePicture: true },
      },
    },
  },
};

class MentorBookingService {
  /**
   * Dashboard stats: total sessions, earnings, active mentees, avg rating.
   */
  async getDashboardStats(mentorProfileId) {
    if (!mentorProfileId)
      throw createServiceError(404, "Mentor profile not found");

    const [totalSessions, completedPayments, activeBookingMentees, profile] =
      await Promise.all([
        prisma.booking.count({
          where: {
            mentorProfileId,
            status: { in: ["COMPLETED", "CONFIRMED"] },
          },
        }),
        prisma.payment.aggregate({
          where: {
            paymentStatus: "SUCCESS",
            booking: { mentorProfileId },
          },
          _sum: { amount: true },
        }),
        prisma.booking.findMany({
          where: { mentorProfileId, status: { not: "CANCELLED" } },
          distinct: ["menteeId"],
          select: { menteeId: true },
        }),
        prisma.mentorProfile.findUnique({
          where: { id: mentorProfileId },
          select: { averageRating: true },
        }),
      ]);

    // Month-to-date
    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);

    const [monthSessions, monthEarnings] = await Promise.all([
      prisma.booking.count({
        where: {
          mentorProfileId,
          status: { in: ["COMPLETED", "CONFIRMED"] },
          startTime: { gte: monthStart },
        },
      }),
      prisma.payment.aggregate({
        where: {
          paymentStatus: "SUCCESS",
          booking: { mentorProfileId, startTime: { gte: monthStart } },
        },
        _sum: { amount: true },
      }),
    ]);

    return {
      totalSessions,
      totalEarnings: completedPayments._sum.amount ?? 0,
      activeMentees: activeBookingMentees.length,
      averageRating: profile?.averageRating || 0,
      monthSessions,
      monthEarnings: monthEarnings._sum.amount ?? 0,
    };
  }

  /**
   * List all unique mentees who have booked this mentor.
   */
  async listMentees(mentorProfileId) {
    if (!mentorProfileId)
      throw createServiceError(404, "Mentor profile not found");
    
    const bookings = await prisma.booking.findMany({
      where: { mentorProfileId, status: { not: "CANCELLED" } },
      distinct: ["menteeId"],
      select: {
        menteeId: true,
        mentee: {
          select: { id: true, name: true, email: true, profilePicture: true },
        },
      },
    });

    return bookings.map((b) => ({
      id: b.mentee.id,
      name: b.mentee.name,
      email: b.mentee.email,
      profilePicture: b.mentee.profilePicture,
    }));
  }

  /**
   * List bookings for a specific mentee under this mentor, ordered newest first.
   */
  async listBookingsForMentee(mentorProfileId, menteeId) {
    if (!mentorProfileId)
      throw createServiceError(404, "Mentor profile not found");

    const bookings = await prisma.booking.findMany({
      where: { mentorProfileId, menteeId, status: { not: "CANCELLED" } },
      select: {
        id: true,
        status: true,
        startTime: true,
        endTime: true,
        mentorServiceId: true,
        menteeId: true,
        purposeOfCall: true,
        feedback: true,
      },
      orderBy: { startTime: "desc" },
    });

    // we need to get the service name, duration from the mentorServiceId
    const mentorServices = await prisma.mentorService.findMany({
      where: { id: { in: bookings.map((b) => b.mentorServiceId) } },
      select: { id: true, title: true, durationMinutes: true },
    });

    const mentorServicesMap = new Map(mentorServices.map((s) => [s.id, s]));

    return bookings.map((b) => {
      const mentorService = mentorServicesMap.get(b.mentorServiceId);
      return {
        ...b,
        serviceName: mentorService?.title,
        durationMinutes: mentorService?.durationMinutes,
      };
    });
  }

  /**
   * Earnings/payment overview for the payments page.
   */
  async getEarnings(mentorProfileId) {
    if (!mentorProfileId)
      throw createServiceError(404, "Mentor profile not found");

    const [allPayments, pendingBookings, completedPayments] = await Promise.all(
      [
        prisma.payment.findMany({
          where: { booking: { mentorProfileId } },
          include: {
            booking: {
              include: {
                mentee: { select: { name: true, email: true } },
                mentorService: { select: { title: true } },
              },
            },
          },
          orderBy: { createdAt: "desc" },
        }),
        prisma.booking.count({
          where: { mentorProfileId, status: "PENDING" },
        }),
        prisma.payment.aggregate({
          where: { paymentStatus: "SUCCESS", booking: { mentorProfileId } },
          _sum: { amount: true },
        }),
      ],
    );

    const totalEarnings = completedPayments._sum.amount ?? 0;
    const PLATFORM_FEE = 0.10;

    const transactions = allPayments.map((p) => {
      return {
      id: p.id,
      transactionRef: p.id.substring(0, 13).toUpperCase(),
      mentee: p.booking.mentee?.name ?? "mentee not found",
      service: p.booking.mentorService?.title || "Session",
      date: p.createdAt,
      amount: p.amount,
      currency: p.currency,
      status: p.paymentStatus,
    }});

    return {
      totalEarnings,
      availableForPayout: +(totalEarnings * (1 - PLATFORM_FEE)).toFixed(2),
      pendingAmount: allPayments
        .filter((p) => p.paymentStatus === "PENDING")
        .reduce((sum, p) => sum + p.amount, 0),
      completedTransactions: allPayments.filter(
        (p) => p.paymentStatus === "SUCCESS",
      ).length,
      transactions,
    };
  }

  /**
   * Sessions page: all sessions for the mentor within a given month,
   * plus upcoming sessions (from today onward, regardless of month).
   * Used to power the calendar + sidebar + day-detail panels.
   */
  async getSessions(mentorProfileId, { month, year } = {}) {
    if (!mentorProfileId)
      throw createServiceError(404, "Mentor profile not found");

    const now = new Date();
    const targetMonth = month ? parseInt(month, 10) - 1 : now.getMonth();
    const targetYear = year ? parseInt(year, 10) : now.getFullYear();

    // Date range for the calendar month
    const monthStart = new Date(targetYear, targetMonth, 1);
    const monthEnd = new Date(targetYear, targetMonth + 1, 0, 23, 59, 59, 999);

    const sessionInclude = {
      mentee: {
        select: { id: true, name: true, email: true, profilePicture: true },
      },
      mentorService: {
        select: { id: true, title: true, description: true, price: true, durationMinutes: true },
      },
      payment: {
        select: { id: true, amount: true, paymentStatus: true, paidAt: true, currency: true },
      },
    };

    // 1. All sessions in the target calendar month
    const calendarSessions = await prisma.booking.findMany({
      where: {
        mentorProfileId,
        status: { not: "CANCELLED" },
        startTime: { gte: monthStart, lte: monthEnd },
      },
      include: sessionInclude,
      orderBy: { startTime: "asc" },
    });

    // 2. Upcoming sessions (from now onward, any month) — limited to next 10
    const upcomingSessions = await prisma.booking.findMany({
      where: {
        mentorProfileId,
        status: { in: ["CONFIRMED", "PENDING"] },
        endTime: { gte: now },
      },
      include: sessionInclude,
      orderBy: { startTime: "asc" },
      take: 10,
    });

    const mapSession = (b) => ({
      id: b.id,
      status: b.status,
      startTime: b.startTime,
      endTime: b.endTime,
      meetingLink: b.meetingLink,
      purposeOfCall: b.purposeOfCall,
      notes: b.notes,
      discussionTopic: b.discussionTopic,
      specificQuestions: b.specificQuestions,
      mentee: b.mentee
        ? {
            id: b.mentee.id,
            name: b.mentee.name,
            email: b.mentee.email,
            profilePicture: b.mentee.profilePicture,
          }
        : null,
      serviceName: b.mentorService?.title || "Mentoring Session",
      durationMinutes: b.mentorService?.durationMinutes || 60,
      price: b.payment?.amount || b.mentorService?.price || 0,
      menteeEmail: b.menteeEmail || b.mentee?.email,
      menteePhone: b.menteePhone,
    });

    // Build a set of dates (YYYY-MM-DD) that have sessions for the calendar dots
    const datesWithSessions = [
      ...new Set(
        calendarSessions.map((b) => b.startTime.toISOString().split("T")[0])
      ),
    ];

    return {
      calendarSessions: calendarSessions.map(mapSession),
      upcomingSessions: upcomingSessions.map(mapSession),
      datesWithSessions,
      month: targetMonth + 1,
      year: targetYear,
    };
  }
}

export default new MentorBookingService();
