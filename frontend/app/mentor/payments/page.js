"use client";

import { useState } from "react";
import { IndianRupee, Wallet, Clock, CheckCircle, Info, Search, ArrowDownLeft } from "lucide-react";

// Mock Data
const statsCards = [
  {
    label: "Total Earnings",
    value: "₹12,200",
    subtitle: "",
    icon: IndianRupee,
    shadowColor: "#5061E4",
    iconColor: "text-[#5061E4]",
  },
  {
    label: "Available for Payout",
    value: "₹10,370",
    subtitle: "After 15% platform fee",
    icon: Wallet,
    shadowColor: "#F59E0B",
    iconColor: "text-[#F59E0B]",
  },
  {
    label: "Pending Amount",
    value: "₹1,500",
    subtitle: "",
    icon: Clock,
    shadowColor: "#F97316",
    iconColor: "text-[#F97316]",
  },
  {
    label: "Completed Transactions",
    value: "8",
    subtitle: "",
    icon: CheckCircle,
    shadowColor: "#5061E4",
    iconColor: "text-[#5061E4]",
  },
];

const mockTransactions = [
  {
    id: "TXN20264180001",
    mentee: "Priya Sharma",
    session: "Case Study Practice - Market Entry",
    date: "18 Apr 2026, 10:30 am",
    amount: "+₹1,500",
    status: "completed",
  },
  {
    id: "TXN20264170002",
    mentee: "Rahul Verma",
    session: "Resume Review Session",
    date: "17 Apr 2026, 02:00 pm",
    amount: "+₹1,200",
    status: "completed",
  },
];

const filterTabs = ["All", "Completed", "Pending", "Failed"];

export default function MentorPaymentsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="w-full h-full overflow-y-auto p-8 lg:p-12 flex flex-col gap-8 bg-[#FFF7F5]">
      <header>
        <h1 className="text-3xl font-extrabold tracking-tight text-[#111]">Payouts</h1>
        <p className="mt-1 text-gray-500 font-medium">Track your earnings and transaction history</p>
      </header>

      {/* Stats Cards */}
      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {statsCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <article
              key={idx}
              className="flex flex-col justify-between rounded-[0.85rem] border-[3px] border-black bg-white p-5"
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
        })}
      </section>

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
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 flex flex-col gap-4 bg-white rounded-b-xl border-t-0">
          {mockTransactions.map((txn) => (
            <article key={txn.id} className="flex flex-col sm:flex-row sm:justify-between rounded-[0.85rem] border-[3px] border-black p-5 gap-4">
              <div className="flex gap-4 relative">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[0.55rem] border-2 border-black bg-[#FEF3C7] text-[#F59E0B]">
                  <ArrowDownLeft size={20} strokeWidth={2.5} />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="font-bold text-black text-sm">{txn.mentee}</h3>
                  <p className="text-[0.65rem] font-semibold text-gray-500 mt-1">{txn.session}</p>
                  <p className="text-[0.65rem] font-semibold text-gray-400 mt-0.5">{txn.date}</p>
                  <p className="text-[0.55rem] font-bold text-gray-400 mt-4">Transaction ID: <span className="font-extrabold">{txn.id}</span></p>
                </div>
              </div>
              <div className="flex flex-col sm:items-end gap-2 justify-start pt-1">
                <p className="text-xl font-extrabold text-[#F59E0B] tracking-tight">{txn.amount}</p>
                <div className="flex items-center gap-1.5 rounded-full bg-[#F59E0B] px-2 py-0.5 mt-1 w-max">
                  <CheckCircle size={10} className="text-black" />
                  <span className="text-[0.6rem] font-bold text-black uppercase tracking-widest">{txn.status}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

    </div>
  );
}
