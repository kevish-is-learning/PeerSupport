"use client";

import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { adminApi } from "../../../lib/api";

const formatDateTime = (v) => {
  if (!v) return "-";
  try { return new Date(v).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }); } catch { return v; }
};
const formatCurrency = (v) => `₹${(v || 0).toLocaleString("en-IN")}`;

const STATUS_COLORS = {
  REQUESTED: "border-blue-900/50 bg-blue-950/20 text-blue-400",
  APPROVED: "border-amber-900/50 bg-amber-950/20 text-amber-400",
  PROCESSING: "border-indigo-900/50 bg-indigo-950/20 text-indigo-400",
  COMPLETED: "border-emerald-900/50 bg-emerald-950/20 text-emerald-400",
  FAILED: "border-red-900/50 bg-red-950/20 text-red-400",
};

const TABS = [
  { key: "", label: "All Payouts" },
  { key: "REQUESTED", label: "Requested" },
  { key: "APPROVED", label: "Approved" },
  { key: "PROCESSING", label: "Processing" },
  { key: "COMPLETED", label: "Completed" },
  { key: "FAILED", label: "Failed" },
];

export default function AdminPayoutsPage() {
  const [payouts, setPayouts] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("");
  const [expandedId, setExpandedId] = useState("");
  const [mutatingId, setMutatingId] = useState("");
  
  // Complete payload
  const [payoutMethod, setPayoutMethod] = useState("");
  const [transactionRef, setTransactionRef] = useState("");
  // Fail payload
  const [failedReason, setFailedReason] = useState("");

  const loadPayouts = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const res = await adminApi.listPayouts({
        page,
        limit: 20,
        status: tab || undefined,
      });
      setPayouts(res.data.payouts || res.data.data?.payouts || []);
      setPagination(res.data.pagination || res.data.data?.pagination || { page: 1, totalPages: 1, total: 0 });
    } catch (err) {
      toast.error(err.message || "Failed to load payouts");
    } finally {
      setLoading(false);
    }
  }, [tab]);

  useEffect(() => {
    loadPayouts(1);
  }, [loadPayouts]);

  const handleApprove = async (id) => {
    setMutatingId(id);
    try {
      await adminApi.approvePayout(id);
      toast.success("Payout approved");
      loadPayouts(pagination.page);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setMutatingId("");
    }
  };

  const handleComplete = async (id) => {
    if (!payoutMethod || !transactionRef) return toast.error("Please provide method and transaction reference");
    setMutatingId(id);
    try {
      await adminApi.completePayout(id, { payoutMethod, transactionRef });
      toast.success("Payout marked as completed");
      setExpandedId("");
      setPayoutMethod("");
      setTransactionRef("");
      loadPayouts(pagination.page);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setMutatingId("");
    }
  };

  const handleFail = async (id) => {
    if (!failedReason) return toast.error("Please provide a failure reason");
    setMutatingId(id);
    try {
      await adminApi.failPayout(id, { failedReason });
      toast.success("Payout marked as failed (funds returned to available balance)");
      setExpandedId("");
      setFailedReason("");
      loadPayouts(pagination.page);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setMutatingId("");
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">Payouts</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Manage mentor withdrawal requests and process disbursements.</p>
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
        {pagination.total} payout requests
      </div>

      {/* Payouts List */}
      <section className="space-y-4">
        {loading ? (
          <div className="flex h-48 items-center justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-[3px] border-zinc-300 dark:border-zinc-800 border-t-indigo-600 dark:border-t-white" />
          </div>
        ) : payouts.length === 0 ? (
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0a0a0a] p-12 text-center shadow-xs">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">No payout requests found</p>
          </div>
        ) : (
          payouts.map((p) => (
            <article key={p.id} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0a0a0a] overflow-hidden shadow-xs transition-colors">
              <div className="p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <p className="text-base font-semibold text-zinc-900 dark:text-white">{formatCurrency(p.netAmount)}</p>
                      <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${STATUS_COLORS[p.status] || "border-zinc-300 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900/50"}`}>
                        {p.status}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">Gross: {formatCurrency(p.amount)} · Fee: {formatCurrency(p.platformFee)}</p>
                    <p className="mt-2 text-sm font-medium text-zinc-900 dark:text-white">Mentor ID: <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">{p.mentorProfileId}</span></p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Requested</p>
                    <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">{formatDateTime(p.requestedAt)}</p>
                    {p.transactionRef && (
                      <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">Ref: {p.transactionRef}</p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-zinc-200 dark:border-zinc-800 pt-4">
                  {p.status === "REQUESTED" && (
                    <button
                      onClick={() => handleApprove(p.id)}
                      disabled={!!mutatingId}
                      className="rounded-lg border border-amber-900/50 bg-amber-950/30 px-4 py-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:bg-amber-900/50 transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      {mutatingId === p.id ? "..." : "Approve Payout"}
                    </button>
                  )}
                  {["APPROVED", "PROCESSING"].includes(p.status) && (
                    <button
                      onClick={() => setExpandedId(expandedId === p.id ? "" : p.id)}
                      className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-black px-4 py-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors cursor-pointer"
                    >
                      {expandedId === p.id ? "Cancel" : "Process Disbursement"}
                    </button>
                  )}
                  {p.status === "FAILED" && (
                    <span className="text-xs text-red-500">Failed Reason: {p.failedReason}</span>
                  )}
                </div>

                {/* Expanded Action Panel */}
                {expandedId === p.id && (
                  <div className="mt-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-black p-4 space-y-4">
                    <div className="grid gap-6 sm:grid-cols-2">
                      {/* Complete */}
                      <div className="space-y-3">
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-500">Mark as Completed</h4>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Method (e.g. upi, bank)..."
                            value={payoutMethod}
                            onChange={(e) => setPayoutMethod(e.target.value)}
                            className="w-1/3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0a0a0a] px-3 py-2 text-xs text-zinc-900 dark:text-white outline-none focus:border-indigo-500 transition-colors"
                          />
                          <input
                            type="text"
                            placeholder="Transaction Reference..."
                            value={transactionRef}
                            onChange={(e) => setTransactionRef(e.target.value)}
                            className="flex-1 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0a0a0a] px-3 py-2 text-xs text-zinc-900 dark:text-white outline-none focus:border-indigo-500 transition-colors"
                          />
                        </div>
                        <button
                          onClick={() => handleComplete(p.id)}
                          disabled={!payoutMethod || !transactionRef || mutatingId === p.id}
                          className="w-full rounded-lg border border-emerald-900/50 bg-emerald-950/30 px-4 py-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-900/50 transition-colors disabled:opacity-50 cursor-pointer"
                        >
                          Complete Payout
                        </button>
                      </div>

                      {/* Fail */}
                      <div className="space-y-3 pl-0 sm:pl-6 sm:border-l border-zinc-200 dark:border-zinc-800">
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-red-500">Mark as Failed</h4>
                        <input
                          type="text"
                          placeholder="Reason for failure..."
                          value={failedReason}
                          onChange={(e) => setFailedReason(e.target.value)}
                          className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0a0a0a] px-3 py-2 text-xs text-zinc-900 dark:text-white outline-none focus:border-indigo-500 transition-colors"
                        />
                        <button
                          onClick={() => handleFail(p.id)}
                          disabled={!failedReason || mutatingId === p.id}
                          className="w-full rounded-lg border border-red-900/50 bg-red-950/30 px-4 py-2 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-900/50 transition-colors disabled:opacity-50 cursor-pointer"
                        >
                          Fail Payout &amp; Return Funds
                        </button>
                      </div>
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
        <div className="flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800 pt-6">
          <button
            onClick={() => loadPayouts(pagination.page - 1)}
            disabled={pagination.page <= 1}
            className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-black px-4 py-2 text-xs font-semibold text-zinc-800 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors disabled:opacity-40 cursor-pointer"
          >
            Previous
          </button>
          <button
            onClick={() => loadPayouts(pagination.page + 1)}
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
