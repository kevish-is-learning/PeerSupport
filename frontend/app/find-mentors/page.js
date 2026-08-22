"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Search, Star, BookOpen, Clock, Filter, ChevronDown, X, Menu } from "lucide-react";
import { publicMentorApi, resolveUploadUrl } from "../../lib/api";

/* ─── Helpers ─────────────────────────────────────────────── */
function formatNextAvailable(dateStr) {
  if (!dateStr) return "Availability TBD";
  const d = new Date(`${dateStr}T00:00:00`);
  return `Next available: ${d.toLocaleDateString("en-IN", { month: "short", day: "numeric" })}`;
}

const SPECIALIZATIONS = [
  "All Specializations", "Interview Preparation", "Resume Review",
  "Career Guidance", "Case Study Practice", "GD/WAT Preparation",
  "College Selection", "Application Strategy", "Mock Interviews",
  "Essay Writing", "Networking Tips",
];

const COLLEGES = [
  "All Colleges", "IIM Ahmedabad", "IIM Bangalore", "IIM Calcutta",
  "IIM Lucknow", "IIM Kozhikode", "FMS Delhi", "XLRI Jamshedpur",
  "SPJIMR Mumbai", "ISB Hyderabad",
];

const RATING_OPTIONS = [
  { label: "All", value: 0 },
  { label: "4+", value: 4 },
  { label: "4.5+", value: 4.5 },
  { label: "4.8+", value: 4.8 },
];

