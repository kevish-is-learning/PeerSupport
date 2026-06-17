"use client";

import { useEffect, useState } from "react";
import {
  BarChart3, Calendar, Clock, CheckCircle2, Circle, Target,
  Users, Award, MessageSquare, TrendingUp, Star,
  ChevronRight, BookOpen, FileText, GraduationCap,
} from "lucide-react";
import { menteeAnalyticsApi, resolveUploadUrl } from "../../../lib/api";
import { format } from "date-fns";

/* ═══════════════════════════════════════════════════════════════════
   SKELETON LOADER
   ═══════════════════════════════════════════════════════════════════ */
function AnalyticsSkeleton() {
  return (
    <div className="mx-auto w-full max-w-6xl p-6 md:p-10 animate-pulse">
      <div className="mb-2 h-8 w-48 rounded-lg bg-gray-200" />
      <div className="mb-8 h-4 w-72 rounded bg-gray-200" />

      {/* Stat cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        {[1, 2].map(i => (
          <div key={i} className="rounded-2xl border-2 border-gray-200 bg-white p-6" style={{ boxShadow: '4px 4px 0px 0px #E5E7EB' }}>
            <div className="h-4 w-24 rounded bg-gray-200 mb-3" />
            <div className="h-10 w-16 rounded bg-gray-200" />
          </div>
        ))}
      </div>

      {/* Charts skeleton */}
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="mb-6 rounded-2xl border-2 border-gray-200 bg-white p-6" style={{ boxShadow: '4px 4px 0px 0px #E5E7EB' }}>
          <div className="h-5 w-40 rounded bg-gray-200 mb-4" />
          <div className="h-48 w-full rounded bg-gray-100" />
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   BAR CHART COMPONENT (pure CSS)
   ═══════════════════════════════════════════════════════════════════ */
function SessionsByTypeChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 text-sm text-gray-400 font-medium">
        No session data yet
      </div>
    );
  }

  const maxCount = Math.max(...data.map(d => d.count), 1);

  return (
    <div className="flex items-end gap-3 justify-center" style={{ minHeight: 200 }}>
      {data.map((item, idx) => {
        const heightPct = (item.count / maxCount) * 100;
        return (
          <div key={idx} className="flex flex-col items-center gap-2 flex-1 max-w-[80px]">
            <span className="text-xs font-bold text-gray-700">{item.count}</span>
            <div
              className="w-full rounded-t-lg transition-all duration-700 ease-out"
              style={{
                height: `${Math.max(heightPct * 1.6, 20)}px`,
                backgroundColor: item.color,
                minWidth: 36,
              }}
            />
            <span className="text-[10px] font-bold text-gray-500 text-center leading-tight line-clamp-2">
              {item.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   HORIZONTAL BAR CHART (for college breakdown)
   ═══════════════════════════════════════════════════════════════════ */
function HorizontalBarChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center py-8 text-sm text-gray-400 font-medium">
        No mentor data yet
      </div>
    );
  }

  const maxCount = Math.max(...data.map(d => d.count), 1);

  return (
    <div className="space-y-3">
      {data.map((item, idx) => (
        <div key={idx} className="flex items-center gap-3">
          <span className="text-xs font-bold text-gray-600 w-16 truncate flex-shrink-0">
            {item.college.length > 8 ? item.college.slice(0, 8) : item.college}
          </span>
          <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${(item.count / maxCount) * 100}%`,
                backgroundColor: item.color,
                minWidth: 24,
              }}
            />
          </div>
          <span className="text-xs font-bold text-gray-700 w-6 text-right">{item.count}</span>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   LINE CHART (for satisfaction trend) — pure CSS/SVG
   ═══════════════════════════════════════════════════════════════════ */
function SatisfactionTrendChart({ data }) {
  const validData = data.filter(d => d.avgRating !== null);

  if (validData.length === 0) {
    return (
      <div className="flex items-center justify-center py-8 text-sm text-gray-400 font-medium">
        No satisfaction data yet
      </div>
    );
  }

  const width = 300;
  const height = 140;
  const padding = { top: 20, right: 20, bottom: 30, left: 30 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const minR = 0;
  const maxR = 5;

  const points = data.map((d, i) => {
    const x = padding.left + (i / Math.max(data.length - 1, 1)) * chartW;
    const rating = d.avgRating ?? 0;
    const y = padding.top + chartH - ((rating - minR) / (maxR - minR)) * chartH;
    return { x, y, rating: d.avgRating, label: d.label };
  });

  const validPoints = points.filter(p => p.rating !== null);
  const pathD = validPoints
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ');

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ minWidth: 250 }}>
        {/* Grid lines */}
        {[1, 2, 3, 4, 5].map(v => {
          const y = padding.top + chartH - ((v - minR) / (maxR - minR)) * chartH;
          return (
            <g key={v}>
              <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="#F3F4F6" strokeWidth="1" />
              <text x={padding.left - 8} y={y + 3} textAnchor="end" className="text-[8px] fill-gray-400">{v}</text>
            </g>
          );
        })}

        {/* Line */}
        <path d={pathD} fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* Points */}
        {validPoints.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="4" fill="#10B981" stroke="white" strokeWidth="2" />
          </g>
        ))}

        {/* X Labels */}
        {points.map((p, i) => (
          <text key={i} x={p.x} y={height - 5} textAnchor="middle" className="text-[8px] fill-gray-500 font-medium">
            {p.label}
          </text>
        ))}
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   FEEDBACK THEMES BAR CHART
   ═══════════════════════════════════════════════════════════════════ */
function FeedbackThemesChart({ themes }) {
  if (!themes || themes.length === 0) return null;

  const barColors = ['#8B5CF6', '#06B6D4', '#F59E0B', '#10B981'];

  return (
    <div className="space-y-3">
      {themes.map((theme, idx) => (
        <div key={idx} className="flex items-center gap-3">
          <span className="text-xs font-bold text-gray-600 w-28 truncate flex-shrink-0">
            {theme.label}
          </span>
          <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${theme.score}%`,
                backgroundColor: barColors[idx % barColors.length],
              }}
            />
          </div>
          <span className="text-[10px] font-bold text-gray-500 w-14 text-right">
            {theme.score}/{theme.maxScore}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   CIRCULAR PROGRESS RING
   ═══════════════════════════════════════════════════════════════════ */
function CircularProgress({ percentage, size = 80, strokeWidth = 6, color = '#8B5CF6' }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#F3F4F6" strokeWidth={strokeWidth} />
      <circle
        cx={size / 2} cy={size / 2} r={radius} fill="none"
        stroke={color} strokeWidth={strokeWidth}
        strokeDasharray={circumference} strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-1000 ease-out"
      />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION HEADER
   ═══════════════════════════════════════════════════════════════════ */
const sectionColors = {
  session: { border: '#F97316', bg: '#FFF7ED', shadow: '#F97316' },
  progress: { border: '#8B5CF6', bg: '#FAF5FF', shadow: '#8B5CF6' },
  mentor: { border: '#06B6D4', bg: '#ECFEFF', shadow: '#06B6D4' },
  feedback: { border: '#10B981', bg: '#ECFDF5', shadow: '#10B981' },
};

function SectionTitle({ number, title, colorKey }) {
  const color = sectionColors[colorKey];
  return (
    <h2 className="text-lg font-extrabold text-gray-900 mb-4 flex items-center gap-2">
      <span
        className="inline-flex items-center justify-center w-7 h-7 rounded-lg text-white text-xs font-black"
        style={{ backgroundColor: color.border }}
      >
        {number}
      </span>
      {title}
    </h2>
  );
}

function CardShell({ children, colorKey, className = '' }) {
  const color = sectionColors[colorKey];
  return (
    <div
      className={`rounded-2xl border-2 border-black bg-white overflow-hidden ${className}`}
      style={{ boxShadow: `5px 5px 0px 0px ${color.shadow}` }}
    >
      {children}
    </div>
  );
}

function CardHeader({ children, colorKey }) {
  const color = sectionColors[colorKey];
  return (
    <div className="px-5 py-3 border-b-2 border-black" style={{ backgroundColor: color.bg }}>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════════ */
export default function MenteeAnalyticsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mockGoal, setMockGoal] = useState(6);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await menteeAnalyticsApi.getAnalytics();
        setData(res.data);
      } catch (err) {
        setError(err?.message || 'Failed to load analytics');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <AnalyticsSkeleton />;

  if (error) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="font-bold text-red-500">{error}</p>
      </div>
    );
  }

  const { sessionTracking, progressTracking, mentorInteraction, feedbackInsights } = data;

  return (
    <div className="mx-auto w-full max-w-6xl p-6 md:p-10">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Analytics</h1>
        <p className="mt-1 text-sm font-medium text-gray-500">
          Track your preparation progress and insights
        </p>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
         1. SESSION TRACKING
         ═══════════════════════════════════════════════════════════════ */}
      <SectionTitle number="1" title="Session Tracking" colorKey="session" />

      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 mb-6">
        <CardShell colorKey="session">
          <div className="p-5">
            <p className="text-xs font-bold text-gray-500 mb-1">Total Sessions – All Time</p>
            <p className="text-4xl font-black text-gray-900">{sessionTracking.totalSessions}</p>
          </div>
        </CardShell>
        <CardShell colorKey="session">
          <div className="p-5">
            <p className="text-xs font-bold text-gray-500 mb-1">Completed Sessions</p>
            <p className="text-4xl font-black text-gray-900">{sessionTracking.completedCount}</p>
          </div>
        </CardShell>
      </div>

      {/* Sessions by Type */}
      <CardShell colorKey="session" className="mb-6">
        <CardHeader colorKey="session">
          <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <BarChart3 size={16} />
            Sessions by Type
          </h3>
        </CardHeader>
        <div className="p-5">
          <SessionsByTypeChart data={sessionTracking.sessionsByType} />
        </div>
      </CardShell>

      {/* Upcoming Sessions */}
      <CardShell colorKey="session" className="mb-6">
        <CardHeader colorKey="session">
          <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <Calendar size={16} />
            Upcoming Sessions
          </h3>
        </CardHeader>
        <div className="p-5">
          {sessionTracking.upcomingSessions.length > 0 ? (
            <div className="space-y-3">
              {sessionTracking.upcomingSessions.map(session => (
                <div key={session.id} className="flex items-center gap-3 rounded-xl border border-gray-200 p-3 hover:bg-gray-50 transition-colors">
                  <div className="h-10 w-10 overflow-hidden rounded-full border border-gray-200 bg-gray-50 flex-shrink-0">
                    {session.mentorPicture ? (
                      <img src={resolveUploadUrl(session.mentorPicture)} alt={session.mentorName} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-sm font-bold text-gray-400">
                        {session.mentorName?.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">{session.mentorName}</p>
                    <p className="text-xs text-gray-500">
                      {session.serviceType} • {format(new Date(session.startTime), "MMM d, yyyy • h:mm a")}
                    </p>
                  </div>
                  <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-sm text-gray-400 font-medium py-6">No upcoming sessions</p>
          )}
        </div>
      </CardShell>

      {/* Session History Timeline */}
      <CardShell colorKey="session" className="mb-10">
        <CardHeader colorKey="session">
          <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <Clock size={16} />
            Session History Timeline
          </h3>
        </CardHeader>
        <div className="p-5">
          {sessionTracking.sessionHistory.length > 0 ? (
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[18px] top-3 bottom-3 w-0.5 bg-gray-200" />
              <div className="space-y-0">
                {sessionTracking.sessionHistory.map((item, idx) => (
                  <div key={item.id} className="flex gap-4 py-3 relative">
                    {/* Timeline dot */}
                    <div
                      className="w-[10px] h-[10px] rounded-full flex-shrink-0 mt-1.5 z-10 ring-4 ring-white"
                      style={{ backgroundColor: item.statusColor }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-bold text-gray-900">{item.mentorName}</p>
                        <span
                          className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold text-white"
                          style={{ backgroundColor: item.statusColor }}
                        >
                          {item.status.replace(/_/g, ' ')}
                        </span>
                        {item.rating && (
                          <span className="flex items-center gap-0.5 text-xs text-yellow-500 font-bold">
                            <Star size={10} className="fill-current" /> {item.rating}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {item.serviceType} • {format(new Date(item.startTime), "EEE, MMM d, yyyy")}
                      </p>
                    </div>
                    <ChevronRight size={14} className="text-gray-300 flex-shrink-0 mt-1" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-center text-sm text-gray-400 font-medium py-6">No session history yet</p>
          )}
        </div>
      </CardShell>

      {/* ═══════════════════════════════════════════════════════════════
         2. PROGRESS TRACKING
         ═══════════════════════════════════════════════════════════════ */}
      <SectionTitle number="2" title="Progress Tracking" colorKey="progress" />

      {/* Preparation Checklist Completion */}
      <CardShell colorKey="progress" className="mb-6">
        <CardHeader colorKey="progress">
          <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <CheckCircle2 size={16} />
            Preparation Checklist Completion
          </h3>
        </CardHeader>
        <div className="p-5">
          <div className="flex items-center gap-6 mb-6">
            <div className="relative">
              <CircularProgress percentage={progressTracking.checklistPercentage} size={80} color="#8B5CF6" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-black text-gray-900">{progressTracking.checklistPercentage}%</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 font-medium">
              {progressTracking.completedChecklist} of {progressTracking.totalChecklist} items done
            </p>
          </div>

          <div className="space-y-3">
            {progressTracking.checklistItems.map(item => (
              <label key={item.key} className="flex items-center gap-3 cursor-default">
                {item.completed ? (
                  <CheckCircle2 size={18} className="text-[#8B5CF6] flex-shrink-0" />
                ) : (
                  <Circle size={18} className="text-gray-300 flex-shrink-0" />
                )}
                <span className={`text-sm font-medium ${item.completed ? 'text-gray-900 line-through' : 'text-gray-600'}`}>
                  {item.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      </CardShell>

      {/* Preparation Checklist Detail */}
      <CardShell colorKey="progress" className="mb-6">
        <CardHeader colorKey="progress">
          <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <FileText size={16} />
            Preparation Checklist
          </h3>
        </CardHeader>
        <div className="p-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Shortcut Id</p>
              <p className="text-sm font-bold text-gray-900">{progressTracking.preparationChecklist.shortcutId || '—'}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Name of College</p>
              <p className="text-sm font-bold text-gray-900">{progressTracking.preparationChecklist.nameOfCollege || '—'}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">GPA</p>
              <p className="text-sm font-bold text-gray-900">{progressTracking.preparationChecklist.gpa || '—'}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Upload</p>
              <p className="text-sm font-bold text-gray-900">{progressTracking.preparationChecklist.upload || 0}</p>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-500">Goal Setting → No. of Mock Interviews</p>
                <p className="text-xs text-gray-400 mt-1">this will be opened from the admin side to batch you</p>
              </div>
              <button className="rounded-lg bg-[#8B5CF6] px-4 py-2 text-xs font-bold text-white hover:bg-[#7C3AED] transition-colors">
                Apply
              </button>
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            <button className="rounded-lg bg-[#EF4444] px-4 py-2 text-xs font-bold text-white hover:bg-red-600 transition-colors">
              + Add Another Shortlist
            </button>
            <button className="rounded-lg bg-[#10B981] px-4 py-2 text-xs font-bold text-white hover:bg-emerald-600 transition-colors">
              ✦ Book Your Mock Now
            </button>
          </div>
        </div>
      </CardShell>

      {/* Goal Completion Rate */}
      <CardShell colorKey="progress" className="mb-10">
        <CardHeader colorKey="progress">
          <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <Target size={16} />
            Goal Completion Rate
          </h3>
        </CardHeader>
        <div className="p-5">
          <p className="text-xs text-gray-500 mb-2 font-medium">
            Goal based on preparation milestones
          </p>

          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex items-center gap-3">
              <CircularProgress percentage={progressTracking.goalCompletion.percentage} size={64} strokeWidth={5} color="#8B5CF6" />
              <div className="absolute inset-0 flex items-center justify-center" style={{ width: 64, height: 64 }}>
                <Award size={20} className="text-[#8B5CF6]" />
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">
                {progressTracking.goalCompletion.mockInterviewsDone} of {progressTracking.goalCompletion.mockInterviewGoal} mock interviews completed
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-4 bg-gray-100 rounded-full overflow-hidden mb-4">
            <div
              className="h-full rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${progressTracking.goalCompletion.percentage}%`,
                background: 'linear-gradient(90deg, #8B5CF6, #EC4899)',
              }}
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-gray-500">Set goal (mock interviews)</span>
            <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setMockGoal(g => Math.max(1, g - 1))}
                className="px-2 py-1 text-xs font-bold text-gray-600 hover:bg-gray-100 transition-colors"
              >
                −
              </button>
              <span className="px-3 py-1 text-xs font-bold text-gray-900 bg-white">{mockGoal}</span>
              <button
                onClick={() => setMockGoal(g => g + 1)}
                className="px-2 py-1 text-xs font-bold text-gray-600 hover:bg-gray-100 transition-colors"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </CardShell>

      {/* ═══════════════════════════════════════════════════════════════
         3. MENTOR INTERACTION
         ═══════════════════════════════════════════════════════════════ */}
      <SectionTitle number="3" title="Mentor Interaction" colorKey="mentor" />

      {/* Mentor Stats */}
      <div className="grid gap-4 sm:grid-cols-2 mb-6">
        <CardShell colorKey="mentor">
          <div className="p-5">
            <p className="text-xs font-bold text-gray-500 mb-1 flex items-center gap-1">
              <Users size={12} /> All Unique/Repeat mentors so far
            </p>
            <p className="text-4xl font-black text-gray-900">{mentorInteraction.totalUniqueMentors}</p>
          </div>
        </CardShell>
        <CardShell colorKey="mentor">
          <div className="p-5">
            <p className="text-xs font-bold text-gray-500 mb-1 flex items-center gap-1">
              <Star size={12} /> Most Booked/Interacted Mentor
            </p>
            {mentorInteraction.mostBookedMentor ? (
              <div className="flex items-center gap-3 mt-2">
                <div className="h-10 w-10 rounded-full border border-gray-200 bg-gray-50 overflow-hidden flex-shrink-0">
                  {mentorInteraction.mostBookedMentor.picture ? (
                    <img
                      src={resolveUploadUrl(mentorInteraction.mostBookedMentor.picture)}
                      alt={mentorInteraction.mostBookedMentor.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm font-bold text-gray-400">
                      {mentorInteraction.mostBookedMentor.name?.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{mentorInteraction.mostBookedMentor.name}</p>
                  <p className="text-xs text-gray-500">{mentorInteraction.mostBookedMentor.sessionCount} sessions</p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-400 mt-2">No mentors yet</p>
            )}
          </div>
        </CardShell>
      </div>

      {/* Mentors by College */}
      <CardShell colorKey="mentor" className="mb-10">
        <CardHeader colorKey="mentor">
          <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <GraduationCap size={16} />
            Mentors by College
          </h3>
        </CardHeader>
        <div className="p-5">
          <HorizontalBarChart data={mentorInteraction.mentorsByCollege} />
        </div>
      </CardShell>

      {/* ═══════════════════════════════════════════════════════════════
         4. FEEDBACK & LEARNING INSIGHTS
         ═══════════════════════════════════════════════════════════════ */}
      <SectionTitle number="4" title="Feedback & Learning Insights" colorKey="feedback" />

      <div className="grid gap-6 md:grid-cols-2 mb-10">
        {/* Recurring Feedback Themes */}
        <CardShell colorKey="feedback">
          <CardHeader colorKey="feedback">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <MessageSquare size={16} />
              Recurring Feedback Themes
            </h3>
          </CardHeader>
          <div className="p-5">
            <FeedbackThemesChart themes={feedbackInsights.recurringFeedbackThemes} />
          </div>
        </CardShell>

        {/* Session Satisfaction Trend */}
        <CardShell colorKey="feedback">
          <CardHeader colorKey="feedback">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <TrendingUp size={16} />
              Session Satisfaction Trend
            </h3>
          </CardHeader>
          <div className="p-5">
            <SatisfactionTrendChart data={feedbackInsights.satisfactionTrend} />
          </div>
        </CardShell>
      </div>

      {/* Recent Feedback */}
      {feedbackInsights.recentFeedback.length > 0 && (
        <CardShell colorKey="feedback" className="mb-10">
          <CardHeader colorKey="feedback">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <BookOpen size={16} />
              Recent Mentor Feedback
            </h3>
          </CardHeader>
          <div className="p-5 space-y-4">
            {feedbackInsights.recentFeedback.map(fb => (
              <div key={fb.id} className="rounded-xl border border-gray-200 p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-bold text-gray-900">{fb.mentorName}</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-400">{format(new Date(fb.date), "MMM d, yyyy")}</span>
                </div>
                {fb.strengths && (
                  <div className="mb-1">
                    <span className="text-[10px] font-bold text-emerald-600 uppercase">Strengths: </span>
                    <span className="text-xs text-gray-600">{fb.strengths}</span>
                  </div>
                )}
                {fb.weaknesses && (
                  <div className="mb-1">
                    <span className="text-[10px] font-bold text-orange-500 uppercase">Areas to Improve: </span>
                    <span className="text-xs text-gray-600">{fb.weaknesses}</span>
                  </div>
                )}
                {fb.recommendations && (
                  <div>
                    <span className="text-[10px] font-bold text-blue-500 uppercase">Recommendations: </span>
                    <span className="text-xs text-gray-600">{fb.recommendations}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardShell>
      )}
    </div>
  );
}
