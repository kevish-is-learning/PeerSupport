"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { User, Briefcase, GraduationCap, Target, Upload, BookOpen, ChevronRight } from "lucide-react";
import { menteeProfileApi } from "../../lib/api";
import useAuthStore from "../../store/useAuthStore";

export default function MenteeOnboardingWizard({ existingProfile, onComplete }) {
  const router = useRouter();
  const { user } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: existingProfile?.name || user?.name || "",
    email: existingProfile?.email || user?.email || "",
    dateOfBirth: existingProfile?.dateOfBirth ? existingProfile.dateOfBirth.split("T")[0] : "",
    contactNumber: existingProfile?.contactNumber || "",
    education: existingProfile?.education || [],
    workExperience: existingProfile?.workExperience || "",
    certifications: existingProfile?.certifications || "",
    catHistory: existingProfile?.catHistory || { LRDI: "", VARC: "", Quants: "" },
    otherMbaScore: existingProfile?.otherMbaScore || "",
  });

  const [resumeFile, setResumeFile] = useState(null);

  const addEducation = () => {
    setForm(prev => ({
      ...prev,
      education: [...prev.education, { type: "Graduation", institutionName: "", fromYear: "", toYear: "", score: "" }]
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
    if (!form.contactNumber?.trim()) {
      toast.error("Please enter your phone number.");
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
      formData.append("dateOfBirth", new Date(form.dateOfBirth).toISOString());
      formData.append("contactNumber", form.contactNumber);
      
      const parsedEdu = form.education.map(e => ({
        type: e.type,
        institutionName: e.institutionName,
        fromYear: Number(e.fromYear),
        toYear: Number(e.toYear),
        score: Number(e.score),
      }));
      formData.append("education", JSON.stringify(parsedEdu));
      
      if (form.workExperience) formData.append("workExperience", form.workExperience);
      if (form.certifications) formData.append("certifications", form.certifications);
      
      const catHist = {
        LRDI: form.catHistory.LRDI ? Number(form.catHistory.LRDI) : undefined,
        VARC: form.catHistory.VARC ? Number(form.catHistory.VARC) : undefined,
        Quants: form.catHistory.Quants ? Number(form.catHistory.Quants) : undefined,
      };
      if (catHist.LRDI || catHist.VARC || catHist.Quants) {
        formData.append("catHistory", JSON.stringify(catHist));
      }
      
      if (form.otherMbaScore) formData.append("otherMbaScore", form.otherMbaScore);
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

  const Card = ({ title, icon: Icon, children, shadowColor }) => (
    <div className={`relative mb-8 rounded-[16px] border-2 border-black bg-white shadow-[6px_6px_0px_0px_${shadowColor}]`}> 
      <div className="flex items-center gap-3 border-b-2 border-black bg-[#F8EBE6] px-5 py-4 rounded-t-[14px]">
        <Icon className="h-5 w-5" />
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );

  return (
    <div className="mx-auto w-full max-w-3xl pb-16 pt-8">
      <div className="text-center mb-10">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[#5B6EF5] text-white font-bold mb-4">
          P
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Complete Your Profile</h1>
        <p className="text-neutral-500 font-medium">Help us match you with the perfect mentor</p>
      </div>

      <form onSubmit={handleSubmit}>
        
        <Card title="Basic Information" icon={User} shadowColor="#5B6EF5">
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-bold text-gray-700">Full Name <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                value={form.name} 
                onChange={e => setForm({...form, name: e.target.value})} 
                placeholder="Enter your full name"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-bold text-gray-700">Email Address</label>
                <input 
                   disabled
                   type="email" 
                   value={form.email} 
                   placeholder="Your email"
                   className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm cursor-not-allowed"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-bold text-gray-700">Date of Birth <span className="text-red-500">*</span></label>
                <input 
                   type="date" 
                   required
                   value={form.dateOfBirth} 
                   onChange={e => setForm({...form, dateOfBirth: e.target.value})} 
                   className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-bold text-gray-700">Phone Number <span className="text-red-500">*</span></label>
              <input 
                type="tel" 
                required
                value={form.contactNumber} 
                onChange={e => setForm({...form, contactNumber: e.target.value})} 
                placeholder="+91 XXXXX XXXXX"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors"
              />
            </div>
          </div>
        </Card>

        <Card title="Education Details" icon={GraduationCap} shadowColor="#FABE28">
           <div className="space-y-6">
              {form.education.map((edu, idx) => (
                <div key={idx} className="relative border rounded-xl p-5 bg-neutral-50/50 space-y-4">
                  <div className="flex justify-between items-center mb-2">
                     <span className="font-bold text-sm text-gray-600">Education #{idx + 1}</span>
                     <button type="button" onClick={() => removeEducation(idx)} className="text-xs text-red-500 font-bold hover:underline">Remove</button>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-bold text-gray-500">Degree Type <span className="text-red-500">*</span></label>
                      <select value={edu.type} onChange={e => updateEducation(idx, "type", e.target.value)} className="w-full rounded-xl border border-gray-300 p-3 text-sm bg-white focus:border-black focus:outline-none focus:ring-1 focus:ring-black">
                        <option value="10th">10th</option>
                        <option value="12th">12th</option>
                        <option value="Graduation">Graduation</option>
                        <option value="Post Graduation">Post Graduation</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-bold text-gray-500">Institution Name <span className="text-red-500">*</span></label>
                      <input type="text" placeholder="e.g. XYZ University" value={edu.institutionName} onChange={e => updateEducation(idx, "institutionName", e.target.value)} className="w-full rounded-xl border border-gray-300 px-3 py-3 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="mb-1 block text-xs font-bold text-gray-500">From Year <span className="text-red-500">*</span></label>
                        <input type="number" placeholder="2018" value={edu.fromYear} onChange={e => updateEducation(idx, "fromYear", e.target.value)} className="w-full rounded-xl border border-gray-300 px-3 py-3 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black" />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-bold text-gray-500">To Year <span className="text-red-500">*</span></label>
                         <input type="number" placeholder="2022" value={edu.toYear} onChange={e => updateEducation(idx, "toYear", e.target.value)} className="w-full rounded-xl border border-gray-300 px-3 py-3 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black" />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-bold text-gray-500">Score (Percentage/CGPA) <span className="text-red-500">*</span></label>
                      <input type="number" step="0.01" placeholder="e.g. 85.5 or 8.5" value={edu.score} onChange={e => updateEducation(idx, "score", e.target.value)} className="w-full rounded-xl border border-gray-300 px-3 py-3 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black" />
                    </div>
                  </div>
                </div>
              ))}
              <button type="button" onClick={addEducation} className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-sm font-bold text-gray-500 hover:border-black hover:text-black transition-colors">
                + Add Education
              </button>
           </div>
        </Card>

        <Card title="Scores & Experience" icon={Target} shadowColor="#F08B4D">
          <div className="space-y-5">
            <div>
              <label className="mb-1 block text-sm font-bold text-gray-700">Work Experience (if any)</label>
              <input 
                type="text" 
                value={form.workExperience} 
                onChange={e => setForm({...form, workExperience: e.target.value})} 
                placeholder="e.g. 2 years in Marketing at ABC Corp"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors"
              />
            </div>
            
            <div className="grid gap-4 sm:grid-cols-3 pt-2">
               <div>
                  <label className="mb-1 block text-sm font-bold text-gray-700">CAT LRDI Score</label>
                  <input 
                    type="number" step="0.01"
                    value={form.catHistory.LRDI} 
                    onChange={e => setForm({...form, catHistory: {...form.catHistory, LRDI: e.target.value}})} 
                    placeholder="Percentile"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors"
                  />
               </div>
               <div>
                  <label className="mb-1 block text-sm font-bold text-gray-700">CAT VARC Score</label>
                  <input 
                    type="number" step="0.01"
                    value={form.catHistory.VARC} 
                    onChange={e => setForm({...form, catHistory: {...form.catHistory, VARC: e.target.value}})} 
                    placeholder="Percentile"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors"
                  />
               </div>
               <div>
                  <label className="mb-1 block text-sm font-bold text-gray-700">CAT Quants Score</label>
                  <input 
                     type="number" step="0.01"
                     value={form.catHistory.Quants} 
                     onChange={e => setForm({...form, catHistory: {...form.catHistory, Quants: e.target.value}})} 
                     placeholder="Percentile"
                     className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors"
                  />
               </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-bold text-gray-700">Other MBA Exams Score (Cumulative)</label>
               <input 
                 type="number" step="0.01"
                 value={form.otherMbaScore} 
                 onChange={e => setForm({...form, otherMbaScore: e.target.value})} 
                 placeholder="e.g. XAT 99.5"
                 className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors"
               />
            </div>

            <div>
              <label className="mb-1 block text-sm font-bold text-gray-700">Certifications</label>
               <textarea 
                 value={form.certifications} 
                 onChange={e => setForm({...form, certifications: e.target.value})} 
                 placeholder="List your significant certifications..."
                 rows={2}
                 className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors"
               />
            </div>
          </div>
        </Card>

        <Card title="Upload Resume" icon={Upload} shadowColor="#FABE28">
           <div>
              <label className="mb-2 block text-sm font-bold text-gray-700">Resume / CV (Optional)</label>
              <div className="relative flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-2xl hover:border-black transition-colors bg-[#Fcfcfc]">
                 <input 
                   type="file" 
                   accept=".pdf,.doc,.docx"
                   onChange={(e) => setResumeFile(e.target.files?.[0])}
                   className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                 />
                 <Upload className="h-8 w-8 text-gray-400 mb-3" />
                 <p className="text-sm font-medium text-gray-600">Drag and drop your resume here, or click to browse</p>
                 <div className="mt-4 px-6 py-2 bg-[#5B6EF5] text-white text-sm font-bold rounded-lg pointer-events-none">
                    Choose File
                 </div>
                 <p className="text-xs text-gray-400 mt-4">Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
                 {resumeFile && <p className="text-sm text-green-600 font-bold mt-2 text-center">Selected: {resumeFile.name}</p>}
                 {(!resumeFile && existingProfile?.resumeUrl) && <p className="text-sm text-green-600 font-bold mt-2 text-center">Resume already uploaded.</p>}
              </div>
           </div>
        </Card>

        <div className="flex justify-center mt-10">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="flex items-center gap-2 bg-[#5B6EF5] text-white px-10 py-3 rounded-xl font-bold text-lg border-2 border-[#1E1E1E] shadow-[4px_4px_0px_0px_#1E1E1E] active:translate-y-1 active:translate-x-1 active:shadow-[0px_0px_0px_0px_#1e1e1e] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Saving..." : "Complete Profile"}
            {!isSubmitting && <ChevronRight className="h-5 w-5" />}
          </button>
        </div>
      </form>
    </div>
  );
}
