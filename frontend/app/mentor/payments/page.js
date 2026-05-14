"use client";

import { useState, useEffect } from "react";
import { IndianRupee, Wallet, Clock, CheckCircle, Info, Search, ArrowDownLeft, Loader2 } from "lucide-react";
import { mentorBookingApi } from "../../../lib/api";
import { toast } from "sonner";
import { format } from "date-fns";

export default function MentorPaymentsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const res = await mentorBookingApi.getEarnings();
        setData(res.data?.earnings);
      } catch (e) {
        toast.error("Failed to load earnings data");
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchEarnings();
  }, []);



  const statsCards = [
    {
      label: "Total Earnings",
      value: `₹${data?.totalEarnings?.toLocaleString() || 0}`,
      subtitle: "",
      icon: IndianRupee,
      shadowColor: "#5061E4",
      iconColor: "text-[#5061E4]",
    },
    {
      label: "Available for Payout",
      value: `₹${data?.availableForPayout?.toLocaleString() || 0}`,
      subtitle: "After 10% platform fee",
      icon: Wallet,
      shadowColor: "#F59E0B",
      iconColor: "text-[#F59E0B]",
    },
    {
      label: "Pending Amount",
      value: `₹${data?.pendingAmount?.toLocaleString() || 0}`,
      subtitle: "",
      icon: Clock,
      shadowColor: "#F97316",
      iconColor: "text-[#F97316]",
    },
    {
      label: "Completed Transactions",
      value: data?.completedTransactions || 0,
      subtitle: "",
      icon: CheckCircle,
      shadowColor: "#5061E4",
      iconColor: "text-[#5061E4]",
    },
  ];

  const filterTabs = ["All", "SUCCESS", "PENDING", "FAILED"];

  const filteredTransactions = (data?.transactions || []).filter((txn) => {
    const matchesSearch = 
      txn.mentee.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.transactionRef.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = activeTab === "All" || txn.status === activeTab;
    
    return matchesSearch && matchesTab;
  });

  return (
    <div className="w-full h-full overflow-y-auto p-8 lg:p-12 flex flex-col gap-8 bg-[#FFF7F5]">
      <header>
        <h1 className="text-3xl font-extrabold tracking-tight text-[#111]">Payouts</h1>
        <p className="mt-1 text-gray-500 font-medium">Track your earnings and transaction history</p>
      </header>

      {/* Stats Cards */}
      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, idx) => (
            <article
              key={idx}
              className="flex flex-col justify-between rounded-[0.85rem] border-[3px] border-gray-200 bg-white p-5 animate-pulse"
              style={{ boxShadow: `6px 6px 0 0 #E5E7EB` }}
            >
              <div className="mb-3 h-6 w-6 rounded bg-gray-200" />
              <div>
                <div className="mb-2 h-8 w-24 rounded bg-gray-200" />
                <div className="mt-1 h-3 w-32 rounded bg-gray-200" />
                <div className="mt-1 h-2 w-20 rounded bg-gray-200" />
              </div>
            </article>
          ))
        ) : (
          statsCards.map((stat, idx) => {
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
                  <p className="text-[1.35rem] font-extrabold tracking-tight text-black">{stat.value}</p>
                  <p className="mt-1 text-[0.7rem] font-bold text-gray-500">{stat.label}</p>
                  {stat.subtitle && (
                    <p className="mt-1 text-[0.55rem] font-bold text-gray-400">{stat.subtitle}</p>
                  )}
                </div>
              </article>
            );
          })
        )}
      </section>

      {loading ? (
        <>
          <section className="rounded-[0.85rem] border-[3px] border-gray-200 bg-white p-6 animate-pulse" style={{ boxShadow: "6px 6px 0 0 #E5E7EB" }}>
            <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full max-w-lg mb-6"></div>
            <div className="flex gap-4">
               <div className="h-10 w-32 bg-gray-200 rounded-xl"></div>
               <div className="h-10 w-40 bg-gray-200 rounded-xl"></div>
            </div>
          </section>
          
          <section className="rounded-[0.85rem] border-[3px] border-gray-200 bg-white flex flex-col animate-pulse" style={{ boxShadow: "6px 6px 0 0 #E5E7EB" }}>
            <div className="p-6 border-b-[3px] border-gray-200">
               <div className="h-6 bg-gray-200 rounded w-48 mb-6"></div>
               <div className="flex flex-col xl:flex-row gap-4 justify-between">
                  <div className="h-10 w-full xl:max-w-xl bg-gray-200 rounded-[0.55rem]"></div>
                  <div className="flex gap-2">
                     <div className="h-10 w-20 bg-gray-200 rounded-[0.55rem]"></div>
                     <div className="h-10 w-24 bg-gray-200 rounded-[0.55rem]"></div>
                     <div className="h-10 w-24 bg-gray-200 rounded-[0.55rem]"></div>
                  </div>
               </div>
            </div>
            <div className="p-6 flex flex-col gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-24 w-full bg-gray-200 rounded-[0.85rem]"></div>
              ))}
            </div>
          </section>
        </>
      ) : (
        <>
          {/* Request Payout */}
          <section 
            className="rounded-[0.85rem] border-[3px] border-black bg-white p-6"
            style={{ boxShadow: "6px 6px 0 0 #F59E0B" }}
          >
            <h2 className="text-xl font-bold text-black">Request Payout</h2>
            <p className="mt-2 text-[0.8rem] text-gray-500 font-medium">
              Withdraw your earnings to your registered bank account. Minimum payout amount is ₹1,000.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <button className="rounded-xl border-[3px] border-black bg-[#F59E0B] px-6 py-2.5 text-sm font-bold text-black hover:bg-[#d98b09] cursor-pointer transition-colors">
                Request Payout
              </button>
              <button className="flex items-center gap-2 rounded-xl border-[3px] border-black bg-white px-6 py-2.5 text-sm font-bold text-black hover:bg-gray-50 cursor-pointer transition-colors">
                <Info size={16} />
                View Terms & Fees
              </button>
            </div>
          </section>

          {/* Transaction History */}
          <section 
            className="rounded-[0.85rem] border-[3px] border-black bg-[#FCEBE7] flex flex-col"
            style={{ boxShadow: "6px 6px 0 0 #5061E4" }}
          >
            <div className="p-6 border-b-[3px] border-black">
              <h2 className="text-xl font-bold text-black">Transaction History</h2>
              
              <div className="mt-6 flex flex-col xl:flex-row gap-4 justify-between">
                <div className="relative w-full xl:max-w-xl">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search by mentee, session, or transaction ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-[0.55rem] border-[3px] border-black py-2 pl-10 pr-4 text-xs font-semibold outline-none focus:ring-2 focus:ring-[#5061E4] focus:border-[#5061E4] transition-all bg-white"
                  />
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {filterTabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`rounded-[0.55rem] border-[3px] border-black px-5 py-2 text-xs font-bold transition-colors ${
                        activeTab === tab 
                          ? "bg-[#5061E4] text-white" 
                          : "bg-white text-black hover:bg-gray-50 cursor-pointer"
                      }`}
                    >
                      {tab === "SUCCESS" ? "Completed" : tab.charAt(0) + tab.slice(1).toLowerCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 flex flex-col gap-4 bg-white rounded-b-xl border-t-0">
              {filteredTransactions.length === 0 ? (
                <div className="text-center py-12">
                  <p className="font-bold text-gray-400 italic">No transactions found.</p>
                </div>
              ) : (
                filteredTransactions.map((txn) => (
                  <article key={txn.id} className="flex flex-col sm:flex-row sm:justify-between rounded-[0.85rem] border-[3px] border-black p-5 gap-4">
                    <div className="flex gap-4 relative">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[0.55rem] border-2 border-black bg-[#FEF3C7] text-[#F59E0B]">
                        <ArrowDownLeft size={20} strokeWidth={2.5} />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h3 className="font-bold text-black text-sm">{txn.mentee}</h3>
                        <p className="text-[0.65rem] font-semibold text-gray-500 mt-1">{txn.service}</p>
                        <p className="text-[0.65rem] font-semibold text-gray-400 mt-0.5">
                          {format(new Date(txn.date), "dd MMM yyyy, hh:mm a")}
                        </p>
                        <p className="text-[0.55rem] font-bold text-gray-400 mt-4">Transaction Ref: <span className="font-extrabold">{txn.transactionRef}</span></p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:items-end gap-2 justify-start pt-1">
                      <p className="text-xl font-extrabold text-[#F59E0B] tracking-tight">₹{txn.amount.toLocaleString()}</p>
                      <div className={`flex items-center gap-1.5 rounded-full px-2 py-0.5 mt-1 w-max ${
                        txn.status === 'SUCCESS' ? 'bg-[#22C55E]' : 
                        txn.status === 'PENDING' ? 'bg-[#F59E0B]' : 'bg-gray-400'
                      }`}>
                        <CheckCircle size={10} className="text-black" />
                        <span className="text-[0.6rem] font-bold text-black uppercase tracking-widest">{txn.status === 'SUCCESS' ? 'Completed' : txn.status}</span>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>
          </section>
        </>
      )}

    </div>
  );
}
