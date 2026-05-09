"use client";

import { useEffect, useState, useRef } from "react";
import { User, Mail, Phone, Building, FileText, Camera, Download, RefreshCw, AlertCircle } from "lucide-react";
import useAuthStore from "../../../store/useAuthStore";
import { menteeProfileApi, resolveUploadUrl } from "../../../lib/api";
import { toast } from "sonner";

export default function MenteeProfileSettingsPage() {
  const { user, fetchCurrentUser } = useAuthStore();
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    contactNumber: "",
    workExperience: "",
    expectations: "",
  });

  const [resumeFile, setResumeFile] = useState(null);
  const resumeInputRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const res = await menteeProfileApi.getMine();
        if (res.data) {
          setProfileData(res.data);
          setForm({
            name: res.data.name || user?.name || "",
            email: res.data.email || user?.email || "",
            contactNumber: res.data.contactNumber || "",
            workExperience: res.data.workExperience || "",
            expectations: res.data.expectations || "",
          });
        }
      } catch (err) {
        setError(err?.message || "Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("contactNumber", form.contactNumber);
      if (form.workExperience) formData.append("workExperience", form.workExperience);
      // Backend mapping might not support expectations directly from form without schema update, but we'll send it
      if (form.expectations) formData.append("expectations", form.expectations);
      
      if (resumeFile) {
        formData.append("resume", resumeFile);
      }

      await menteeProfileApi.update(formData);
      toast.success("Profile updated successfully");
      fetchCurrentUser();
      
      // Refresh profile data
      const res = await menteeProfileApi.getMine();
      setProfileData(res.data);
      setResumeFile(null);
    } catch (err) {
      toast.error(err?.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="font-bold text-gray-500">Loading profile settings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-64 flex-col items-center justify-center text-center">
        <AlertCircle className="mb-2 h-8 w-8 text-red-500" />
        <p className="font-bold text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl pb-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Profile Settings</h1>
        <p className="mt-1 text-sm font-medium text-gray-500">Manage your account and preferences</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
        <div className="space-y-6">
          {/* Profile Picture Card */}
          <div className="relative rounded-2xl border-2 border-black bg-white p-6 shadow-[6px_6px_0px_0px_#8B5CF6]">
            <h3 className="mb-4 text-lg font-bold text-gray-900">Profile Picture</h3>
            <div className="flex flex-col items-center">
              <div className="relative mb-4 h-32 w-32">
                <div className="h-full w-full overflow-hidden rounded-2xl border-2 border-black bg-gray-100">
                  {user?.profilePicture ? (
                    <img 
                      src={resolveUploadUrl(user.profilePicture)} 
                      alt={form.name} 
                      className="h-full w-full object-cover" 
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#F3E8FF] text-4xl font-black text-[#8B5CF6]">
                      {form.name?.charAt(0) || "M"}
                    </div>
                  )}
                </div>
                <button 
                  className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-xl border-2 border-black bg-[#8B5CF6] text-white shadow-[2px_2px_0px_0px_#1E1E1E] transition-transform active:translate-y-1 active:shadow-[0px_0px_0px_0px_#1E1E1E]"
                  onClick={() => toast.info("Profile picture upload coming soon")}
                >
                  <Camera className="h-5 w-5" />
                </button>
              </div>
              <p className="text-center text-xs font-medium text-gray-500">Click the camera icon to upload a new photo</p>
            </div>
          </div>

          {/* Resume Card */}
          <div className="relative rounded-2xl border-2 border-black bg-white p-6 shadow-[6px_6px_0px_0px_#06B6D4]">
            <h3 className="mb-4 text-lg font-bold text-gray-900">Resume</h3>
            <div className="rounded-xl border border-gray-200 p-4">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-[#F3E8FF] text-[#8B5CF6]">
                  <FileText className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-gray-900">
                    {resumeFile ? resumeFile.name : (profileData?.resumeUrl ? profileData.resumeUrl.split('/').pop() : "No resume uploaded")}
                  </p>
                  <p className="text-xs font-medium text-gray-500">{resumeFile ? "Ready to upload" : "Uploaded resume"}</p>
                </div>
              </div>
              
              <input 
                type="file" 
                ref={resumeInputRef} 
                className="hidden" 
                accept=".pdf,.doc,.docx"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setResumeFile(e.target.files[0]);
                  }
                }}
              />
              
              <div className="flex gap-2">
                <button 
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-black bg-white py-2 text-xs font-bold text-gray-900 shadow-[2px_2px_0px_0px_#1E1E1E] transition-transform active:translate-y-0.5 active:shadow-[0px_0px_0px_0px_#1E1E1E] disabled:opacity-50"
                  onClick={() => {
                    if (profileData?.resumeUrl) {
                      window.open(resolveUploadUrl(profileData.resumeUrl), "_blank");
                    } else {
                      toast.error("No resume available to download");
                    }
                  }}
                  disabled={!profileData?.resumeUrl && !resumeFile}
                >
                  <Download className="h-4 w-4" /> Download
                </button>
                <button 
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-black bg-[#06B6D4] py-2 text-xs font-bold text-white shadow-[2px_2px_0px_0px_#1E1E1E] transition-transform hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#1E1E1E] active:translate-y-0 active:shadow-[0px_0px_0px_0px_#1E1E1E]"
                  onClick={() => resumeInputRef.current?.click()}
                >
                  <RefreshCw className="h-4 w-4" /> Replace
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information Form */}
        <div className="relative rounded-2xl border-2 border-black bg-white shadow-[8px_8px_0px_0px_#06B6D4]">
          <div className="flex items-center gap-3 border-b-2 border-black bg-[#F8EBE6] px-6 py-5 rounded-t-[14px]">
            <User className="h-6 w-6 text-gray-900" />
            <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
          </div>
          
          <div className="p-6 sm:p-8">
            <div className="grid gap-6">
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-900">Full Name</label>
                <input 
                  type="text" 
                  value={form.name} 
                  onChange={(e) => setForm({...form, name: e.target.value})} 
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-sm font-medium text-gray-900 transition-colors focus:border-[#06B6D4] focus:outline-none focus:ring-0"
                />
              </div>
              
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-900">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-500">
                    <Mail className="h-5 w-5" />
                  </div>
                  <input 
                    type="email" 
                    value={form.email} 
                    disabled
                    className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 py-3 pl-12 pr-4 text-sm font-medium text-gray-500 opacity-70 focus:outline-none"
                  />
                </div>
              </div>
              
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-900">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-500">
                    <Phone className="h-5 w-5" />
                  </div>
                  <input 
                    type="tel" 
                    value={form.contactNumber} 
                    onChange={(e) => setForm({...form, contactNumber: e.target.value})} 
                    className="w-full rounded-xl border-2 border-gray-200 py-3 pl-12 pr-4 text-sm font-medium text-gray-900 transition-colors focus:border-[#06B6D4] focus:outline-none focus:ring-0"
                  />
                </div>
              </div>
              
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-900">Current Organization/College</label>
                <input 
                  type="text" 
                  value={form.workExperience} 
                  onChange={(e) => setForm({...form, workExperience: e.target.value})} 
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-sm font-medium text-gray-900 transition-colors focus:border-[#06B6D4] focus:outline-none focus:ring-0"
                />
              </div>
              
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-900">Bio</label>
                <textarea 
                  value={form.expectations} 
                  onChange={(e) => setForm({...form, expectations: e.target.value})} 
                  rows={4}
                  className="w-full resize-none rounded-xl border-2 border-gray-200 px-4 py-3 text-sm font-medium text-gray-900 transition-colors focus:border-[#06B6D4] focus:outline-none focus:ring-0"
                />
              </div>
            </div>
            
            <div className="mt-8 flex justify-end gap-4 border-t-2 border-gray-100 pt-6">
              <button 
                className="rounded-xl border-2 border-gray-200 bg-white px-6 py-2.5 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
                onClick={() => {
                  setForm({
                    name: profileData?.name || user?.name || "",
                    email: profileData?.email || user?.email || "",
                    contactNumber: profileData?.contactNumber || "",
                    workExperience: profileData?.workExperience || "",
                    expectations: profileData?.expectations || "",
                  });
                  setResumeFile(null);
                }}
              >
                Cancel
              </button>
              <button 
                className="flex items-center gap-2 rounded-xl border-2 border-black bg-[#06B6D4] px-8 py-2.5 text-sm font-bold text-white shadow-[2px_2px_0px_0px_#1E1E1E] transition-transform hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#1E1E1E] active:translate-y-0 active:shadow-[0px_0px_0px_0px_#1E1E1E] disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-[2px_2px_0px_0px_#1E1E1E]"
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
