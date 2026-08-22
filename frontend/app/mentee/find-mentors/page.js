"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  Search,
  Star,
  BookOpen,
  Clock,
  ChevronDown,
  CalendarCheck,
  Filter,
  X,
} from "lucide-react";
import { publicMentorApi, resolveUploadUrl } from "../../../lib/api";

/* ─── Constants ─────────────────────────────────────────────── */
const SCHOOLS = [
  "",
  "IIM Ahmedabad",
  "IIM Bangalore",
  "IIM Calcutta",
  "IIM Lucknow",
  "IIM Kozhikode",
  "FMS Delhi",
  "XLRI Jamshedpur",
  "SPJIMR Mumbai",
  "ISB Hyderabad",
];

const SPECIALIZATIONS = [
  "",
  "Interview Preparation",
  "Resume Review",
  "Career Guidance",
  "Case Study Practice",
  "GD/WAT Preparation",
  "College Selection",
  "Application Strategy",
  "Mock Interviews",
  "Essay Writing",
  "Networking Tips",
];

const AVAILABILITY_OPTIONS = [
  { label: "Any", value: "" },
  { label: "Available Today", value: "today" },
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
];

const EXPERIENCE_OPTIONS = [
  { label: "Any", value: "" },
  { label: "1-3 years", value: "1-3" },
  { label: "3-5 years", value: "3-5" },
  { label: "5-8 years", value: "5-8" },
  { label: "8+ years", value: "8+" },
];

const RATING_OPTIONS = [
  { label: "All", value: 0 },
  { label: "4+", value: 4 },
  { label: "4.5+", value: 4.5 },
  { label: "5", value: 5 },
];

const SORT_OPTIONS = [
  { label: "Highest Rated", value: "rating" },
  { label: "Most Sessions", value: "sessions" },
  { label: "Price: Low to High", value: "price_asc" },
];

/* ─── Helpers ─────────────────────────────────────────────── */
function formatNextAvailable(dateStr) {
  if (!dateStr) return null;
  const d = new Date(`${dateStr}T00:00:00`);
  const now = new Date();
  const diffMs = d - now;
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return "Next available Today";
  if (diffDays === 1) return "Next available Tomorrow";
  if (diffDays <= 7)
    return `Next available ${diffDays} days`;
  return `Next available ${d.toLocaleDateString("en-IN", { day: "numeric", month: "short" })}`;
}

