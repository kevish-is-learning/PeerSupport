"use client";

import { useState, useEffect, useCallback } from "react";
import { walletApi, payoutApi } from "../../lib/api";
import {
  Wallet,
  Clock,
  CheckCircle,
  TrendingUp,
  Banknote,
  ArrowUpRight,
  ArrowDownLeft,
  Filter,
  Loader2,
  AlertCircle,
} from "lucide-react";

const TX_TYPE_META = {
  EARNING: {
    label: "Earning",
    bg: "bg-[#22C55E]",
    icon: ArrowDownLeft,
    iconBg: "bg-[#DCFCE7]",
    iconColor: "text-[#16A34A]",
  },
  REFUND_DEBIT: {
    label: "Refund",
    bg: "bg-[#EF4444]",
    icon: ArrowUpRight,
    iconBg: "bg-[#FEE2E2]",
    iconColor: "text-[#DC2626]",
  },
  PENALTY: {
    label: "Penalty",
    bg: "bg-[#F59E0B]",
    icon: AlertCircle,
    iconBg: "bg-[#FEF3C7]",
    iconColor: "text-[#D97706]",
  },
  PAYOUT: {
    label: "Payout",
    bg: "bg-[#5061E4]",
    icon: Banknote,
    iconBg: "bg-[#E0E7FF]",
    iconColor: "text-[#5061E4]",
  },
};

const PAYOUT_STATUS_META = {
  REQUESTED: { label: "Requested", bg: "bg-[#F59E0B]" },
  APPROVED: { label: "Approved", bg: "bg-[#5061E4]" },
  PROCESSING: { label: "Processing", bg: "bg-[#8B5CF6]" },
  COMPLETED: { label: "Completed", bg: "bg-[#22C55E]" },
  FAILED: { label: "Failed", bg: "bg-[#EF4444]" },
};

