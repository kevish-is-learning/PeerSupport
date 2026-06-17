import { prisma } from '../config/database.js';
import { ApiResponse } from '../utils/apiResponse.js';

class MenteeBookingController {
  async getMySessions(req, res) {
    try {
      const menteeId = req.user.id;

      const bookings = await prisma.booking.findMany({
        where: { menteeId },
        orderBy: { startTime: 'asc' },
        include: {
          mentorProfile: {
            include: {
              user: {
                select: { name: true, profilePicture: true },
              },
            },
          },
          mentorService: true,
          payment: true,
        },
      });

      const now = new Date();
      const upcoming = [];
      const past = [];

      bookings.forEach((b) => {
        const sessionData = {
          id: b.id,
          mentorProfileId: b.mentorProfileId,
          mentorServiceId: b.mentorServiceId,
          mentorName: b.mentorProfile.user.name,
          mentorPicture: b.mentorProfile.user.profilePicture,
          serviceName: b.mentorService?.label || b.mentorService?.serviceName || 'Session',
          startTime: b.startTime,
          endTime: b.endTime,
          durationMinutes: b.mentorService?.durationMinutes,
          meetingLink: b.meetingLink,
          status: b.status,
          discussionTopic: b.discussionTopic,
          specificQuestions: b.specificQuestions,
          menteeEmail: b.menteeEmail,
          menteePhone: b.menteePhone,
          price: b.payment?.amount || b.mentorService?.price || 0,
        };

        // Terminal statuses that should always appear in past sessions
        const terminalStatuses = ['CANCELLED_BY_MENTOR', 'CANCELLED_BY_MENTEE', 'COMPLETED', 'NO_SHOW_MENTOR', 'NO_SHOW_MENTEE'];

        if (!terminalStatuses.includes(b.status) && new Date(b.endTime) > now) {
          upcoming.push(sessionData);
        } else if (terminalStatuses.includes(b.status) || new Date(b.endTime) <= now) {
          past.push({
            ...sessionData,
            rating: b.mentorProfile.averageRating,
          });
        }
      });

      // Sort past sessions by descending start time
      past.sort((a, b) => new Date(b.startTime) - new Date(a.startTime));

      return res.status(200).json(
        new ApiResponse(200, 'Sessions fetched successfully', {
          upcoming,
          past,
        })
      );
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Failed to fetch sessions',
      });
    }
  }
}

export default new MenteeBookingController();
