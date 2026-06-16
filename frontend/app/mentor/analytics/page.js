"use client";

import { useState, useEffect } from "react";
import {
  BarChart3,
  Calendar,
  IndianRupee,
  Star,
  TrendingUp,
  Clock,
  Users,
  Zap,
  Target,
  CheckCircle,
  XCircle,
  Loader2,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Repeat,
  Activity,
} from "lucide-react";
import { mentorBookingApi } from "../../../lib/api";
import { toast } from "sonner";
import { resolveUploadUrl } from "../../../lib/api";

// ─── Color palette for session types / services ─────────────────────────────
const SERVICE_COLORS = [
  { bar: "#5061E4", bg: "bg-[#5061E4]" },
  { bar: "#F59E0B", bg: "bg-[#F59E0B]" },
  { bar: "#F97316", bg: "bg-[#F97316]" },
  { bar: "#8B5CF6", bg: "bg-[#8B5CF6]" },
  { bar: "#22C55E", bg: "bg-[#22C55E]" },
  { bar: "#EC4899", bg: "bg-[#EC4899]" },
  { bar: "#06B6D4", bg: "bg-[#06B6D4]" },
  { bar: "#EF4444", bg: "bg-[#EF4444]" },
];

// ─── Star display ───────────────────────────────────────────────────────────
function StarRating({ rating, size = 14 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={size}
          className={s <= rating ? "text-[#F59E0B]" : "text-gray-300"}
          fill={s <= rating ? "#F59E0B" : "none"}
          strokeWidth={2}
        />
      ))}
    </div>
  );
}

// ─── SVG Line Chart ─────────────────────────────────────────────────────────
function MiniLineChart({ data, width = 600, height = 200 }) {
  if (!data || data.length === 0) return null;

  const maxVal = Math.max(...data.map((d) => d.amount), 1);
  const padding = { top: 20, right: 30, bottom: 40, left: 60 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const points = data.map((d, i) => ({
    x: padding.left + (i / Math.max(data.length - 1, 1)) * chartW,
    y: padding.top + chartH - (d.amount / maxVal) * chartH,
    ...d,
  }));

  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  // Area fill
  const areaD = `${pathD} L ${points[points.length - 1].x} ${padding.top + chartH} L ${points[0].x} ${padding.top + chartH} Z`;

  // Y-axis labels
  const yLabels = [0, Math.round(maxVal / 2), maxVal];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full"
      style={{ maxHeight: `${height}px` }}
    >
      {/* Grid lines */}
      {yLabels.map((val, i) => {
        const y = padding.top + chartH - (val / maxVal) * chartH;
        return (
          <g key={i}>
            <line
              x1={padding.left}
              x2={width - padding.right}
              y1={y}
              y2={y}
              stroke="#E5E7EB"
              strokeDasharray="4 4"
            />
            <text
              x={padding.left - 10}
              y={y + 4}
              textAnchor="end"
              className="text-[10px] fill-gray-400 font-semibold"
            >
              ₹{val.toLocaleString("en-IN")}
            </text>
          </g>
        );
      })}

      {/* Area */}
      <path d={areaD} fill="url(#areaGradient)" opacity="0.15" />
      <defs>
        <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Line */}
      <path d={pathD} fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* Dots + labels */}
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="4" fill="#fff" stroke="#F59E0B" strokeWidth="2.5" />
          <text
            x={p.x}
            y={padding.top + chartH + 20}
            textAnchor="middle"
            className="text-[10px] fill-gray-500 font-bold"
          >
            {p.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

// ─── Horizontal bar for earnings/sessions by service ────────────────────────
function HorizontalBar({ name, value, maxValue, color, format = "currency" }) {
  const pct = maxValue > 0 ? (value / maxValue) * 100 : 0;
  return (
    <div className="flex items-center gap-4">
      <span className="text-xs font-bold text-gray-600 w-32 truncate shrink-0">
        {name}
      </span>
      <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${Math.max(pct, 2)}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-xs font-extrabold text-gray-800 w-20 text-right shrink-0">
        {format === "currency"
          ? `₹${value.toLocaleString("en-IN")}`
          : value.toLocaleString("en-IN")}
      </span>
    </div>
  );
}

// ─── Progress ring (circular) ───────────────────────────────────────────────
function ProgressRing({ percentage, size = 80, strokeWidth = 8, color = "#5061E4" }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(percentage, 100) / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#E5E7EB"
        strokeWidth={strokeWidth}
        fill="none"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className="transition-all duration-1000 ease-out"
      />
    </svg>
  );
}

