"use client";

import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import {
  ExternalLink,
  FileText,
  GraduationCap,
  Briefcase,
  Award,
  Calendar,
  Phone,
  Mail,
  CheckCircle2,
} from "lucide-react";
import { adminApi, resolveUploadUrl } from "../../../lib/api";
import MentorVerificationCall from "../../../components/admin/MentorVerificationCall";

function LinkedInIcon({ className = "h-4 w-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28" />
    </svg>
  );
}

const parseLegacyProfile = (value, keys) =>
  Object.fromEntries(
    keys.map((key, index) => [key, (value || "").split("|")[index]?.trim() || ""]),
  );

const getMentorEducation = (m) => {
  const mba = m.education?.mba || parseLegacyProfile(m.pgProfile, ["college", "specialization", "graduationYear"]);
  const undergraduate = m.education?.undergraduate || parseLegacyProfile(m.ugCollegeProfile, ["college", "degree", "specialization", "graduationYear"]);
  return { mba, undergraduate };
};

const getMentorExperience = (m) => {
  if (m.professionalExperience && typeof m.professionalExperience === "object") {
    const p = m.professionalExperience;
    return {
      hasExperience: Boolean(p.hasExperience ?? (p.years || p.company || p.role)),
      years: p.years ? String(p.years) : "",
      company: p.company || "",
      role: p.role || "",
    };
  }
  const legacy = parseLegacyProfile(m.workExperience, ["years", "company", "role"]);
  return {
    hasExperience: Boolean(legacy.years || legacy.company || legacy.role),
    ...legacy,
  };
};

const formatDate = (v) => {
  if (!v) return "-";
  try { return new Date(v).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }); } catch { return v; }
};
const formatCurrency = (v) => `₹${(v || 0).toLocaleString("en-IN")}`;

const STATUS_COLORS = {
  PENDING: "border-amber-900/50 bg-amber-950/20 text-amber-400",
  APPROVED: "border-emerald-900/50 bg-emerald-950/20 text-emerald-400",
  REJECTED: "border-red-900/50 bg-red-950/20 text-red-400",
  SUSPENDED: "border-orange-900/50 bg-orange-950/20 text-orange-400",
};

const TABS = [
  { key: "all", label: "All Mentors" },
  { key: "PENDING", label: "Pending" },
  { key: "APPROVED", label: "Approved" },
  { key: "SUSPENDED", label: "Suspended" },
  { key: "REJECTED", label: "Rejected" },
];

