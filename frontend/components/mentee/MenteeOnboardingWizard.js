"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { User, Briefcase, GraduationCap, Upload, Award, ClipboardCheck, ChevronRight } from "lucide-react";
import { menteeProfileApi } from "../../lib/api";
import useAuthStore from "../../store/useAuthStore";

const Card = ({ title, icon: Icon, children, shadowColor, titleSuffix }) => (
  <div className="relative mb-6 rounded-xl border border-gray-300 bg-white" style={{ boxShadow: `4px 4px 0px 0px ${shadowColor}` }}> 
    <div className="flex items-center gap-2 border-b border-gray-300 bg-[#FDFBF9] px-5 py-4 rounded-t-[11px]">
      <Icon className="h-5 w-5 text-gray-500" />
      <h3 className="text-[16px] font-bold text-gray-500">
        {title} {titleSuffix && <span className="text-gray-400 text-xs font-normal ml-1">{titleSuffix}</span>}
      </h3>
    </div>
    <div className="p-5">
      {children}
    </div>
  </div>
);

export default function MenteeOnboardingWizard({ existingProfile, onComplete }) {
  const router = useRouter();
  const { user } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: existingProfile?.name || user?.name || "",
    email: existingProfile?.email || user?.email || "",
    dateOfBirth: existingProfile?.dateOfBirth ? existingProfile.dateOfBirth.split("T")[0] : "",
    contactNumber: existingProfile?.contactNumber || "",
    education: existingProfile?.education?.length > 0 ? existingProfile.education : [{ type: "", institutionName: "", fromYear: "", toYear: "", score: "" }],
    workExperience: existingProfile?.workExperience || "",
    certifications: existingProfile?.certifications || "",
    catHistory: existingProfile?.catHistory || { LRDI: "", VARC: "", Quants: "" },
    otherMbaTest: existingProfile?.otherMbaTest || { testName: "", score: "" },
  });

  const [resumeFile, setResumeFile] = useState(null);

  const [showWorkExperience, setShowWorkExperience] = useState(!!existingProfile?.workExperience);
  const [showCertifications, setShowCertifications] = useState(!!existingProfile?.certifications);

  const addEducation = () => {
    setForm(prev => ({
      ...prev,
      education: [...prev.education, { type: "", institutionName: "", fromYear: "", toYear: "", score: "" }]
    }));
  };

  const updateEducation = (index, field, value) => {
    const updated = [...form.education];
    updated[index][field] = value;
    setForm(prev => ({ ...prev, education: updated }));
  };

  const removeEducation = (index) => {
    setForm(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name?.trim()) {
      toast.error("Please enter your full name.");
      return;
    }
    const cleanNumber = form.contactNumber?.replace(/^\+91\s*/, '').replace(/\D/g, '');
    if (!cleanNumber || cleanNumber.length !== 10) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }
    if (!form.dateOfBirth) {
      toast.error("Please provide your date of birth.");
      return;
    }

    for (let i = 0; i < form.education.length; i++) {
       const edu = form.education[i];
       if (!edu.institutionName?.trim() || !edu.fromYear || !edu.toYear || !edu.score) {
          toast.error(`Please fill all required fields in Education #${i + 1}.`);
          return;
       }
       if (Number(edu.fromYear) > Number(edu.toYear)) {
          toast.error(`From Year cannot be greater than To Year in Education #${i + 1}.`);
          return;
       }
    }

    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("name", form.name.trim());
      formData.append("dateOfBirth", new Date(form.dateOfBirth).toISOString());
      formData.append("contactNumber", `+91 ${cleanNumber}`);
      
      const parsedEdu = form.education.map(e => ({
        type: e.type || "Graduation",
        institutionName: e.institutionName,
        fromYear: Number(e.fromYear),
        toYear: Number(e.toYear),
        score: Number(e.score),
      }));
      formData.append("education", JSON.stringify(parsedEdu));
      
      if (showWorkExperience && form.workExperience) formData.append("workExperience", form.workExperience);
      if (showCertifications && form.certifications) formData.append("certifications", form.certifications);
      
      const catHist = {
        LRDI: form.catHistory.LRDI ? Number(form.catHistory.LRDI) : undefined,
        VARC: form.catHistory.VARC ? Number(form.catHistory.VARC) : undefined,
        Quants: form.catHistory.Quants ? Number(form.catHistory.Quants) : undefined,
      };
      if (catHist.LRDI || catHist.VARC || catHist.Quants) {
        formData.append("catHistory", JSON.stringify(catHist));
      }
      
      if (form.otherMbaTest && form.otherMbaTest.testName && form.otherMbaTest.score) {
        formData.append("otherMbaTest", JSON.stringify({
          testName: form.otherMbaTest.testName,
          score: Number(form.otherMbaTest.score)
        }));
      }
      if (resumeFile) formData.append("resume", resumeFile);

      if (existingProfile) {
        await menteeProfileApi.update(formData);
      } else {
        await menteeProfileApi.create(formData);
      }
      toast.success("Profile saved successfully!");
      onComplete?.();
    } catch (err) {
      toast.error(err?.response?.data?.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl pb-16 pt-8">
      {/* Onboarding Header */}
      <div className="bg-[#FCF0EC] rounded-2xl px-6 py-10 mb-10 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-10 h-10 bg-[#8B5CF6] rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md">
            P
          </div>
          <span className="text-[#1a1a1a] font-semibold text-lg">Peer Support</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1a1a1a] tracking-tight mb-2">
          Mentee Onboarding
        </h1>
        <p className="text-gray-500 text-sm">
          Complete your profile to get started
        </p>
      </div>

      <form onSubmit={handleSubmit} className="px-4">
        
        <Card title="Basic Information" icon={User} shadowColor="#B388EB">
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-bold text-gray-500">Full Name <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                value={form.name} 
                onChange={e => setForm({...form, name: e.target.value})} 
                placeholder="Enter your full name"
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-[#B388EB] focus:outline-none focus:ring-1 focus:ring-[#B388EB] transition-colors"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-bold text-gray-500">Email Address</label>
                <input 
                   disabled
                   type="email" 
                   value={form.email} 
                   placeholder="your.email@example.com"
                   className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm cursor-not-allowed"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold text-gray-500">Date of Birth <span className="text-red-500">*</span></label>
                <input 
                   type="date" 
                   required
                   value={form.dateOfBirth} 
                   onChange={e => setForm({...form, dateOfBirth: e.target.value})} 
                   className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-700 focus:border-[#B388EB] focus:outline-none focus:ring-1 focus:ring-[#B388EB] transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold text-gray-500">Phone Number <span className="text-red-500">*</span></label>
              <input 
                type="tel" 
                required
                minLength={10}
                maxLength={10}
                value={form.contactNumber.replace(/^\+91\s*/, '').replace(/\D/g, '')} 
                onChange={e => {
                  const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
                  setForm({...form, contactNumber: digits});
                }}
                placeholder="9876543210"
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-[#B388EB] focus:outline-none focus:ring-1 focus:ring-[#B388EB] transition-colors"
              />
            </div>
          </div>
        </Card>

        <Card title="Education Details" icon={GraduationCap} shadowColor="#44C2C9">
           <div className="space-y-4">
              {form.education.map((edu, idx) => (
                <div key={idx} className="relative border border-gray-200 rounded-xl p-5 mb-4">
                  <div className="flex justify-between items-center mb-3">
                     <span className="font-bold text-[14px] text-gray-600">Education #{idx + 1}</span>
                     {form.education.length > 1 && (
                       <button type="button" onClick={() => removeEducation(idx)} className="text-xs text-red-500 font-bold hover:underline">Remove</button>
                     )}
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-bold text-gray-500">Degree Type <span className="text-red-500">*</span></label>
                      <select 
                        value={edu.type} 
                        onChange={e => updateEducation(idx, "type", e.target.value)} 
                        className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm bg-white focus:border-[#44C2C9] focus:outline-none focus:ring-1 focus:ring-[#44C2C9]" 
                      >
                        <option value="" disabled>Select degree type</option>
                        <option value="10th">10th</option>
                        <option value="12th">12th</option>
                        <option value="Graduation">Graduation</option>
                        <option value="Post Graduation">Post Graduation</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-bold text-gray-500">Institution Name <span className="text-red-500">*</span></label>
                      <input type="text" placeholder="e.g. XYZ University" value={edu.institutionName} onChange={e => updateEducation(idx, "institutionName", e.target.value)} className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:border-[#44C2C9] focus:outline-none focus:ring-1 focus:ring-[#44C2C9]" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="mb-1 block text-xs font-bold text-gray-500">From Year <span className="text-red-500">*</span></label>
                        <input type="number" min="1950" max={new Date().getFullYear()} placeholder="2018" value={edu.fromYear} onChange={e => updateEducation(idx, "fromYear", e.target.value)} className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:border-[#44C2C9] focus:outline-none focus:ring-1 focus:ring-[#44C2C9]" />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-bold text-gray-500">To Year <span className="text-red-500">*</span></label>
                         <input type="number" min="1950" max={new Date().getFullYear() + 10} placeholder="2022" value={edu.toYear} onChange={e => updateEducation(idx, "toYear", e.target.value)} className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:border-[#44C2C9] focus:outline-none focus:ring-1 focus:ring-[#44C2C9]" />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-bold text-gray-500">Score (% or CGPA) <span className="text-red-500">*</span></label>
                      <input type="number" min="0" max="100" step="0.01" placeholder="85.5 or 8.5" value={edu.score} onChange={e => updateEducation(idx, "score", e.target.value)} className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:border-[#44C2C9] focus:outline-none focus:ring-1 focus:ring-[#44C2C9]" />
                    </div>
                  </div>
                </div>
              ))}
              <button type="button" onClick={addEducation} className="w-full py-2.5 border border-dashed border-[#44C2C9] rounded-xl text-sm font-bold text-[#44C2C9] hover:bg-[#44C2C9]/10 transition-colors">
                + Add Education
              </button>
           </div>
        </Card>

        <Card title="Work Experience" titleSuffix="(Optional)" icon={Briefcase} shadowColor="#FABE28">
          {!showWorkExperience ? (
            <button type="button" onClick={() => setShowWorkExperience(true)} className="w-full py-2.5 border border-dashed border-[#FABE28] rounded-xl text-sm font-bold text-[#FABE28] hover:bg-[#FABE28]/10 transition-colors">
              + Add Work Experience
            </button>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-bold text-gray-500">Work Experience Details</label>
                <textarea 
                  value={form.workExperience} 
                  onChange={e => setForm({...form, workExperience: e.target.value})} 
                  placeholder="e.g. 2 years in Marketing at ABC Corp"
                  rows={2}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-[#FABE28] focus:outline-none focus:ring-1 focus:ring-[#FABE28] transition-colors"
                />
              </div>
            </div>
          )}
        </Card>

        <Card title="Certifications" titleSuffix="(Optional)" icon={Award} shadowColor="#F08B4D">
          {!showCertifications ? (
            <button type="button" onClick={() => setShowCertifications(true)} className="w-full py-2.5 border border-dashed border-[#F08B4D] rounded-xl text-sm font-bold text-[#F08B4D] hover:bg-[#F08B4D]/10 transition-colors">
              + Add Certification
            </button>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-bold text-gray-500">Certification Details</label>
                <textarea 
                  value={form.certifications} 
                  onChange={e => setForm({...form, certifications: e.target.value})} 
                  placeholder="List your significant certifications..."
                  rows={2}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-[#F08B4D] focus:outline-none focus:ring-1 focus:ring-[#F08B4D] transition-colors"
                />
              </div>
            </div>
          )}
        </Card>

        <Card title="CAT Score" icon={ClipboardCheck} shadowColor="#45C89F">
          <div className="grid gap-4 sm:grid-cols-3">
             <div>
                <label className="mb-1 block text-xs font-bold text-gray-500">LRDI Percentile</label>
                <input 
                  type="number" min="0" max="100" step="0.01"
                  value={form.catHistory.LRDI} 
                  onChange={e => setForm({...form, catHistory: {...form.catHistory, LRDI: e.target.value}})} 
                  placeholder="e.g. 95.5"
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-[#45C89F] focus:outline-none focus:ring-1 focus:ring-[#45C89F] transition-colors"
                />
             </div>
             <div>
                <label className="mb-1 block text-xs font-bold text-gray-500">VARC Percentile</label>
                <input 
                  type="number" min="0" max="100" step="0.01"
                  value={form.catHistory.VARC} 
                  onChange={e => setForm({...form, catHistory: {...form.catHistory, VARC: e.target.value}})} 
                  placeholder="e.g. 92.3"
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-[#45C89F] focus:outline-none focus:ring-1 focus:ring-[#45C89F] transition-colors"
                />
             </div>
             <div>
                <label className="mb-1 block text-xs font-bold text-gray-500">Quants Percentile</label>
                <input 
                   type="number" min="0" max="100" step="0.01"
                   value={form.catHistory.Quants} 
                   onChange={e => setForm({...form, catHistory: {...form.catHistory, Quants: e.target.value}})} 
                   placeholder="e.g. 98.1"
                   className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-[#45C89F] focus:outline-none focus:ring-1 focus:ring-[#45C89F] transition-colors"
                />
             </div>
          </div>
        </Card>

        <Card title="Other MBA Test Score" titleSuffix="(Optional)" icon={ClipboardCheck} shadowColor="#B388EB">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-bold text-gray-500">Test Name (e.g. GMAT, XAT)</label>
               <input 
                 type="text"
                 value={form.otherMbaTest.testName} 
                 onChange={e => setForm({...form, otherMbaTest: {...form.otherMbaTest, testName: e.target.value}})} 
                 placeholder="e.g. GMAT"
                 className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-[#B388EB] focus:outline-none focus:ring-1 focus:ring-[#B388EB] transition-colors"
               />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold text-gray-500">Cumulative Score</label>
               <input 
                 type="number"
                 min="0"
                 step="0.01"
                 value={form.otherMbaTest.score} 
                 onChange={e => setForm({...form, otherMbaTest: {...form.otherMbaTest, score: e.target.value}})} 
                 placeholder="e.g. 720"
                 className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-[#B388EB] focus:outline-none focus:ring-1 focus:ring-[#B388EB] transition-colors"
               />
            </div>
          </div>
        </Card>

        <Card title="Upload Resume" icon={Upload} shadowColor="#FABE28">
           <div>
              <label className="mb-2 block text-xs font-bold text-gray-800">Resume / CV</label>
              <div className="relative flex flex-col items-center justify-center py-10 px-8 border border-dashed border-gray-300 rounded-2xl hover:border-black transition-colors bg-white">
                 <input 
                   type="file" 
                   accept=".pdf,.doc,.docx"
                   onChange={(e) => setResumeFile(e.target.files?.[0])}
                   className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                 />
                 <Upload className="h-8 w-8 text-gray-400 mb-3" />
                 <p className="text-sm font-medium text-gray-500">Drag and drop your resume here, or click to browse</p>
                 <div className="mt-4 px-6 py-2 bg-[#FABE28] text-black border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-sm font-bold rounded-lg pointer-events-none">
                    {resumeFile || existingProfile?.resumeUrl ? "Replace File" : "Choose File"}
                 </div>
                 <p className="text-[10px] text-gray-400 mt-4">Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
                 {resumeFile && <p className="text-sm text-green-600 font-bold mt-2 text-center">Selected: {resumeFile.name}</p>}
                 {(!resumeFile && existingProfile?.resumeUrl) && <p className="text-sm text-green-600 font-bold mt-2 text-center">Resume already uploaded.</p>}
              </div>
           </div>
        </Card>

        <div className="flex justify-center mt-10">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="flex items-center gap-2 bg-[#8B5CF6] text-white px-8 py-3 rounded-xl font-bold text-sm border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1 active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Saving..." : "Complete Onboarding"}
            {!isSubmitting && <ChevronRight className="h-4 w-4" />}
          </button>
        </div>
      </form>
    </div>
  );
}