/* ─── Sub-components ──────────────────────────────────────── */
function MentorCard({ mentor }) {
  const college = mentor.pgCollege || mentor.ugCollege || "B-School";
  const price = mentor.startingPrice;
  const tags = (mentor.expertiseTags || []).slice(0, 3);
  const nextDayLabel = formatNextAvailable(mentor.nextAvailableDate);

  return (
    <Link href={`/mentee/find-mentors/${mentor.id}`} className="block no-underline max-w-full min-w-0">
      <div className="flex flex-col rounded-2xl border-2 border-black bg-white shadow-[4px_4px_0px_0px_#8B5CF6] transition-all hover:shadow-[6px_6px_0px_0px_#8B5CF6] hover:-translate-y-0.5 max-w-full overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between gap-2.5 p-3.5 sm:p-5 pb-2.5 sm:pb-3 min-w-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
            <div className="h-11 w-11 sm:h-14 sm:w-14 shrink-0 overflow-hidden rounded-xl border-2 border-black bg-[#F3E8FF]">
              {mentor.profilePicture ? (
                <img
                  src={resolveUploadUrl(mentor.profilePicture)}
                  alt={mentor.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-lg sm:text-xl font-black text-[#8B5CF6]">
                  {mentor.name?.charAt(0) || "M"}
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm sm:text-base font-extrabold text-gray-900 leading-tight truncate">{mentor.name}</h3>
              <p className="mt-0.5 text-xs font-semibold text-gray-500 truncate">{college}</p>
              <div className="mt-1 flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-[#F59E0B] text-[#F59E0B] shrink-0" />
                <span className="text-xs font-bold text-gray-700">
                  {mentor.rating > 0 ? mentor.rating.toFixed(1) : "New"}
                </span>
              </div>
            </div>
          </div>
          {price !== null && (
            <div className="text-right shrink-0">
              <p className="text-[10px] font-semibold text-gray-400">from</p>
              <p className="text-base sm:text-lg font-extrabold text-gray-900">₹{Math.round(price)}</p>
            </div>
          )}
        </div>

        {/* Bio */}
        {mentor.bio && (
          <p className="px-3.5 sm:px-5 mt-2 text-xs text-gray-500 line-clamp-2 break-words overflow-hidden leading-relaxed">
            {mentor.bio}
          </p>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 px-3.5 sm:px-5 mt-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-gray-200 bg-gray-50 px-2 py-0.5 text-[11px] font-semibold text-gray-600 truncate max-w-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Stats */}
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

        {/* Availability */}
        <div className="mx-3.5 sm:mx-5 mt-2.5 rounded-lg bg-[#FFF7ED] px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold text-[#92400E] truncate">
          📅 {nextDayLabel}
        </div>

        {/* CTA */}
        <div className="mt-3 sm:mt-4 px-3.5 sm:px-5 pb-3.5 sm:pb-5">
          <div className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-black bg-[#4F46E5] py-2.5 sm:py-3 text-xs sm:text-sm font-extrabold text-white shadow-[2px_2px_0px_0px_#1E1E1E] sm:shadow-[3px_3px_0px_0px_#1E1E1E] transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#1E1E1E] active:translate-y-0 active:shadow-none">
            📅 Book Session
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ─── Main page ───────────────────────────────────────────── */
export default function FindMentorsPage() {
  const [mentors, setMentors] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [college, setCollege] = useState("All Colleges");
  const [specialization, setSpecialization] = useState("All Specializations");
  const [maxPrice, setMaxPrice] = useState(3000);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState("rating");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const fetchMentors = useCallback(async () => {
    try {
      setIsLoading(true);
      const params = {
        search: search.trim() || undefined,
        college: college === "All Colleges" ? undefined : college,
        specialization: specialization === "All Specializations" ? undefined : specialization,
        maxPrice: maxPrice < 3000 ? maxPrice : undefined,
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
  }, [search, college, specialization, maxPrice, minRating, sort]);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(fetchMentors, 400);
    return () => clearTimeout(t);
  }, [fetchMentors]);

  const clearFilters = () => {
    setCollege("All Colleges");
    setSpecialization("All Specializations");
    setMaxPrice(3000);
    setMinRating(0);
    setSort("rating");
  };

  const filterContent = (
    <>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 font-extrabold text-gray-900">
          <Filter className="h-4 w-4" /> Filters
        </div>
        <button
          onClick={clearFilters}
          className="text-xs font-bold text-[#4F46E5] hover:underline cursor-pointer"
        >
          Clear
        </button>
      </div>

      {/* B-School */}
      <div className="mb-5">
        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-500">B-School</label>
        <div className="relative">
          <select
            value={college}
            onChange={(e) => setCollege(e.target.value)}
            className="w-full appearance-none rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-800 focus:border-[#4F46E5] focus:outline-none cursor-pointer"
          >
            {COLLEGES.map((c) => <option key={c}>{c}</option>)}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Specialization */}
      <div className="mb-5">
        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-500">Specialization</label>
        <div className="relative">
          <select
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            className="w-full appearance-none rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-800 focus:border-[#4F46E5] focus:outline-none cursor-pointer"
          >
            {SPECIALIZATIONS.map((s) => <option key={s}>{s}</option>)}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Price */}
      <div className="mb-5">
        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-500">
          Price Range (₹/session)
        </label>
        <input
          type="range"
          min={500}
          max={3000}
          step={100}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-[#4F46E5] cursor-pointer"
        />
        <div className="mt-1 flex justify-between text-xs font-semibold text-gray-500">
          <span>₹500</span>
          <span>₹{maxPrice === 3000 ? "3000+" : maxPrice}</span>
        </div>
      </div>

      {/* Rating */}
      <div className="mb-5">
        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-500">Minimum Rating</label>
        <div className="flex gap-1.5 flex-wrap">
          {RATING_OPTIONS.map((r) => (
            <button
              key={r.value}
              onClick={() => setMinRating(r.value)}
              className={`rounded-lg border-2 px-3 py-1 text-xs font-bold transition-colors cursor-pointer ${
                minRating === r.value
                  ? "border-[#4F46E5] bg-[#4F46E5] text-white"
                  : "border-gray-200 bg-white text-gray-700 hover:border-[#4F46E5]"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#FAF9F7] font-sans">
      {/* ── Navbar ── */}
      <header className="border-b-2 border-black bg-white sticky top-0 z-30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3.5">
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-black bg-[#8B5CF6] text-sm font-black text-white shadow-[2px_2px_0px_0px_#1E1E1E]">
              PS
            </div>
            <span className="text-base sm:text-lg font-extrabold tracking-tight text-gray-900">Peer Support</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex text-sm font-bold">
            <Link href="/find-mentors" className="text-[#4F46E5]">Find Mentors</Link>
            <Link href="/#services" className="text-gray-600 hover:text-gray-900">Services</Link>
            <Link href="/#how-it-works" className="text-gray-600 hover:text-gray-900">How It Works</Link>
            <Link href="/#about" className="text-gray-600 hover:text-gray-900">About</Link>
          </nav>
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/auth?mode=login"
              className="rounded-xl border-2 border-black bg-white px-4 py-2 text-xs sm:text-sm font-bold text-gray-900 shadow-[2px_2px_0px_0px_#1E1E1E] transition hover:shadow-[4px_4px_0px_0px_#1E1E1E]"
            >
              Sign In
            </Link>
            <Link
              href="/auth?mode=register"
              className="rounded-xl border-2 border-black bg-[#4F46E5] px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-[2px_2px_0px_0px_#1E1E1E] transition hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#1E1E1E]"
            >
              Book a Session
            </Link>
          </div>
          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="flex sm:hidden h-9 w-9 items-center justify-center rounded-lg border-2 border-black bg-white text-black shadow-[2px_2px_0px_0px_#1E1E1E]"
            aria-label="Toggle menu"
          >
            {mobileNavOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile Navbar Dropdown */}
        {mobileNavOpen && (
          <div className="border-t-2 border-black bg-[#FAF9F7] px-4 py-4 sm:hidden flex flex-col gap-3">
            <Link href="/find-mentors" onClick={() => setMobileNavOpen(false)} className="text-sm font-bold text-[#4F46E5]">Find Mentors</Link>
            <Link href="/#services" onClick={() => setMobileNavOpen(false)} className="text-sm font-semibold text-gray-700">Services</Link>
            <Link href="/#how-it-works" onClick={() => setMobileNavOpen(false)} className="text-sm font-semibold text-gray-700">How It Works</Link>
            <Link href="/#about" onClick={() => setMobileNavOpen(false)} className="text-sm font-semibold text-gray-700">About</Link>
            <div className="flex gap-2 pt-2 border-t border-gray-200">
              <Link
                href="/auth?mode=login"
                onClick={() => setMobileNavOpen(false)}
                className="flex-1 text-center rounded-lg border-2 border-black bg-white py-2 text-xs font-bold text-gray-900"
              >
                Sign In
              </Link>
              <Link
                href="/auth?mode=register"
                onClick={() => setMobileNavOpen(false)}
                className="flex-1 text-center rounded-lg border-2 border-black bg-[#4F46E5] py-2 text-xs font-bold text-white"
              >
                Book Session
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ── Hero ── */}
      <section className="bg-[#4F46E5] py-10 sm:py-14 text-center text-white px-4">
        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black tracking-tight break-words">
          Find Your Perfect Mentor 🎯
        </h1>
        <p className="mt-2 sm:mt-3 text-xs xs:text-sm sm:text-base font-medium text-indigo-200">
          Connect with {total > 0 ? `${total}+` : ""} experienced professionals from top B-schools
        </p>

        {/* Search bar */}
        <div className="mx-auto mt-6 sm:mt-8 max-w-2xl">
          <div className="flex items-center gap-2.5 sm:gap-3 rounded-full border-2 border-black bg-white px-4 sm:px-5 py-2.5 sm:py-3 shadow-[4px_4px_0px_0px_#1E1E1E]">
            <Search className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, college, specialization..."
              className="flex-1 bg-transparent text-xs sm:text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none min-w-0"
            />
            {search && (
              <button onClick={() => setSearch("")} className="cursor-pointer">
                <X className="h-4 w-4 text-gray-400 hover:text-gray-700" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── Body ── */}
      <div className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="flex gap-8">
          {/* ── Desktop Sidebar filters ── */}
          <aside className="w-56 shrink-0 hidden lg:block">
            <div className="rounded-2xl border-2 border-black bg-white p-5 shadow-[5px_5px_0px_0px_#1E1E1E] sticky top-24">
              {filterContent}
            </div>
          </aside>

          {/* ── Mobile Filter Modal/Drawer ── */}
          {filtersOpen && (
            <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4 lg:hidden">
              <div className="w-full max-h-[85vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl border-2 border-black bg-white p-5 shadow-2xl animate-in slide-in-from-bottom duration-200">
                <div className="flex justify-end mb-2">
                  <button
                    onClick={() => setFiltersOpen(false)}
                    className="p-1 rounded-lg hover:bg-gray-100 cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                {filterContent}
                <button
                  onClick={() => setFiltersOpen(false)}
                  className="w-full mt-4 rounded-xl border-2 border-black bg-[#4F46E5] py-3 text-sm font-bold text-white shadow-[2px_2px_0px_0px_#1E1E1E] cursor-pointer"
                >
                  Apply Filters ({total} Mentors)
                </button>
              </div>
            </div>
          )}

          {/* ── Mentor grid ── */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="mb-4 sm:mb-6 flex items-center justify-between gap-3">
              <p className="text-xs sm:text-sm font-bold text-gray-700 truncate">
                {isLoading ? "Finding mentors…" : `${total} Mentor${total !== 1 ? "s" : ""} Found`}
              </p>
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  className="flex items-center gap-1.5 rounded-xl border-2 border-black bg-white px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold shadow-[2px_2px_0px_0px_#1E1E1E] lg:hidden cursor-pointer"
                  onClick={() => setFiltersOpen(true)}
                >
                  <Filter className="h-3.5 w-3.5" /> Filters
                </button>
                <div className="relative">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="appearance-none rounded-xl border-2 border-black bg-white px-3 py-1.5 pr-7 sm:px-4 sm:py-2 sm:pr-8 text-xs sm:text-sm font-bold shadow-[2px_2px_0px_0px_#1E1E1E] focus:outline-none cursor-pointer"
                  >
                    <option value="rating">Highest Rated</option>
                    <option value="sessions">Most Sessions</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2 sm:right-2.5 top-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 -translate-y-1/2 text-gray-600" />
                </div>
              </div>
            </div>

            {/* Loading skeleton */}
            {isLoading && (
              <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-60 sm:h-64 animate-pulse rounded-2xl border-2 border-black bg-gray-100 shadow-[4px_4px_0px_0px_#d1d5db]"
                  />
                ))}
              </div>
            )}

            {/* Grid */}
            {!isLoading && mentors.length > 0 && (
              <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
                {mentors.map((mentor) => (
                  <MentorCard key={mentor.id} mentor={mentor} />
                ))}
              </div>
            )}

            {/* Empty state */}
            {!isLoading && mentors.length === 0 && (
              <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-black bg-white py-12 sm:py-20 px-4 text-center shadow-[4px_4px_0px_0px_#1E1E1E]">
                <span className="text-4xl sm:text-5xl">🔍</span>
                <h3 className="mt-4 text-lg sm:text-xl font-extrabold text-gray-900">No mentors found</h3>
                <p className="mt-2 text-xs sm:text-sm font-medium text-gray-500 max-w-sm">Try adjusting your filters or search terms.</p>
                <button
                  onClick={clearFilters}
                  className="mt-5 rounded-xl border-2 border-black bg-[#4F46E5] px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-[2px_2px_0px_0px_#1E1E1E] hover:-translate-y-0.5 transition cursor-pointer"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
