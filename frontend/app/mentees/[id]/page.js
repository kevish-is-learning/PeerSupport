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
      <div className="min-h-screen bg-[#FAF5FF] py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl animate-pulse">
          <div className="mb-8 flex items-center gap-6 rounded-[20px] border-4 border-gray-200 bg-white p-8" style={{ boxShadow: "8px 8px 0 0 #E5E7EB" }}>
            <div className="h-24 w-24 rounded-2xl bg-gray-200 shrink-0"></div>
            <div className="flex-1">
              <div className="h-8 w-48 bg-gray-200 rounded mb-2"></div>
              <div className="h-5 w-32 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 w-40 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <div className="rounded-[20px] border-4 border-gray-200 bg-white h-48" style={{ boxShadow: "6px 6px 0 0 #E5E7EB" }}></div>
              <div className="rounded-[20px] border-4 border-gray-200 bg-white h-64" style={{ boxShadow: "6px 6px 0 0 #E5E7EB" }}></div>
            </div>
            <div className="md:col-span-1 space-y-8">
              <div className="rounded-[20px] border-4 border-gray-200 bg-white h-40" style={{ boxShadow: "6px 6px 0 0 #E5E7EB" }}></div>
              <div className="rounded-[20px] border-4 border-gray-200 bg-white h-32" style={{ boxShadow: "6px 6px 0 0 #E5E7EB" }}></div>
            </div>
          </div>
        </div>
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
    <div className="min-h-screen bg-[#FAFAFA] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="mx-auto max-w-5xl">
        
        {/* Header Card */}
        <div 
          className="mb-8 flex items-center gap-6 rounded-2xl border-[3px] border-gray-400 bg-white p-8"
          style={{ boxShadow: "8px 8px 0 0 #C4B5FD" }}
        >
          <div className="h-28 w-28 overflow-hidden rounded-2xl border-[3px] border-gray-400 bg-gray-100 shrink-0">
            {profilePicture ? (
              <img 
                src={resolveUploadUrl(profilePicture)} 
                alt={name} 
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-4xl font-bold text-gray-400">
                {name?.charAt(0) || "M"}
              </div>
            )}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-700">{name}</h1>
            <p className="mt-1 text-lg text-gray-400 font-medium">Mentee at PeerSupport</p>
            <div className="mt-3 flex items-center gap-2 text-sm font-medium text-gray-400">
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
                className="rounded-2xl border-[3px] border-gray-400 bg-white"
                style={{ boxShadow: "6px 6px 0 0 #67E8F9" }}
              >
                <div className="border-b-[3px] border-gray-400 px-6 py-4 flex items-center gap-3 bg-[#F9FAFB] rounded-t-[13px]">
                  <h2 className="text-xl font-bold text-gray-500">About</h2>
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-500 leading-relaxed whitespace-pre-wrap font-medium">
                    {expectations}
                  </p>
                </div>
              </section>
            )}

            {/* Education */}
            {eduList.length > 0 && (
              <section 
                className="rounded-2xl border-[3px] border-gray-400 bg-white"
                style={{ boxShadow: "6px 6px 0 0 #FCD34D" }}
              >
                <div className="border-b-[3px] border-gray-400 px-6 py-4 flex items-center gap-3 bg-[#F9FAFB] rounded-t-[13px]">
                  <GraduationCap size={20} className="text-gray-500" />
                  <h2 className="text-xl font-bold text-gray-500">Education</h2>
                </div>
                <div className="p-6 space-y-4">
                  {eduList.map((edu, idx) => (
                    <div key={idx} className="rounded-xl border-[2px] border-gray-400 bg-white p-5">
                      <h3 className="font-bold text-gray-700 text-lg">{edu.degree}</h3>
                      <p className="text-sm font-medium text-gray-400 mt-1">{edu.institution}</p>
                      <div className="mt-2 flex items-center gap-2 text-sm font-medium text-gray-400">
                        <span>{edu.year}</span>
                        {edu.score && <span>• CGPA: {edu.score}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Professional Experience */}
            {workExperience && (
              <section 
                className="rounded-2xl border-[3px] border-gray-400 bg-white"
                style={{ boxShadow: "6px 6px 0 0 #FDBA74" }}
              >
                <div className="border-b-[3px] border-gray-400 px-6 py-4 flex items-center gap-3 bg-[#F9FAFB] rounded-t-[13px]">
                  <Briefcase size={20} className="text-gray-500" />
                  <h2 className="text-xl font-bold text-gray-500">Professional Experience</h2>
                </div>
                <div className="p-6">
                  <div className="rounded-xl border-[2px] border-gray-400 bg-white p-5">
                    <p className="text-sm font-medium text-gray-500 whitespace-pre-wrap">{workExperience}</p>
                  </div>
                </div>
              </section>
            )}

            {/* Scores & Certifications (Mapped to Goals visual) */}
            {(catHistory || otherMbaScore || certifications) && (
              <section 
                className="rounded-2xl border-[3px] border-gray-400 bg-white"
                style={{ boxShadow: "6px 6px 0 0 #86EFAC" }}
              >
                <div className="border-b-[3px] border-gray-400 px-6 py-4 flex items-center gap-3 bg-[#F9FAFB] rounded-t-[13px]">
                  <Target size={20} className="text-gray-500" />
                  <h2 className="text-xl font-bold text-gray-500">MBA Goals & Aspirations</h2>
                </div>
                <div className="p-6 space-y-6">
                  {catHistory && (
                    <div>
                      <h4 className="font-bold text-gray-600 mb-3">CAT History</h4>
                      <div className="rounded-xl border-[2px] border-gray-400 bg-white p-4 text-sm font-medium text-gray-500">
                        {typeof catHistory === "string" ? catHistory : JSON.stringify(catHistory)}
                      </div>
                    </div>
                  )}
                  {otherMbaScore && (
                    <div>
                      <h4 className="font-bold text-gray-600 mb-3">Target B-Schools</h4>
                      <div className="inline-block rounded-md border-[2px] border-[#A855F7] bg-[#F3E8FF] px-4 py-2 text-sm font-bold text-[#9333EA]">
                        {otherMbaScore}
                      </div>
                    </div>
                  )}
                  {certifications && (
                    <div>
                      <h4 className="font-bold text-gray-600 mb-3">Career Goals</h4>
                      <div className="text-sm font-medium text-gray-500 whitespace-pre-wrap">
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
                className="rounded-2xl border-[3px] border-gray-400 bg-white"
                style={{ boxShadow: "6px 6px 0 0 #C4B5FD" }}
              >
                <div className="border-b-[3px] border-gray-400 px-6 py-4 flex items-center gap-3 bg-[#F9FAFB] rounded-t-[13px]">
                  <FileText size={20} className="text-gray-500" />
                  <h2 className="text-xl font-bold text-gray-500">Resume</h2>
                </div>
                <div className="p-6">
                  <div className="rounded-xl border-[2px] border-gray-400 bg-white p-4 flex flex-col items-center gap-4">
                    <div className="flex items-center gap-3 w-full">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-[2px] border-gray-300 bg-white text-[#A855F7]">
                        <FileText size={24} />
                      </div>
                      <div className="overflow-hidden">
                        <p className="truncate text-sm font-bold text-gray-700">Resume.pdf</p>
                        <p className="text-[11px] font-semibold text-gray-400 mt-0.5">PDF Document</p>
                      </div>
                    </div>
                    <div className="flex gap-3 w-full mt-2">
                      <a 
                        href={resolveUploadUrl(resumeUrl)} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 rounded-lg border-[2px] border-gray-400 bg-white py-2 text-xs font-bold text-gray-600 transition-colors hover:bg-gray-50"
                      >
                        <Eye size={14} /> Quick View
                      </a>
                      <a 
                        href={resolveUploadUrl(resumeUrl)} 
                        download
                        className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-[#A855F7] text-white py-2 text-xs font-bold transition-colors hover:bg-[#9333EA]"
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
                className="rounded-2xl border-[3px] border-gray-400 bg-white"
                style={{ boxShadow: "6px 6px 0 0 #67E8F9" }}
              >
                <div className="border-b-[3px] border-gray-400 px-6 py-4 flex items-center gap-3 bg-[#F9FAFB] rounded-t-[13px]">
                  <BookOpen size={20} className="text-gray-500" />
                  <h2 className="text-xl font-bold text-gray-500">Skills</h2>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2">
                    {skillsets.map((skill, idx) => (
                      <span 
                        key={idx}
                        className="inline-block rounded-md border-[2px] border-[#2DD4BF] bg-white px-3 py-1.5 text-xs font-bold text-[#0D9488]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* LinkedIn (Treated like Interests in visual style) */}
            {linkedInUrl && (
              <section 
                className="rounded-2xl border-[3px] border-gray-400 bg-white"
                style={{ boxShadow: "6px 6px 0 0 #FDBA74" }}
              >
                <div className="border-b-[3px] border-gray-400 px-6 py-4 flex items-center gap-3 bg-[#F9FAFB] rounded-t-[13px]">
                  <h2 className="text-xl font-bold text-gray-500">Links</h2>
                </div>
                <div className="p-6 flex flex-wrap gap-2">
                  <a 
                    href={linkedInUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-md border-[2px] border-gray-400 bg-white px-4 py-2 text-sm font-bold text-gray-600 transition-colors hover:bg-gray-50"
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
