import { prisma } from '../config/database.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { getDayOfWeekFromDate } from '../utils/timeUtils.js';

/** Upper bound on rows pulled when a filter or sort has to be resolved in JS. */
const MAX_SCAN = 500;

/** How far ahead "next available" looks. */
const AVAILABILITY_HORIZON_DAYS = 60;

const toCsvArray = (value) => {
  if (!value) return null;
  const list = Array.isArray(value) ? value : String(value).split(',');
  const cleaned = list.map((v) => v.trim()).filter(Boolean);
  return cleaned.length > 0 ? cleaned : null;
};

const toNumber = (value) => {
  if (value === undefined || value === null || value === '') return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
};

const addDays = (date, days) => {
  const d = new Date(date);
  d.setUTCDate(d.getUTCDate() + days);
  return d;
};

const toDateOnly = (date) => {
  const d = new Date(date);
  d.setUTCHours(0, 0, 0, 0);
  return d;
};

/**
 * Resolve the `availability` shortcut (today/week/month) or explicit
 * availableFrom/availableTo into a UTC date-only range.
 */
const resolveAvailabilityRange = ({ availability, availableFrom, availableTo }) => {
  if (availableFrom || availableTo) {
    const from = availableFrom ? toDateOnly(new Date(availableFrom)) : toDateOnly(new Date());
    const to = availableTo ? toDateOnly(new Date(availableTo)) : addDays(from, 30);
    if (Number.isNaN(from.getTime()) || Number.isNaN(to.getTime())) return null;
    return { from, to };
  }

  if (!availability) return null;

  const from = toDateOnly(new Date());
  const spans = { today: 0, week: 6, month: 29 };
  const span = spans[availability];
  if (span === undefined) return null;

  return { from, to: addDays(from, span) };
};