export default function AdminMentorsPage() {
  const [mentors, setMentors] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");
  const [mutatingId, setMutatingId] = useState("");
  const [expandedId, setExpandedId] = useState("");
  const [notesByProfile, setNotesByProfile] = useState({});

  const loadMentors = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const res = await adminApi.listMentors({
        page,
        limit: 20,
        search: search || undefined,
        approvalStatus: tab === "all" ? undefined : tab,
      });
      setMentors(res.data.mentors);
      setPagination(res.data.pagination);
    } catch (err) {
      toast.error(err.message || "Failed to load mentors");
    } finally {
      setLoading(false);
    }
  }, [search, tab]);

  useEffect(() => {
    loadMentors(1);
  }, [loadMentors]);

  const handleApproval = async (profileId, approvalStatus) => {
    setMutatingId(profileId);
    try {
      const note = (notesByProfile[profileId] || "").trim();
      await adminApi.updateApproval(profileId, { approvalStatus, adminReviewNotes: note });
      toast.success(`Mentor ${approvalStatus.toLowerCase()}`);
      loadMentors(pagination.page);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setMutatingId("");
    }
  };

  const handleSuspend = async (profileId) => {
    setMutatingId(profileId);
    try {
      await adminApi.suspendMentor(profileId);
      toast.success("Mentor suspended");
      loadMentors(pagination.page);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setMutatingId("");
    }
  };

  const handleUnsuspend = async (profileId) => {
    setMutatingId(profileId);
    try {
      await adminApi.unsuspendMentor(profileId);
      toast.success("Mentor unsuspended");
      loadMentors(pagination.page);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setMutatingId("");
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">Mentors</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Review applications, suspend accounts, and view performance.</p>
      </header>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                tab === t.key
                  ? "border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-black shadow-xs"
                  : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 dark:border-zinc-800 dark:bg-black dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search mentors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 sm:w-64 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0a0a0a] px-4 py-2 text-sm text-zinc-900 dark:text-white outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:border-indigo-500 transition-colors shadow-xs"
          />
        </div>
      </div>

      <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
        {pagination.total} mentors found
      </div>

      {/* Mentor List */}
      <section className="space-y-4">
        {loading ? (
          <div className="flex h-48 items-center justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-[3px] border-zinc-300 dark:border-zinc-800 border-t-indigo-600 dark:border-t-white" />
          </div>
        ) : mentors.length === 0 ? (
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0a0a0a] p-12 text-center shadow-xs">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">No mentors found</p>
          </div>
        ) : (
          mentors.map((m) => (
            <article key={m.id} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0a0a0a] overflow-hidden shadow-xs transition-colors">
              <div className="p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {m.profilePicture ? (
                      <img src={resolveUploadUrl(m.profilePicture)} alt="" className="h-12 w-12 rounded-xl object-cover" />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 text-lg font-medium text-zinc-600 dark:text-zinc-400">
                        {(m.name || "?")[0]}
                      </div>
                    )}
                    <div>
                      <h3 className="text-base font-semibold text-zinc-900 dark:text-white">{m.name}</h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">@{m.username} · {m.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${STATUS_COLORS[m.approvalStatus] || "border-zinc-300 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900/50"}`}>
                      {m.approvalStatus}
                    </span>
                    {!m.isActive && (
                      <span className="inline-block rounded-full border border-red-900/50 bg-red-950/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-red-400">
                        Deactivated
                      </span>
                    )}
                  </div>
                </div>

                {/* Stats Row */}
                <div className="mt-5 flex flex-wrap gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-500">★</span>
                    <span className="font-semibold text-zinc-900 dark:text-white">{m.averageRating?.toFixed(1) || "0.0"}</span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">({m.totalReviews})</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Sessions</span>
                    <span className="font-medium text-zinc-900 dark:text-white mt-0.5">{m.totalSessions}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Cancellations</span>
                    <span className="font-medium text-zinc-900 dark:text-white mt-0.5">{m.cancellations}</span>
                  </div>
                  {m.wallet && (
                    <div className="flex flex-col">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Wallet</span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">{formatCurrency(m.wallet.available)}</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  {m.approvalStatus === "PENDING" && (
                    <div className="flex flex-1 flex-wrap items-center gap-3">
                      <input
                        type="text"
                        placeholder="Review notes (optional)..."
                        value={notesByProfile[m.id] || ""}
                        onChange={(e) => setNotesByProfile((p) => ({ ...p, [m.id]: e.target.value }))}
                        className="flex-1 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-black px-3 py-1.5 text-xs text-zinc-900 dark:text-white outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:border-indigo-500 transition-colors"
                      />
                      <button
                        onClick={() => handleApproval(m.id, "APPROVED")}
                        disabled={!!mutatingId}
                        className="rounded-lg border border-emerald-900/50 bg-emerald-950/30 px-4 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-900/50 transition-colors disabled:opacity-50 cursor-pointer"
                      >
                        {mutatingId === m.id ? "..." : "Approve"}
                      </button>
                      <button
                        onClick={() => handleApproval(m.id, "REJECTED")}
                        disabled={!!mutatingId}
                        className="rounded-lg border border-red-900/50 bg-red-950/30 px-4 py-1.5 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-900/50 transition-colors disabled:opacity-50 cursor-pointer"
                      >
                        {mutatingId === m.id ? "..." : "Reject"}
                      </button>
                    </div>
                  )}
                  {m.approvalStatus === "APPROVED" && (
                    <button
                      onClick={() => handleSuspend(m.id)}
                      disabled={!!mutatingId}
                      className="rounded-lg border border-orange-900/50 bg-orange-950/30 px-4 py-1.5 text-xs font-semibold text-orange-600 dark:text-orange-400 hover:bg-orange-900/50 transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      {mutatingId === m.id ? "..." : "Suspend"}
                    </button>
                  )}
                  {m.approvalStatus === "SUSPENDED" && (
                    <button
                      onClick={() => handleUnsuspend(m.id)}
                      disabled={!!mutatingId}
                      className="rounded-lg border border-emerald-900/50 bg-emerald-950/30 px-4 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-900/50 transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      {mutatingId === m.id ? "..." : "Unsuspend"}
                    </button>
                  )}
                  <button
                    onClick={() => setExpandedId(expandedId === m.id ? "" : m.id)}
                    className="ml-auto rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-black px-4 py-1.5 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors cursor-pointer"
                  >
                    {expandedId === m.id ? "Hide Details" : "View Details"}
                  </button>
                </div>

                {/* Expanded Detail */}
                {expandedId === m.id && (() => {
                  const edu = getMentorEducation(m);
                  const exp = getMentorExperience(m);
                  const qa = m.mentoringQA || {};
                  return (
                  <div className="mt-6 border-t border-zinc-200 dark:border-zinc-800 pt-6 space-y-6">
                    {/* Row 1: Contact & Basic Info */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Joined</p>
                        <p className="mt-1 text-sm font-medium text-zinc-900 dark:text-white">{formatDate(m.createdAt)}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Phone</p>
                        <p className="mt-1 text-sm font-medium text-zinc-900 dark:text-white">{m.contactNumber ? `+91 ${m.contactNumber}` : "—"}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">LinkedIn</p>
                        {m.linkedInUrl ? (
                          <div className="mt-1">
                            <a
                              href={m.linkedInUrl.startsWith("http") ? m.linkedInUrl : `https://${m.linkedInUrl}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Open LinkedIn Profile"
                              className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 dark:border-blue-900/60 bg-blue-50 dark:bg-blue-950/30 px-3 py-1.5 text-xs font-semibold text-[#0077B5] dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors shadow-2xs group cursor-pointer"
                            >
                              <LinkedInIcon className="h-4 w-4 fill-current shrink-0" />
                              <span>LinkedIn</span>
                              <ExternalLink size={12} className="opacity-70 group-hover:opacity-100" />
                            </a>
                          </div>
                        ) : (
                          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">—</p>
                        )}
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Verification Document</p>
                        {m.collegeDocumentUrl ? (
                          <div className="mt-1">
                            <a
                              href={resolveUploadUrl(m.collegeDocumentUrl)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/30 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors shadow-2xs group cursor-pointer"
                            >
                              <FileText size={14} className="shrink-0" />
                              <span>View Proof</span>
                              <ExternalLink size={12} className="opacity-70 group-hover:opacity-100" />
                            </a>
                          </div>
                        ) : (
                          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Not uploaded</p>
                        )}
                      </div>
                    </div>

                    {/* Row 2: Education */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* MBA Education */}
                      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <GraduationCap size={16} className="text-indigo-600 dark:text-blue-400" />
                          <h4 className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-blue-400">MBA / PG Education</h4>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">B-School</p>
                            <p className="text-sm font-medium text-zinc-900 dark:text-white mt-0.5">{edu.mba?.college || "—"}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Specialization</p>
                            <p className="text-sm font-medium text-zinc-900 dark:text-white mt-0.5">{edu.mba?.specialization || "—"}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Year</p>
                            <p className="text-sm font-medium text-zinc-900 dark:text-white mt-0.5">{edu.mba?.graduationYear || "—"}</p>
                          </div>
                        </div>
                      </div>

                      {/* UG Education */}
                      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <GraduationCap size={16} className="text-amber-600 dark:text-amber-400" />
                          <h4 className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">Undergraduate Education</h4>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          <div>
                            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">College</p>
                            <p className="text-sm font-medium text-zinc-900 dark:text-white mt-0.5">{edu.undergraduate?.college || "—"}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Degree</p>
                            <p className="text-sm font-medium text-zinc-900 dark:text-white mt-0.5">{edu.undergraduate?.degree || "—"}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Specialization</p>
                            <p className="text-sm font-medium text-zinc-900 dark:text-white mt-0.5">{edu.undergraduate?.specialization || "—"}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Year</p>
                            <p className="text-sm font-medium text-zinc-900 dark:text-white mt-0.5">{edu.undergraduate?.graduationYear || "—"}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Row 3: Work Experience */}
                    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Briefcase size={16} className="text-cyan-600 dark:text-cyan-400" />
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">Work Experience</h4>
                      </div>
                      {!exp.hasExperience && !exp.years && !exp.company && !exp.role ? (
                        <div className="flex items-center gap-2">
                          <span className="inline-block rounded-md border border-cyan-300/60 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-950/30 px-3 py-1.5 text-xs font-semibold text-cyan-800 dark:text-cyan-300">
                            Fresher (No Prior Work Experience)
                          </span>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Years of Exp</p>
                            <p className="text-sm font-medium text-zinc-900 dark:text-white mt-0.5">{exp.years ? `${exp.years} years` : "—"}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Company</p>
                            <p className="text-sm font-medium text-zinc-900 dark:text-white mt-0.5">{exp.company || "—"}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Role</p>
                            <p className="text-sm font-medium text-zinc-900 dark:text-white mt-0.5">{exp.role || "—"}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Row 4: Expertise Tags */}
                    {m.expertiseTags && m.expertiseTags.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Award size={16} className="text-indigo-600 dark:text-indigo-400" />
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Areas of Expertise</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {m.expertiseTags.map((tag) => (
                            <span key={tag} className="inline-block rounded-full border border-indigo-200 dark:border-indigo-900/50 bg-indigo-50 dark:bg-indigo-950/30 px-2.5 py-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Row 5: Bio */}
                    {m.bio && (
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">About / Bio</p>
                        <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-line break-words overflow-hidden max-w-full bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">{m.bio}</p>
                      </div>
                    )}

                    {/* Row 6: Onboarding Q&A */}
                    {(qa.q1 || qa.q2 || qa.q3 || qa.q4 || qa.q5) && (
                      <div className="rounded-xl border border-indigo-200 dark:border-indigo-900/40 bg-indigo-50/50 dark:bg-indigo-950/10 p-5">
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-4">📝 Onboarding Answers — &ldquo;B-School &amp; Mentoring Insights&rdquo;</h4>
                        <div className="space-y-4">
                          {qa.q1 && (
                            <div>
                              <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Q1: Post entrance test (CAT, XAT, SNAP, etc.) process in 5 steps</p>
                              <p className="text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed">{qa.q1}</p>
                            </div>
                          )}
                          {qa.q2 && (
                            <div>
                              <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Q2: Similarity/patterns in questions asked to Freshers vs Workex aspirants</p>
                              <p className="text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed">{qa.q2}</p>
                            </div>
                          )}
                          {qa.q3 && (
                            <div>
                              <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Q3: 3 Differentiators of your B-School &amp; 3 aspirant pointers</p>
                              <p className="text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed">{qa.q3}</p>
                            </div>
                          )}
                          {qa.q4 && (
                            <div>
                              <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Q4: 3 best things and 2 worst things in campus life</p>
                              <p className="text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed">{qa.q4}</p>
                            </div>
                          )}
                          {qa.q5 && (
                            <div>
                              <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Q5: 3 pointers to turn the interview decision in your favor &amp; why</p>
                              <p className="text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed">{qa.q5}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Row 7: Wallet + Verification Call */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="grid grid-cols-2 gap-6 lg:border-r border-zinc-200 dark:border-zinc-800 lg:pr-8">
                        {m.wallet && (
                          <>
                            <div>
                              <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Pending Wallet</p>
                              <p className="mt-1 text-sm font-semibold text-zinc-900 dark:text-white">{formatCurrency(m.wallet.pending)}</p>
                            </div>
                            <div>
                              <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Withdrawn Total</p>
                              <p className="mt-1 text-sm font-semibold text-zinc-900 dark:text-white">{formatCurrency(m.wallet.withdrawn)}</p>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Verification Call Scheduling section */}
                      <div className="pl-0 lg:pl-2">
                        <MentorVerificationCall mentorProfileId={m.id} />
                      </div>
                    </div>
                  </div>
                  );
                })()}
              </div>
            </article>
          ))
        )}
      </section>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800 pt-6">
          <button
            onClick={() => loadMentors(pagination.page - 1)}
            disabled={pagination.page <= 1}
            className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-black px-4 py-2 text-xs font-semibold text-zinc-800 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors disabled:opacity-40 cursor-pointer"
          >
            Previous
          </button>
          <button
            onClick={() => loadMentors(pagination.page + 1)}
            disabled={pagination.page >= pagination.totalPages}
            className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-black px-4 py-2 text-xs font-semibold text-zinc-800 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors disabled:opacity-40 cursor-pointer"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
