import { prisma } from '../config/database.js';
import { SERVICE_TYPE_LABELS } from '../constants/services.js';

const createServiceError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const mapBooking = (b) => ({
  id: b.id,
  sessionType: b.sessionType,
  bookingStatus: b.bookingStatus,
  startTime: b.startTime,
  endTime: b.endTime,
  meetingLink: b.meetingLink,
  purposeOfCall: b.purposeOfCall,
  notes: b.notes,
  isFeedbackSubmitted: b.isFeedbackSubmitted,
  service: b.mentorService
    ? {
        serviceType: b.mentorService.serviceType,
        label: SERVICE_TYPE_LABELS[b.mentorService.serviceType],
        pricePerSession: b.mentorService.pricePerSession,
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
});

const bookingInclude = {
  mentee: {
    select: { id: true, name: true, email: true, profilePicture: true },
  },
  mentorService: {
    select: { serviceType: true, pricePerSession: true, durationMinutes: true },
  },
  payment: {
    select: { id: true, amount: true, paymentStatus: true, paidAt: true, currency: true },
  },
};

class MentorBookingService {
  async requireProfile(userId) {
    const profile = await prisma.mentorProfile.findUnique({
      where: { userId },
      select: { id: true, totalEarnings: true, totalSessions: true, averageRating: true },
    });
    if (!profile) throw createServiceError(404, 'Mentor profile not found');
    return profile;
  }

  /**
   * Dashboard stats: total sessions, earnings, active mentees, avg rating.
   */
  async getDashboardStats(userId) {
    const profile = await this.requireProfile(userId);
    const profileId = profile.id;

    const [totalSessions, completedPayments, activeBookingMentees] = await Promise.all([
      prisma.booking.count({
        where: { mentorProfileId: profileId, bookingStatus: { in: ['COMPLETED', 'CONFIRMED'] } },
      }),
      prisma.payment.aggregate({
        where: {
          paymentStatus: 'SUCCESS',
          booking: { mentorProfileId: profileId },
        },
        _sum: { amount: true },
      }),
      prisma.booking.findMany({
        where: { mentorProfileId: profileId, bookingStatus: { not: 'CANCELLED' } },
        distinct: ['menteeId'],
        select: { menteeId: true },
      }),
    ]);

    // Month-to-date
    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);

    const [monthSessions, monthEarnings] = await Promise.all([
      prisma.booking.count({
        where: {
          mentorProfileId: profileId,
          bookingStatus: { in: ['COMPLETED', 'CONFIRMED'] },
          startTime: { gte: monthStart },
        },
      }),
      prisma.payment.aggregate({
        where: {
          paymentStatus: 'SUCCESS',
          booking: { mentorProfileId: profileId, startTime: { gte: monthStart } },
        },
        _sum: { amount: true },
      }),
    ]);

    return {
      totalSessions,
      totalEarnings: completedPayments._sum.amount ?? 0,
      activeMentees: activeBookingMentees.length,
      averageRating: profile.averageRating,
      monthSessions,
      monthEarnings: monthEarnings._sum.amount ?? 0,
    };
  }

  /**
   * List all unique mentees who have booked this mentor.
   */
  async listMentees(userId) {
    const profile = await this.requireProfile(userId);

    const bookings = await prisma.booking.findMany({
      where: { mentorProfileId: profile.id, bookingStatus: { not: 'CANCELLED' } },
      distinct: ['menteeId'],
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
  async listBookingsForMentee(userId, menteeId) {
    const profile = await this.requireProfile(userId);

    const bookings = await prisma.booking.findMany({
      where: { mentorProfileId: profile.id, menteeId },
      include: bookingInclude,
      orderBy: { startTime: 'desc' },
    });

    return bookings.map(mapBooking);
  }

  /**
   * Earnings/payment overview for the payments page.
   */
  async getEarnings(userId) {
    const profile = await this.requireProfile(userId);
    const profileId = profile.id;

    const [allPayments, pendingBookings, completedPayments] = await Promise.all([
      prisma.payment.findMany({
        where: { booking: { mentorProfileId: profileId } },
        include: {
          booking: {
            include: {
              mentee: { select: { name: true, email: true } },
              mentorService: { select: { serviceType: true } },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.booking.count({
        where: { mentorProfileId: profileId, bookingStatus: 'PENDING' },
      }),
      prisma.payment.aggregate({
        where: { paymentStatus: 'SUCCESS', booking: { mentorProfileId: profileId } },
        _sum: { amount: true },
      }),
    ]);

    const totalEarnings = completedPayments._sum.amount ?? 0;
    const PLATFORM_FEE = 0.15;

    const transactions = allPayments.map((p) => ({
      id: p.id,
      transactionRef: p.id.substring(0, 13).toUpperCase(),
      mentee: p.booking.mentee?.name ?? 'Unknown',
      service: p.booking.mentorService
        ? SERVICE_TYPE_LABELS[p.booking.mentorService.serviceType]
        : 'Session',
      date: p.createdAt,
      amount: p.amount,
      currency: p.currency,
      status: p.paymentStatus,
    }));

    return {
      totalEarnings,
      availableForPayout: +(totalEarnings * (1 - PLATFORM_FEE)).toFixed(2),
      pendingAmount: allPayments
        .filter((p) => p.paymentStatus === 'PENDING')
        .reduce((sum, p) => sum + p.amount, 0),
      completedTransactions: allPayments.filter((p) => p.paymentStatus === 'SUCCESS').length,
      transactions,
    };
  }
}

export default new MentorBookingService();