/* ─── SelectField ───────────────────────────────────────────── */
function SelectField({ label, value, onChange, options, placeholder }) {
  return (
    <div className="mb-5">
      <label className="mb-2 block text-sm font-bold text-gray-900">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-xl border-2 border-gray-200 bg-white px-4 py-2.5 pr-10 text-sm font-medium text-gray-700 transition-colors focus:border-[#7C3AED] focus:outline-none hover:border-gray-300 cursor-pointer"
        >
          <option value="">{placeholder || "Select..."}</option>
          {options.map((opt) => {
            const val = typeof opt === "string" ? opt : opt.value;
            const lbl = typeof opt === "string" ? opt : opt.label;
            return (
              <option key={val} value={val}>
                {lbl}
              </option>
            );
          })}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  );
}

/* ─── MentorCard ───────────────────────────────────────────── */
function MentorCard({ mentor }) {
  const college = mentor.pgCollege || mentor.ugCollege || "B-School";
  const price = mentor.startingPrice;
  const tags = (mentor.expertiseTags || []).slice(0, 3);
  const nextDayLabel = formatNextAvailable(mentor.nextAvailableDate);
  const reviewCount = mentor.totalReviews || 0;

  return (
    <Link
      href={`/mentee/find-mentors/${mentor.id}`}
      className="block no-underline group max-w-full min-w-0"
    >
      <div className="flex flex-col rounded-2xl border-2 border-black bg-white shadow-[4px_4px_0px_0px_#C4B5FD] transition-all hover:shadow-[6px_6px_0px_0px_#A78BFA] hover:-translate-y-0.5 max-w-full overflow-hidden">
        {/* ── Header Row ── */}
        <div className="flex items-start justify-between gap-2.5 p-3.5 sm:p-5 pb-2.5 sm:pb-3 min-w-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
            {/* Avatar */}
            <div className="h-11 w-11 sm:h-12 sm:w-12 shrink-0 overflow-hidden rounded-full border-2 border-[#E9D5FF] bg-[#F3E8FF]">
              {mentor.profilePicture ? (
                <img
                  src={resolveUploadUrl(mentor.profilePicture)}
                  alt={mentor.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-base sm:text-lg font-black text-[#7C3AED]">
                  {mentor.name?.charAt(0) || "M"}
                </div>
              )}
            </div>
            {/* Info */}
            <div className="min-w-0 flex-1">
              <h3 className="text-sm sm:text-base font-extrabold text-gray-900 leading-tight truncate">
                {mentor.name}
              </h3>
              <div className="mt-0.5 flex items-center gap-1.5">
                <Star className="h-3.5 w-3.5 fill-[#F59E0B] text-[#F59E0B] shrink-0" />
                <span className="text-xs font-bold text-gray-800">
                  {mentor.rating > 0 ? mentor.rating.toFixed(1) : "New"}
                </span>
                <span className="text-[11px] text-gray-400 truncate">
                  ({reviewCount} reviews)
                </span>
              </div>
              <p className="mt-0.5 text-xs font-medium text-gray-500 truncate">
                {college}
              </p>
            </div>
          </div>
          {/* Price */}
          {price !== null && price !== undefined && (
            <div className="text-right shrink-0">
              <p className="text-base sm:text-xl font-extrabold text-[#7C3AED]">
                ₹{Math.round(price).toLocaleString("en-IN")}
              </p>
              <p className="text-[10px] font-semibold text-gray-400 -mt-0.5">
                per session
              </p>
            </div>
          )}
        </div>

        {/* ── Bio ── */}
        {mentor.bio && (
          <p className="px-3.5 sm:px-5 mt-2 text-xs text-gray-500 line-clamp-2 break-words overflow-hidden leading-relaxed">
            {mentor.bio}
          </p>
        )}

        {/* ── Tags ── */}
        <div className="flex flex-wrap gap-1.5 px-3.5 sm:px-5 mt-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-lg border border-[#E5E7EB] bg-white px-2 py-0.5 text-[11px] font-semibold text-gray-600 truncate max-w-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* ── Stats Row ── */}
        <div className="mt-2.5 sm:mt-3 flex flex-wrap items-center gap-3 sm:gap-4 px-3.5 sm:px-5 text-[11px] sm:text-xs font-semibold text-gray-500">
          <div className="flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5 shrink-0" />
            <span>{mentor.totalSessions} sessions</span>
          </div>
          {mentor.workExperience && (
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{mentor.workExperience}</span>
            </div>
          )}
        </div>

        {/* ── Next Available ── */}
        {nextDayLabel && (
          <p className="mt-2 px-3.5 sm:px-5 text-[11px] sm:text-xs font-medium text-gray-400 italic truncate">
            {nextDayLabel}
          </p>
        )}

        {/* ── CTA ── */}
        <div className="mt-3 sm:mt-4 px-3.5 sm:px-5 pb-3.5 sm:pb-5">
          <div className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-[#7C3AED] to-[#9333EA] py-2.5 sm:py-3 text-xs sm:text-sm font-extrabold text-white shadow-[0_2px_8px_rgba(124,58,237,0.35)] transition-all group-hover:shadow-[0_4px_16px_rgba(124,58,237,0.5)] group-hover:-translate-y-0.5 active:translate-y-0">
            <CalendarCheck className="h-4 w-4" />
            Book Session
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ─── Main Page ───────────────────────────────────────────── */
export default function ExploreMentorsPage() {
  const [mentors, setMentors] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [school, setSchool] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [maxPrice, setMaxPrice] = useState(5000);
  const [minRating, setMinRating] = useState(0);
  const [availability, setAvailability] = useState("");
  const [experience, setExperience] = useState("");
  const [sort, setSort] = useState("rating");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const fetchMentors = useCallback(async () => {
    try {
      setIsLoading(true);
      const params = {
        search: search.trim() || undefined,
        college: school || undefined,
        specialization: specialization || undefined,
        maxPrice: maxPrice < 5000 ? maxPrice : undefined,
        minRating: minRating > 0 ? minRating : undefined,
        sort,
        limit: 20,
      };
      const res = await publicMentorApi.listMentors(params);
      setMentors(res.data?.mentors || []);
      setTotal(res.data?.total || 0);
    } catch {
      setMentors([]);
    } finally {
      setIsLoading(false);
    }
  }, [search, school, specialization, maxPrice, minRating, sort]);

  // Debounce
  useEffect(() => {
    const t = setTimeout(fetchMentors, 400);
    return () => clearTimeout(t);
  }, [fetchMentors]);

  const clearAllFilters = () => {
    setSchool("");
    setSpecialization("");
    setMaxPrice(5000);
    setMinRating(0);
    setAvailability("");
    setExperience("");
    setSearch("");
  };

  const filterSidebarContent = (
    <div className="p-4 sm:p-5">
      {/* Header */}
      <div className="mb-5 sm:mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-700" />
          <h2 className="text-base font-extrabold text-gray-900">Filters</h2>
        </div>
        <button
          onClick={clearAllFilters}
          className="text-xs font-bold text-[#7C3AED] hover:underline cursor-pointer"
        >
          Clear
        </button>
      </div>

      {/* School */}
      <SelectField
        label="School"
        value={school}
        onChange={setSchool}
        options={SCHOOLS.filter(Boolean)}
        placeholder="All Schools"
      />

      {/* Specialization */}
      <SelectField
        label="Specialization"
        value={specialization}
        onChange={setSpecialization}
        options={SPECIALIZATIONS.filter(Boolean)}
        placeholder="All Specializations"
      />

      {/* Price Range */}
      <div className="mb-5">
        <label className="mb-2 block text-sm font-bold text-gray-900">
          Maximum Price (₹/session)
        </label>
        <input
          type="range"
          min={500}
          max={5000}
          step={100}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-[#7C3AED] h-1.5 rounded-full cursor-pointer"
        />
        <div className="mt-1.5 flex justify-between text-xs sm:text-sm font-bold">
          <span className="text-gray-500">₹500</span>
          <span className="text-[#7C3AED]">
            {maxPrice >= 5000 ? "₹5,000+" : `₹${maxPrice.toLocaleString("en-IN")}`}
          </span>
        </div>
      </div>

      {/* Minimum Rating */}
      <div className="mb-5">
        <label className="mb-2 block text-sm font-bold text-gray-900">
          Minimum Rating
        </label>
        <div className="flex gap-1.5 flex-wrap">
          {RATING_OPTIONS.map((r) => (
            <button
              key={r.value}
              onClick={() => setMinRating(r.value)}
              className={`rounded-lg border-2 px-3 py-1 text-xs font-bold transition-all cursor-pointer ${
                minRating === r.value
                  ? "border-[#F59E0B] bg-[#F59E0B] text-white"
                  : "border-gray-200 bg-white text-gray-700 hover:border-[#F59E0B] hover:text-[#F59E0B]"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Availability */}
      <SelectField
        label="Availability"
        value={availability}
        onChange={setAvailability}
        options={AVAILABILITY_OPTIONS.filter((o) => o.value)}
        placeholder="Any"
      />

      {/* Experience Level */}
      <SelectField
        label="Experience Level"
        value={experience}
        onChange={setExperience}
        options={EXPERIENCE_OPTIONS.filter((o) => o.value)}
        placeholder="Any"
      />
    </div>
  );

  return (
    <div className="flex h-full min-w-0 max-w-full overflow-hidden">
      {/* ════════════ DESKTOP FILTER SIDEBAR ════════════ */}
      <aside className="hidden lg:block w-64 shrink-0 border-r border-gray-200 overflow-y-auto bg-white">
        {filterSidebarContent}
      </aside>

      {/* ════════════ MOBILE FILTER DRAWER ════════════ */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4 lg:hidden animate-in fade-in duration-200">
          <div className="w-full max-h-[85vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl border-2 border-black bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-5 py-3">
              <span className="font-extrabold text-base text-gray-900">Filter Mentors</span>
              <button
                onClick={() => setFiltersOpen(false)}
                className="p-1 rounded-lg hover:bg-gray-100 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {filterSidebarContent}
            <div className="p-4 border-t bg-gray-50">
              <button
                onClick={() => setFiltersOpen(false)}
                className="w-full rounded-xl bg-[#7C3AED] py-3 text-sm font-bold text-white shadow-md cursor-pointer"
              >
                Apply Filters ({total} Mentors)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ════════════ MAIN CONTENT ════════════ */}
      <div className="flex-1 min-w-0 flex flex-col overflow-y-auto">
        {/* Search bar */}
        <div className="px-3.5 sm:px-6 pt-4 sm:pt-5 pb-3 sm:pb-4">
          <div className="flex items-center gap-2.5 sm:gap-3 rounded-2xl border-2 border-gray-200 bg-white px-3.5 sm:px-4 py-2.5 sm:py-3 transition-colors focus-within:border-[#7C3AED]">
            <Search className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, school, or expertise..."
              className="flex-1 bg-transparent text-xs sm:text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none min-w-0"
            />
            {search && (
              <button onClick={() => setSearch("")} className="cursor-pointer">
                <X className="h-4 w-4 text-gray-400 hover:text-gray-700" />
              </button>
            )}
          </div>
        </div>

        {/* Toolbar: count + sort */}
        <div className="px-3.5 sm:px-6 pb-3 sm:pb-4 flex items-center justify-between gap-2">
          <h2 className="text-sm sm:text-lg font-extrabold text-gray-900 truncate">
            {isLoading ? (
              "Finding mentors…"
            ) : (
              <>{total} Mentor{total !== 1 ? "s" : ""} Found</>
            )}
          </h2>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setFiltersOpen(true)}
              className="flex lg:hidden items-center gap-1.5 rounded-xl border border-gray-300 bg-white px-3 py-1.5 text-xs font-bold text-gray-800 shadow-xs cursor-pointer"
            >
              <Filter className="h-3.5 w-3.5" /> Filters
            </button>

            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="appearance-none rounded-xl border-2 border-gray-200 bg-white px-3 py-1.5 pr-8 text-xs sm:text-sm font-bold text-gray-700 focus:border-[#7C3AED] focus:outline-none cursor-pointer"
              >
                {SORT_OPTIONS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Mentor Grid */}
        <div className="flex-1 px-3.5 sm:px-6 pb-8">
          {/* Loading skeletons */}
          {isLoading && (
            <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse flex flex-col rounded-2xl border-2 border-gray-200 bg-white h-56 sm:h-60"
                  style={{ boxShadow: "4px 4px 0px 0px #E5E7EB" }}
                />
              ))}
            </div>
          )}

          {/* Mentor cards */}
          {!isLoading && mentors.length > 0 && (
            <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
              {mentors.map((mentor) => (
                <MentorCard key={mentor.id} mentor={mentor} />
              ))}
            </div>
          )}

          {/* Empty state */}
          {!isLoading && mentors.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-gray-200 bg-white py-14 sm:py-20 px-4 text-center">
              <span className="text-4xl sm:text-5xl">🔍</span>
              <h3 className="mt-4 text-lg sm:text-xl font-extrabold text-gray-900">
                No mentors found
              </h3>
              <p className="mt-2 text-xs sm:text-sm font-medium text-gray-500 max-w-sm">
                Try adjusting your filters or search terms.
              </p>
              <button
                onClick={clearAllFilters}
                className="mt-5 rounded-xl bg-[#7C3AED] px-5 py-2.5 text-xs sm:text-sm font-bold text-white transition hover:bg-[#6D28D9] cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
