"use client";

import { useState, useEffect } from "react";
import { Search, Video, FileText, User, Calendar, Clock, MessageSquare, Loader2, Users } from "lucide-react";
import { mentorBookingApi, resolveUploadUrl } from "../../../lib/api";
import { toast } from "sonner";
import { format } from "date-fns";
import SessionDetailsModal from "../../../components/mentee/v2/SessionDetailsModal";

export default function MyMenteesPage() {
  const [mentees, setMentees] = useState([]);
  const [selectedMentee, setSelectedMentee] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sessionsLoading, setSessionsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSessionDetails, setSelectedSessionDetails] = useState(null);

  // 1. Fetch initial list of mentees
  useEffect(() => {
    const fetchMentees = async () => {
      try {
        const res = await mentorBookingApi.listMentees();
        const list = res.data?.mentees || [];
        setMentees(list);
        if (list.length > 0) {
          setSelectedMentee(list[0]);
        }
      } catch (e) {
        toast.error("Failed to load mentees");
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchMentees();
  }, []);

  // 2. Fetch sessions whenever selectedMentee changes
  useEffect(() => {
    if (!selectedMentee) return;

    const fetchSessions = async () => {
      setSessionsLoading(true);
      try {
        const res = await mentorBookingApi.listBookingsForMentee(selectedMentee.id);
        setSessions(res.data?.bookings || []);
      } catch (e) {
        toast.error("Failed to load sessions for this mentee");
        console.error(e);
      } finally {
        setSessionsLoading(false);
      }
    };
    fetchSessions();
  }, [selectedMentee]);

  const filteredMentees = mentees.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex h-full w-full">
        {/* Left List Pane Skeleton */}
        <div className="w-80 border-r-2 border-black flex flex-col bg-white">
          <div className="p-5 border-b-2 border-black">
            <div className="h-10 w-full rounded-xl bg-gray-200 animate-pulse"></div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-4 border-b border-gray-200 animate-pulse">
                <div className="w-12 h-12 rounded-xl bg-gray-200"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-32"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content Pane Skeleton */}
        <div className="flex-1 flex flex-col bg-[#FFF7F5] overflow-y-auto relative">
          <header className="sticky top-0 bg-[#FFF7F5] z-10 px-8 py-6 border-b-2 border-black flex items-center justify-between">
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
          </header>
          <div className="p-8 flex flex-col gap-6">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="rounded-2xl border-[3px] border-gray-200 bg-white p-6 animate-pulse" style={{ boxShadow: "6px 6px 0 0 #E5E7EB" }}>
                <div className="flex items-start gap-4 mb-6">
                  <div className="h-12 w-12 rounded-xl bg-gray-200"></div>
                  <div className="flex-1">
                    <div className="h-6 bg-gray-200 rounded w-48 mb-3"></div>
                    <div className="flex gap-4">
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                      <div className="h-4 bg-gray-200 rounded w-16"></div>
                    </div>
                  </div>
                </div>
                <div className="h-16 w-full bg-gray-200 rounded-xl mb-6"></div>
                <div className="flex gap-3">
                  <div className="h-10 w-full bg-gray-200 rounded-xl"></div>
                  <div className="h-10 w-full bg-gray-200 rounded-xl"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (mentees.length === 0) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-[#FFF7F5] p-8 text-center">
        <div className="rounded-2xl border-4 border-black bg-white p-12 shadow-[8px_8px_0_0_#000]">
          <Users size={64} className="mx-auto mb-6 text-[#5061E4]" />
          <h2 className="text-2xl font-black text-black">No Mentees Yet</h2>
          <p className="mt-4 max-w-xs font-bold text-gray-500">
            Once students start booking sessions with you, they will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full">
      {/* Left List Pane */}
      <div className="w-80 border-r-2 border-black flex flex-col bg-white">
        <div className="p-5 border-b-2 border-black">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search mentees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-black py-1.75 pl-10 pr-4 text-sx outline-none focus:ring-2 focus:ring-[#5061E4] focus:border-[#5061E4] transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredMentees.map((mentee) => {
            const isActive = selectedMentee?.id === mentee.id;
            return (
              <button
                key={mentee.id}
                onClick={() => setSelectedMentee(mentee)}
                className={`w-full flex items-center gap-4 px-5 py-4 border-b border-gray-200 transition-colors text-left cursor-pointer ${
                  isActive ? "bg-[#EDE9FE]" : "hover:bg-gray-50"
                }`}
              >
                <div className="relative">
                  {mentee.profilePicture ? (
                    <img
                      src={resolveUploadUrl(mentee.profilePicture)}
                      alt={mentee.name}
                      className="w-12 h-12 rounded-xl object-cover border-2 border-black shadow-[2px_2px_0_0_#000]"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-xl border-2 border-black bg-[#5061E4] shadow-[2px_2px_0_0_#000] flex items-center justify-center text-white font-bold">
                      {mentee.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-bold text-[#111]">{mentee.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5 truncate max-w-[150px]">{mentee.email}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Content Pane */}
      <div className="flex-1 flex flex-col bg-[#FFF7F5] overflow-y-auto relative">
        <header className="sticky top-0 bg-[#FFF7F5] z-10 px-8 py-6 border-b-2 border-black flex items-center justify-between">
          <h2 className="text-2xl font-extrabold tracking-tight text-black">
            {selectedMentee?.name}
          </h2>
        </header>

        <div className="p-8 flex flex-col gap-6">
          {sessionsLoading ? (
            Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="rounded-2xl border-[3px] border-gray-200 bg-white p-6 animate-pulse" style={{ boxShadow: "6px 6px 0 0 #E5E7EB" }}>
                <div className="flex items-start gap-4 mb-6">
                  <div className="h-12 w-12 rounded-xl bg-gray-200"></div>
                  <div className="flex-1">
                    <div className="h-6 bg-gray-200 rounded w-48 mb-3"></div>
                    <div className="flex gap-4">
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                      <div className="h-4 bg-gray-200 rounded w-16"></div>
                    </div>
                  </div>
                </div>
                <div className="h-16 w-full bg-gray-200 rounded-xl mb-6"></div>
                <div className="flex gap-3">
                  <div className="h-10 w-full bg-gray-200 rounded-xl"></div>
                  <div className="h-10 w-full bg-gray-200 rounded-xl"></div>
                </div>
              </div>
            ))
          ) : sessions.length === 0 ? (
            <div className="text-center py-12">
              <p className="font-bold text-gray-400 italic">No session history found for this mentee.</p>
            </div>
          ) : (
            sessions.map((session) => {
              const isUpcoming = new Date(session.startTime) > new Date();
              
              return (
              <article
                key={session.id}
                className="rounded-xl border border-black bg-white p-4"
                style={{ boxShadow: "6px 6px 0 0 #000" }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#1f2937] bg-[#EDE9FE] text-[#5061E4]">
                      <Video size={24} strokeWidth={2.5} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-black">
                        {console.log("=======", session)}
                        {console.log("----------------------------------------------------", session.service)}
                        {session.service?.label || "Mentoring Session"}
                      </h3>
                      <div className="mt-1 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={14} /> {format(new Date(session.startTime), "dd MMM yyyy")}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock size={14} /> {session.service?.durationMinutes || 0} mins
                        </span>
                        <span className="flex items-center gap-1.5 rounded bg-[#5061E4] px-1.5 py-0.5 text-xs text-white uppercase font-bold">
                          {session.sessionType?.replace("_", " ")}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <span className={`rounded-md px-3 py-1 text-xs font-bold text-white tracking-wider uppercase ${
                      session.bookingStatus === 'COMPLETED' ? 'bg-[#22C55E]' : 
                      session.bookingStatus === 'PENDING' ? 'bg-[#F59E0B]' : 
                      session.bookingStatus === 'CONFIRMED' ? 'bg-[#5061E4]' : 'bg-gray-400'
                    }`}>
                      {session.bookingStatus}
                    </span>
                  </div>
                </div>

                {session.purposeOfCall && (
                  <div className="mt-6 flex items-start gap-3 rounded-xl border border-gray-200 bg-[#FAFAFA] p-4 text-sm font-medium text-gray-600">
                    <FileText size={18} className="mt-0.5 shrink-0 text-gray-400" />
                    <p>{session.purposeOfCall}</p>
                  </div>
                )}

                <div className="mt-6 flex justify-center gap-3 w-full">
                  <button 
                    onClick={() => setSelectedSessionDetails(session)}
                    className="w-full flex items-center justify-center gap-2 rounded-xl border border-black bg-[#5061E4] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 cursor-pointer shadow-[2px_2px_0_0_#000]"
                  >
                    <FileText size={16} />
                    Booking Details
                  </button>

                  {isUpcoming && (
                    <button 
                      onClick={() => window.open(`/mentees/${session.mentee.id}`)}
                      className="w-full flex items-center justify-center gap-2 rounded-xl border border-black bg-white px-5 py-2.5 text-sm font-semibold text-black transition-opacity hover:bg-gray-50 cursor-pointer shadow-[2px_2px_0_0_#000]"
                    >
                      <User size={16} />
                      View Profile
                    </button>
                  )}

                  {session.isFeedbackSubmitted ? (
                    <button className="w-full flex items-center justify-center gap-2 rounded-xl border border-black bg-[#F59E0B] px-5 py-2.5 text-sm font-semibold text-black transition-opacity hover:opacity-90 cursor-pointer shadow-[2px_2px_0_0_#000]">
                      <MessageSquare size={16} />
                      View Feedback
                    </button>
                  ) : null}
                </div>
              </article>
            );
            })
          )}
        </div>
      </div>

      {selectedSessionDetails && (
        <SessionDetailsModal session={selectedSessionDetails} onClose={() => setSelectedSessionDetails(null)} />
      )}
    </div>
  );
}