"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { publicMenteeApi, resolveUploadUrl } from "../../../lib/api";
import { format } from "date-fns";
import { 
  Loader2, User as UserIcon, Calendar, BookOpen, GraduationCap, 
  Briefcase, Target, FileText, Download, Eye, Award
} from "lucide-react";

export default function MenteePublicProfilePage() {
  const { id } = useParams();
  const [menteeData, setMenteeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMentee = async () => {
      try {
        const res = await publicMenteeApi.getMenteeProfile(id);
        setMenteeData(res.data?.mentee);
      } catch (e) {
        console.error(e);
        setError("Failed to load mentee profile or profile not found.");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchMentee();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF5FF]">
        <Loader2 className="h-10 w-10 animate-spin text-[#5061E4]" />
      </div>
    );
  }

  if (error || !menteeData) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#FAF5FF] p-8">
        <div className="rounded-2xl border-4 border-black bg-white p-8 text-center shadow-[8px_8px_0_0_#000]">
          <h2 className="mb-4 text-2xl font-black">Profile Not Found</h2>
          <p className="font-bold text-gray-500">{error || "This mentee hasn't set up their profile yet."}</p>
        </div>
      </div>
    );
  }

  const { name, profilePicture, createdAt, profile } = menteeData;
  const { 
    education, 
    workExperience, 
    expectations, 
    skillsets, 
    resumeUrl, 
    linkedInUrl,
    catHistory,
    otherMbaScore,
    certifications
  } = profile || {};

  // Safely parse education array if it's stored as JSON string
  let eduList = [];
  try {
    eduList = typeof education === "string" ? JSON.parse(education) : education || [];
  } catch (e) {}

  return (
    <div className="min-h-screen bg-[#FAF5FF] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="mx-auto max-w-5xl">
        
        {/* Header Card */}
        <div 
          className="mb-8 flex items-center gap-6 rounded-[20px] border-4 border-black bg-white p-8"
          style={{ boxShadow: "8px 8px 0 0 #5061E4" }}
        >
          <div className="h-24 w-24 overflow-hidden rounded-2xl border-4 border-black bg-[#E0E7FF] shrink-0">
            {profilePicture ? (
              <img 
                src={resolveUploadUrl(profilePicture)} 
                alt={name} 
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-3xl font-black text-[#5061E4]">
                {name?.charAt(0) || "M"}
              </div>
            )}
          </div>
          <div>
            <h1 className="text-3xl font-black text-gray-900">{name}</h1>
            <p className="mt-1 text-lg font-bold text-gray-600">Mentee at PeerSupport</p>
            <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-gray-500">
              <Calendar size={16} />
              Joined on {createdAt ? format(new Date(createdAt), "dd MMMM yyyy") : "N/A"}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Main Column */}
          <div className="md:col-span-2 space-y-8">
            
            {/* About */}
            {expectations && (
              <section 
                className="rounded-[20px] border-4 border-black bg-[#FFF5F1]"
                style={{ boxShadow: "6px 6px 0 0 #0EA5E9" }}
              >
                <div className="border-b-4 border-black px-6 py-4 flex items-center gap-3 bg-white rounded-t-[16px]">
                  <BookOpen size={20} className="text-[#0EA5E9]" />
                  <h2 className="text-xl font-black">About & Expectations</h2>
                </div>
                <div className="p-6">
                  <p className="text-sm font-bold text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {expectations}
                  </p>
                </div>
              </section>
            )}

            {/* Education */}
            {eduList.length > 0 && (
              <section 
                className="rounded-[20px] border-4 border-black bg-[#FFF5F1]"
                style={{ boxShadow: "6px 6px 0 0 #F59E0B" }}
              >
                <div className="border-b-4 border-black px-6 py-4 flex items-center gap-3 bg-white rounded-t-[16px]">
                  <GraduationCap size={20} className="text-[#F59E0B]" />
                  <h2 className="text-xl font-black">Education</h2>
                </div>
                <div className="p-6 space-y-4">
                  {eduList.map((edu, idx) => (
                    <div key={idx} className="rounded-xl border-2 border-black bg-white p-4">
                      <h3 className="font-extrabold text-gray-900">{edu.degree}</h3>
                      <p className="text-sm font-bold text-gray-500 mt-1">{edu.institution}</p>
                      <div className="mt-2 flex items-center gap-4 text-xs font-bold text-gray-400">
                        <span>{edu.year}</span>
                        {edu.score && <span>• Score: {edu.score}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Professional Experience */}
            {workExperience && (
              <section 
                className="rounded-[20px] border-4 border-black bg-[#FFF5F1]"
                style={{ boxShadow: "6px 6px 0 0 #F97316" }}
              >
                <div className="border-b-4 border-black px-6 py-4 flex items-center gap-3 bg-white rounded-t-[16px]">
                  <Briefcase size={20} className="text-[#F97316]" />
                  <h2 className="text-xl font-black">Professional Experience</h2>
                </div>
                <div className="p-6">
                  <div className="rounded-xl border-2 border-black bg-white p-5">
                    <p className="text-sm font-bold text-gray-700 whitespace-pre-wrap">{workExperience}</p>
                  </div>
                </div>
              </section>
            )}

            {/* MBA Goals & Certifications */}
            {(catHistory || otherMbaScore || certifications) && (
              <section 
                className="rounded-[20px] border-4 border-black bg-[#FFF5F1]"
                style={{ boxShadow: "6px 6px 0 0 #10B981" }}
              >
                <div className="border-b-4 border-black px-6 py-4 flex items-center gap-3 bg-white rounded-t-[16px]">
                  <Target size={20} className="text-[#10B981]" />
                  <h2 className="text-xl font-black">Scores & Certifications</h2>
                </div>
                <div className="p-6 space-y-4">
                  {catHistory && (
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">CAT History</h4>
                      <div className="rounded-xl border-2 border-black bg-white p-4 text-sm font-bold text-gray-700">
                        {typeof catHistory === "string" ? catHistory : JSON.stringify(catHistory)}
                      </div>
                    </div>
                  )}
                  {otherMbaScore && (
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Other MBA Scores</h4>
                      <div className="inline-block rounded-xl border-2 border-black bg-[#E0E7FF] px-4 py-2 text-sm font-black text-[#5061E4]">
                        {otherMbaScore}
                      </div>
                    </div>
                  )}
                  {certifications && (
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 mt-4">Certifications</h4>
                      <div className="rounded-xl border-2 border-black bg-white p-4 text-sm font-bold text-gray-700 whitespace-pre-wrap">
                        {certifications}
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )}

          </div>

          {/* Sidebar Column */}
          <div className="md:col-span-1 space-y-8">
            
            {/* Resume */}
            {resumeUrl && (
              <section 
                className="rounded-[20px] border-4 border-black bg-[#FFF5F1]"
                style={{ boxShadow: "6px 6px 0 0 #8B5CF6" }}
              >
                <div className="border-b-4 border-black px-6 py-4 flex items-center gap-3 bg-white rounded-t-[16px]">
                  <FileText size={20} className="text-[#8B5CF6]" />
                  <h2 className="text-xl font-black">Resume</h2>
                </div>
                <div className="p-6">
                  <div className="rounded-xl border-2 border-black bg-white p-4 flex flex-col items-center gap-4">
                    <div className="flex items-center gap-3 w-full">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EDE9FE] text-[#8B5CF6]">
                        <FileText size={20} />
                      </div>
                      <div className="overflow-hidden">
                        <p className="truncate text-sm font-bold text-gray-900">Resume.pdf</p>
                        <p className="text-[10px] font-black uppercase text-gray-400">PDF Document</p>
                      </div>
                    </div>
                    <div className="flex gap-2 w-full">
                      <a 
                        href={resolveUploadUrl(resumeUrl)} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 rounded-xl border-2 border-black bg-white py-2 text-xs font-black transition-transform hover:-translate-y-0.5 shadow-[2px_2px_0_0_#000]"
                      >
                        <Eye size={14} /> View
                      </a>
                      <a 
                        href={resolveUploadUrl(resumeUrl)} 
                        download
                        className="flex-1 flex items-center justify-center gap-2 rounded-xl border-2 border-black bg-[#8B5CF6] text-white py-2 text-xs font-black transition-transform hover:-translate-y-0.5 shadow-[2px_2px_0_0_#000]"
                      >
                        <Download size={14} /> Download
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Skills */}
            {skillsets && skillsets.length > 0 && (
              <section 
                className="rounded-[20px] border-4 border-black bg-[#FFF5F1]"
                style={{ boxShadow: "6px 6px 0 0 #06B6D4" }}
              >
                <div className="border-b-4 border-black px-6 py-4 flex items-center gap-3 bg-white rounded-t-[16px]">
                  <Award size={20} className="text-[#06B6D4]" />
                  <h2 className="text-xl font-black">Skills</h2>
                </div>
                <div className="p-6 flex flex-wrap gap-2">
                  {skillsets.map((skill, idx) => (
                    <span 
                      key={idx}
                      className="inline-block rounded-lg border-2 border-[#06B6D4] bg-[#ECFEFF] px-3 py-1 text-xs font-black text-[#0891B2]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* LinkedIn */}
            {linkedInUrl && (
              <section 
                className="rounded-[20px] border-4 border-black bg-[#FFF5F1]"
                style={{ boxShadow: "6px 6px 0 0 #2563EB" }}
              >
                <div className="p-6">
                  <a 
                    href={linkedInUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl border-2 border-black bg-[#2563EB] text-white py-3 text-sm font-black transition-transform hover:-translate-y-0.5 shadow-[2px_2px_0_0_#000]"
                  >
                    LinkedIn Profile
                  </a>
                </div>
              </section>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
