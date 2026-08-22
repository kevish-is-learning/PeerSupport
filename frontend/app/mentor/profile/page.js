"use client";

import {
  User,
  Edit2,
  Save,
  X,
  Loader2,
  Camera,
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  Award,
  Star,
  Book,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "../../../store/useAuthStore";
import { mentorProfileApi, resolveUploadUrl } from "../../../lib/api";
import { toast } from "sonner";

const EXPERTISE_OPTIONS = [
  "Interview Preparation",
  "Resume Review",
  "Career Guidance",
  "Case Study Practice",
  "GD/WAT Preparation",
  "College Selection",
  "Application Strategy",
  "Mock Interviews",
  "Essay Writing",
  "Networking Tips",
];

const IIM_SCHOOLS = [
  "IIM Ahmedabad",
  "IIM Bangalore",
  "IIM Calcutta",
  "IIM Lucknow",
  "IIM Kozhikode",
  "IIM Indore",
  "ISB",
  "XLRI",
  "FMS Delhi",
  "MDI Gurgaon",
  "SP Jain",
  "JBIMS",
  "IMT Ghaziabad",
  "Other",
];

const parseLegacyProfile = (value, keys) => Object.fromEntries(
  keys.map((key, index) => [key, (value || "").split("|")[index] || ""]),
);

const getEducation = (profile) => profile?.education || {
  mba: parseLegacyProfile(profile?.pgProfile, ["college", "specialization", "graduationYear"]),
  undergraduate: parseLegacyProfile(profile?.ugCollegeProfile, ["college", "degree", "specialization", "graduationYear"]),
};

const getProfessionalExperience = (profile) => profile?.professionalExperience || (() => {
  const legacy = parseLegacyProfile(profile?.workExperience, ["years", "company", "role"]);
  return { hasExperience: Boolean(legacy.years || legacy.company || legacy.role), ...legacy };
})();

export default function MentorProfilePage() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    contactNumber: "",
    bSchool: "",
    bSchoolSpecialization: "",
    bSchoolYear: "",
    expertiseTagsArr: [],
    bio: "",
    workExpYears: "",
    workExpCompany: "",
    workExpRole: "",
    ugCollege: "",
    ugDegree: "",
    ugSpecialization: "",
    ugYear: "",
  });

  const loadProfile = async () => {
    try {
      const res = await mentorProfileApi.getMine();
      const p = res.data?.profile;
      if (p) {
        setProfile(p);
        const education = getEducation(p);
        const workExperience = getProfessionalExperience(p);
        setForm({
          fullName: p.name || "",
          contactNumber: p.contactNumber || "",
          bSchool: education.mba?.college || "",
          bSchoolSpecialization: education.mba?.specialization || "",
          bSchoolYear: education.mba?.graduationYear || "",
          expertiseTagsArr: p.expertiseTags || [],
          bio: p.bio || "",
          workExpYears: workExperience.years || "",
          workExpCompany: workExperience.company || "",
          workExpRole: workExperience.role || "",
          ugCollege: education.undergraduate?.college || "",
          ugDegree: education.undergraduate?.degree || "",
          ugSpecialization: education.undergraduate?.specialization || "",
          ugYear: education.undergraduate?.graduationYear || "",
        });
      }
    } catch {
      toast.error("Failed to load profile.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleCancel = () => {
    if (!profile) return;
    const education = getEducation(profile);
    const workExperience = getProfessionalExperience(profile);
    setForm({
      fullName: profile.name || "",
      contactNumber: profile.contactNumber || "",
      bSchool: education.mba?.college || "",
      bSchoolSpecialization: education.mba?.specialization || "",
      bSchoolYear: education.mba?.graduationYear || "",
      expertiseTagsArr: profile.expertiseTags || [],
      bio: profile.bio || "",
      workExpYears: workExperience.years || "",
      workExpCompany: workExperience.company || "",
      workExpRole: workExperience.role || "",
      ugCollege: education.undergraduate?.college || "",
      ugDegree: education.undergraduate?.degree || "",
      ugSpecialization: education.undergraduate?.specialization || "",
      ugYear: education.undergraduate?.graduationYear || "",
    });
    setIsEditing(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await mentorProfileApi.update({
        fullName: form.fullName,
        contactNumber: form.contactNumber,
        bio: form.bio,
        expertiseTags: form.expertiseTagsArr,
        education: {
          mba: { college: form.bSchool, specialization: form.bSchoolSpecialization, graduationYear: Number(form.bSchoolYear) },
          undergraduate: { college: form.ugCollege, degree: form.ugDegree, specialization: form.ugSpecialization, graduationYear: Number(form.ugYear) },
        },
        professionalExperience: {
          hasExperience: Boolean(form.workExpYears || form.workExpCompany || form.workExpRole),
          ...(form.workExpYears || form.workExpCompany || form.workExpRole ? { years: Number(form.workExpYears), company: form.workExpCompany, role: form.workExpRole } : {}),
        },
      });
      setProfile(res.data?.profile);
      toast.success(res.data?.profile?.approvalStatus === "PENDING" ? "Profile saved and submitted for review." : "Profile saved!");
      setIsEditing(false);
    } catch (e) {
      toast.error(e.message || "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("profilePhoto", file);
    formData.append("contactNumber", profile?.contactNumber || "");
    formData.append("bio", profile?.bio || "");
    if (profile?.linkedInUrl) formData.append("linkedInUrl", profile.linkedInUrl);
    if (profile?.pgProfile) formData.append("pgProfile", profile.pgProfile);
    if (profile?.workExperience) formData.append("workExperience", profile.workExperience);
    if (profile?.ugCollegeProfile) formData.append("ugCollegeProfile", profile.ugCollegeProfile);
    if (profile?.expertiseTags?.length) {
      formData.append("expertiseTags", JSON.stringify(profile.expertiseTags));
    }
    try {
      setSaving(true);
      const toastId = toast.loading("Uploading photo...");
      const res = await mentorProfileApi.update(formData);
      setProfile(res.data?.profile);
      toast.success("Profile photo updated!", { id: toastId });
    } catch (err) {
      toast.error(err.message || "Failed to upload photo");
      toast.dismiss();
    } finally {
      setSaving(false);
      e.target.value = "";
    }
  };

  // Derived display values
  const displayName = profile?.name || user?.name || "Mentor";
  const education = getEducation(profile);
  const pgParts = [education.mba?.college || "", education.mba?.specialization || "", education.mba?.graduationYear || ""];
  const ugParts = [education.undergraduate?.college || "", education.undergraduate?.degree || "", education.undergraduate?.specialization || "", education.undergraduate?.graduationYear || ""];
  const schoolName = pgParts[0];
  const batchYear = pgParts[2];
  const experience = getProfessionalExperience(profile);
  const weParts = [experience.years || "", experience.company || "", experience.role || ""];
  const workExpDisplay = (() => {
    const yrs = weParts[0] ? `${weParts[0]} years` : "";
    const company = weParts[1] ? ` at ${weParts[1]}` : "";
    const role = weParts[2] ? ` as ${weParts[2]}` : "";
    return `${yrs}${company}${role}`;
  })();

  if (isLoading) {
    return (
      <div className="w-full h-full overflow-y-auto bg-[#FAF9F6] p-4 sm:p-8 lg:p-12">
        <div className="flex flex-col lg:flex-row gap-8 items-start max-w-6xl mx-auto">
          {/* LEFT: Profile Preview Skeleton */}
          <div className="w-full lg:w-[340px] shrink-0 animate-pulse">
            <div className="rounded-[28px] border-2 border-gray-200 bg-white p-8 flex flex-col items-center text-center" style={{ boxShadow: "6px 6px 0 0 #E5E7EB" }}>
              <div className="h-40 w-40 rounded-[20px] bg-gray-200 mb-5"></div>
              <div className="h-6 w-48 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-32 bg-gray-200 rounded mb-4"></div>
              <div className="flex flex-wrap justify-center gap-2 mt-4 w-full">
                <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
                <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
                <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
              </div>
              <div className="h-16 w-full bg-gray-200 rounded mt-5 mb-2"></div>
              <div className="h-4 w-32 bg-gray-200 rounded mb-6"></div>
              <div className="h-14 w-full rounded-2xl bg-gray-200 mt-4"></div>
            </div>
          </div>
          
          {/* RIGHT: Personal Information Skeleton */}
          <div className="flex-1 w-full min-w-0 animate-pulse">
            <div className="rounded-[28px] border-2 border-gray-200 bg-white overflow-hidden mb-6" style={{ boxShadow: "6px 6px 0 0 #E5E7EB" }}>
              <div className="p-8">
                 <div className="h-6 w-48 bg-gray-200 rounded mb-6"></div>
                 <div className="h-10 w-full bg-gray-200 rounded mb-4"></div>
                 <div className="h-10 w-full bg-gray-200 rounded"></div>
              </div>
            </div>
            <div className="rounded-[28px] border-2 border-gray-200 bg-white overflow-hidden" style={{ boxShadow: "6px 6px 0 0 #E5E7EB" }}>
              <div className="p-8">
                 <div className="h-6 w-48 bg-gray-200 rounded mb-6"></div>
                 <div className="h-10 w-full bg-gray-200 rounded mb-4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const expertiseTags = profile?.expertiseTags || [];
  const visibleTags = expertiseTags.slice(0, 3);
  const remainingTagsCount = expertiseTags.length - 3;
  const profilePhotoUrl = profile?.profilePhotoUrl || user?.profilePicture || "";
  const profilePhotoSrc = resolveUploadUrl(profilePhotoUrl);
  const averageRating = Number(profile?.averageRating) || 0;

  return (
    <div className="w-full h-full overflow-y-auto bg-[#FAF9F6] p-4 sm:p-8 lg:p-12">
      <div className="flex flex-col lg:flex-row gap-8 items-start max-w-6xl mx-auto">

        {/* ── LEFT: Profile Preview Card ── */}
        <div className="w-full lg:w-[340px] shrink-0">
          <div
            className="rounded-[28px] border-2 border-black bg-white p-4 flex flex-col items-center text-center"
            style={{ boxShadow: "6px 6px 0 0 #5061E4" }}
          >
            {/* Photo */}
            <div className="relative mb-5 mt-2">
              <div className="h-[180px] w-[180px] overflow-hidden rounded-[20px] border-2 border-black bg-gray-100">
                {profilePhotoSrc ? (
                  <img
                    src={profilePhotoSrc}
                    alt="Profile"
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <User size={48} className="text-gray-400" />
                  </div>
                )}
              </div>
              {isEditing && (
                <label
                  className={`absolute -bottom-2 -right-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-2 border-black bg-[#5061E4] text-white hover:bg-[#4050d0] transition-all shadow-[2px_2px_0_0_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none ${saving ? "opacity-50 pointer-events-none" : ""}`}
                >
                  <Camera size={16} />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    disabled={saving}
                  />
                </label>
              )}
            </div>

            {/* Name & School */}
            <h2 className="text-2xl font-black text-black leading-tight">{displayName}</h2>
            {(schoolName || batchYear) && (
              <div className="text-sm font-semibold text-gray-500 mt-1 flex flex-col items-center">
                <span>{schoolName}</span>
                {(pgParts[1] || batchYear) && (
                  <span>
                    {pgParts[1] || "MBA"} • {batchYear}
                  </span>
                )}
              </div>
            )}

            {averageRating > 0 ? (
              <div className="flex items-center gap-1 mt-3" aria-label={`${averageRating.toFixed(1)} out of 5 rating`}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className={star <= Math.round(averageRating) ? "fill-[#F59E0B] text-[#F59E0B]" : "text-gray-300"}
                  />
                ))}
                <span className="text-black font-black text-sm ml-1">{averageRating.toFixed(1)}</span>
              </div>
            ) : (
              <p className="mt-3 text-xs font-semibold text-gray-500">No ratings yet</p>
            )}

            {/* Expertise chips */}
            {expertiseTags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mt-4 px-2">
                {visibleTags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-black bg-white px-3 py-1 text-[10px] font-bold text-[#5061E4]"
                  >
                    {t}
                  </span>
                ))}
                {remainingTagsCount > 0 && (
                  <span className="rounded-full border border-black bg-white px-3 py-1 text-[10px] font-bold text-gray-500">
                    +{remainingTagsCount} more
                  </span>
                )}
              </div>
            )}

            {/* Bio */}
            <p className="text-sm text-gray-500 font-medium leading-relaxed mt-6 mb-4 line-clamp-3 px-2 break-words overflow-hidden max-w-full">
              {profile?.bio || "No bio added yet. Edit your profile to add a short bio."}
            </p>

            {/* Work Exp */}
            {workExpDisplay && (
              <p className="text-xs font-bold text-gray-400 mb-6">{workExpDisplay}</p>
            )}

            {/* Preview button */}
            <button className="mt-2 w-full rounded-2xl border-2 border-black bg-[#5061E4] py-3.5 text-base font-black text-white shadow-[2px_2px_0_0_#000] hover:opacity-90 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all">
              Preview Full Profile
            </button>
          </div>
        </div>

        {/* ── RIGHT: Profile Settings ── */}
        <div className="flex-1 w-full min-w-0 flex flex-col gap-6 pb-20">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2 pl-2">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-black">Profile Settings</h1>
              <p className="text-sm text-gray-500 font-medium mt-1">Manage your profile information and preferences</p>
            </div>
            {isEditing ? (
              <div className="flex gap-3">
                <button
                  onClick={handleCancel}
                  disabled={saving}
                  className="flex items-center gap-2 rounded-xl border-2 border-black bg-white px-4 py-2.5 text-sm font-black hover:bg-gray-50 disabled:opacity-50 transition-all"
                >
                  <X size={16} /> Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 rounded-xl border-2 border-black bg-[#F59E0B] px-6 py-2.5 text-sm font-black hover:opacity-90 disabled:opacity-50 shadow-[3px_3px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
                >
                  {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  Save
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 rounded-xl border-2 border-black bg-[#5061E4] px-6 py-2.5 text-sm font-black text-white hover:opacity-90 shadow-[3px_3px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
              >
                <Edit2 size={16} /> Edit Profile
              </button>
            )}
          </div>

          {profile?.approvalStatus !== "APPROVED" && (
            <div className={`rounded-2xl border-2 p-4 text-sm font-medium ${profile?.approvalStatus === "REJECTED" ? "border-red-300 bg-red-50 text-red-800" : "border-amber-300 bg-amber-50 text-amber-900"}`}>
              <p className="font-black">{profile?.approvalStatus === "REJECTED" ? "Your application needs changes" : "Your mentor application is under review"}</p>
              <p className="mt-1">{profile?.adminReviewNotes || (profile?.approvalStatus === "REJECTED" ? "Update the requested details and save your profile to resubmit." : "You’ll be able to configure services after approval.")}</p>
            </div>
          )}

          {/* Basic Information Card */}
          <div className="rounded-[28px] border-2 border-black bg-white overflow-hidden p-6 sm:p-8" style={{ boxShadow: "4px 4px 0 0 #7C3AED" }}>
             <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#7C3AED]/10 p-2.5 rounded-xl border-2 border-transparent">
                    <User size={20} className="text-[#7C3AED]" strokeWidth={2.5} />
                </div>
                <h2 className="text-xl font-black text-black">Basic Information</h2>
             </div>
             
             {isEditing ? (
               <div className="grid gap-6 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-black uppercase tracking-wider text-gray-400">Full Name</label>
                    <input
                      value={form.fullName}
                      onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
                      className="rounded-xl border border-black px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-[#7C3AED]/20"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-black uppercase tracking-wider text-gray-400">Phone Number</label>
                    <input
                      value={form.contactNumber}
                      onChange={(e) => setForm((f) => ({ ...f, contactNumber: e.target.value }))}
                      className="rounded-xl border border-black px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-[#7C3AED]/20"
                    />
                  </div>
                  <div className="flex flex-col gap-2 sm:col-span-2">
                    <label className="text-xs font-black uppercase tracking-wider text-gray-400">Email Address</label>
                    <input
                      value={user?.email || ""}
                      disabled
                      className="rounded-xl border border-black bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-500 cursor-not-allowed"
                    />
                  </div>
               </div>
             ) : (
               <div className="grid gap-6 sm:grid-cols-2">
                 <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">Full Name</span>
                    <span className="text-base font-bold text-black">{displayName}</span>
                 </div>
                 <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">Email Address</span>
                    <span className="text-base font-bold text-black">{user?.email || "—"}</span>
                 </div>
                 <div className="flex flex-col gap-1 sm:col-span-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">Phone Number</span>
                    <span className="text-base font-bold text-black">{profile?.contactNumber ? `+91 ${profile.contactNumber}` : "—"}</span>
                 </div>
               </div>
             )}
          </div>

          {/* MBA Education Card */}
          <div className="rounded-[28px] border-2 border-black bg-white overflow-hidden p-6 sm:p-8" style={{ boxShadow: "4px 4px 0 0 #3B82F6" }}>
             <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#3B82F6]/10 p-2.5 rounded-xl border-2 border-transparent">
                    <GraduationCap size={20} className="text-[#3B82F6]" strokeWidth={2.5} />
                </div>
                <h2 className="text-xl font-black text-black">MBA Education</h2>
             </div>
             
             {isEditing ? (
               <div className="grid gap-6 sm:grid-cols-2">
                  <div className="flex flex-col gap-2 sm:col-span-2">
                    <label className="text-xs font-black uppercase tracking-wider text-gray-400">MBA College/B-School</label>
                    <select
                      value={form.bSchool}
                      onChange={(e) => setForm((f) => ({ ...f, bSchool: e.target.value }))}
                      className="rounded-xl border border-black px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-[#3B82F6]/20"
                    >
                      <option value="">Select B-School</option>
                      {IIM_SCHOOLS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-black uppercase tracking-wider text-gray-400">Specialization</label>
                    <input
                      value={form.bSchoolSpecialization}
                      onChange={(e) => setForm((f) => ({ ...f, bSchoolSpecialization: e.target.value }))}
                      className="rounded-xl border border-black px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-[#3B82F6]/20"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-black uppercase tracking-wider text-gray-400">Graduation Year</label>
                    <input
                      type="number"
                      min="1990"
                      max={new Date().getFullYear() + 10}
                      value={form.bSchoolYear}
                      onChange={(e) => setForm((f) => ({ ...f, bSchoolYear: e.target.value }))}
                      className="rounded-xl border border-black px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-[#3B82F6]/20"
                    />
                  </div>
               </div>
             ) : (
               <div className="grid gap-6 sm:grid-cols-2">
                 <div className="flex flex-col gap-1 sm:col-span-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">MBA College/B-School</span>
                    <span className="text-base font-bold text-black">{schoolName || "—"}</span>
                 </div>
                 <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">Specialization</span>
                    <span className="text-base font-bold text-black">{pgParts[1] || "—"}</span>
                 </div>
                 <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">Graduation Year</span>
                    <span className="text-base font-bold text-black">{batchYear || "—"}</span>
                 </div>
               </div>
             )}
          </div>


          {/* Undergraduate Education Card */}
          <div className="rounded-[28px] border-2 border-black bg-white overflow-hidden p-6 sm:p-8" style={{ boxShadow: "4px 4px 0 0 #F59E0B" }}>
             <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#F59E0B]/10 p-2.5 rounded-xl border-2 border-transparent">
                    <Book size={20} className="text-[#F59E0B]" strokeWidth={2.5} />
                </div>
                <h2 className="text-xl font-black text-black">Undergraduate Education</h2>
             </div>
             
             {isEditing ? (
               <div className="grid gap-6 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-black uppercase tracking-wider text-gray-400">College/University</label>
                    <input
                      value={form.ugCollege}
                      onChange={(e) => setForm((f) => ({ ...f, ugCollege: e.target.value }))}
                      className="rounded-xl border border-black px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-[#F59E0B]/20"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-black uppercase tracking-wider text-gray-400">Degree</label>
                    <input
                      value={form.ugDegree}
                      onChange={(e) => setForm((f) => ({ ...f, ugDegree: e.target.value }))}
                      className="rounded-xl border border-black px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-[#F59E0B]/20"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-black uppercase tracking-wider text-gray-400">Specialization</label>
                    <input
                      value={form.ugSpecialization}
                      onChange={(e) => setForm((f) => ({ ...f, ugSpecialization: e.target.value }))}
                      className="rounded-xl border border-black px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-[#F59E0B]/20"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-black uppercase tracking-wider text-gray-400">Graduation Year</label>
                    <input
                      type="number"
                      min="1990"
                      max={new Date().getFullYear() + 10}
                      value={form.ugYear}
                      onChange={(e) => setForm((f) => ({ ...f, ugYear: e.target.value }))}
                      className="rounded-xl border border-black px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-[#F59E0B]/20"
                    />
                  </div>
               </div>
             ) : (
               <div className="grid gap-6 sm:grid-cols-2">
                 <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">College/University</span>
                    <span className="text-base font-bold text-black">{ugParts[0] || "—"}</span>
                 </div>
                 <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">Degree</span>
                    <span className="text-base font-bold text-black">{ugParts[1] || "—"}</span>
                 </div>
                 <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">Specialization</span>
                    <span className="text-base font-bold text-black">{ugParts[2] || "—"}</span>
                 </div>
                 <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">Graduation Year</span>
                    <span className="text-base font-bold text-black">{ugParts[3] || "—"}</span>
                 </div>
               </div>
             )}
          </div>

          {/* Professional Background Card */}

          <div className="rounded-[28px] border-2 border-black bg-white overflow-hidden p-6 sm:p-8" style={{ boxShadow: "4px 4px 0 0 #06B6D4" }}>
             <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#06B6D4]/10 p-2.5 rounded-xl border-2 border-transparent">
                    <Briefcase size={20} className="text-[#06B6D4]" strokeWidth={2.5} />
                </div>
                <h2 className="text-xl font-black text-black">Professional Background</h2>
             </div>
             
             {isEditing ? (
               <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                 <div className="flex flex-col gap-2">
                   <label className="text-xs font-black uppercase tracking-wider text-gray-400">Years of Exp</label>
                   <input
                     type="number"
                     min="0"
                     placeholder="e.g., 5"
                     value={form.workExpYears}
                     onChange={(e) => setForm((f) => ({ ...f, workExpYears: e.target.value }))}
                     className="rounded-xl border border-black px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-[#06B6D4]/20"
                   />
                 </div>
                 <div className="flex flex-col gap-2">
                   <label className="text-xs font-black uppercase tracking-wider text-gray-400">Company</label>
                   <input
                     placeholder="e.g., Google"
                     value={form.workExpCompany}
                     onChange={(e) => setForm((f) => ({ ...f, workExpCompany: e.target.value }))}
                     className="rounded-xl border border-black px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-[#06B6D4]/20"
                   />
                 </div>
                 <div className="flex flex-col gap-2">
                   <label className="text-xs font-black uppercase tracking-wider text-gray-400">Role</label>
                   <input
                     placeholder="e.g., Senior PM"
                     value={form.workExpRole}
                     onChange={(e) => setForm((f) => ({ ...f, workExpRole: e.target.value }))}
                     className="rounded-xl border border-black px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-[#06B6D4]/20"
                   />
                 </div>
               </div>
             ) : (
               <div className="grid gap-6 sm:grid-cols-2">
                 <div className="flex flex-col gap-1 sm:col-span-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">Years of Work Experience</span>
                    <span className="text-base font-bold text-black">{weParts[0] ? `${weParts[0]} years` : "—"}</span>
                 </div>
                 <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">Company</span>
                    <span className="text-base font-bold text-black">{weParts[1] || "—"}</span>
                 </div>
                 <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">Role</span>
                    <span className="text-base font-bold text-black">{weParts[2] || "—"}</span>
                 </div>
               </div>
             )}
          </div>

          {/* Areas of Expertise Card */}
          <div className="rounded-[28px] border-2 border-black bg-white overflow-hidden p-6 sm:p-8" style={{ boxShadow: "4px 4px 0 0 #F97316" }}>
             <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#F97316]/10 p-2.5 rounded-xl border-2 border-transparent">
                    <Award size={20} className="text-[#F97316]" strokeWidth={2.5} />
                </div>
                <h2 className="text-xl font-black text-black">Areas of Expertise</h2>
             </div>
             
             {isEditing ? (
                <div className="flex flex-wrap gap-2.5">
                  {EXPERTISE_OPTIONS.map((opt) => {
                    const sel = form.expertiseTagsArr.includes(opt);
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() =>
                          setForm((f) => ({
                            ...f,
                            expertiseTagsArr: sel
                              ? f.expertiseTagsArr.filter((t) => t !== opt)
                              : [...f.expertiseTagsArr, opt],
                          }))
                        }
                        className={`px-4 py-2 rounded-xl border-2 text-sm font-black transition-all ${
                          sel
                            ? "bg-[#F97316] text-white border-black shadow-[2px_2px_0_0_#000]"
                            : "bg-white text-gray-500 border-gray-200 hover:border-black hover:text-black"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
             ) : (
                <div className="flex flex-wrap gap-3">
                   {expertiseTags.length > 0 ? expertiseTags.map(tag => (
                       <span key={tag} className="px-4 py-2 rounded-xl border-2 border-black bg-[#F97316] text-white text-sm font-bold shadow-[2px_2px_0_0_#000]">
                           {tag}
                       </span>
                   )) : (
                       <span className="text-sm font-bold text-gray-400">—</span>
                   )}
                </div>
             )}
          </div>

          {/* About Me Card */}
          <div className="rounded-[28px] border-2 border-black bg-white overflow-hidden p-6 sm:p-8" style={{ boxShadow: "4px 4px 0 0 #10B981" }}>
             <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#10B981]/10 p-2.5 rounded-xl border-2 border-transparent">
                    <User size={20} className="text-[#10B981]" strokeWidth={2.5} />
                </div>
                <h2 className="text-xl font-black text-black">About Me</h2>
             </div>
             
             {isEditing ? (
                 <textarea
                   rows={4}
                   value={form.bio}
                   placeholder="Write something about yourself..."
                   onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
                   className="w-full rounded-xl border border-black px-4 py-3 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-[#10B981]/20"
                 />
             ) : (
                 <p className="text-sm font-medium text-gray-600 leading-relaxed whitespace-pre-wrap break-words overflow-hidden max-w-full">
                     {profile?.bio || "—"}
                 </p>
             )}
          </div>

        </div>

      </div>

    </div>
  );
}