// ─── Section wrapper with colored border ────────────────────────────────────
function AnalyticsSection({ title, icon: Icon, borderColor, shadowColor, children }) {
  return (
    <section
      className="rounded-2xl border-[3px] bg-white overflow-hidden"
      style={{
        borderColor: borderColor,
        boxShadow: `5px 5px 0 0 ${shadowColor}`,
      }}
    >
      <div
        className="flex items-center gap-3 px-6 py-4 border-b-[2px]"
        style={{ borderColor: borderColor }}
      >
        <div
          className="flex items-center justify-center w-8 h-8 rounded-lg"
          style={{ backgroundColor: `${borderColor}18` }}
        >
          <Icon size={18} style={{ color: borderColor }} strokeWidth={2.5} />
        </div>
        <h2 className="text-lg font-extrabold tracking-tight text-black">
          {title}
        </h2>
      </div>
      <div className="p-6">{children}</div>
    </section>
  );
}

// ─── Small stat card ────────────────────────────────────────────────────────
function StatMini({ icon: Icon, value, label, color, subtitle }) {
  return (
    <div className="flex flex-col items-start gap-2 p-4 rounded-xl border-[2px] border-gray-200 bg-[#FAFAFA] hover:border-gray-300 transition-colors">
      <div
        className="flex items-center justify-center w-9 h-9 rounded-lg"
        style={{ backgroundColor: `${color}15` }}
      >
        <Icon size={18} style={{ color }} strokeWidth={2.5} />
      </div>
      <div>
        <p className="text-2xl font-extrabold tracking-tight text-black leading-none">
          {value}
        </p>
        <p className="text-[0.65rem] font-bold text-gray-500 mt-1">{label}</p>
        {subtitle && (
          <p className="text-[0.55rem] font-semibold text-gray-400 mt-0.5">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════════════════

export default function MentorAnalyticsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await mentorBookingApi.getAnalytics();
        setData(res.data?.analytics);
      } catch (e) {
        console.error(e);
        toast.error("Failed to load analytics");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  // ─── Loading skeleton ─────────────────────────────────────────────
  if (loading) {
    return (
      <div className="w-full h-full overflow-y-auto p-8 lg:p-12 bg-[#FFF7F5]">
        <header className="mb-8">
          <div className="h-9 w-48 bg-gray-200 rounded animate-pulse" />
          <div className="mt-2 h-4 w-80 bg-gray-200 rounded animate-pulse" />
        </header>
        <div className="flex flex-col gap-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="rounded-2xl border-[3px] border-gray-200 bg-white p-8 animate-pulse"
              style={{ boxShadow: "5px 5px 0 0 #E5E7EB" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-gray-200" />
                <div className="h-6 w-40 bg-gray-200 rounded" />
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="h-24 bg-gray-100 rounded-xl" />
                ))}
              </div>
              <div className="h-40 bg-gray-100 rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#FFF7F5]">
        <p className="text-gray-500 font-bold">No analytics data available.</p>
      </div>
    );
  }

  const { sessionAnalytics, earningsAnalytics, ratingsAndFeedback, demandInsights, utilisationMetrics } = data;

  // Compute max values for bar charts
  const maxEarningByService = Math.max(
    ...earningsAnalytics.earningsByService.map((s) => s.amount),
    1
  );
  const maxSessionByType = Math.max(
    ...sessionAnalytics.sessionsByType.map((s) => s.count),
    1
  );
  const maxPeakDay = Math.max(
    ...demandInsights.peakBookingDays.map((d) => d.count),
    1
  );

  return (
    <div className="w-full h-full overflow-y-auto p-8 lg:p-12 bg-[#FFF7F5]">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-[#111]">
          Analytics
        </h1>
        <p className="mt-1 text-gray-500 font-medium">
          Deep dive into your mentoring performance, earnings, and feedback
        </p>
      </header>

      <div className="flex flex-col gap-8">
        {/* ════════════════════════════════════════════════════════════════
            1. SESSION ANALYTICS
            ════════════════════════════════════════════════════════════════ */}
        <AnalyticsSection
          title="Session Analytics"
          icon={BarChart3}
          borderColor="#5061E4"
          shadowColor="#5061E433"
        >
          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatMini
              icon={BarChart3}
              value={sessionAnalytics.totalSessions}
              label="Total Sessions"
              color="#5061E4"
              subtitle="All time"
            />
            <StatMini
              icon={Calendar}
              value={sessionAnalytics.monthSessions}
              label="Sessions This Month"
              color="#F59E0B"
              subtitle="Avg 6/mo"
            />
            <StatMini
              icon={CheckCircle}
              value={`${sessionAnalytics.completionRate}%`}
              label="Completion Rate"
              color="#22C55E"
              subtitle="vs cancelled/no-show"
            />
            <StatMini
              icon={Clock}
              value={sessionAnalytics.upcoming7Days}
              label="Upcoming (7 days)"
              color="#8B5CF6"
              subtitle="Confirmed"
            />
          </div>

          {/* Sessions by Type — Table */}
          <div>
            <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-4">
              Sessions By Type
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-100">
                    <th className="text-left py-2 text-xs font-bold text-gray-400 w-8">
                      &nbsp;
                    </th>
                    <th className="text-left py-2 text-xs font-bold text-gray-400">
                      Session Type
                    </th>
                    <th className="text-center py-2 text-xs font-bold text-gray-400 w-20">
                      Count
                    </th>
                    <th className="text-right py-2 text-xs font-bold text-gray-400 w-48">
                      Share
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sessionAnalytics.sessionsByType.map((s, i) => {
                    const color = SERVICE_COLORS[i % SERVICE_COLORS.length];
                    return (
                      <tr
                        key={s.name}
                        className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                      >
                        <td className="py-3">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: color.bar }}
                          />
                        </td>
                        <td className="py-3 font-bold text-black text-sm">
                          {s.name}
                        </td>
                        <td className="py-3 text-center font-extrabold text-black">
                          {s.count}
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-3 justify-end">
                            <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all duration-700"
                                style={{
                                  width: `${s.share}%`,
                                  backgroundColor: color.bar,
                                }}
                              />
                            </div>
                            <span className="text-xs font-bold text-gray-500 w-10 text-right">
                              {s.share}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-gray-200">
                    <td className="py-3" />
                    <td className="py-3 font-extrabold text-gray-500 text-xs">
                      Total
                    </td>
                    <td className="py-3 text-center font-extrabold text-black">
                      {sessionAnalytics.totalByType}
                    </td>
                    <td />
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </AnalyticsSection>

        {/* ════════════════════════════════════════════════════════════════
            2. EARNINGS ANALYTICS
            ════════════════════════════════════════════════════════════════ */}
        <AnalyticsSection
          title="Earnings Analytics"
          icon={IndianRupee}
          borderColor="#22C55E"
          shadowColor="#22C55E33"
        >
          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatMini
              icon={IndianRupee}
              value={`₹${earningsAnalytics.totalEarnings.toLocaleString("en-IN")}`}
              label="Total Earnings"
              color="#5061E4"
              subtitle="After platform fee"
            />
            <div className="flex flex-col items-start gap-2 p-4 rounded-xl border-[2px] border-gray-200 bg-[#FAFAFA]">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#F59E0B15]">
                <TrendingUp size={18} className="text-[#F59E0B]" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-2xl font-extrabold tracking-tight text-black leading-none">
                  ₹{earningsAnalytics.monthEarnings.toLocaleString("en-IN")}
                </p>
                <p className="text-[0.65rem] font-bold text-gray-500 mt-1">
                  This Month
                </p>
                {earningsAnalytics.monthChangePercent !== 0 && (
                  <div className="flex items-center gap-1 mt-1">
                    {earningsAnalytics.monthChangePercent > 0 ? (
                      <ArrowUp size={10} className="text-[#22C55E]" />
                    ) : (
                      <ArrowDown size={10} className="text-[#EF4444]" />
                    )}
                    <span
                      className={`text-[0.55rem] font-bold ${
                        earningsAnalytics.monthChangePercent > 0
                          ? "text-[#22C55E]"
                          : "text-[#EF4444]"
                      }`}
                    >
                      {Math.abs(earningsAnalytics.monthChangePercent)}% vs last
                      month
                    </span>
                  </div>
                )}
              </div>
            </div>
            <StatMini
              icon={Target}
              value={`₹${earningsAnalytics.avgPerSession.toLocaleString("en-IN")}`}
              label="Avg Per Session"
              color="#F97316"
            />
            <div className="flex flex-col items-start gap-2 p-4 rounded-xl border-[2px] border-gray-200 bg-[#FAFAFA]">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#8B5CF615]">
                <Sparkles size={18} className="text-[#8B5CF6]" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-lg font-extrabold tracking-tight text-black leading-tight">
                  {earningsAnalytics.topEarningService}
                </p>
                <p className="text-[0.65rem] font-bold text-gray-500 mt-1">
                  Top Earning Service
                </p>
              </div>
            </div>
          </div>

          {/* Earnings Trend Line Chart */}
          <div className="mb-8">
            <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-4">
              Earnings Trend — Last 6 Months
            </h3>
            <div className="bg-[#FAFAFA] rounded-xl p-4 border border-gray-100">
              <MiniLineChart data={earningsAnalytics.earningsTrend} />
            </div>
          </div>

          {/* Earnings by Service */}
          <div>
            <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-4">
              Earnings By Service Type
            </h3>
            <div className="flex flex-col gap-3">
              {earningsAnalytics.earningsByService.map((s, i) => (
                <HorizontalBar
                  key={s.name}
                  name={s.name}
                  value={s.amount}
                  maxValue={maxEarningByService}
                  color={SERVICE_COLORS[i % SERVICE_COLORS.length].bar}
                />
              ))}
              {earningsAnalytics.earningsByService.length === 0 && (
                <p className="text-sm text-gray-400 font-semibold italic">
                  No earnings data yet
                </p>
              )}
            </div>
          </div>
        </AnalyticsSection>

        {/* ════════════════════════════════════════════════════════════════
            3. RATINGS & FEEDBACK
            ════════════════════════════════════════════════════════════════ */}
        <AnalyticsSection
          title="Ratings & Feedback"
          icon={Star}
          borderColor="#F59E0B"
          shadowColor="#F59E0B33"
        >
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Overall rating */}
            <div className="flex flex-col items-center justify-center gap-3 min-w-[180px]">
              <div className="relative">
                <ProgressRing
                  percentage={(ratingsAndFeedback.averageRating / 5) * 100}
                  size={120}
                  strokeWidth={10}
                  color="#F59E0B"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-extrabold text-black">
                    {ratingsAndFeedback.averageRating.toFixed(1)}
                  </span>
                </div>
              </div>
              <StarRating rating={Math.round(ratingsAndFeedback.averageRating)} size={16} />
              <p className="text-xs font-bold text-gray-400">
                {ratingsAndFeedback.totalReviewCount} total reviews
              </p>
            </div>

            {/* Star distribution */}
            <div className="flex-1">
              <div className="flex flex-col gap-2.5">
                {ratingsAndFeedback.starDistribution.map((s) => (
                  <div key={s.star} className="flex items-center gap-3">
                    <span className="text-sm font-bold text-gray-600 w-6 text-right">
                      {s.star}★
                    </span>
                    <div className="flex-1 h-3.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700 bg-[#F59E0B]"
                        style={{ width: `${Math.max(s.percentage, 1)}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-gray-500 w-12 text-right">
                      {s.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Reviews */}
          <div className="mt-8">
            <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-4">
              Recent Reviews
            </h3>
            {ratingsAndFeedback.recentReviews.length === 0 ? (
              <p className="text-sm text-gray-400 font-semibold italic">
                No reviews yet
              </p>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {ratingsAndFeedback.recentReviews.map((r) => (
                  <div
                    key={r.id}
                    className="p-4 rounded-xl border border-gray-200 bg-[#FAFAFA] hover:border-gray-300 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      {r.authorPicture ? (
                        <img
                          src={resolveUploadUrl(r.authorPicture)}
                          alt={r.authorName}
                          className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-[#5061E4] flex items-center justify-center text-white text-xs font-bold">
                          {r.authorName.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-black truncate">
                          {r.authorName}
                        </p>
                        <p className="text-[0.6rem] font-semibold text-gray-400">
                          {new Date(r.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <StarRating rating={r.rating} size={12} />
                    </div>
                    {r.review && (
                      <p className="text-xs text-gray-600 font-medium leading-relaxed line-clamp-3">
                        &ldquo;{r.review}&rdquo;
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </AnalyticsSection>

        {/* ════════════════════════════════════════════════════════════════
            4 & 5. DEMAND INSIGHTS + UTILISATION (side by side on large screens)
            ════════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* ── 4. DEMAND INSIGHTS ── */}
          <AnalyticsSection
            title="Demand Insights"
            icon={Zap}
            borderColor="#8B5CF6"
            shadowColor="#8B5CF633"
          >
            {/* Most booked service */}
            <div className="mb-6">
              <h3 className="text-[0.6rem] font-extrabold text-gray-400 uppercase tracking-widest mb-2">
                Most Booked Service
              </h3>
              <div className="p-4 rounded-xl border-[2px] border-[#8B5CF6] bg-[#8B5CF608]">
                <p className="text-lg font-extrabold text-black">
                  {demandInsights.mostBookedService}
                </p>
                <p className="text-xs font-semibold text-gray-500 mt-1">
                  {demandInsights.mostBookedServiceCount} bookings
                </p>
              </div>
            </div>

            {/* Client Repeat Rate */}
            <div className="mb-6">
              <h3 className="text-[0.6rem] font-extrabold text-gray-400 uppercase tracking-widest mb-2">
                Client Repeat Rate
              </h3>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#22C55E] transition-all duration-700"
                      style={{
                        width: `${Math.max(demandInsights.clientRepeatRate, 2)}%`,
                      }}
                    />
                  </div>
                </div>
                <span className="text-xl font-extrabold text-black">
                  {demandInsights.clientRepeatRate}%
                </span>
              </div>
              <p className="text-[0.6rem] font-semibold text-gray-400 mt-1">
                {demandInsights.repeatMentees} of {demandInsights.totalUniqueMentees} mentees have booked multiple times
              </p>
            </div>

            {/* Peak Booking Days */}
            <div>
              <h3 className="text-[0.6rem] font-extrabold text-gray-400 uppercase tracking-widest mb-3">
                Peak Booking Days
              </h3>
              <div className="flex items-end gap-2 h-32">
                {demandInsights.peakBookingDays.map((d, i) => {
                  const pct =
                    maxPeakDay > 0 ? (d.count / maxPeakDay) * 100 : 0;
                  return (
                    <div
                      key={d.day}
                      className="flex-1 flex flex-col items-center justify-end h-full"
                    >
                      <span className="text-[0.55rem] font-bold text-gray-600 mb-1">
                        {d.count}
                      </span>
                      <div
                        className="w-full rounded-t-md transition-all duration-700"
                        style={{
                          height: `${Math.max(pct, 4)}%`,
                          backgroundColor:
                            SERVICE_COLORS[i % SERVICE_COLORS.length].bar,
                          opacity: 0.8,
                        }}
                      />
                      <span className="text-[0.55rem] font-bold text-gray-500 mt-1">
                        {d.day}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </AnalyticsSection>

          {/* ── 5. UTILISATION METRICS ── */}
          <AnalyticsSection
            title="Utilisation Metrics"
            icon={Activity}
            borderColor="#F97316"
            shadowColor="#F9731633"
          >
            {/* Slot Utilisation Rate */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold text-gray-600">
                  Slot Utilisation Rate
                </h3>
                <span className="text-2xl font-extrabold text-black">
                  {utilisationMetrics.slotUtilisationRate}%
                </span>
              </div>
              <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#5061E4] transition-all duration-700"
                  style={{
                    width: `${Math.max(utilisationMetrics.slotUtilisationRate, 2)}%`,
                  }}
                />
              </div>
              <p className="text-[0.55rem] font-semibold text-gray-400 mt-1">
                Booked slots vs available slots (last 30 days)
              </p>
            </div>

            {/* Cancellation Rate */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold text-gray-600">
                  Cancellation Rate
                </h3>
                <span className="text-2xl font-extrabold text-black">
                  {utilisationMetrics.cancellationRate}%
                </span>
              </div>
              <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#F59E0B] transition-all duration-700"
                  style={{
                    width: `${Math.max(utilisationMetrics.cancellationRate, 2)}%`,
                  }}
                />
              </div>
              <p className="text-[0.55rem] font-semibold text-gray-400 mt-1">
                Across all cancelled bookings vs total
              </p>
            </div>

            {/* Count Boxes */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex flex-col items-center p-4 rounded-xl border-[2px] border-gray-200 bg-[#DCFCE7]">
                <span className="text-3xl font-extrabold text-[#16A34A]">
                  {utilisationMetrics.sessionsCompleted}
                </span>
                <span className="text-[0.6rem] font-bold text-[#166534] mt-1">
                  Sessions Completed
                </span>
              </div>
              <div className="flex flex-col items-center p-4 rounded-xl border-[2px] border-gray-200 bg-[#FEE2E2]">
                <span className="text-3xl font-extrabold text-[#DC2626]">
                  {utilisationMetrics.sessionsCancelled}
                </span>
                <span className="text-[0.6rem] font-bold text-[#991B1B] mt-1">
                  Sessions Cancelled
                </span>
              </div>
            </div>

            {/* Free Cancellation Quota */}
            <div className="p-4 rounded-xl border-[2px] border-[#F97316] bg-[#FFF7ED]">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold text-gray-700">
                  Free Cancellation Quota
                </h3>
                <span className="text-sm font-extrabold text-[#F97316]">
                  {utilisationMetrics.freeCancellationsUsed} / {utilisationMetrics.freeCancellationsTotal} Used
                </span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${
                      utilisationMetrics.freeCancellationsTotal > 0
                        ? (utilisationMetrics.freeCancellationsUsed /
                            utilisationMetrics.freeCancellationsTotal) *
                          100
                        : 0
                    }%`,
                    backgroundColor:
                      utilisationMetrics.freeCancellationsUsed >=
                      utilisationMetrics.freeCancellationsTotal
                        ? "#EF4444"
                        : "#F97316",
                  }}
                />
              </div>
              <p className="text-[0.55rem] font-semibold text-gray-400 mt-1.5">
                {utilisationMetrics.freeCancellationsTotal -
                  utilisationMetrics.freeCancellationsUsed}{" "}
                free cancellations remaining this year. After exhausting,
                a 5% penalty applies.
              </p>
            </div>
          </AnalyticsSection>
        </div>
      </div>
    </div>
  );
}