/** Every weekday name touched by a date range (capped at a full week). */
const weekdaysInRange = ({ from, to }) => {
  const days = new Set();
  const cursor = new Date(from);
  for (let i = 0; i < 7 && cursor <= to; i += 1) {
    days.add(getDayOfWeekFromDate(cursor));
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return [...days];
};

/** Years of experience, from the structured field with a fallback to legacy text. */
const experienceYears = (professionalExp, legacyRaw) => {
  const structured = toNumber(professionalExp?.years);
  if (structured !== null) return structured;
  if (!legacyRaw) return null;
  return toNumber(String(legacyRaw).split('|')[0]);
};

const matchesExperienceBand = (years, band) => {
  if (years === null) return false;
  const [minStr, maxStr] = band.split('-');
  if (band.endsWith('+')) return years >= Number(band.replace('+', ''));
  const min = Number(minStr);
  const max = Number(maxStr);
  if (!Number.isFinite(min) || !Number.isFinite(max)) return false;
  return years >= min && years <= max;
};

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

/**
 * Earliest upcoming date each mentor has an availability window for.
 *
 * Window-level only — it deliberately ignores existing bookings, since this
 * feeds a list badge rather than the booking calendar.
 *
 * @returns {Promise<Map<string, string>>} mentorProfileId → YYYY-MM-DD
 */
async function nextAvailableDates(mentorProfileIds) {
  const result = new Map();
  if (mentorProfileIds.length === 0) return result;

  const today = toDateOnly(new Date());
  const horizon = addDays(today, AVAILABILITY_HORIZON_DAYS);

  const windows = await prisma.availabilityWindow.findMany({
    where: {
      mentorProfileId: { in: mentorProfileIds },
      OR: [
        { specificDate: { gte: today, lte: horizon } },
        { dayOfWeek: { not: null } },
      ],
    },
    select: { mentorProfileId: true, specificDate: true, dayOfWeek: true },
  });

  const byMentor = new Map();
  for (const w of windows) {
    if (!byMentor.has(w.mentorProfileId)) byMentor.set(w.mentorProfileId, []);
    byMentor.get(w.mentorProfileId).push(w);
  }

  for (const [mentorId, mentorWindows] of byMentor) {
    const overrideDates = new Set(
      mentorWindows
        .filter((w) => w.specificDate)
        .map((w) => new Date(w.specificDate).toISOString().split('T')[0])
    );
    const recurringDays = new Set(
      mentorWindows.filter((w) => w.dayOfWeek).map((w) => w.dayOfWeek)
    );

    for (let i = 0; i <= AVAILABILITY_HORIZON_DAYS; i += 1) {
      const day = addDays(today, i);
      const dayStr = day.toISOString().split('T')[0];
      if (overrideDates.has(dayStr) || recurringDays.has(getDayOfWeekFromDate(day))) {
        result.set(mentorId, dayStr);
        break;
      }
    }
  }

  return result;
}

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
        college,
        targetColleges,
        specialization,
        tags,
        minPrice,
        maxPrice,
        minRating,
        experience,
        availability,
        availableFrom,
        availableTo,
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
          { ugCollegeProfile: { contains: search, mode: 'insensitive' } },
          { expertiseTags: { has: search } },
        ];
      }

      // College — stored either on the legacy text column or inside the
      // structured education blob, so both have to be checked.
      const colleges = toCsvArray(targetColleges) || toCsvArray(college);
      if (colleges) {
        where.AND = [
          ...(where.AND || []),
          {
            OR: colleges.flatMap((c) => [
              { pgCollegeProfile: { contains: c, mode: 'insensitive' } },
              { ugCollegeProfile: { contains: c, mode: 'insensitive' } },
              { education: { path: ['mba', 'college'], string_contains: c } },
            ]),
          },
        ];
      }

      const tagList = toCsvArray(tags) || toCsvArray(specialization);
      if (tagList) {
        where.expertiseTags = { hasSome: tagList };
      }

      const min = toNumber(minPrice);
      const max = toNumber(maxPrice);
      if (min !== null || max !== null) {
        where.mentorServices = {
          some: {
            isActive: true,
            price: {
              ...(min !== null ? { gte: min } : {}),
              ...(max !== null ? { lte: max } : {}),
            },
          },
        };
      }

      const ratingFloor = toNumber(minRating);
      if (ratingFloor !== null && ratingFloor > 0) {
        where.averageRating = { gte: ratingFloor };
      }

      const range = resolveAvailabilityRange({ availability, availableFrom, availableTo });
      if (range) {
        where.availabilityWindows = {
          some: {
            OR: [
              { specificDate: { gte: range.from, lte: range.to } },
              { dayOfWeek: { in: weekdaysInRange(range) } },
            ],
          },
        };
      }

      const selection = {
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
        createdAt: true,
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
      };

      const pageNum = Math.max(1, Number(page) || 1);
      const pageSize = Math.max(1, Number(limit) || 10);

      // Experience lives in a JSON blob and price sorting depends on a related
      // aggregate — neither is expressible as a Prisma orderBy/where, so those
      // two cases resolve over a capped scan instead of at the database.
      const isPriceSort = sort === 'price_asc' || sort === 'price_desc';
      const resolveInMemory = Boolean(experience) || isPriceSort;

      let rows;
      let total;

      if (resolveInMemory) {
        const candidates = await prisma.mentorProfile.findMany({
          where,
          select: selection,
          take: MAX_SCAN,
        });

        let filtered = candidates;
        if (experience) {
          filtered = filtered.filter((m) =>
            matchesExperienceBand(
              experienceYears(m.professionalExperience, m.workExperience),
              experience
            )
          );
        }

        const priceOf = (m) => m.mentorServices[0]?.price ?? Number.POSITIVE_INFINITY;
        if (sort === 'price_asc') filtered.sort((a, b) => priceOf(a) - priceOf(b));
        else if (sort === 'price_desc') filtered.sort((a, b) => priceOf(b) - priceOf(a));
        else if (sort === 'sessions') filtered.sort((a, b) => b.totalSessions - a.totalSessions);
        else if (sort === 'newest') filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        else filtered.sort((a, b) => b.averageRating - a.averageRating);

        total = filtered.length;
        rows = filtered.slice((pageNum - 1) * pageSize, pageNum * pageSize);
      } else {
        const orderBy =
          sort === 'sessions' ? { totalSessions: 'desc' }
          : sort === 'newest' ? { createdAt: 'desc' }
          : { averageRating: 'desc' };

        [rows, total] = await Promise.all([
          prisma.mentorProfile.findMany({
            where,
            orderBy,
            skip: (pageNum - 1) * pageSize,
            take: pageSize,
            select: selection,
          }),
          prisma.mentorProfile.count({ where }),
        ]);
      }

      const nextAvailable = await nextAvailableDates(rows.map((m) => m.id));

      const mapped = rows.map((m) => ({
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
        nextAvailableDate: nextAvailable.get(m.id) ?? null,
        workExperience: formatWorkExp(m.workExperience, m.professionalExperience),
        professionalExperience: m.professionalExperience,
        totalReviews: m._count.reviews,
      }));

      return res.status(200).json(
        new ApiResponse(200, 'Mentors fetched successfully', {
          mentors: mapped,
          total,
          page: pageNum,
          limit: pageSize,
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
