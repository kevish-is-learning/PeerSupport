"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Calendar, Clock, Star, Video, ExternalLink } from "lucide-react";
import { menteeDashboardApi, resolveUploadUrl } from "../../../lib/api";
import { canJoinSession, joinDisabledReason } from "../../../lib/sessionUtils";
import Link from "next/link";
import { format } from "date-fns";

const StatCard = ({ icon: Icon, value, label, shadowColor }) => (
  <article className={`rounded-2xl border-2 border-black bg-white p-6 shadow-[6px_6px_0px_0px_${shadowColor}]`}>
    <div className={`mb-3 inline-flex rounded-lg text-[${shadowColor}]`}>
      <Icon className="h-6 w-6" style={{ color: shadowColor }} />
    </div>
    <div className="flex flex-col">
      <span className="text-3xl font-extrabold tracking-tight text-gray-900">{value}</span>
      <span className="text-xs font-bold text-gray-500">{label}</span>
    </div>
  </article>
);

function UpcomingSessionCard({ session }) {
  const router = useRouter();
  return (
  <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4">
    <div className="flex items-center gap-4">
      <div className="h-16 w-16 overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
        {session.mentorPicture ? (
          <img
            src={resolveUploadUrl(session.mentorPicture)}
            alt={session.mentorName}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xl font-bold text-gray-400">
            {session.mentorName?.charAt(0) || "M"}
          </div>
        )}
      </div>
      <div>
        <h4 className="font-bold text-gray-900">{session.mentorName}</h4>
        <p className="text-sm font-medium text-gray-500">{session?.serviceType?.replace(/_/g, " ")}</p>
        <div className="mt-2 flex items-center gap-2">
          <span className="inline-flex items-center rounded bg-[#8B5CF6] px-2 py-0.5 text-xs font-bold text-white">
            1:1
          </span>
          <span className="text-xs font-medium text-gray-500">
            {format(new Date(session.startTime), "EEE, MMM d • h:mm a")}
          </span>
        </div>
      </div>
    </div>
    <button
      disabled={!canJoinSession(session.startTime, session.endTime)}
      className={`rounded-xl border-2 border-[#1E1E1E] px-6 py-2 text-sm font-bold text-white shadow-[2px_2px_0px_0px_#1E1E1E] transition-all ${
        canJoinSession(session.startTime, session.endTime)
          ? "bg-[#8B5CF6] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#1E1E1E] active:translate-y-0 active:shadow-[0px_0px_0px_0px_#1E1E1E]"
          : "bg-gray-400 opacity-60 cursor-not-allowed"
      }`}
      onClick={() => {
         if (canJoinSession(session.startTime, session.endTime) && session.meetingLink) router.push(`/meeting/${session.bookingId || session.id}`);
      }}
      title={!canJoinSession(session.startTime, session.endTime) ? joinDisabledReason(session.startTime) : ""}
    >
      {canJoinSession(session.startTime, session.endTime) ? "Join" : joinDisabledReason(session.startTime)}
    </button>
  </div>
  );
}

