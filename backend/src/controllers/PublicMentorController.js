import { prisma } from '../config/database.js';
import { ApiResponse } from '../utils/apiResponse.js';

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
          mentorServices: {
            where: { isActive: true },
                        orderBy: { price: 'asc' },
          },
          availabilityWindows: {
            include: {
              windowServices: {
                include: {
                  mentorService: {
                    select: { title: true },
                  },
                },
              },
            },
            orderBy: { startTime: 'asc' },
          },
          reviews: {
            orderBy: { createdAt: 'desc' },
            take: 20,
            include: {
              author: {
                select: { name: true, profilePicture: true },
              },
              booking: {
                include: {
                  mentorService: {
                    select: { title: true },
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
      const services = mentor.mentorServices.map((ms) => ({
        id: ms.id,
        serviceId: ms.id,
        serviceName: ms.title,
        label: ms.title, // Added for frontend compatibility
        serviceSlug: ms.title?.toLowerCase().replace(/\s+/g, '-'),
        serviceType: ms.title?.toLowerCase().replace(/\s+/g, '-'), // Added for frontend compatibility
        price: ms.price,
        pricePerSession: ms.price, // Added for frontend compatibility
        durationMinutes: ms.durationMinutes,
        bufferMinutes: ms.bufferMinutes,
        isActive: ms.isActive,
      }));

      // Map availability
      const availability = mentor.availabilityWindows.map((w) => ({
        id: w.id,
        specificDate: w.specificDate
          ? new Date(w.specificDate).toISOString().split('T')[0]
          : null,
        dayOfWeek: w.dayOfWeek,
        startTime: w.startTime,
        endTime: w.endTime,
        services: (w.windowServices || []).map((ws) => ({
          mentorServiceId: ws.mentorServiceId,
          serviceName: ws.mentorService?.title,
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
        serviceName: r.booking?.mentorService?.title || null,
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
        startingPrice: cheapest?.price ?? null,
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
      if (sort === 'price_asc') orderBy = { mentorServices: { _count: 'asc' } };

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
            mentorServices: {
              where: { isActive: true },
                            orderBy: { price: 'asc' },
              take: 1,
            },
            availabilityWindows: {
              orderBy: { specificDate: 'asc' },
              take: 1,
              select: { specificDate: true },
            },
            _count: {
              select: { reviews: true },
            },
          },
        }),
        prisma.mentorProfile.count({ where }),
      ]);

      const mappedMentors = mentors.map((m) => {
        const cheapestService = m.mentorServices[0];
        const nextAvailable = m.availabilityWindows[0];

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
          startingPrice: cheapestService?.price ?? null,
          nextAvailableDate: nextAvailable?.specificDate
            ? new Date(nextAvailable.specificDate).toISOString().split('T')[0]
            : null,
          workExperience: m.workExperience,
          totalReviews: m._count?.reviews || 0,
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
