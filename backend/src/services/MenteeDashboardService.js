import { prisma } from '../config/database.js';

class MenteeDashboardService {
  /**
   * Single optimised call — returns stats + upcoming sessions.
   * Uses three parallel DB queries (no JS-side filtering of full tables):
   *   1. COUNT completed bookings
   *   2. SUM duration of completed bookings (hours learned)
   *   3. COUNT upcoming confirmed bookings
   *   4. TOP-3 upcoming confirmed bookings with mentor info
   * Queries 1-3 are aggregates (very fast), query 4 returns only 3 rows.
   */
  async getSessions(menteeId) {
    const now = new Date();

    const [completedCount, completedBookings, upcomingCount, upcomingSessions] =
      await Promise.all([
        // 1. Total completed sessions
        prisma.booking.count({
          where: { menteeId, status: 'COMPLETED' },
        }),

        // 2. Hours learned — durationMinutes lives on MentorService, so fetch only that field
        prisma.booking.findMany({
          where: { menteeId, status: 'COMPLETED' },
          select: { mentorService: { select: { durationMinutes: true } } },
        }),

        // 3. Upcoming sessions count
        prisma.booking.count({
          where: { menteeId, status: 'CONFIRMED', startTime: { gt: now } },
        }),

        // 4. Top 3 upcoming sessions — only the fields the frontend needs
        prisma.booking.findMany({
          where: { menteeId, status: 'CONFIRMED', startTime: { gt: now } },
          orderBy: { startTime: 'asc' },
          take: 3,
          select: {
            id: true,
            startTime: true,
            endTime: true,
            meetingLink: true,
            mentorService: {
              select: { title: true, durationMinutes: true },
            },
            mentorProfile: {
              select: {
                user: {
                  select: { name: true, profilePicture: true },
                },
              },
            },
          },
        }),
      ]);

    // Shape the 3 upcoming sessions for the frontend
    const upcoming = upcomingSessions.map((b) => ({
      id: b.id,
      mentorName: b.mentorProfile.user.name,
      mentorPicture: b.mentorProfile.user.profilePicture,
      serviceType: b.mentorService?.title || 'Session',
      durationMinutes: b.mentorService?.durationMinutes || 60,
      startTime: b.startTime,
      endTime: b.endTime,
      meetingLink: b.meetingLink,
    }));

    const totalMinutes = completedBookings.reduce(
      (sum, b) => sum + (b.mentorService?.durationMinutes || 0), 0
    );

    return {
      stats: {
        totalSessions: completedCount + upcomingCount,
        upcomingSessions: upcomingCount,
        hoursLearned: Math.floor(totalMinutes / 60),
      },
      upcomingSessions: upcoming,
    };
  }

  async getRecommendedMentors() {
    const mentors = await prisma.mentorProfile.findMany({
      where: {
        approvalStatus: 'APPROVED',
      },
      orderBy: {
        averageRating: 'desc',
      },
      take: 3,
      include: {
        user: {
          select: { name: true, profilePicture: true },
        },
      },
    });

    return mentors.map((m) => ({
      id: m.id,
      name: m.user.name,
      profilePicture: m.user.profilePicture,
      pgCollege: m.pgCollegeProfile,
      ugCollege: m.ugCollegeProfile,
      expertise: m.expertiseTags,
      rating: m.averageRating,
      totalSessions: m.totalSessions,
    }));
  }
}

export default new MenteeDashboardService();
