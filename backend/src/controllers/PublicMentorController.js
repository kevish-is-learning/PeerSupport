import { prisma } from '../config/database.js';
import { ApiResponse } from '../utils/apiResponse.js';

const formatWorkExp = (raw, professionalExp) => {
  if (professionalExp) {
    if (!professionalExp.hasExperience && !professionalExp.years && !professionalExp.company && !professionalExp.role) {
      return null;
    }
    const yrs = professionalExp.years ? `${professionalExp.years} yrs` : '';
    const comp = professionalExp.company ? ` at ${professionalExp.company}` : '';
    const role = professionalExp.role ? ` as ${professionalExp.role}` : '';
    const text = `${yrs}${comp}${role}`.trim();
    return text || null;
  }
  if (!raw) return null;
  const parts = String(raw).split('|');
  if (parts.length === 3) {
    if (!parts[0]?.trim() && !parts[1]?.trim() && !parts[2]?.trim()) return null;
    const yrs = parts[0]?.trim() ? `${parts[0].trim()} yrs` : '';
    const comp = parts[1]?.trim() ? ` at ${parts[1].trim()}` : '';
    const role = parts[2]?.trim() ? ` as ${parts[2].trim()}` : '';
    const text = `${yrs}${comp}${role}`.trim();
    return text || null;
  }
  const trimmed = String(raw).trim();
  return trimmed === '—' || trimmed === 'null' || trimmed === 'undefined' || !trimmed ? null : trimmed;
};

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
          education: true,
          professionalExperience: true,
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
          _count: {
            select: { reviews: true },
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
        pgCollege: mentor.education?.mba?.college || mentor.pgCollegeProfile,
        ugCollege: mentor.ugCollegeProfile,
        workExperience: formatWorkExp(mentor.workExperience, mentor.professionalExperience),
        professionalExperience: mentor.professionalExperience,
        certifications: mentor.certifications,
        linkedInUrl: mentor.linkedInUrl,
        totalSessions: mentor.totalSessions,
        averageRating: mentor.averageRating,
        totalReviews: mentor._count.reviews,
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

  /**
   * GET /api/mentors
   * Public — list mentors with search, filtering, and pagination.
   */
  async listMentors(req, res) {
    try {
      const {
        search,
        targetColleges,
        tags,
        sort = 'rating',
        page = 1,
        limit = 10,
      } = req.query;

      const where = { approvalStatus: 'APPROVED' };

      if (search) {
        where.OR = [
          { user: { name: { contains: search, mode: 'insensitive' } } },
          { bio: { contains: search, mode: 'insensitive' } },
          { pgCollegeProfile: { contains: search, mode: 'insensitive' } },
        ];
      }

      if (targetColleges) {
        const colleges = Array.isArray(targetColleges)
          ? targetColleges
          : targetColleges.split(',');
        where.pgCollegeProfile = { in: colleges };
      }

      if (tags) {
        const tagList = Array.isArray(tags) ? tags : tags.split(',');
        where.expertiseTags = { hasSome: tagList };
      }

      let orderBy = {};
      if (sort === 'rating') {
        orderBy = { averageRating: 'desc' };
      } else if (sort === 'sessions') {
        orderBy = { totalSessions: 'desc' };
      } else if (sort === 'newest') {
        orderBy = { createdAt: 'desc' };
      }

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
            education: true,
            workExperience: true,
            professionalExperience: true,
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
            _count: {
              select: { reviews: true },
            },
          },
        }),
        prisma.mentorProfile.count({ where }),
      ]);

      const mapped = mentors.map((m) => ({
        id: m.id,
        name: m.user.name,
        profilePicture: m.user.profilePicture,
        pgCollege: m.education?.mba?.college || m.pgCollegeProfile,
        ugCollege: m.ugCollegeProfile,
        expertiseTags: m.expertiseTags,
        bio: m.bio,
        rating: m.averageRating,
        totalSessions: m.totalSessions,
        startingPrice: m.mentorServices[0]?.price ?? null,
        nextAvailableDate: null,
        workExperience: formatWorkExp(m.workExperience, m.professionalExperience),
        professionalExperience: m.professionalExperience,
        totalReviews: m._count.reviews,
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
