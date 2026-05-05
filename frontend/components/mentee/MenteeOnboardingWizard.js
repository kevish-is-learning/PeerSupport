"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { User, BookOpen, Briefcase, FileText, CheckCircle, Upload } from "lucide-react";
import { menteeProfileApi, resolveUploadUrl } from "../../lib/api";

const STEPS = [
  { id: 1, title: "Basic Information", icon: User },
  { id: 2, title: "Education Details", icon: BookOpen },
  { id: 3, title: "Scores & Experience", icon: Briefcase },
  { id: 4, title: "Resume Upload", icon: FileText },
];

export default function MenteeOnboardingWizard({ existingProfile, onComplete }) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "", // handled in backend user model
    dateOfBirth: existingProfile?.dateOfBirth ? existingProfile.dateOfBirth.split("T")[0] : "",
    contactNumber: existingProfile?.contactNumber || "",
    education: existingProfile?.education || [],
    workExperience: existingProfile?.workExperience || "",
    certifications: existingProfile?.certifications || "",
    catHistory: existingProfile?.catHistory || { LRDI: "", VARC: "", Quants: "" },
    otherMbaScore: existingProfile?.otherMbaScore || "",
  });

  const [resumeFile, setResumeFile] = useState(null);

  const handleNext = () => {
    if (currentStep === 1) {
      if (!form.contactNumber || !form.dateOfBirth) {
        toast.error("Please fill in contact number and date of birth.");
        return;
      }
    }
    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const addEducation = () => {
    setForm(prev => ({
      ...prev,
      education: [...prev.education, { type: "10th", institutionName: "", fromYear: "", toYear: "", score: "" }]
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

  const handleSubmit = async () => {
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
        await menteeProfileApi.updateMyProfile(formData);
      } else {
        await menteeProfileApi.createMyProfile(formData);
      }
      toast.success("Profile saved effectively!");
      onComplete?.();
    } catch (err) {
      toast.error(err?.response?.data?.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl p-6 bg-white rounded-xl shadow-sm border border-neutral-100">
      <div className="mb-8 flex items-center justify-between">
        {STEPS.map((step) => (
          <div key={step.id} className="flex flex-col items-center flex-1">
            <div className={`flex h-10 w-10 items-center justify-center rounded-full \${currentStep >= step.id ? 'bg-primary-600 text-white' : 'bg-neutral-100 text-neutral-400'}`}>
              <step.icon className="h-5 w-5" />
            </div>
            <span className="mt-2 text-xs font-medium text-neutral-600">{step.title}</span>
          </div>
        ))}
      </div>

      <div className="my-6">
        {currentStep === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Basic Information</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">Contact Number</label>
                <input
                  type="text"
                  className="w-full rounded-md border p-2 text-sm"
                  value={form.contactNumber}
                  onChange={e => setForm({ ...form, contactNumber: e.target.value })}
                  placeholder="+1 234 567 8900"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Date of Birth</label>
                <input
                  type="date"
                  className="w-full rounded-md border p-2 text-sm"
                  value={form.dateOfBirth}
                  onChange={e => setForm({ ...form, dateOfBirth: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Education Details</h2>
            {form.education.map((edu, idx) => (
              <div key={idx} className="border p-4 rounded-md space-y-3 relative mb-4">
                <button onClick={() => removeEducation(idx)} className="absolute top-2 right-2 text-red-500 text-sm">Remove</button>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                     <label className="mb-1 block text-sm font-medium">Type</label>
                     <select value={edu.type} onChange={e => updateEducation(idx, "type", e.target.value)} className="w-full rounded-md border p-2 text-sm">
                       <option value="10th">10th</option>
                       <option value="12th">12th</option>
                       <option value="Graduation">Graduation</option>
                       <option value="Post Graduation">Post Graduation</option>
                     </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">Institution Name</label>
                    <input type="text" className="w-full rounded-md border p-2 text-sm" value={edu.institutionName} onChange={e => updateEducation(idx, "institutionName", e.target.value)} />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">From Year</label>
                    <input type="number" className="w-full rounded-md border p-2 text-sm" value={edu.fromYear} onChange={e => updateEducation(idx, "fromYear", e.target.value)} />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">To Year</label>
                    <input type="number" className="w-full rounded-md border p-2 text-sm" value={edu.toYear} onChange={e => updateEducation(idx, "toYear", e.target.value)} />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">Score (0-100)</label>
                    <input type="number" className="w-full rounded-md border p-2 text-sm" value={edu.score} onChange={e => updateEducation(idx, "score", e.target.value)} />
                  </div>
                </div>
              </div>
            ))}
            <button onClick={addEducation} className="text-primary-600 text-sm font-medium border border-primary-600 px-4 py-2 rounded-md">+ Add Education</button>
          </div>
        )}

        {currentStep === 3 && (
           <div className="space-y-4">
           <h2 className="text-xl font-bold">Scores & Experience</h2>
           <div>
             <label className="mb-1 block text-sm font-medium">Work Experience</label>
             <textarea className="w-full rounded-md border p-2 text-sm" value={form.workExperience} onChange={e => setForm({ ...form, workExperience: e.target.value })} placeholder="Describe your work experience..." rows={3} />
           </div>
           <div>
             <label className="mb-1 block text-sm font-medium">Certifications</label>
             <textarea className="w-full rounded-md border p-2 text-sm" value={form.certifications} onChange={e => setForm({ ...form, certifications: e.target.value })} placeholder="List your certifications..." rows={2} />
           </div>
           <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-1 block text-sm font-medium">CAT Score - LRDI</label>
                <input type="number" className="w-full rounded-md border p-2 text-sm" value={form.catHistory.LRDI} onChange={e => setForm({...form, catHistory: {...form.catHistory, LRDI: e.target.value}})} placeholder="e.g. 99" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">CAT Score - VARC</label>
                <input type="number" className="w-full rounded-md border p-2 text-sm" value={form.catHistory.VARC} onChange={e => setForm({...form, catHistory: {...form.catHistory, VARC: e.target.value}})} placeholder="e.g. 99" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">CAT Score - Quants</label>
                <input type="number" className="w-full rounded-md border p-2 text-sm" value={form.catHistory.Quants} onChange={e => setForm({...form, catHistory: {...form.catHistory, Quants: e.target.value}})} placeholder="e.g. 99" />
              </div>
           </div>
           <div>
              <label className="mb-1 block text-sm font-medium">Other MBA Score (Cumulative %)</label>
              <input type="number" className="w-full rounded-md border p-2 text-sm" value={form.otherMbaScore} onChange={e => setForm({ ...form, otherMbaScore: e.target.value })} />
           </div>
         </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Resume Upload</h2>
            <div className="border-2 border-dashed rounded-xl p-8 text-center bg-neutral-50 flex flex-col items-center justify-center">
              <Upload className="h-10 w-10 text-neutral-400 mb-4" />
              <p className="text-sm font-medium text-neutral-600 mb-2">Drag and drop your resume here, or click to browse</p>
              <p className="text-xs text-neutral-500 mb-4">Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
              <input type="file" onChange={e => setResumeFile(e.target.files?.[0])} accept=".pdf,.doc,.docx" className="text-sm" />
            </div>
            {existingProfile?.resumeUrl && (
              <p className="text-sm text-green-600">Existing resume available.</p>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-between border-t pt-4 mt-6">
        <button onClick={handlePrev} disabled={currentStep === 1} className="px-4 py-2 rounded-md font-medium disabled:opacity-50 border">
          Back
        </button>
        {currentStep < STEPS.length ? (
          <button onClick={handleNext} className="px-6 py-2 bg-primary-600 text-white rounded-md font-medium">
            Next
          </button>
        ) : (
          <button onClick={handleSubmit} disabled={isSubmitting} className="px-6 py-2 bg-primary-600 text-white rounded-md font-medium flex items-center">
            {isSubmitting ? "Saving..." : "Submit Profile"}
            {!isSubmitting && <CheckCircle className="ml-2 h-4 w-4" />}
          </button>
        )}
      </div>
    </div>
  );
}
