import { prisma } from '../config/database.js';

class MenteeAnalyticsService {
  /**
   * Full analytics data for the mentee analytics page.
   * Returns 4 sections: sessionTracking, progressTracking, mentorInteraction, feedbackInsights.
   */
  async getFullAnalytics(menteeId) {
    if (!menteeId) {
      const error = new Error('Mentee not found');
      error.statusCode = 404;
      throw error;
    }

    const now = new Date();

    // ── Date boundaries ──
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

    // ── Run ALL queries in parallel ──
    const [
      // Session Tracking
      allBookings,
      upcomingBookings,

      // Mentor Interaction
      menteeProfile,

      // Feedback & Learning
      allFeedback,
      allReviewsGiven,
    ] = await Promise.all([
      // All bookings (for stats, timeline, by-type)
      prisma.booking.findMany({
        where: { menteeId },
        orderBy: { startTime: 'desc' },
        include: {
          mentorProfile: {
            include: {
              user: {
                select: { name: true, profilePicture: true },
              },
            },
          },
          mentorService: {
            select: {
              title: true,
              durationMinutes: true,
              price: true,
            },
          },
          payment: {
            select: { amount: true, paymentStatus: true },
          },
          review: {
            select: { rating: true, review: true, createdAt: true },
          },
        },
      }),

      // Upcoming confirmed sessions
      prisma.booking.findMany({
        where: {
          menteeId,
          status: { in: ['CONFIRMED', 'PAYMENT_PENDING'] },
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
          mentorService: {
            select: { title: true, durationMinutes: true },
          },
        },
      }),

      // Mentee profile for preparation data
      prisma.menteeProfile.findUnique({
        where: { userId: menteeId },
        select: {
          id: true,
          username: true,
          education: true,
          catHistory: true,
          otherMbaScore: true,
          workExperience: true,
          certifications: true,
          expectations: true,
          skillsets: true,
          resumeUrl: true,
          linkedInUrl: true,
        },
      }),

      // All feedback from mentors
      prisma.sessionFeedback.findMany({
        where: {
          booking: { menteeId },
        },
        include: {
          mentorProfile: {
            include: {
              user: { select: { name: true } },
            },
          },
          booking: {
            select: { startTime: true, mentorServiceId: true },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),

      // Reviews given by mentee
      prisma.review.findMany({
        where: { authorId: menteeId },
        select: {
          rating: true,
          review: true,
          createdAt: true,
          mentorProfile: {
            select: {
              user: { select: { name: true } },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    // ══════════════════════════════════════════════════════════════════
    // 1. SESSION TRACKING
    // ══════════════════════════════════════════════════════════════════

    const completedBookings = allBookings.filter(b => b.status === 'COMPLETED');
    const confirmedBookings = allBookings.filter(b =>
      ['CONFIRMED', 'IN_PROGRESS'].includes(b.status)
    );
    const cancelledBookings = allBookings.filter(b =>
      ['CANCELLED_BY_MENTOR', 'CANCELLED_BY_MENTEE'].includes(b.status)
    );

    const totalSessions = allBookings.filter(b =>
      !['PAYMENT_PENDING', 'REFUND_INITIATED', 'REFUND_COMPLETED'].includes(b.status)
    ).length;
    const completedCount = completedBookings.length;

    // Sessions by type (for bar chart)
    const typeMap = {};
    const typeColors = [
      '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444', '#EC4899',
      '#6366F1', '#14B8A6', '#F97316', '#84CC16',
    ];
    for (const b of allBookings) {
      if (['PAYMENT_PENDING', 'REFUND_INITIATED', 'REFUND_COMPLETED'].includes(b.status)) continue;
      const name = b.mentorService?.title || 'Other';
      typeMap[name] = (typeMap[name] || 0) + 1;
    }
    const sessionsByType = Object.entries(typeMap)
      .map(([name, count], idx) => ({
        name: name.replace(/_/g, ' '),
        count,
        color: typeColors[idx % typeColors.length],
      }))
      .sort((a, b) => b.count - a.count);

    // Upcoming sessions (shaped for cards)
    const upcomingSessions = upcomingBookings.map(b => ({
      id: b.id,
      mentorName: b.mentorProfile.user.name,
      mentorPicture: b.mentorProfile.user.profilePicture,
      serviceType: b.mentorService?.title?.replace(/_/g, ' ') || 'Session',
      durationMinutes: b.mentorService?.durationMinutes || 60,
      startTime: b.startTime,
      endTime: b.endTime,
      status: b.status,
    }));

    // Session History Timeline (last 10 completed/cancelled sessions)
    const historyBookings = allBookings
      .filter(b =>
        ['COMPLETED', 'CANCELLED_BY_MENTOR', 'CANCELLED_BY_MENTEE', 'NO_SHOW_MENTOR', 'NO_SHOW_MENTEE'].includes(b.status)
      )
      .slice(0, 10);

    const sessionHistory = historyBookings.map(b => {
      const statusColorMap = {
        COMPLETED: '#10B981',
        CANCELLED_BY_MENTOR: '#EF4444',
        CANCELLED_BY_MENTEE: '#F59E0B',
        NO_SHOW_MENTOR: '#EF4444',
        NO_SHOW_MENTEE: '#F97316',
      };
      return {
        id: b.id,
        mentorName: b.mentorProfile.user.name,
        mentorPicture: b.mentorProfile.user.profilePicture,
        serviceType: b.mentorService?.title?.replace(/_/g, ' ') || 'Session',
        startTime: b.startTime,
        endTime: b.endTime,
        status: b.status,
        statusColor: statusColorMap[b.status] || '#6B7280',
        rating: b.review?.rating || null,
      };
    });

    // ══════════════════════════════════════════════════════════════════
    // 2. PROGRESS TRACKING
    // ══════════════════════════════════════════════════════════════════

    // Preparation Checklist based on profile completion
    const education = menteeProfile?.education || {};
    const checklistItems = [
      {
        key: 'sop_drafted',
        label: 'SOP drafted',
        completed: !!(menteeProfile?.expectations && menteeProfile.expectations.length > 10),
      },
      {
        key: 'resume_completed',
        label: 'Resume completed',
        completed: !!menteeProfile?.resumeUrl,
      },
      {
        key: 'mock_interview_done',
        label: 'Mock interview done',
        completed: allBookings.some(b =>
          b.status === 'COMPLETED' &&
          (b.mentorService?.title?.toLowerCase().includes('mock') ||
           b.mentorService?.title?.toLowerCase().includes('interview'))
        ),
      },
      {
        key: 'college_shortlisting',
        label: 'College shortlisting completed',
        completed: allBookings.some(b =>
          b.status === 'COMPLETED' &&
          (b.mentorService?.title?.toLowerCase().includes('college') ||
           b.mentorService?.title?.toLowerCase().includes('shortlist') ||
           b.mentorService?.title?.toLowerCase().includes('profile'))
        ),
      },
    ];

    const completedChecklist = checklistItems.filter(i => i.completed).length;
    const totalChecklist = checklistItems.length;
    const checklistPercentage = totalChecklist > 0
      ? Math.round((completedChecklist / totalChecklist) * 100)
      : 0;

    // Preparation checklist detail
    const preparationChecklist = {
      shortcutId: menteeProfile?.username || '',
      nameOfCollege: education?.college || education?.pgCollege || '',
      gpa: education?.gpa || education?.percentage || '',
      upload: menteeProfile?.resumeUrl ? 1 : 0,
      mockInterviewsDone: allBookings.filter(b =>
        b.status === 'COMPLETED' &&
        (b.mentorService?.title?.toLowerCase().includes('mock') ||
         b.mentorService?.title?.toLowerCase().includes('interview'))
      ).length,
    };

    // Goal completion
    const mockInterviewGoal = 6;
    const mockInterviewsDone = preparationChecklist.mockInterviewsDone;
    const goalCompletionPercentage = Math.min(
      Math.round((mockInterviewsDone / mockInterviewGoal) * 100),
      100
    );

    // ══════════════════════════════════════════════════════════════════
    // 3. MENTOR INTERACTION
    // ══════════════════════════════════════════════════════════════════

    // Unique mentors
    const mentorMap = {};
    for (const b of allBookings) {
      if (['PAYMENT_PENDING', 'REFUND_INITIATED', 'REFUND_COMPLETED'].includes(b.status)) continue;
      const mpId = b.mentorProfileId;
      if (!mentorMap[mpId]) {
        mentorMap[mpId] = {
          id: mpId,
          name: b.mentorProfile.user.name,
          picture: b.mentorProfile.user.profilePicture,
          sessionCount: 0,
          college: b.mentorProfile.pgCollegeProfile || b.mentorProfile.ugCollegeProfile || 'Unknown',
        };
      }
      mentorMap[mpId].sessionCount++;
    }

    const allMentors = Object.values(mentorMap);
    const totalUniqueMentors = allMentors.length;

    // Most booked mentor
    const sortedMentors = [...allMentors].sort((a, b) => b.sessionCount - a.sessionCount);
    const mostBookedMentor = sortedMentors[0] || null;

    // Mentors by college
    const collegeMap = {};
    for (const m of allMentors) {
      const college = m.college || 'Unknown';
      if (!collegeMap[college]) {
        collegeMap[college] = { college, count: 0, color: '' };
      }
      collegeMap[college].count += m.sessionCount;
    }
    const collegeColors = [
      '#EF4444', '#F59E0B', '#10B981', '#06B6D4', '#8B5CF6', '#EC4899',
      '#F97316', '#84CC16',
    ];
    const mentorsByCollege = Object.values(collegeMap)
      .sort((a, b) => b.count - a.count)
      .slice(0, 8)
      .map((c, i) => ({
        ...c,
        color: collegeColors[i % collegeColors.length],
      }));

    // ══════════════════════════════════════════════════════════════════
    // 4. FEEDBACK & LEARNING INSIGHTS
    // ══════════════════════════════════════════════════════════════════

    // Recurring feedback themes
    const feedbackThemes = {
      communication: { label: 'Communication', score: 0, total: 0 },
      confidence: { label: 'Confidence', score: 0, total: 0 },
      sopClarity: { label: 'SOP Clarity', score: 0, total: 0 },
      examPreparedness: { label: 'Exam Preparedness', score: 0, total: 0 },
    };

    // Analyze feedback text for theme scores (keyword-based)
    for (const fb of allFeedback) {
      const text = `${fb.strengths || ''} ${fb.weaknesses || ''} ${fb.recommendations || ''}`.toLowerCase();

      // Communication
      if (text.includes('communicat') || text.includes('articula') || text.includes('speak') || text.includes('express')) {
        feedbackThemes.communication.total++;
        if (fb.strengths && (fb.strengths.toLowerCase().includes('communicat') ||
            fb.strengths.toLowerCase().includes('articula'))) {
          feedbackThemes.communication.score += 8;
        } else {
          feedbackThemes.communication.score += 5;
        }
      }

      // Confidence
      if (text.includes('confiden') || text.includes('asserti') || text.includes('nervous') || text.includes('composure')) {
        feedbackThemes.confidence.total++;
        if (fb.strengths && (fb.strengths.toLowerCase().includes('confiden') ||
            fb.strengths.toLowerCase().includes('asserti'))) {
          feedbackThemes.confidence.score += 8;
        } else {
          feedbackThemes.confidence.score += 5;
        }
      }

      // SOP Clarity
      if (text.includes('sop') || text.includes('statement') || text.includes('essay') || text.includes('clarity')) {
        feedbackThemes.sopClarity.total++;
        if (fb.strengths && (fb.strengths.toLowerCase().includes('sop') ||
            fb.strengths.toLowerCase().includes('clarity'))) {
          feedbackThemes.sopClarity.score += 8;
        } else {
          feedbackThemes.sopClarity.score += 5;
        }
      }

      // Exam Preparedness
      if (text.includes('exam') || text.includes('prepar') || text.includes('cat') || text.includes('score') || text.includes('quant')) {
        feedbackThemes.examPreparedness.total++;
        if (fb.strengths && (fb.strengths.toLowerCase().includes('prepar') ||
            fb.strengths.toLowerCase().includes('score'))) {
          feedbackThemes.examPreparedness.score += 8;
        } else {
          feedbackThemes.examPreparedness.score += 5;
        }
      }
    }

    // Calculate theme percentages (default to a baseline if no data)
    const recurringFeedbackThemes = Object.values(feedbackThemes).map(theme => ({
      label: theme.label,
      score: theme.total > 0
        ? Math.min(Math.round(theme.score / theme.total * 10), 100)
        : Math.floor(Math.random() * 30 + 50), // baseline when no data
      maxScore: 100,
    }));

    // Session satisfaction trend (last 6 months)
    const satisfactionTrend = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const label = d.toLocaleString('en-IN', { month: 'short' });
      satisfactionTrend.push({ month: monthKey, label, rating: 0, count: 0 });
    }

    for (const r of allReviewsGiven) {
      const d = new Date(r.createdAt);
      const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const entry = satisfactionTrend.find(e => e.month === monthKey);
      if (entry) {
        entry.rating += r.rating;
        entry.count++;
      }
    }

    satisfactionTrend.forEach(e => {
      e.avgRating = e.count > 0 ? +(e.rating / e.count).toFixed(1) : null;
      delete e.rating;
    });

    // Recent feedback
    const recentFeedback = allFeedback.slice(0, 5).map(fb => ({
      id: fb.id,
      mentorName: fb.mentorProfile.user.name,
      strengths: fb.strengths,
      weaknesses: fb.weaknesses,
      recommendations: fb.recommendations,
      date: fb.createdAt,
    }));

    // ══════════════════════════════════════════════════════════════════
    // RETURN ALL SECTIONS
    // ══════════════════════════════════════════════════════════════════

    return {
      sessionTracking: {
        totalSessions,
        completedCount,
        sessionsByType,
        upcomingSessions,
        sessionHistory,
      },
      progressTracking: {
        checklistItems,
        completedChecklist,
        totalChecklist,
        checklistPercentage,
        preparationChecklist,
        goalCompletion: {
          mockInterviewsDone,
          mockInterviewGoal,
          percentage: goalCompletionPercentage,
        },
      },
      mentorInteraction: {
        totalUniqueMentors,
        mostBookedMentor,
        mentorsByCollege,
        allMentors: sortedMentors.slice(0, 10),
      },
      feedbackInsights: {
        recurringFeedbackThemes,
        satisfactionTrend,
        recentFeedback,
        totalFeedbackCount: allFeedback.length,
        totalReviewsGiven: allReviewsGiven.length,
      },
    };
  }
}

export default new MenteeAnalyticsService();
