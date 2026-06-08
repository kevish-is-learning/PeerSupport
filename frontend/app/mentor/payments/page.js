"use client";

import { useState, useEffect, useCallback } from "react";
import {
  IndianRupee,
  Wallet,
  Clock,
  CheckCircle,
  TrendingUp,
  Banknote,
  ArrowUpRight,
  ArrowDownLeft,
  Search,
  Info,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { mentorBookingApi, walletApi, payoutApi } from "../../../lib/api";
import { toast } from "sonner";
import { format } from "date-fns";

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

const PAYMENT_STATUS_META = {
  SUCCESS: { label: "Completed", bg: "bg-[#22C55E]" },
  PENDING: { label: "Pending", bg: "bg-[#F59E0B]" },
  FAILED: { label: "Failed", bg: "bg-gray-400" },
};

export default function MentorPaymentsPage() {
  // Shared state
  const [loading, setLoading] = useState(true);

  // Earnings data (from mentorBookingApi)
  const [earningsData, setEarningsData] = useState(null);
  const [earningsSearchQuery, setEarningsSearchQuery] = useState("");
  const [earningsStatusFilter, setEarningsStatusFilter] = useState("All");

  // Wallet data (from walletApi + payoutApi)
  const [wallet, setWallet] = useState(null);
  const [walletTransactions, setWalletTransactions] = useState([]);
  const [payoutRequests, setPayoutRequests] = useState([]);
  const [walletTxFilter, setWalletTxFilter] = useState("");

  // Payout request form
  const [payoutAmount, setPayoutAmount] = useState("");
  const [requestingPayout, setRequestingPayout] = useState(false);
  const [payoutError, setPayoutError] = useState("");
  const [payoutSuccess, setPayoutSuccess] = useState("");

  // Active tab
  const [activeTab, setActiveTab] = useState("earnings");

  const fetchAllData = useCallback(async () => {
    try {
      setLoading(true);
      const [earningsRes, walletRes, txRes, payoutRes] = await Promise.all([
        mentorBookingApi.getEarnings(),
        walletApi.getWallet(),
        walletApi.getTransactions({ limit: 50, type: walletTxFilter || undefined }),
        payoutApi.getMyPayouts({ limit: 20 }),
      ]);
      setEarningsData(earningsRes.data?.earnings);
      setWallet(walletRes.data);
      setWalletTransactions(txRes.data?.transactions || []);
      setPayoutRequests(payoutRes.data?.payouts || []);
    } catch (err) {
      console.error("Failed to fetch data:", err);
      toast.error("Failed to load financial data");
    } finally {
      setLoading(false);
    }
  }, [walletTxFilter]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const handleRequestPayout = async () => {
    const amount = parseFloat(payoutAmount);
    if (!amount || amount <= 0) {
      setPayoutError("Enter a valid amount");
      return;
    }
    if (amount > (wallet?.availableBalance || 0)) {
      setPayoutError("Amount exceeds available balance");
      return;
    }

    try {
      setRequestingPayout(true);
      setPayoutError("");
      await payoutApi.request({ amount });
      setPayoutSuccess("Payout request submitted! Admin will review it.");
      setPayoutAmount("");
      await fetchAllData();
    } catch (err) {
      setPayoutError(err.message || "Failed to request payout");
    } finally {
      setRequestingPayout(false);
    }
  };

  // Stats cards — unified from both data sources
  const statsCards = [
    {
      label: "Total Earnings",
      value: `₹${(earningsData?.totalEarnings || 0).toLocaleString("en-IN")}`,
      subtitle: "After platform fee",
      icon: IndianRupee,
      shadowColor: "#5061E4",
      iconColor: "text-[#5061E4]",
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
      label: "Pending Balance",
      value: `₹${(wallet?.pendingBalance || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`,
      subtitle: "Available once session completes",
      icon: Clock,
      shadowColor: "#F97316",
      iconColor: "text-[#F97316]",
    },
    {
      label: "Total Withdrawn",
      value: `₹${(wallet?.withdrawnBalance || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`,
      subtitle: `${earningsData?.completedTransactions || 0} completed sessions`,
      icon: Banknote,
      shadowColor: "#8B5CF6",
      iconColor: "text-[#8B5CF6]",
    },
  ];

  const earningsFilterTabs = ["All", "SUCCESS", "PENDING", "FAILED"];
  const walletTxTypeFilters = ["", "EARNING", "PENALTY", "REFUND_DEBIT", "PAYOUT"];

  // Filtered earnings transactions
  const filteredEarnings = (earningsData?.transactions || []).filter((txn) => {
    const matchesSearch =
      txn.mentee.toLowerCase().includes(earningsSearchQuery.toLowerCase()) ||
      txn.service.toLowerCase().includes(earningsSearchQuery.toLowerCase()) ||
      txn.transactionRef.toLowerCase().includes(earningsSearchQuery.toLowerCase());
    const matchesTab = earningsStatusFilter === "All" || txn.status === earningsStatusFilter;
    return matchesSearch && matchesTab;
  });

  // Loading skeleton
  if (loading) {
    return (
      <div className="w-full h-full overflow-y-auto p-8 lg:p-12 flex flex-col gap-8 bg-[#FFF7F5]">
        <header>
          <div className="h-9 w-48 bg-gray-200 rounded animate-pulse" />
          <div className="mt-2 h-4 w-72 bg-gray-200 rounded animate-pulse" />
        </header>

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
              <div className="h-10 w-full xl:max-w-xl bg-gray-200 rounded-[0.55rem]" />
              <div className="flex gap-2">
                <div className="h-10 w-20 bg-gray-200 rounded-[0.55rem]" />
                <div className="h-10 w-24 bg-gray-200 rounded-[0.55rem]" />
                <div className="h-10 w-24 bg-gray-200 rounded-[0.55rem]" />
              </div>
            </div>
          </div>
          <div className="p-6 flex flex-col gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-24 w-full bg-gray-200 rounded-[0.85rem]" />
            ))}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-y-auto p-8 lg:p-12 flex flex-col gap-8 bg-[#FFF7F5]">
      <header>
        <h1 className="text-3xl font-extrabold tracking-tight text-[#111]">Payouts</h1>
        <p className="mt-1 text-gray-500 font-medium">
          Track your earnings, wallet balance, and transaction history
        </p>
      </header>

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
                <p className="mt-1 text-[0.7rem] font-bold text-gray-500">{stat.label}</p>
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
          Withdraw your available balance to your registered bank account. Earnings are after platform fee deduction.
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
                setPayoutError("");
                setPayoutSuccess("");
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
          <button className="flex items-center gap-2 rounded-xl border-[3px] border-black bg-white px-6 py-3 text-sm font-bold text-black hover:bg-gray-50 cursor-pointer transition-colors">
            <Info size={16} />
            View Terms & Fees
          </button>
        </div>

        {payoutError && (
          <div className="mt-4 flex items-center gap-2 rounded-[0.55rem] border-[3px] border-[#EF4444] bg-[#FEE2E2] px-4 py-2.5">
            <AlertCircle size={16} className="text-[#EF4444] shrink-0" />
            <p className="text-[0.75rem] font-bold text-[#991B1B]">{payoutError}</p>
          </div>
        )}
        {payoutSuccess && (
          <div className="mt-4 flex items-center gap-2 rounded-[0.55rem] border-[3px] border-[#22C55E] bg-[#DCFCE7] px-4 py-2.5">
            <CheckCircle size={16} className="text-[#22C55E] shrink-0" />
            <p className="text-[0.75rem] font-bold text-[#166534]">{payoutSuccess}</p>
          </div>
        )}
      </section>

      {/* Transaction History — Tabbed */}
      <section
        className="rounded-[0.85rem] border-[3px] border-black bg-[#FCEBE7] flex flex-col"
        style={{ boxShadow: "6px 6px 0 0 #5061E4" }}
      >
        {/* Section Header with Tabs & Filters */}
        <div className="p-6 border-b-[3px] border-black">
          <div className="flex flex-col xl:flex-row gap-4 justify-between">
            {/* Tab Switcher */}
            <div className="flex gap-2">
              {[
                { key: "earnings", label: "Earnings" },
                { key: "wallet", label: "Wallet Transactions" },
                { key: "payouts", label: "Payout History" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`rounded-[0.55rem] border-[3px] border-black px-5 py-2 text-xs font-bold transition-colors cursor-pointer ${
                    activeTab === tab.key
                      ? "bg-[#5061E4] text-white"
                      : "bg-white text-black hover:bg-gray-50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Filters — contextual per tab */}
            {activeTab === "earnings" && (
              <div className="flex flex-wrap gap-2">
                {earningsFilterTabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setEarningsStatusFilter(tab)}
                    className={`rounded-[0.55rem] border-[3px] border-black px-4 py-2 text-xs font-bold transition-colors cursor-pointer ${
                      earningsStatusFilter === tab
                        ? "bg-[#5061E4] text-white"
                        : "bg-white text-black hover:bg-gray-50"
                    }`}
                  >
                    {tab === "SUCCESS"
                      ? "Completed"
                      : tab.charAt(0) + tab.slice(1).toLowerCase()}
                  </button>
                ))}
              </div>
            )}
            {activeTab === "wallet" && (
              <div className="flex flex-wrap gap-2">
                {walletTxTypeFilters.map((type) => {
                  const label =
                    type === "" ? "All" : TX_TYPE_META[type]?.label || type;
                  return (
                    <button
                      key={type}
                      onClick={() => setWalletTxFilter(type)}
                      className={`rounded-[0.55rem] border-[3px] border-black px-4 py-2 text-xs font-bold transition-colors cursor-pointer ${
                        walletTxFilter === type
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

          {/* Search Bar — only for earnings tab */}
          {activeTab === "earnings" && (
            <div className="relative w-full xl:max-w-xl mt-4">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search by mentee, session, or transaction ID..."
                value={earningsSearchQuery}
                onChange={(e) => setEarningsSearchQuery(e.target.value)}
                className="w-full rounded-[0.55rem] border-[3px] border-black py-2 pl-10 pr-4 text-xs font-semibold outline-none focus:ring-2 focus:ring-[#5061E4] focus:border-[#5061E4] transition-all bg-white"
              />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-4 bg-white rounded-b-xl border-t-0">

          {/* ─── Earnings Tab ─── */}
          {activeTab === "earnings" && (
            <>
              {filteredEarnings.length === 0 ? (
                <div className="text-center py-12">
                  <p className="font-bold text-gray-400 italic">
                    No transactions found.
                  </p>
                </div>
              ) : (
                filteredEarnings.map((txn) => {
                  const statusMeta =
                    PAYMENT_STATUS_META[txn.status] || PAYMENT_STATUS_META.PENDING;
                  return (
                    <article
                      key={txn.id}
                      className="flex flex-col sm:flex-row sm:justify-between rounded-[0.85rem] border-[3px] border-black p-5 gap-4"
                    >
                      <div className="flex gap-4 relative">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[0.55rem] border-2 border-black bg-[#FEF3C7] text-[#F59E0B]">
                          <ArrowDownLeft size={20} strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col justify-center">
                          <h3 className="font-bold text-black text-sm">
                            {txn.mentee}
                          </h3>
                          <p className="text-[0.65rem] font-semibold text-gray-500 mt-1">
                            {txn.service}
                          </p>
                          <p className="text-[0.65rem] font-semibold text-gray-400 mt-0.5">
                            {format(new Date(txn.date), "dd MMM yyyy, hh:mm a")}
                          </p>
                          <p className="text-[0.55rem] font-bold text-gray-400 mt-4">
                            Transaction Ref:{" "}
                            <span className="font-extrabold">
                              {txn.transactionRef}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col sm:items-end gap-2 justify-start pt-1">
                        <p className="text-xl font-extrabold text-[#F59E0B] tracking-tight">
                          ₹{txn.amount.toLocaleString()}
                        </p>
                        <div
                          className={`flex items-center gap-1.5 rounded-full px-2 py-0.5 mt-1 w-max ${statusMeta.bg}`}
                        >
                          <CheckCircle size={10} className="text-black" />
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

          {/* ─── Wallet Transactions Tab ─── */}
          {activeTab === "wallet" && (
            <>
              {walletTransactions.length === 0 ? (
                <div className="text-center py-12">
                  <p className="font-bold text-gray-400 italic">
                    No wallet transactions found.
                  </p>
                </div>
              ) : (
                walletTransactions.map((tx) => {
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

          {/* ─── Payout History Tab ─── */}
          {activeTab === "payouts" && (
            <>
              {payoutRequests.length === 0 ? (
                <div className="text-center py-12">
                  <p className="font-bold text-gray-400 italic">
                    No payout requests yet.
                  </p>
                </div>
              ) : (
                payoutRequests.map((p) => {
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
                          <h3 className="font-bold text-black text-sm">
                            Payout Request
                          </h3>
                          {p.transactionRef && (
                            <p className="text-[0.55rem] font-bold text-gray-400 mt-1">
                              Ref:{" "}
                              <span className="font-extrabold">
                                {p.transactionRef}
                              </span>
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
                          ₹
                          {p.netAmount.toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                          })}
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
