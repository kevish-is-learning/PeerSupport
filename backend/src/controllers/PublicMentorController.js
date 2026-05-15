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

      // Search filter
      if (search) {
        const searchConditions = [
          { user: { name: { contains: search, mode: 'insensitive' } } },
          { pgCollegeProfile: { contains: search, mode: 'insensitive' } },
          { ugCollegeProfile: { contains: search, mode: 'insensitive' } },
          { bio: { contains: search, mode: 'insensitive' } },
          { expertiseTags: { has: search } },
        ];
        if (where.OR) {
          where.AND = [{ OR: where.OR }, { OR: searchConditions }];
          delete where.OR;
        } else {
          where.OR = searchConditions;
        }
      }

      if (specialization && specialization !== 'all') {
        where.expertiseTags = { has: specialization };
      }

      if (minRating && Number(minRating) > 0) {
        where.averageRating = { gte: Number(minRating) };
      }

      // If filtering by maxPrice, push it into the where clause
      // so mentors without affordable services are excluded at the DB level
      if (maxPrice) {
        where.mentorServices = {
          some: { isActive: true, price: { lte: Number(maxPrice) } },
        };
      }

      let orderBy = { averageRating: 'desc' };
      if (sort === 'sessions') orderBy = { totalSessions: 'desc' };

      const skip = (Number(page) - 1) * Number(limit);

      const [mentors, total] = await Promise.all([
        prisma.mentorProfile.findMany({
          where,
          orderBy,
          skip,
          take: Number(limit),
          select: {
            id: true,
            bio: true,
            expertiseTags: true,
            pgCollegeProfile: true,
            ugCollegeProfile: true,
            workExperience: true,
            averageRating: true,
            totalSessions: true,
            user: {
              select: { name: true, profilePicture: true },
            },
            mentorServices: {
              where: { isActive: true },
              orderBy: { price: 'asc' },
              take: 1,
              select: { price: true },
            },
          },
        }),
        prisma.mentorProfile.count({ where }),
      ]);

      const mapped = mentors.map((m) => ({
        id: m.id,
        name: m.user.name,
        profilePicture: m.user.profilePicture,
        pgCollege: m.pgCollegeProfile,
        ugCollege: m.ugCollegeProfile,
        expertiseTags: m.expertiseTags,
        bio: m.bio,
        rating: m.averageRating,
        totalSessions: m.totalSessions,
        startingPrice: m.mentorServices[0]?.price ?? null,
        nextAvailableDate: null,
        workExperience: m.workExperience,
        totalReviews: 0,
      }));

      return res.status(200).json(
        new ApiResponse(200, 'Mentors fetched successfully', {
          mentors: mapped,
          total,
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
