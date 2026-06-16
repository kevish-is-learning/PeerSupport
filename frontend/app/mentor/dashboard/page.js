"use client";

import { IndianRupee, Calendar, Users, Star, Loader2, Video, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { mentorBookingApi } from "../../../lib/api";
import { toast } from "sonner";
import { format, isToday, isTomorrow, addDays } from "date-fns";
import Link from "next/link";

export default function MentorDashboardPage() {
  const [stats, setStats] = useState(null);
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, sessionsRes] = await Promise.all([
          mentorBookingApi.getDashboardStats(),
          mentorBookingApi.getSessions()
        ]);
        
        setStats(statsRes.data?.stats);
        
        // Filter sessions within next 7 days
        const now = new Date();
        const next7Days = addDays(now, 7);
        const sessions = sessionsRes.data?.upcomingSessions || [];
        const next7DaysSessions = sessions.filter(session => {
          const sessionDate = new Date(session.startTime);
          return sessionDate >= now && sessionDate <= next7Days;
        });
        
        setUpcomingSessions(next7DaysSessions);
      } catch (e) {
        toast.error("Failed to load dashboard data");
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getSessionDateLabel = (dateString) => {
    const date = new Date(dateString);
    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";
    return format(date, "MMM d");
  };


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

      {/* Upcoming Sessions Section */}
      <section className="mt-10 rounded-xl border-[3px] border-black bg-[#F8F9FF] overflow-hidden" style={{ boxShadow: `6px 6px 0 0 #5061E4` }}>
        <div className="flex items-center gap-3 border-b-[3px] border-black p-5 bg-[#F8F9FF]">
          <Calendar size={28} className="text-black" strokeWidth={2.5} />
          <h2 className="text-xl lg:text-2xl font-extrabold tracking-tight text-black">
            Upcoming Sessions — Next 7 Days
          </h2>
        </div>

        <div className="p-6 flex flex-col gap-4 bg-white">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="animate-spin text-gray-400" size={32} />
            </div>
          ) : upcomingSessions.length > 0 ? (
            upcomingSessions.map((session) => {
              const menteeName = session.mentee?.name || "Mentee";
              const initial = menteeName.charAt(0).toUpperCase();
              
              return (
                <div 
                  key={session.id} 
                  className="flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-[#FFF7F5] transition-all hover:-translate-y-0.5 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full text-white font-bold text-lg bg-[#5061E4]">
                      {initial}
                    </div>
                    <div>
                      <p className="font-extrabold text-black text-lg leading-tight">{menteeName}</p>
                      <p className="text-sm font-semibold text-gray-500">{session.serviceName}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <p className="font-extrabold text-black text-md">
                        {getSessionDateLabel(session.startTime)}
                      </p>
                      <p className="text-sm font-semibold text-gray-500">
                        {format(new Date(session.startTime), "h:mm a")}
                      </p>
                    </div>
                    
                    <Link
                      href={`/meeting/${session.id}`}
                      className="flex items-center gap-2 px-5 py-2.5 bg-[#5061E4] text-white font-bold rounded-lg border-[2px] border-[#5061E4] hover:bg-white hover:text-[#5061E4] transition-colors"
                    >
                      <Video size={18} strokeWidth={2.5} />
                      Join
                    </Link>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-8 text-center text-gray-500 font-semibold">
              No upcoming sessions in the next 7 days.
            </div>
          )}

          <div className="mt-4 text-center">
            <Link 
              href="/mentor/bookings" 
              className="inline-flex items-center gap-2 text-[#5061E4] font-bold hover:underline transition-all"
            >
              View All Sessions <ArrowRight size={18} strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
