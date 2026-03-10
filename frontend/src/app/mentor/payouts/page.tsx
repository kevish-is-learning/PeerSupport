"use client";

import { useEffect, useState } from "react";
import { useMentorStore } from "@/stores/mentorStore";
import { toast } from "sonner";
import {
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Loader2,
  IndianRupee,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Filter,
} from "lucide-react";
import { format } from "date-fns";

export default function MentorPayoutsPage() {
  const {
    dashboard,
    earnings,
    transactions,
    withdrawals,
    fetchDashboard,
    fetchEarnings,
    fetchTransactions,
    fetchWithdrawals,
    requestWithdrawal,
    isLoading,
  } = useMentorStore();

  const [activeTab, setActiveTab] = useState<"earnings" | "transactions" | "withdrawals">(
    "earnings"
  );
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawMethod, setWithdrawMethod] = useState("BANK_TRANSFER");
  const [showWithdrawForm, setShowWithdrawForm] = useState(false);
  const [withdrawing, setWithdrawing] = useState(false);

  useEffect(() => {
    fetchDashboard();
    fetchEarnings();
    fetchTransactions();
    fetchWithdrawals();
  }, [fetchDashboard, fetchEarnings, fetchTransactions, fetchWithdrawals]);

  const handleWithdraw = async () => {
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Enter a valid amount");
      return;
    }
    if (dashboard && amount > dashboard.balance) {
      toast.error("Insufficient balance");
      return;
    }
    setWithdrawing(true);
    try {
      await requestWithdrawal({ amount, method: withdrawMethod });
      toast.success("Withdrawal request submitted");
      setShowWithdrawForm(false);
      setWithdrawAmount("");
      fetchDashboard();
      fetchWithdrawals();
    } catch {
      // handled by interceptor
    } finally {
      setWithdrawing(false);
    }
  };

  const statusIcon = (status: string) => {
    switch (status) {
      case "COMPLETED":
      case "PROCESSED":
        return <CheckCircle2 size={14} className="text-green-400" />;
      case "PENDING":
        return <Clock size={14} className="text-yellow-400" />;
      case "FAILED":
      case "REJECTED":
        return <XCircle size={14} className="text-red-400" />;
      default:
        return <AlertTriangle size={14} className="text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Payouts</h1>
          <p className="text-muted-foreground mt-1">Revenue dashboard and transaction history</p>
        </div>
        <button
          onClick={() => setShowWithdrawForm(!showWithdrawForm)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition flex items-center gap-2"
        >
          <Wallet size={14} /> Withdraw
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
              <IndianRupee size={18} className="text-green-400" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Earnings</p>
              <p className="text-xl font-bold text-foreground">
                ₹{dashboard?.totalEarnings?.toLocaleString() || "0"}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Wallet size={18} className="text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Available Balance</p>
              <p className="text-xl font-bold text-foreground">
                ₹{dashboard?.balance?.toLocaleString() || "0"}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center">
              <Clock size={18} className="text-yellow-400" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Pending Earnings</p>
              <p className="text-xl font-bold text-foreground">
                ₹{dashboard?.pendingEarnings?.toLocaleString() || "0"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Withdraw Form */}
      {showWithdrawForm && (
        <div className="bg-card border border-primary/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Request Withdrawal</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
            <div>
              <label className="text-sm text-muted-foreground block mb-1">Amount (INR)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                  ₹
                </span>
                <input
                  type="number"
                  min={1}
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full pl-7 pr-4 py-2 bg-secondary border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-muted-foreground block mb-1">Method</label>
              <select
                value={withdrawMethod}
                onChange={(e) => setWithdrawMethod(e.target.value)}
                className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="BANK_TRANSFER">Bank Transfer</option>
                <option value="UPI">UPI</option>
              </select>
            </div>
            <button
              onClick={handleWithdraw}
              disabled={withdrawing}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {withdrawing && <Loader2 size={14} className="animate-spin" />}
              Submit Request
            </button>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 bg-secondary p-1 rounded-lg w-fit">
        {(["earnings", "transactions", "withdrawals"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              activeTab === tab
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-card border border-border rounded-xl">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : activeTab === "earnings" ? (
          earnings.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground text-sm">
              No earnings yet
            </div>
          ) : (
            <div className="divide-y divide-border">
              {earnings.map((e) => (
                <div key={e.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center">
                      <ArrowDownRight size={14} className="text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Session Earning
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(e.createdAt), "MMM d, yyyy h:mm a")}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-green-400">
                      +₹{e.amount?.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground justify-end">
                      {statusIcon(e.status || "COMPLETED")}
                      <span>{e.status || "COMPLETED"}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : activeTab === "transactions" ? (
          transactions.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground text-sm">
              No transactions yet
            </div>
          ) : (
            <div className="divide-y divide-border">
              {transactions.map((t) => (
                <div key={t.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        t.type === "EARNING" || t.type === "INCENTIVE"
                          ? "bg-green-500/10"
                          : "bg-red-500/10"
                      }`}
                    >
                      {t.type === "EARNING" || t.type === "INCENTIVE" ? (
                        <ArrowDownRight size={14} className="text-green-400" />
                      ) : (
                        <ArrowUpRight size={14} className="text-red-400" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {t.description || t.type}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(t.createdAt), "MMM d, yyyy h:mm a")}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-sm font-semibold ${
                        t.type === "EARNING" || t.type === "INCENTIVE" ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {t.type === "EARNING" || t.type === "INCENTIVE" ? "+" : "-"}₹{t.amount?.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground justify-end">
                      {statusIcon(t.status)}
                      <span>{t.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : withdrawals.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground text-sm">
            No withdrawal requests
          </div>
        ) : (
          <div className="divide-y divide-border">
            {withdrawals.map((w) => (
              <div key={w.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <ArrowUpRight size={14} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Withdrawal - {w.paymentMethod || "Bank Transfer"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(w.createdAt), "MMM d, yyyy h:mm a")}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">
                    ₹{w.amount?.toLocaleString()}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground justify-end">
                    {statusIcon(w.status)}
                    <span>{w.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
