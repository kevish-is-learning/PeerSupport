import { prisma } from '../config/database.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { SERVICE_TYPE_LABELS, DAY_OF_WEEK_LABELS } from '../constants/services.js';
import { dateTimeToTimeString } from '../utils/timeUtils.js';

class PublicMentorController {
  /**
   * GET /api/mentors/:mentorId
   * Public — get a mentor's full profile for the booking page.
   */
  async getMentorProfile(req, res) {
    try {
      const { mentorId } = req.params;

      const mentor = await prisma.mentorProfile.findUnique({
        where: { id: mentorId, approvalStatus: 'APPROVED' },
        include: {
          user: {
            select: { name: true, email: true, profilePicture: true },
          },
          services: {
            where: { isActive: true },
            orderBy: { pricePerSession: 'asc' },
          },
          weeklyAvailability: {
            where: { isAvailable: true },
            include: {
              slots: {
                where: { isActive: true },
                include: {
                  slotServices: {
                    include: {
                      mentorService: {
                        select: { id: true, serviceType: true },
                      },
                    },
                  },
                },
                orderBy: { startTime: 'asc' },
              },
            },
            orderBy: { dayOfWeek: 'asc' },
          },
          reviews: {
            orderBy: { createdAt: 'desc' },
            take: 20,
            include: {
              author: {
                select: { name: true, profilePicture: true },
              },
              booking: {
                select: {
                  mentorService: {
                    select: { serviceType: true },
                  },
                },
              },
            },
          },
        },
      });

      if (!mentor) {
        return res.status(404).json({
          success: false,
          message: 'Mentor not found',
        });
      }

      // Map services
      const services = mentor.services.map((s) => ({
        id: s.id,
        serviceType: s.serviceType,
        label: SERVICE_TYPE_LABELS[s.serviceType],
        description: s.description,
        pricePerSession: s.pricePerSession,
        durationMinutes: s.durationMinutes,
        isActive: s.isActive,
      }));

      // Map availability
      const availability = mentor.weeklyAvailability.map((a) => ({
        id: a.id,
        dayOfWeek: a.dayOfWeek,
        dayLabel: DAY_OF_WEEK_LABELS[a.dayOfWeek],
        slots: (a.slots || []).map((slot) => ({
          id: slot.id,
          startTime: dateTimeToTimeString(slot.startTime),
          endTime: dateTimeToTimeString(slot.endTime),
          maxBookings: slot.maxBookings,
          services: (slot.slotServices || []).map((ss) => ({
            mentorServiceId: ss.mentorServiceId,
            serviceType: ss.mentorService?.serviceType,
          })),
        })),
      }));

      // Map reviews
      const reviews = mentor.reviews.map((r) => ({
        id: r.id,
        rating: r.rating,
        review: r.review,
        createdAt: r.createdAt,
        authorName: r.author?.name || 'Anonymous',
        authorPicture: r.author?.profilePicture || null,
        serviceType: r.booking?.mentorService?.serviceType || null,
      }));

      const cheapest = services[0];

      const result = {
        id: mentor.id,
        name: mentor.user.name,
        profilePicture: mentor.user.profilePicture,
        bio: mentor.bio,
        expertiseTags: mentor.expertiseTags,
        pgCollege: mentor.pgCollegeProfile,
        ugCollege: mentor.ugCollegeProfile,
        workExperience: mentor.workExperience,
        certifications: mentor.certifications,
        linkedInUrl: mentor.linkedInUrl,
        totalSessions: mentor.totalSessions,
        averageRating: mentor.averageRating,
        totalReviews: mentor.reviews.length,
        startingPrice: cheapest?.pricePerSession ?? null,
        services,
        availability,
        reviews,
      };

      return res.status(200).json(
        new ApiResponse(200, 'Mentor profile fetched', result)
      );
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Failed to fetch mentor profile',
      });
    }
  }

  async listMentors(req, res) {
    try {
      const {
        search = '',
        college = '',
        specialization = '',
        minRating = 0,
        maxPrice,
        page = 1,
        limit = 20,
        sort = 'rating',
      } = req.query;

      const where = {
        approvalStatus: 'APPROVED',
      };

      // College filter
      if (college && college !== 'all') {
        where.OR = [
          { pgCollegeProfile: { contains: college, mode: 'insensitive' } },
          { ugCollegeProfile: { contains: college, mode: 'insensitive' } },
        ];
      }

      // Specialization / search filter
      if (search) {
        const searchConditions = [
          { user: { name: { contains: search, mode: 'insensitive' } } },
          { pgCollegeProfile: { contains: search, mode: 'insensitive' } },
          { ugCollegeProfile: { contains: search, mode: 'insensitive' } },
          { bio: { contains: search, mode: 'insensitive' } },
          { expertiseTags: { has: search } },
        ];
        if (where.OR) {
          // Combine with existing OR (college filter)
          where.AND = [{ OR: where.OR }, { OR: searchConditions }];
          delete where.OR;
        } else {
          where.OR = searchConditions;
        }
      }

      if (specialization && specialization !== 'all') {
        where.expertiseTags = { has: specialization };
      }

      // Rating filter
      if (minRating && Number(minRating) > 0) {
        where.averageRating = { gte: Number(minRating) };
      }

      // Sort
      let orderBy = { averageRating: 'desc' };
      if (sort === 'sessions') orderBy = { totalSessions: 'desc' };
      if (sort === 'price_asc') orderBy = { services: { _count: 'asc' } };

      const skip = (Number(page) - 1) * Number(limit);

      const [mentors, total] = await Promise.all([
        prisma.mentorProfile.findMany({
          where,
          orderBy,
          skip,
          take: Number(limit),
          include: {
            user: {
              select: { name: true, profilePicture: true },
            },
            services: {
              where: { isActive: true },
              orderBy: { pricePerSession: 'asc' },
              take: 1,
            },
            weeklyAvailability: {
              where: { isAvailable: true },
              orderBy: { dayOfWeek: 'asc' },
              take: 1,
              select: { dayOfWeek: true },
            },
          },
        }),
        prisma.mentorProfile.count({ where }),
      ]);

      const mappedMentors = mentors.map((m) => {
        const cheapestService = m.services[0];
        const nextAvailable = m.weeklyAvailability[0];

        return {
          id: m.id,
          name: m.user.name,
          profilePicture: m.user.profilePicture,
          pgCollege: m.pgCollegeProfile,
          ugCollege: m.ugCollegeProfile,
          expertiseTags: m.expertiseTags,
          bio: m.bio,
          rating: m.averageRating,
          totalSessions: m.totalSessions,
          startingPrice: cheapestService?.pricePerSession ?? null,
          nextAvailableDay: nextAvailable?.dayOfWeek ?? null,
          workExperience: m.workExperience,
        };
      });

      // Apply price filter after fetching (since price is on services)
      let filtered = mappedMentors;
      if (maxPrice) {
        filtered = filtered.filter(
          (m) => m.startingPrice !== null && m.startingPrice <= Number(maxPrice)
        );
      }

      return res.status(200).json(
        new ApiResponse(200, 'Mentors fetched successfully', {
          mentors: filtered,
          total: filtered.length,
          page: Number(page),
          limit: Number(limit),
        })
      );
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Failed to fetch mentors',
      });
    }
  }
}

export default new PublicMentorController();
