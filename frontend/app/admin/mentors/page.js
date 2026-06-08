"use client";

import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { adminApi, resolveUploadUrl } from "../../../lib/api";

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
        <h1 className="text-3xl font-light tracking-tight text-white">Mentors</h1>
        <p className="mt-2 text-sm text-zinc-400">Review applications, suspend accounts, and view performance.</p>
      </header>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
                tab === t.key
                  ? "border-zinc-500 bg-white text-black"
                  : "border-zinc-800 bg-black text-zinc-400 hover:border-zinc-600 hover:text-white"
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
            className="flex-1 sm:w-64 rounded-xl border border-zinc-800 bg-[#0a0a0a] px-4 py-2 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600 transition-colors"
          />
        </div>
      </div>

      <div className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
        {pagination.total} mentors found
      </div>

      {/* Mentor List */}
      <section className="space-y-4">
        {loading ? (
          <div className="flex h-48 items-center justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-[3px] border-zinc-800 border-t-white" />
          </div>
        ) : mentors.length === 0 ? (
          <div className="rounded-2xl border border-zinc-800 bg-[#0a0a0a] p-12 text-center">
            <p className="text-sm text-zinc-500">No mentors found</p>
          </div>
        ) : (
          mentors.map((m) => (
            <article key={m.id} className="rounded-2xl border border-zinc-800 bg-[#0a0a0a] overflow-hidden">
              <div className="p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {m.profilePicture ? (
                      <img src={resolveUploadUrl(m.profilePicture)} alt="" className="h-12 w-12 rounded-xl object-cover" />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-lg font-medium text-zinc-400">
                        {(m.name || "?")[0]}
                      </div>
                    )}
                    <div>
                      <h3 className="text-base font-medium text-white">{m.name}</h3>
                      <p className="text-xs text-zinc-500">@{m.username} · {m.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ${STATUS_COLORS[m.approvalStatus] || "border-zinc-800 text-zinc-400 bg-zinc-900/50"}`}>
                      {m.approvalStatus}
                    </span>
                    {!m.isActive && (
                      <span className="inline-block rounded-full border border-red-900/50 bg-red-950/20 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-red-400">
                        Deactivated
                      </span>
                    )}
                  </div>
                </div>

                {/* Stats Row */}
                <div className="mt-5 flex flex-wrap gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-600">★</span>
                    <span className="text-white">{m.averageRating?.toFixed(1) || "0.0"}</span>
                    <span className="text-xs text-zinc-500">({m.totalReviews})</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">Sessions</span>
                    <span className="text-white mt-0.5">{m.totalSessions}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">Cancellations</span>
                    <span className="text-white mt-0.5">{m.cancellations}</span>
                  </div>
                  {m.wallet && (
                    <div className="flex flex-col">
                      <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">Wallet</span>
                      <span className="text-emerald-400 mt-0.5">{formatCurrency(m.wallet.available)}</span>
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
                        className="flex-1 rounded-lg border border-zinc-800 bg-black px-3 py-1.5 text-xs text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600 transition-colors"
                      />
                      <button
                        onClick={() => handleApproval(m.id, "APPROVED")}
                        disabled={!!mutatingId}
                        className="rounded-lg border border-emerald-900/50 bg-emerald-950/30 px-4 py-1.5 text-xs font-medium text-emerald-400 hover:bg-emerald-900/50 transition-colors disabled:opacity-50"
                      >
                        {mutatingId === m.id ? "..." : "Approve"}
                      </button>
                      <button
                        onClick={() => handleApproval(m.id, "REJECTED")}
                        disabled={!!mutatingId}
                        className="rounded-lg border border-red-900/50 bg-red-950/30 px-4 py-1.5 text-xs font-medium text-red-400 hover:bg-red-900/50 transition-colors disabled:opacity-50"
                      >
                        {mutatingId === m.id ? "..." : "Reject"}
                      </button>
                    </div>
                  )}
                  {m.approvalStatus === "APPROVED" && (
                    <button
                      onClick={() => handleSuspend(m.id)}
                      disabled={!!mutatingId}
                      className="rounded-lg border border-orange-900/50 bg-orange-950/30 px-4 py-1.5 text-xs font-medium text-orange-400 hover:bg-orange-900/50 transition-colors disabled:opacity-50"
                    >
                      {mutatingId === m.id ? "..." : "Suspend"}
                    </button>
                  )}
                  {m.approvalStatus === "SUSPENDED" && (
                    <button
                      onClick={() => handleUnsuspend(m.id)}
                      disabled={!!mutatingId}
                      className="rounded-lg border border-emerald-900/50 bg-emerald-950/30 px-4 py-1.5 text-xs font-medium text-emerald-400 hover:bg-emerald-900/50 transition-colors disabled:opacity-50"
                    >
                      {mutatingId === m.id ? "..." : "Unsuspend"}
                    </button>
                  )}
                  <button
                    onClick={() => setExpandedId(expandedId === m.id ? "" : m.id)}
                    className="ml-auto rounded-lg border border-zinc-800 bg-black px-4 py-1.5 text-xs font-medium text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
                  >
                    {expandedId === m.id ? "Hide Details" : "View Details"}
                  </button>
                </div>

                {/* Expanded Detail */}
                {expandedId === m.id && (
                  <div className="mt-6 border-t border-zinc-800 pt-6">
                    <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                      <div>
                        <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">Joined</p>
                        <p className="mt-1 text-sm text-white">{formatDate(m.createdAt)}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">Configured Services</p>
                        <p className="mt-1 text-sm text-white">{m.totalServices}</p>
                      </div>
                      {m.wallet && (
                        <>
                          <div>
                            <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">Pending Wallet</p>
                            <p className="mt-1 text-sm text-white">{formatCurrency(m.wallet.pending)}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">Withdrawn Total</p>
                            <p className="mt-1 text-sm text-white">{formatCurrency(m.wallet.withdrawn)}</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </article>
          ))
        )}
      </section>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-zinc-800 pt-6">
          <button
            onClick={() => loadMentors(pagination.page - 1)}
            disabled={pagination.page <= 1}
            className="rounded-lg border border-zinc-800 bg-black px-4 py-2 text-xs font-medium text-white hover:bg-zinc-900 transition-colors disabled:opacity-40"
          >
            Previous
          </button>
          <button
            onClick={() => loadMentors(pagination.page + 1)}
            disabled={pagination.page >= pagination.totalPages}
            className="rounded-lg border border-zinc-800 bg-black px-4 py-2 text-xs font-medium text-white hover:bg-zinc-900 transition-colors disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
