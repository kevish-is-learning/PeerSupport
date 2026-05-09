"use client";

import { useEffect, useState } from "react";
import { Calendar as CalendarIcon, Clock, Video, MapPin, Star } from "lucide-react";
import { menteeBookingApi, resolveUploadUrl } from "../../../lib/api";
import { format } from "date-fns";

const SessionCard = ({ session, isUpcoming }) => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-xl border border-gray-200 bg-white p-4">
    <div className="flex items-center gap-4 w-full sm:w-auto">
      <div className="h-16 w-16 overflow-hidden rounded-xl border border-gray-200 bg-gray-50 flex-shrink-0">
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
        <p className="text-sm font-medium text-gray-500 mb-2">{session.serviceType.replace(/_/g, " ")}</p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-gray-500">
          <div className="flex items-center gap-1">
            <CalendarIcon className="h-3.5 w-3.5" />
            {format(new Date(session.startTime), "EEE, MMM d")}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {format(new Date(session.startTime), "h:mm a")} • {session.durationMinutes} min
          </div>
          {isUpcoming && (
            <span className="inline-flex items-center rounded bg-[#8B5CF6] px-2 py-0.5 text-xs font-bold text-white">
              1:1
            </span>
          )}
          {!isUpcoming && session.rating && (
            <div className="flex items-center text-[#F59E0B]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-3 w-3 ${i < Math.floor(session.rating) ? 'fill-current' : 'text-gray-300'}`} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    <div className="mt-4 sm:mt-0 flex gap-2 w-full sm:w-auto">
      {isUpcoming ? (
        <>
          <button
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-xl border-2 border-black bg-white px-4 py-2 text-sm font-bold shadow-[2px_2px_0px_0px_#1E1E1E] transition-all hover:shadow-[4px_4px_0px_0px_#1E1E1E]"
            onClick={() => alert("Details coming soon.")}
          >
            <MapPin className="h-4 w-4" />
            Details
          </button>
          <button
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-xl border-2 border-[#1E1E1E] bg-[#8B5CF6] px-6 py-2 text-sm font-bold text-white shadow-[2px_2px_0px_0px_#1E1E1E] transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#1E1E1E] active:translate-y-0 active:shadow-[0px_0px_0px_0px_#1E1E1E]"
            onClick={() => {
              if (session.meetingLink) window.open(session.meetingLink, "_blank");
              else alert("Meeting link will be available soon.");
            }}
          >
            <Video className="h-4 w-4" />
            Join Session
          </button>
        </>
      ) : (
        <button
          className="w-full sm:w-auto rounded-xl border-2 border-black bg-white px-6 py-2 text-sm font-bold shadow-[2px_2px_0px_0px_#1E1E1E] transition-all hover:shadow-[4px_4px_0px_0px_#1E1E1E]"
          onClick={() => alert("Notes feature coming soon.")}
        >
          View Notes
        </button>
      )}
    </div>
  </div>
);

export default function MenteeSessionsPage() {
  const [sessionsData, setSessionsData] = useState({ upcoming: [], past: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setIsLoading(true);
        const res = await menteeBookingApi.getMySessions();
        setSessionsData(res.data);
      } catch (err) {
        setError(err?.message || "Failed to load sessions");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSessions();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="font-bold text-gray-500">Loading your sessions...</p>
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

  const { upcoming, past } = sessionsData;

  return (
    <div className="mx-auto w-full max-w-4xl pb-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">My Sessions</h1>
        <p className="mt-1 text-sm font-medium text-gray-500">Manage your upcoming and past mentoring sessions</p>
      </div>

      <div className="grid gap-8">
        {/* Upcoming Sessions Section */}
        <div className="relative rounded-2xl border-2 border-black bg-white shadow-[8px_8px_0px_0px_#8B5CF6]">
          <div className="flex items-center gap-3 border-b-2 border-black bg-[#F8EBE6] px-5 py-4 rounded-t-[14px]">
            <CalendarIcon className="h-5 w-5 text-gray-900" />
            <h3 className="text-lg font-bold text-gray-900">Upcoming Sessions</h3>
          </div>
          <div className="p-6">
            {upcoming.length > 0 ? (
              <div className="space-y-4">
                {upcoming.map((session) => (
                  <SessionCard key={session.id} session={session} isUpcoming={true} />
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-gray-500 font-medium">
                No upcoming sessions scheduled.
              </div>
            )}
          </div>
        </div>

        {/* Past Sessions Section */}
        <div className="relative rounded-2xl border-2 border-black bg-white shadow-[8px_8px_0px_0px_#06B6D4]">
          <div className="flex items-center gap-3 border-b-2 border-black bg-[#F8EBE6] px-5 py-4 rounded-t-[14px]">
            <Clock className="h-5 w-5 text-gray-900" />
            <h3 className="text-lg font-bold text-gray-900">Past Sessions</h3>
          </div>
          <div className="p-6">
            {past.length > 0 ? (
              <div className="space-y-4">
                {past.map((session) => (
                  <SessionCard key={session.id} session={session} isUpcoming={false} />
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-gray-500 font-medium">
                No past sessions.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