const RecommendedMentorCard = ({ mentor }) => (
  <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-4">
    <div className="flex gap-3">
      <div className="h-12 w-12 overflow-hidden rounded-xl border border-gray-200 bg-gray-50 shrink-0">
        {mentor.profilePicture ? (
          <img
            src={resolveUploadUrl(mentor.profilePicture)}
            alt={mentor.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-lg font-bold text-gray-400">
            {mentor.name?.charAt(0) || "M"}
          </div>
        )}
      </div>
      <div className="flex flex-col overflow-hidden">
        <h4 className="truncate font-bold text-gray-900 text-sm">{mentor.name}</h4>
        <p className="truncate text-xs font-medium text-gray-500">{mentor.pgCollege || mentor.ugCollege || "Mentor"}</p>
      </div>
    </div>
    
    <div className="mt-3 text-xs text-gray-600 line-clamp-1 break-words">
       {mentor.expertise?.join(", ")}
    </div>

    {mentor.bio && (
      <p className="mt-1.5 text-xs text-gray-500 line-clamp-2 break-words overflow-hidden leading-relaxed">
        {mentor.bio}
      </p>
    )}
    
    <div className="mt-2 flex items-center gap-2 text-xs font-bold text-gray-500">
      <span className="flex items-center text-[#F59E0B]">
        <Star className="mr-1 h-3 w-3 fill-current" />
        {mentor.rating > 0 ? mentor.rating.toFixed(1) : "New"}
      </span>
      <span>•</span>
      <span>{mentor.totalSessions} sessions</span>
    </div>
    
    <Link 
      href={`/mentee/find-mentors`} 
      className="mt-3 flex w-full items-center justify-center rounded-lg bg-[#38BDF8] py-2 text-xs font-bold text-white transition-colors hover:bg-[#0284C7]"
    >
      View Profile
    </Link>
  </div>
);

export default function MenteeDashboardPage() {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const res = await menteeDashboardApi.getDashboardData();
        setDashboardData(res.data);
      } catch (err) {
        setError(err?.message || "Failed to load dashboard data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-6xl m-10">
        {/* Header skeleton */}
        <div className="mb-8 animate-pulse">
          <div className="h-8 w-56 rounded-lg bg-gray-200 mb-2" />
          <div className="h-4 w-44 rounded bg-gray-200" />
        </div>

        {/* Stat cards skeleton */}
        <div className="mb-8 grid gap-6 sm:grid-cols-3">
          {["#8B5CF6", "#0EA5E9", "#F59E0B"].map((color, i) => (
            <div
              key={i}
              className="animate-pulse rounded-2xl border-2 border-gray-200 bg-white p-6"
              style={{ boxShadow: `6px 6px 0px 0px #E5E7EB` }}
            >
              <div className="mb-3 h-6 w-6 rounded bg-gray-200" />
              <div className="h-8 w-20 rounded bg-gray-200 mb-2" />
              <div className="h-3 w-28 rounded bg-gray-200" />
            </div>
          ))}
        </div>

        {/* Main content skeleton */}
        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
          {/* Upcoming sessions skeleton */}
          <div
            className="animate-pulse rounded-2xl border-2 border-gray-200 bg-white"
            style={{ boxShadow: "6px 6px 0px 0px #E5E7EB" }}
          >
            <div className="flex items-center gap-3 border-b-2 border-gray-200 px-5 py-4 rounded-t-[14px]">
              <div className="h-5 w-5 rounded bg-gray-200" />
              <div className="h-5 w-40 rounded bg-gray-200" />
            </div>
            <div className="p-6 space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between rounded-xl border border-gray-100 p-4">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-xl bg-gray-200" />
                    <div>
                      <div className="h-4 w-32 rounded bg-gray-200 mb-2" />
                      <div className="h-3 w-24 rounded bg-gray-200 mb-2" />
                      <div className="h-3 w-40 rounded bg-gray-200" />
                    </div>
                  </div>
                  <div className="h-9 w-16 rounded-xl bg-gray-200" />
                </div>
              ))}
            </div>
          </div>

          {/* Recommended mentors skeleton */}
          <div
            className="animate-pulse rounded-2xl border-2 border-gray-200 bg-white"
            style={{ boxShadow: "6px 6px 0px 0px #E5E7EB" }}
          >
            <div className="flex items-center gap-3 border-b-2 border-gray-200 px-5 py-4 rounded-t-[14px]">
              <div className="h-5 w-5 rounded bg-gray-200" />
              <div className="h-5 w-32 rounded bg-gray-200" />
            </div>
            <div className="p-4 space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded-xl border border-gray-100 p-4">
                  <div className="flex gap-3 mb-3">
                    <div className="h-12 w-12 rounded-xl bg-gray-200 shrink-0" />
                    <div>
                      <div className="h-4 w-24 rounded bg-gray-200 mb-1" />
                      <div className="h-3 w-20 rounded bg-gray-200" />
                    </div>
                  </div>
                  <div className="h-3 w-full rounded bg-gray-200 mb-3" />
                  <div className="h-8 w-full rounded-lg bg-gray-200" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="font-bold text-red-500">{error}</p>
      </div>
    );
  }

  const { stats, upcomingSessions, recommendedMentors } = dashboardData;

  return (
    <div className="mx-auto w-full max-w-6xl p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Welcome Back!</h1>
        <p className="mt-1 text-sm font-medium text-gray-500">Continue your learning journey</p>
      </div>

      <div className="mb-8 grid gap-6 sm:grid-cols-3">
        <StatCard
          icon={BookOpen}
          value={stats.totalSessions || 0}
          label="Total Sessions"
          shadowColor="#8B5CF6"
        />
        <StatCard
          icon={Calendar}
          value={stats.upcomingSessions}
          label="Upcoming Sessions"
          shadowColor="#0EA5E9"
        />
        <StatCard
          icon={Clock}
          value={`${stats.hoursLearned}h`}
          label="Hours Learned"
          shadowColor="#FF5833"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        {/* Upcoming Sessions Section */}
        <div className="relative rounded-2xl border-2 border-black bg-white shadow-[6px_6px_0px_0px_#8B5CF6]">
          <div className="flex items-center gap-3 border-b-2 border-black bg-[#F8EBE6] px-5 py-4 rounded-t-[14px]">
            <Calendar className="h-5 w-5 text-gray-900" />
            <h3 className="text-lg font-bold text-gray-900">Upcoming Sessions</h3>
          </div>
          <div className="p-6">
            {upcomingSessions.length > 0 ? (
              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <UpcomingSessionCard key={session.id} session={session} />
                ))}
                
                <div className="pt-2 text-center">
                   <Link href="/mentee/dashboard" className="text-sm font-bold text-[#8B5CF6] hover:underline">
                     View All Sessions →
                   </Link>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="mb-3 rounded-full bg-gray-100 p-3">
                  <Video className="h-6 w-6 text-gray-400" />
                </div>
                <h4 className="font-bold text-gray-900">No upcoming sessions</h4>
                <p className="mt-1 text-sm text-gray-500">Book a session with a mentor to get started.</p>
                <Link
                  href="/mentee/find-mentors"
                  className="mt-4 rounded-xl border-2 border-black bg-white px-4 py-2 text-sm font-bold shadow-[2px_2px_0px_0px_#1E1E1E] transition-all hover:shadow-[4px_4px_0px_0px_#1E1E1E]"
                >
                  Find a Mentor
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Recommended Mentors Section */}
        <div className="relative rounded-2xl border-2 border-black bg-white shadow-[6px_6px_0px_0px_#0EA5E9]">
          <div className="flex items-center gap-3 border-b-2 border-black bg-[#F8EBE6] px-5 py-4 rounded-t-[14px]">
            <Star className="h-5 w-5 text-gray-900" />
            <h3 className="text-lg font-bold text-gray-900">Recommended</h3>
          </div>
          <div className="p-4">
            {recommendedMentors.length > 0 ? (
              <div className="space-y-4">
                {recommendedMentors.map((mentor) => (
                  <RecommendedMentorCard key={mentor.id} mentor={mentor} />
                ))}
                
                <div className="pt-2 text-center">
                   <Link href="/mentee/find-mentors" className="text-sm font-bold text-[#0EA5E9] hover:underline">
                     Explore More →
                   </Link>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center">
                 <p className="text-sm text-gray-500 font-medium">No recommendations available yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
