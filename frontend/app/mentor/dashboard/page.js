"use client";

import { IndianRupee, Calendar, Users, Star, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { mentorBookingApi } from "../../../lib/api";
import { toast } from "sonner";

export default function MentorDashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await mentorBookingApi.getDashboardStats();
        setStats(res.data?.stats);
      } catch (e) {
        toast.error("Failed to load dashboard stats");
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);


  const cards = [
    {
      label: "Total Revenue",
      value: `₹${stats?.totalEarnings?.toLocaleString() || 0}`,
      subtitle: `This month: ₹${stats?.monthEarnings?.toLocaleString() || 0}`,
      icon: IndianRupee,
      shadowColor: "#5061E4",
      iconColor: "text-[#5061E4]",
    },
    {
      label: "Total Sessions",
      value: stats?.totalSessions || 0,
      subtitle: `This month: ${stats?.monthSessions || 0}`,
      icon: Calendar,
      shadowColor: "#F59E0B",
      iconColor: "text-[#F59E0B]",
    },
    {
      label: "Active Mentees",
      value: stats?.activeMentees || 0,
      subtitle: "Unique bookings",
      icon: Users,
      shadowColor: "#F97316",
      iconColor: "text-[#F97316]",
    },
    {
      label: "Average Rating",
      value: stats?.averageRating?.toFixed(1) || "N/A",
      subtitle: "Based on reviews",
      icon: Star,
      shadowColor: "#4F46E5",
      iconColor: "text-[#F59E0B]",
    },
  ];

  return (
    <div className="w-full h-full overflow-y-auto p-8 lg:p-12 bg-[#FFF7F5]">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-[#111]">Home</h1>
        <p className="mt-1 text-gray-500 font-medium">Welcome back! Here's your mentoring overview</p>
      </header>

      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, idx) => (
            <article
              key={idx}
              className="flex flex-col justify-between rounded-xl border-[3px] border-gray-200 bg-white p-5 animate-pulse"
              style={{ boxShadow: `6px 6px 0 0 #E5E7EB` }}
            >
              <div className="mb-4 h-6 w-6 rounded bg-gray-200" />
              <div>
                <div className="mb-2 h-8 w-24 rounded bg-gray-200" />
                <div className="mt-1 mb-1 h-4 w-32 rounded bg-gray-200" />
                <div className="mt-1 h-3 w-20 rounded bg-gray-200" />
              </div>
            </article>
          ))
        ) : (
          cards.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <article
                key={idx}
                className="flex flex-col justify-between rounded-xl border-[3px] border-black bg-white p-5 hover:-translate-y-1 transition-transform"
                style={{ boxShadow: `6px 6px 0 0 ${stat.shadowColor}` }}
              >
                <div className="mb-4">
                  <Icon size={24} className={stat.iconColor} strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-3xl font-extrabold tracking-tight text-black">{stat.value}</p>
                  <p className="mt-1 text-sm font-bold text-gray-500">{stat.label}</p>
                  <p className="mt-1 text-xs font-semibold text-gray-400">{stat.subtitle}</p>
                </div>
              </article>
            );
          })
        )}
      </section>
    </div>
  );
}
