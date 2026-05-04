"use client";

import { useState } from "react";
import { Search, Video, FileText, User, Calendar, Clock, MessageSquare } from "lucide-react";

// Mock Data
const menteesData = [
  { id: 1, name: "Priya Sharma", email: "priya.sharma@email.com", img: "https://i.pravatar.cc/150?img=47" },
  { id: 2, name: "Rahul Verma", email: "rahul.verma@email.com", img: "https://i.pravatar.cc/150?img=11" },
  { id: 3, name: "Ananya Reddy", email: "ananya.reddy@email.com", img: "https://i.pravatar.cc/150?img=32" },
  { id: 4, name: "Vikram Singh", email: "vikram.singh@email.com", img: "https://i.pravatar.cc/150?img=60" },
  { id: 5, name: "Sneha Patel", email: "sneha.patel@email.com", img: "https://i.pravatar.cc/150?img=43" },
];

const mockSessions = [
  {
    id: 1,
    title: "Final Mock Interview",
    status: "upcoming",
    date: "22 Apr 2026",
    duration: "60 mins",
    type: "1:1",
    notes: "Comprehensive mock interview covering all topics.",
  },
  {
    id: 2,
    title: "Case Study Practice - Market Entry Strategy",
    status: "completed",
    date: "15 Apr 2026",
    duration: "60 mins",
    type: "1:1",
    notes: "Excellent progress on MECE framework. Practiced 2 market sizing cases.",
  },
  {
    id: 3,
    title: "Resume Review & Interview Preparation",
    status: "completed",
    date: "8 Apr 2026",
    duration: "45 mins",
    type: "1:1",
    notes: "Improved resume with quantified achievements. Discussed interview timeline.",
  },
  {
    id: 4,
    title: "IIM Application Strategy",
    status: "completed",
    date: "1 Apr 2026",
    duration: "60 mins",
    type: "1:1",
    notes: "Finalized target B-schools list. Reviewed SOP draft.",
  },
];

export default function MyMenteesPage() {
  const [selectedMentee, setSelectedMentee] = useState(menteesData[0]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMentees = menteesData.filter((mentee) =>
    mentee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              className="w-full rounded-xl border border-black py-2.5 pl-10 pr-4 text-sx outline-none focus:ring-2 focus:ring-[#5061E4] focus:border-[#5061E4] transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredMentees.map((mentee) => {
            const isActive = selectedMentee.id === mentee.id;
            return (
              <button
                key={mentee.id}
                onClick={() => setSelectedMentee(mentee)}
                className={`w-full flex items-center gap-4 px-5 py-4 border-b border-gray-200 transition-colors text-left cursor-pointer ${
                  isActive ? "bg-[#EDE9FE]" : "hover:bg-gray-50"
                }`}
              >
                <img
                  src={mentee.img}
                  alt={mentee.name}
                  className="w-12 h-12 rounded-xl object-cover border-2 border-black shadow-[2px_2px_0_0_#000]"
                />
                <div>
                  <p className="font-bold text-[#111]">{mentee.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{mentee.email}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Content Pane */}
      <div className="flex-1 flex flex-col bg-[#FFF7F5] overflow-y-auto relative">
        <header className="sticky top-0 bg-[#FFF7F5] z-10 px-8 py-6 border-b-2 border-black">
          <h2 className="text-2xl font-extrabold tracking-tight text-black">{selectedMentee.name}</h2>
        </header>

        <div className="p-8 flex flex-col gap-6">
          {mockSessions.map((session) => (
            <article
              key={session.id}
              className="rounded-2xl border-[3px] border-black bg-white p-6"
              style={{ boxShadow: "6px 6px 0 0 #000" }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border-1 border-[#1f2937] bg-[#EDE9FE] text-[#5061E4]">
                    <Video size={24} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-black">{session.title}</h3>
                    <div className="mt-1 flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} /> {session.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={14} /> {session.duration}
                      </span>
                      <span className="flex items-center gap-1.5 rounded bg-[#5061E4] px-1.5 py-0.5 text-xs text-white">
                        {session.type}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  {session.status === "upcoming" ? (
                    <span className="rounded-md bg-[#5061E4] px-3 py-1 text-xs font-bold text-white tracking-wider">
                      upcoming
                    </span>
                  ) : (
                    <span className="rounded-md bg-[#F59E0B] px-3 py-1 text-xs font-bold text-white tracking-wider">
                      completed
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-6 flex items-start gap-3 rounded-xl border border-gray-200 bg-[#FAFAFA] p-4 text-sm font-medium text-gray-600">
                <FileText size={18} className="mt-0.5 shrink-0 text-gray-400" />
                <p>{session.notes}</p>
              </div>

              <div className="mt-6 flex justify-center gap-3 w-full ">
                <button className="w-full flex items-center justify-center gap-2 rounded-xl border border-black bg-[#5061E4] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 cursor-pointer ">
                  <FileText size={16} />
                  Booking Details
                </button>
                {session.status === "completed" ? (
                  <button className="w-full flex items-center justify-center gap-2 rounded-xl border border-black bg-[#F59E0B] px-5 py-2.5 text-sm font-semibold text-black transition-opacity hover:opacity-90 cursor-pointer">
                    <MessageSquare size={16} />
                    Feedback
                  </button>
                ) : null}
                <button className="w-full flex items-center gap-2 justify-center rounded-xl border border-black bg-white px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-gray-50 cursor-pointer">
                  <User size={16} />
                  {session.status === "upcoming" ? "View Profile" : "Profile"}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}