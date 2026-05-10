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
          mentorService: {
            include: { service: true },
          },
        },
      });

      const now = new Date();
      const upcoming = [];
      const past = [];

      bookings.forEach((b) => {
        const sessionData = {
          id: b.id,
          mentorName: b.mentorProfile.user.name,
          mentorPicture: b.mentorProfile.user.profilePicture,
          serviceName: b.mentorService?.service?.name || 'Session',
          startTime: b.startTime,
          endTime: b.endTime,
          durationMinutes: b.mentorService?.durationMinutes,
          meetingLink: b.meetingLink,
          status: b.status,
        };

        if (new Date(b.startTime) > now && b.status !== 'CANCELLED') {
          upcoming.push(sessionData);
        } else if (new Date(b.startTime) <= now) {
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
