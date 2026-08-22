"use client";

import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { adminApi } from "../../../lib/api";

const formatDate = (v) => {
  if (!v) return "-";
  try { return new Date(v).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }); } catch { return v; }
};

const TABS = [
  { key: "reviews", label: "Public Reviews" },
  { key: "feedback", label: "Session Feedback (Mentor-only)" },
];

export default function AdminReviewsPage() {
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("reviews");
  const [mutatingId, setMutatingId] = useState("");

  const loadData = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      if (tab === "reviews") {
        const res = await adminApi.listReviews({ page, limit: 20 });
        setItems(res.data.reviews || []);
        setPagination(res.data.pagination || { page: 1, totalPages: 1, total: 0 });
      } else {
        const res = await adminApi.listFeedback({ page, limit: 20 });
        setItems(res.data.feedbacks || []);
        setPagination(res.data.pagination || { page: 1, totalPages: 1, total: 0 });
      }
    } catch (err) {
      toast.error(err.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  }, [tab]);

  useEffect(() => {
    loadData(1);
  }, [loadData]);

  const handleDeleteReview = async (id) => {
    if (!confirm("Are you sure you want to delete this review? This action will recalculate the mentor's average rating.")) return;
    setMutatingId(id);
    try {
      await adminApi.deleteReview(id);
      toast.success("Review deleted successfully");
      loadData(pagination.page);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setMutatingId("");
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">Reviews &amp; Feedback</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Moderate public reviews and monitor private session feedback.</p>
      </header>

      {/* Tabs */}
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

      <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
        {pagination.total} {tab === "reviews" ? "reviews" : "feedback entries"} found
      </div>

      {/* List */}
      <section className="space-y-4">
        {loading ? (
          <div className="flex h-48 items-center justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-[3px] border-zinc-300 dark:border-zinc-800 border-t-indigo-600 dark:border-t-white" />
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0a0a0a] p-12 text-center shadow-xs">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">No data found</p>
          </div>
        ) : tab === "reviews" ? (
          // REVIEWS RENDER
          items.map((r) => (
            <article key={r.id} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0a0a0a] p-6 shadow-xs transition-colors">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < r.rating ? "text-amber-500" : "text-zinc-300 dark:text-zinc-700"}>★</span>
                      ))}
                    </span>
                    <span className="text-sm font-semibold text-zinc-900 dark:text-white">{r.rating}.0</span>
                  </div>
                  <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">{r.review || "No written review"}</p>
                </div>
                <button
                  onClick={() => handleDeleteReview(r.id)}
                  disabled={mutatingId === r.id}
                  className="rounded-lg border border-red-900/50 bg-red-950/30 px-3 py-1.5 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-900/50 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {mutatingId === r.id ? "..." : "Delete Review"}
                </button>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-zinc-200 dark:border-zinc-800 pt-4 text-xs text-zinc-500 dark:text-zinc-400">
                <span>By: <span className="font-medium text-zinc-800 dark:text-zinc-300">{r.author?.name || "Unknown"}</span></span>
                <span>For: <span className="font-medium text-zinc-800 dark:text-zinc-300">{r.mentor?.name || "Unknown"}</span></span>
                <span>Date: {formatDate(r.createdAt)}</span>
              </div>
            </article>
          ))
        ) : (
          // FEEDBACK RENDER
          items.map((f) => (
            <article key={f.id} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0a0a0a] p-6 shadow-xs transition-colors">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
                <div>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-white">{f.mentorName} <span className="text-zinc-400 dark:text-zinc-600 mx-1">→</span> {f.menteeName}</p>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">Session Date: {formatDate(f.sessionDate)}</p>
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  {formatDate(f.createdAt)}
                </span>
              </div>
              <div className="grid gap-6 sm:grid-cols-3">
                <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800/50">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-500 mb-2">Strengths</h4>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300">{f.strengths || "-"}</p>
                </div>
                <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800/50">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-red-600 dark:text-red-500 mb-2">Areas to Improve</h4>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300">{f.weaknesses || "-"}</p>
                </div>
                <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800/50">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-blue-500 mb-2">Recommendations</h4>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300">{f.recommendations || "-"}</p>
                </div>
              </div>
            </article>
          ))
        )}
      </section>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800 pt-6">
          <button
            onClick={() => loadData(pagination.page - 1)}
            disabled={pagination.page <= 1}
            className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-black px-4 py-2 text-xs font-semibold text-zinc-800 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors disabled:opacity-40 cursor-pointer"
          >
            Previous
          </button>
          <button
            onClick={() => loadData(pagination.page + 1)}
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
