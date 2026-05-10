import { prisma } from '../config/database.js';
import { ApiResponse } from '../utils/apiResponse.js';

class PublicMentorController {
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