export default function WalletDashboard() {
  const [wallet, setWallet] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [payouts, setPayouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [payoutAmount, setPayoutAmount] = useState("");
  const [requestingPayout, setRequestingPayout] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [txFilter, setTxFilter] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [walletRes, txRes, payoutRes] = await Promise.all([
        walletApi.getWallet(),
        walletApi.getTransactions({ limit: 50, type: txFilter || undefined }),
        payoutApi.getMyPayouts({ limit: 20 }),
      ]);
      setWallet(walletRes.data);
      setTransactions(txRes.data?.transactions || []);
      setPayouts(payoutRes.data?.payouts || []);
    } catch (err) {
      console.error("Failed to fetch wallet data:", err);
    } finally {
      setLoading(false);
    }
  }, [txFilter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRequestPayout = async () => {
    const amount = parseFloat(payoutAmount);
    if (!amount || amount <= 0) {
      setError("Enter a valid amount");
      return;
    }
    if (amount > (wallet?.availableBalance || 0)) {
      setError("Amount exceeds available balance");
      return;
    }

    try {
      setRequestingPayout(true);
      setError("");
      await payoutApi.request({ amount });
      setSuccess("Payout request submitted! Admin will review it.");
      setPayoutAmount("");
      await fetchData();
    } catch (err) {
      setError(err.message || "Failed to request payout");
    } finally {
      setRequestingPayout(false);
    }
  };

  const statsCards = [
    {
      label: "Pending Balance",
      value: `₹${(wallet?.pendingBalance || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`,
      subtitle: "Released 48h after session",
      icon: Clock,
      shadowColor: "#F97316",
      iconColor: "text-[#F97316]",
    },
    {
      label: "Available Balance",
      value: `₹${(wallet?.availableBalance || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`,
      subtitle: "Ready for payout",
      icon: Wallet,
      shadowColor: "#22C55E",
      iconColor: "text-[#22C55E]",
    },
    {
      label: "Total Withdrawn",
      value: `₹${(wallet?.withdrawnBalance || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`,
      subtitle: "Total paid out",
      icon: Banknote,
      shadowColor: "#5061E4",
      iconColor: "text-[#5061E4]",
    },
    {
      label: "Total Earned",
      value: `₹${(wallet?.totalEarned || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`,
      subtitle: "Lifetime earnings",
      icon: TrendingUp,
      shadowColor: "#8B5CF6",
      iconColor: "text-[#8B5CF6]",
    },
  ];

  const tabFilters = ["overview", "payouts"];
  const txTypeFilters = ["", "EARNING", "PENALTY", "REFUND_DEBIT", "PAYOUT"];

  // Loading skeleton
  if (loading) {
    return (
      <div className="flex flex-col gap-8">
        {/* Skeleton Stats */}
        <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <article
              key={idx}
              className="flex flex-col justify-between rounded-[0.85rem] border-[3px] border-gray-200 bg-white p-5 animate-pulse"
              style={{ boxShadow: "6px 6px 0 0 #E5E7EB" }}
            >
              <div className="mb-3 h-6 w-6 rounded bg-gray-200" />
              <div>
                <div className="mb-2 h-8 w-24 rounded bg-gray-200" />
                <div className="mt-1 h-3 w-32 rounded bg-gray-200" />
                <div className="mt-1 h-2 w-20 rounded bg-gray-200" />
              </div>
            </article>
          ))}
        </section>

        {/* Skeleton Payout Request */}
        <section
          className="rounded-[0.85rem] border-[3px] border-gray-200 bg-white p-6 animate-pulse"
          style={{ boxShadow: "6px 6px 0 0 #E5E7EB" }}
        >
          <div className="h-6 bg-gray-200 rounded w-48 mb-4" />
          <div className="h-4 bg-gray-200 rounded w-full max-w-lg mb-6" />
          <div className="flex gap-4">
            <div className="h-12 flex-1 max-w-xs bg-gray-200 rounded-xl" />
            <div className="h-12 w-40 bg-gray-200 rounded-xl" />
          </div>
        </section>

        {/* Skeleton Transactions */}
        <section
          className="rounded-[0.85rem] border-[3px] border-gray-200 bg-white flex flex-col animate-pulse"
          style={{ boxShadow: "6px 6px 0 0 #E5E7EB" }}
        >
          <div className="p-6 border-b-[3px] border-gray-200">
            <div className="h-6 bg-gray-200 rounded w-48 mb-6" />
            <div className="flex flex-col xl:flex-row gap-4 justify-between">
              <div className="flex gap-2">
                <div className="h-10 w-24 bg-gray-200 rounded-[0.55rem]" />
                <div className="h-10 w-24 bg-gray-200 rounded-[0.55rem]" />
              </div>
              <div className="flex gap-2">
                <div className="h-10 w-20 bg-gray-200 rounded-[0.55rem]" />
                <div className="h-10 w-24 bg-gray-200 rounded-[0.55rem]" />
                <div className="h-10 w-24 bg-gray-200 rounded-[0.55rem]" />
              </div>
            </div>
          </div>
          <div className="p-6 flex flex-col gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-20 w-full bg-gray-200 rounded-[0.85rem]" />
            ))}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Balance Cards */}
      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {statsCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <article
              key={idx}
              className="flex flex-col justify-between rounded-[0.85rem] border-[3px] border-black bg-white p-5 hover:-translate-y-1 transition-transform"
              style={{ boxShadow: `6px 6px 0 0 ${stat.shadowColor}` }}
            >
              <div className="mb-3">
                <Icon size={24} className={stat.iconColor} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-[1.35rem] font-extrabold tracking-tight text-black">
                  {stat.value}
                </p>
                <p className="mt-1 text-[0.7rem] font-bold text-gray-500">
                  {stat.label}
                </p>
                {stat.subtitle && (
                  <p className="mt-1 text-[0.55rem] font-bold text-gray-400">
                    {stat.subtitle}
                  </p>
                )}
              </div>
            </article>
          );
        })}
      </section>

      {/* Request Payout */}
      <section
        className="rounded-[0.85rem] border-[3px] border-black bg-white p-6"
        style={{ boxShadow: "6px 6px 0 0 #22C55E" }}
      >
        <h2 className="text-xl font-bold text-black">Request Payout</h2>
        <p className="mt-2 text-[0.8rem] text-gray-500 font-medium">
          Withdraw your available balance. Earnings are after 13% platform fee deduction.
        </p>

        <div className="mt-6 flex flex-wrap gap-4 items-start">
          <div className="flex items-center rounded-xl border-[3px] border-black overflow-hidden flex-1 min-w-[200px] max-w-sm">
            <span className="px-4 py-3 bg-gray-100 text-gray-500 font-bold text-sm border-r-[3px] border-black">
              ₹
            </span>
            <input
              type="number"
              value={payoutAmount}
              onChange={(e) => {
                setPayoutAmount(e.target.value);
                setError("");
                setSuccess("");
              }}
              placeholder="Enter amount"
              min="1"
              max={wallet?.availableBalance || 0}
              className="flex-1 px-4 py-3 outline-none text-sm font-semibold bg-transparent"
            />
          </div>
          <button
            onClick={handleRequestPayout}
            disabled={requestingPayout || !payoutAmount}
            className={`rounded-xl border-[3px] border-black px-6 py-3 text-sm font-bold transition-all ${
              requestingPayout || !payoutAmount
                ? "bg-gray-200 text-gray-400 cursor-not-allowed border-gray-300"
                : "bg-[#22C55E] text-black hover:bg-[#16A34A] cursor-pointer"
            }`}
          >
            {requestingPayout ? (
              <span className="flex items-center gap-2">
                <Loader2 size={16} className="animate-spin" />
                Requesting...
              </span>
            ) : (
              "Request Payout"
            )}
          </button>
        </div>

        {error && (
          <div className="mt-4 flex items-center gap-2 rounded-[0.55rem] border-[3px] border-[#EF4444] bg-[#FEE2E2] px-4 py-2.5">
            <AlertCircle size={16} className="text-[#EF4444] shrink-0" />
            <p className="text-[0.75rem] font-bold text-[#991B1B]">{error}</p>
          </div>
        )}
        {success && (
          <div className="mt-4 flex items-center gap-2 rounded-[0.55rem] border-[3px] border-[#22C55E] bg-[#DCFCE7] px-4 py-2.5">
            <CheckCircle size={16} className="text-[#22C55E] shrink-0" />
            <p className="text-[0.75rem] font-bold text-[#166534]">{success}</p>
          </div>
        )}
      </section>

      {/* Transactions / Payout History */}
      <section
        className="rounded-[0.85rem] border-[3px] border-black bg-[#FCEBE7] flex flex-col"
        style={{ boxShadow: "6px 6px 0 0 #5061E4" }}
      >
        {/* Section Header with Tabs and Filters */}
        <div className="p-6 border-b-[3px] border-black">
          <div className="flex flex-col xl:flex-row gap-4 justify-between">
            {/* Tab Switcher */}
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab("overview")}
                className={`rounded-[0.55rem] border-[3px] border-black px-5 py-2 text-xs font-bold transition-colors cursor-pointer ${
                  activeTab === "overview"
                    ? "bg-[#5061E4] text-white"
                    : "bg-white text-black hover:bg-gray-50"
                }`}
              >
                Transactions
              </button>
              <button
                onClick={() => setActiveTab("payouts")}
                className={`rounded-[0.55rem] border-[3px] border-black px-5 py-2 text-xs font-bold transition-colors cursor-pointer ${
                  activeTab === "payouts"
                    ? "bg-[#5061E4] text-white"
                    : "bg-white text-black hover:bg-gray-50"
                }`}
              >
                Payout History
              </button>
            </div>

            {/* Type Filters (only for transactions tab) */}
            {activeTab === "overview" && (
              <div className="flex flex-wrap gap-2">
                {txTypeFilters.map((type) => {
                  const label = type === "" ? "All" : TX_TYPE_META[type]?.label || type;
                  return (
                    <button
                      key={type}
                      onClick={() => setTxFilter(type)}
                      className={`rounded-[0.55rem] border-[3px] border-black px-4 py-2 text-xs font-bold transition-colors cursor-pointer ${
                        txFilter === type
                          ? "bg-[#5061E4] text-white"
                          : "bg-white text-black hover:bg-gray-50"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-4 bg-white rounded-b-xl border-t-0">
          {/* Transactions Tab */}
          {activeTab === "overview" && (
            <>
              {transactions.length === 0 ? (
                <div className="text-center py-12">
                  <p className="font-bold text-gray-400 italic">No transactions found.</p>
                </div>
              ) : (
                transactions.map((tx) => {
                  const typeMeta = TX_TYPE_META[tx.type] || TX_TYPE_META.EARNING;
                  const Icon = typeMeta.icon;
                  return (
                    <article
                      key={tx.id}
                      className="flex flex-col sm:flex-row sm:justify-between rounded-[0.85rem] border-[3px] border-black p-5 gap-4"
                    >
                      <div className="flex gap-4">
                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[0.55rem] border-2 border-black ${typeMeta.iconBg} ${typeMeta.iconColor}`}
                        >
                          <Icon size={20} strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col justify-center">
                          <h3 className="font-bold text-black text-sm">
                            {tx.description || "Transaction"}
                          </h3>
                          <p className="text-[0.65rem] font-semibold text-gray-400 mt-1">
                            {new Date(tx.createdAt).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col sm:items-end gap-2 justify-start pt-1">
                        <p
                          className={`text-xl font-extrabold tracking-tight ${
                            tx.amount >= 0 ? "text-[#22C55E]" : "text-[#EF4444]"
                          }`}
                        >
                          {tx.amount >= 0 ? "+" : ""}₹
                          {Math.abs(tx.amount).toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                          })}
                        </p>
                        <div
                          className={`flex items-center gap-1.5 rounded-full px-2 py-0.5 w-max ${typeMeta.bg}`}
                        >
                          <span className="text-[0.6rem] font-bold text-black uppercase tracking-widest">
                            {typeMeta.label}
                          </span>
                        </div>
                      </div>
                    </article>
                  );
                })
              )}
            </>
          )}

          {/* Payouts Tab */}
          {activeTab === "payouts" && (
            <>
              {payouts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="font-bold text-gray-400 italic">No payout requests yet.</p>
                </div>
              ) : (
                payouts.map((p) => {
                  const statusMeta =
                    PAYOUT_STATUS_META[p.status] || PAYOUT_STATUS_META.REQUESTED;
                  return (
                    <article
                      key={p.id}
                      className="flex flex-col sm:flex-row sm:justify-between rounded-[0.85rem] border-[3px] border-black p-5 gap-4"
                    >
                      <div className="flex gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[0.55rem] border-2 border-black bg-[#E0E7FF] text-[#5061E4]">
                          <Banknote size={20} strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col justify-center">
                          <h3 className="font-bold text-black text-sm">Payout Request</h3>
                          {p.transactionRef && (
                            <p className="text-[0.55rem] font-bold text-gray-400 mt-1">
                              Ref:{" "}
                              <span className="font-extrabold">{p.transactionRef}</span>
                            </p>
                          )}
                          <p className="text-[0.65rem] font-semibold text-gray-400 mt-1">
                            {new Date(p.requestedAt).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col sm:items-end gap-2 justify-start pt-1">
                        <p className="text-xl font-extrabold text-[#5061E4] tracking-tight">
                          ₹{p.netAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                        </p>
                        <div
                          className={`flex items-center gap-1.5 rounded-full px-2 py-0.5 w-max ${statusMeta.bg}`}
                        >
                          <span className="text-[0.6rem] font-bold text-black uppercase tracking-widest">
                            {statusMeta.label}
                          </span>
                        </div>
                      </div>
                    </article>
                  );
                })
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
