import { prisma } from '../config/database.js';

/** How many top-rated mentors get scored before picking the best matches. */
const CANDIDATE_POOL = 60;

const TAG_MATCH_POINTS = 5;
const COLLEGE_MATCH_POINTS = 4;
const BIO_MATCH_POINTS = 1;

/** Words too common to carry any signal about what a mentee wants. */
const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'but', 'by', 'can', 'for', 'from',
  'get', 'have', 'help', 'how', 'i', 'in', 'is', 'it', 'me', 'my', 'need', 'of',
  'on', 'or', 'that', 'the', 'to', 'want', 'was', 'what', 'with', 'would', 'you',
]);

const tokenize = (text) =>
  String(text || '')
    .toLowerCase()
    .split(/[^a-z0-9+]+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));

/** Goal keywords drawn from what the mentee wrote about themselves. */
function extractMenteeKeywords(profile) {
  if (!profile) return new Set();

  const words = [
    ...tokenize(profile.expectations),
    ...(profile.skillsets || []).flatMap(tokenize),
  ];

  return new Set(words);
}

/** Colleges the mentee is aiming for, so alumni rank higher. */
function extractTargetColleges(profile) {
  if (!profile) return new Set();

  const raw = profile.catHistory?.targetColleges || profile.education?.targetColleges;
  const list = Array.isArray(raw) ? raw : raw ? [raw] : [];

  return new Set(list.map((c) => String(c).toLowerCase().trim()).filter(Boolean));
}

function scoreMentor(mentor, keywords, targetColleges) {
  let score = 0;

  if (keywords.size > 0) {
    for (const tag of mentor.expertiseTags || []) {
      if (tokenize(tag).some((word) => keywords.has(word))) {
        score += TAG_MATCH_POINTS;
      }
    }

    const bioWords = new Set(tokenize(mentor.bio));
    for (const keyword of keywords) {
      if (bioWords.has(keyword)) score += BIO_MATCH_POINTS;
    }
  }

  if (targetColleges.size > 0) {
    const mentorColleges = [
      mentor.education?.mba?.college,
      mentor.pgCollegeProfile,
      mentor.ugCollegeProfile,
    ]
      .filter(Boolean)
      .map((c) => String(c).toLowerCase());

    for (const target of targetColleges) {
      if (mentorColleges.some((c) => c.includes(target) || target.includes(c))) {
        score += COLLEGE_MATCH_POINTS;
        break;
      }
    }
  }

  return score;
}

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

        // 3. Upcoming/Active sessions count
        prisma.booking.count({
          where: { menteeId, status: 'CONFIRMED', endTime: { gt: now } },
        }),

        // 4. Top 3 upcoming/active sessions — only the fields the frontend needs
        prisma.booking.findMany({
          where: { menteeId, status: 'CONFIRMED', endTime: { gt: now } },
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

  /**
   * Keyword-based mentor suggestions.
   *
   * Scores approved mentors against the mentee's stated goals — expectations,
   * skillsets and target colleges — then falls back to reputation as a
   * tiebreaker so a mentee with an empty profile still gets sensible results.
   * Mentors the mentee has already booked are excluded.
   */
  async getRecommendedMentors(menteeId, take = 3) {
    const [profile, mentors, pastBookings] = await Promise.all([
      menteeId
        ? prisma.menteeProfile.findUnique({
            where: { userId: menteeId },
            select: {
              expectations: true,
              skillsets: true,
              education: true,
              catHistory: true,
            },
          })
        : null,
      prisma.mentorProfile.findMany({
        where: { approvalStatus: 'APPROVED' },
        orderBy: { averageRating: 'desc' },
        take: CANDIDATE_POOL,
        select: {
          id: true,
          bio: true,
          expertiseTags: true,
          pgCollegeProfile: true,
          ugCollegeProfile: true,
          education: true,
          averageRating: true,
          totalSessions: true,
          user: { select: { name: true, profilePicture: true } },
        },
      }),
      menteeId
        ? prisma.booking.findMany({
            where: { menteeId },
            select: { mentorProfileId: true },
            distinct: ['mentorProfileId'],
          })
        : [],
    ]);

    const alreadyBooked = new Set(pastBookings.map((b) => b.mentorProfileId));
    const keywords = extractMenteeKeywords(profile);
    const targetColleges = extractTargetColleges(profile);

    const ranked = mentors
      .filter((m) => !alreadyBooked.has(m.id))
      .map((m) => ({ mentor: m, score: scoreMentor(m, keywords, targetColleges) }))
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        if (b.mentor.averageRating !== a.mentor.averageRating) {
          return b.mentor.averageRating - a.mentor.averageRating;
        }
        return b.mentor.totalSessions - a.mentor.totalSessions;
      })
      .slice(0, take);

    return ranked.map(({ mentor: m, score }) => ({
      id: m.id,
      name: m.user.name,
      profilePicture: m.user.profilePicture,
      pgCollege: m.education?.mba?.college || m.pgCollegeProfile,
      ugCollege: m.ugCollegeProfile,
      expertise: m.expertiseTags,
      rating: m.averageRating,
      totalSessions: m.totalSessions,
      matchScore: score,
    }));
  }
}

export default new MenteeDashboardService();
