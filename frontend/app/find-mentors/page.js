"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Search, Star, BookOpen, Clock, Filter, ChevronDown, X } from "lucide-react";
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
    <Link href={`/mentee/find-mentors/${mentor.id}`} className="block no-underline">
      <div className="flex flex-col rounded-2xl border-2 border-black bg-white shadow-[5px_5px_0px_0px_#8B5CF6] transition-shadow hover:shadow-[8px_8px_0px_0px_#8B5CF6]">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 p-5 pb-3">
          <div className="flex items-center gap-3">
            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl border-2 border-black bg-[#F3E8FF]">
              {mentor.profilePicture ? (
                <img
                  src={resolveUploadUrl(mentor.profilePicture)}
                  alt={mentor.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xl font-black text-[#8B5CF6]">
                  {mentor.name?.charAt(0) || "M"}
                </div>
              )}
            </div>
            <div>
              <h3 className="text-base font-extrabold text-gray-900 leading-tight">{mentor.name}</h3>
              <p className="mt-0.5 text-xs font-semibold text-gray-500">{college}</p>
              <div className="mt-1 flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                <span className="text-xs font-bold text-gray-700">
                  {mentor.rating > 0 ? mentor.rating.toFixed(1) : "New"}
                </span>
              </div>
            </div>
          </div>
          {price !== null && (
            <div className="text-right shrink-0">
              <p className="text-[10px] font-semibold text-gray-400">starting from</p>
              <p className="text-lg font-extrabold text-gray-900">₹{Math.round(price)}</p>
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 px-5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-xs font-semibold text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-3 flex items-center gap-4 px-5 text-xs font-semibold text-gray-500">
          <div className="flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5" />
            {mentor.totalSessions} sessions
          </div>
          {mentor.workExperience && (
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {mentor.workExperience}
            </div>
          )}
        </div>

        {/* Availability */}
        <div className="mx-5 mt-3 rounded-lg bg-[#FFF7ED] px-3 py-2 text-xs font-semibold text-[#92400E]">
          📅 {nextDayLabel}
        </div>

        {/* CTA */}
        <div className="mt-4 px-5 pb-5">
          <div className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-black bg-[#4F46E5] py-3 text-sm font-extrabold text-white shadow-[3px_3px_0px_0px_#1E1E1E] transition-all hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_#1E1E1E] active:translate-y-0 active:shadow-none">
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
      setMentors(res.data.mentors);
      setTotal(res.data.total);
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

  return (
    <div className="min-h-screen bg-[#FAF9F7] font-sans">
      {/* ── Navbar ── */}
      <header className="border-b-2 border-black bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-black bg-[#8B5CF6] text-sm font-black text-white shadow-[2px_2px_0px_0px_#1E1E1E]">
              PS
            </div>
            <span className="text-lg font-extrabold tracking-tight text-gray-900">Peer Support</span>
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#" className="text-sm font-bold text-[#4F46E5]">Find Mentors</a>
            <a href="#" className="text-sm font-semibold text-gray-600 hover:text-gray-900">Services</a>
            <a href="#" className="text-sm font-semibold text-gray-600 hover:text-gray-900">How It Works</a>
            <a href="#" className="text-sm font-semibold text-gray-600 hover:text-gray-900">About</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/auth?mode=login"
              className="rounded-xl border-2 border-black bg-white px-5 py-2 text-sm font-bold text-gray-900 shadow-[2px_2px_0px_0px_#1E1E1E] transition hover:shadow-[4px_4px_0px_0px_#1E1E1E]"
            >
              Sign In
            </Link>
            <Link
              href="/auth?mode=register"
              className="rounded-xl border-2 border-black bg-[#4F46E5] px-5 py-2 text-sm font-bold text-white shadow-[2px_2px_0px_0px_#1E1E1E] transition hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#1E1E1E]"
            >
              Book a Session
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="bg-[#4F46E5] py-14 text-center text-white">
        <h1 className="text-4xl font-black tracking-tight md:text-5xl">
          Find Your Perfect Mentor 🎯
        </h1>
        <p className="mt-3 text-base font-medium text-indigo-200">
          Connect with {total > 0 ? `${total}+` : ""} experienced professionals from top B-schools
        </p>

        {/* Search bar */}
        <div className="mx-auto mt-8 max-w-2xl px-4">
          <div className="flex items-center gap-3 rounded-full border-2 border-black bg-white px-5 py-3 shadow-[4px_4px_0px_0px_#1E1E1E]">
            <Search className="h-5 w-5 shrink-0 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, college, or specialization..."
              className="flex-1 bg-transparent text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none"
            />
            {search && (
              <button onClick={() => setSearch("")}>
                <X className="h-4 w-4 text-gray-400 hover:text-gray-700" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── Body ── */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex gap-8">

          {/* ── Sidebar filters ── */}
          <aside className="w-56 shrink-0 hidden lg:block">
            <div className="rounded-2xl border-2 border-black bg-white p-5 shadow-[5px_5px_0px_0px_#1E1E1E]">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2 font-extrabold text-gray-900">
                  <Filter className="h-4 w-4" /> Filters
                </div>
                <button
                  onClick={clearFilters}
                  className="text-xs font-bold text-[#4F46E5] hover:underline"
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
                    className="w-full appearance-none rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-800 focus:border-[#4F46E5] focus:outline-none"
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
                    className="w-full appearance-none rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-800 focus:border-[#4F46E5] focus:outline-none"
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
                  className="w-full accent-[#4F46E5]"
                />
                <div className="mt-1 flex justify-between text-xs font-semibold text-gray-500">
                  <span>₹0</span>
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
                      className={`rounded-lg border-2 px-3 py-1 text-xs font-bold transition-colors ${
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
            </div>
          </aside>

          {/* ── Mentor grid ── */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="mb-6 flex items-center justify-between gap-4">
              <p className="text-sm font-bold text-gray-700">
                {isLoading ? "Finding mentors…" : `${total} Mentor${total !== 1 ? "s" : ""} Found`}
              </p>
              <div className="flex items-center gap-3">
                <button
                  className="flex items-center gap-2 rounded-xl border-2 border-black bg-white px-4 py-2 text-sm font-bold shadow-[2px_2px_0px_0px_#1E1E1E] lg:hidden"
                  onClick={() => setFiltersOpen(!filtersOpen)}
                >
                  <Filter className="h-4 w-4" /> Filters
                </button>
                <div className="relative">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="appearance-none rounded-xl border-2 border-black bg-white px-4 py-2 pr-8 text-sm font-bold shadow-[2px_2px_0px_0px_#1E1E1E] focus:outline-none"
                  >
                    <option value="rating">Highest Rated</option>
                    <option value="sessions">Most Sessions</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-600" />
                </div>
              </div>
            </div>

            {/* Loading skeleton */}
            {isLoading && (
              <div className="grid gap-6 sm:grid-cols-2">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="h-64 animate-pulse rounded-2xl border-2 border-black bg-gray-100 shadow-[5px_5px_0px_0px_#d1d5db]"
                  />
                ))}
              </div>
            )}

            {/* Grid */}
            {!isLoading && mentors.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2">
                {mentors.map((mentor) => (
                  <MentorCard key={mentor.id} mentor={mentor} />
                ))}
              </div>
            )}

            {/* Empty state */}
            {!isLoading && mentors.length === 0 && (
              <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-black bg-white py-20 text-center shadow-[5px_5px_0px_0px_#1E1E1E]">
                <span className="text-5xl">🔍</span>
                <h3 className="mt-4 text-xl font-extrabold text-gray-900">No mentors found</h3>
                <p className="mt-2 text-sm font-medium text-gray-500">Try adjusting your filters or search terms.</p>
                <button
                  onClick={clearFilters}
                  className="mt-6 rounded-xl border-2 border-black bg-[#4F46E5] px-6 py-2.5 text-sm font-bold text-white shadow-[3px_3px_0px_0px_#1E1E1E] hover:-translate-y-0.5 transition"
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
