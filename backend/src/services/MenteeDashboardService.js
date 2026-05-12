import { prisma } from '../config/database.js';

class MenteeDashboardService {
  async getDashboardStats(menteeId) {
    const bookings = await prisma.booking.findMany({
      where: { menteeId },
      include: {
        mentorService: true,
      },
    });
    
    const now = new Date();
    const upcomingSessions = bookings.filter(
      (b) => b.status === 'CONFIRMED' && new Date(b.startTime) > now
    ).length;

    const completedBookings = bookings.filter((b) => b.status === 'COMPLETED');
    const totalMinutesLearned = completedBookings.reduce((sum, b) => sum + (b.mentorService?.durationMinutes || 0), 0);
    const hoursLearned = Math.floor(totalMinutesLearned / 60);
    const totalSessions  = completedBookings.length;

    return {
      totalSessions,
      upcomingSessions,
      hoursLearned,
    };
  }

  async getUpcomingSessions(menteeId) {
    const now = new Date();
    const upcoming = await prisma.booking.findMany({
      where: {
        menteeId,
        status: 'CONFIRMED',
        startTime: { gt: now },
      },
      orderBy: { startTime: 'asc' },
      take: 5,
      include: {
        mentorProfile: {
          include: {
            user: {
              select: { name: true, profilePicture: true },
            },
          },
        },
              },
    });

    return upcoming.map((b) => ({
      id: b.id,
      mentorName: b.mentorProfile.user.name,
      mentorPicture: b.mentorProfile.user.profilePicture,
      serviceName: b.mentorService?.service?.name || 'Session',
      startTime: b.startTime,
      endTime: b.endTime,
      meetingLink: b.meetingLink,
    }));
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
