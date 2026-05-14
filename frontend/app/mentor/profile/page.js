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
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "../../../store/useAuthStore";
import { mentorProfileApi, authApi, resolveUploadUrl } from "../../../lib/api";
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
    bSchoolYear: "",
    expertiseTagsArr: [],
    bio: "",
    workExpYears: "",
    workExpCompany: "",
    workExpRole: "",
  });

  const loadProfile = async () => {
    try {
      const res = await mentorProfileApi.getMine();
      const p = res.data?.profile;
      if (p) {
        setProfile(p);
        const pg = (p.pgProfile || "").split("|");
        const we = (p.workExperience || "").split("|");
        setForm({
          fullName: p.name || "",
          contactNumber: p.contactNumber || "",
          bSchool: pg[0] || "",
          bSchoolYear: pg[2] || "",
          expertiseTagsArr: p.expertiseTags || [],
          bio: p.bio || "",
          workExpYears: we[0] || "",
          workExpCompany: we[1] || "",
          workExpRole: we[2] || "",
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
    const pg = (profile.pgProfile || "").split("|");
    const we = (profile.workExperience || "").split("|");
    setForm({
      fullName: profile.name || "",
      contactNumber: profile.contactNumber || "",
      bSchool: pg[0] || "",
      bSchoolYear: pg[2] || "",
      expertiseTagsArr: profile.expertiseTags || [],
      bio: profile.bio || "",
      workExpYears: we[0] || "",
      workExpCompany: we[1] || "",
      workExpRole: we[2] || "",
    });
    setIsEditing(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (form.fullName && form.fullName !== profile?.name) {
        try {
          await authApi.updateProfile({ name: form.fullName });
        } catch (_) {}
      }
      const pgParts = profile?.pgProfile?.split("|") || ["", "", ""];
      const newPgProfile = `${form.bSchool}|${pgParts[1] || ""}|${form.bSchoolYear}`;
      const newWorkExperience = `${form.workExpYears}|${form.workExpCompany}|${form.workExpRole}`;
      const res = await mentorProfileApi.update({
        contactNumber: form.contactNumber,
        bio: form.bio,
        expertiseTags: form.expertiseTagsArr,
        pgProfile: newPgProfile,
        workExperience: newWorkExperience,
      });
      const updated = { ...res.data?.profile, name: form.fullName };
      setProfile(updated);
      toast.success("Profile saved!");
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
  const pgParts = (profile?.pgProfile || "").split("|");
  const schoolName = pgParts[0] || "";
  const batchYear = pgParts[2] || "";
  const weParts = (profile?.workExperience || "").split("|");
  const workExpDisplay = (() => {
    const yrs = weParts[0] ? `${weParts[0]} years` : "";
    const company = weParts[1] ? ` at ${weParts[1]}` : "";
    const role = weParts[2] ? ` as ${weParts[2]}` : "";
    return `${yrs}${company}${role}`;
  })();

  if (isLoading) {
    return (
      <div className="w-full h-full overflow-y-auto bg-[#FAF9F6] p-8 lg:p-12">
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
            <div className="rounded-[28px] border-2 border-gray-200 bg-white overflow-hidden" style={{ boxShadow: "6px 6px 0 0 #E5E7EB" }}>
              <div className="flex items-center justify-between px-8 py-6 border-b-[3px] border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
                  <div className="h-6 w-48 bg-gray-200 rounded"></div>
                </div>
                <div className="h-10 w-32 bg-gray-200 rounded-xl"></div>
              </div>
              <div className="p-8 flex flex-col gap-7">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
                    <div>
                      <div className="h-4 w-32 bg-gray-200 rounded mb-1"></div>
                      <div className="h-3 w-24 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-y-auto bg-[#FAF9F6] p-8 lg:p-12">
      <div className="flex flex-col lg:flex-row gap-8 items-start max-w-6xl mx-auto">

        {/* ── LEFT: Profile Preview Card ── */}
        <div className="w-full lg:w-[340px] shrink-0">
          <div
            className="rounded-[28px] border-2 border-black bg-white p-4 flex flex-col items-center text-center"
            style={{ boxShadow: "6px 6px 0 0 #5061E4" }}
          >
            {/* Photo */}
            <div className="relative mb-5">
              <div className="h-40 w-40 overflow-hidden rounded-[20px] border-2 border-black bg-gray-100">
                <img
                  src={
                    profile?.profilePhotoUrl
                      ? resolveUploadUrl(profile.profilePhotoUrl)
                      : "https://i.pravatar.cc/150?img=11"
                  }
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>
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
            </div>

            {/* Name & School */}
            <h2 className="text-2xl font-black text-black leading-tight">{displayName}</h2>
            {(schoolName || batchYear) && (
              <p className="text-sm font-semibold text-gray-500 mt-1">
                {schoolName}{batchYear ? ` • ${batchYear}` : ""}
              </p>
            )}



            {/* Expertise chips */}
            {(profile?.expertiseTags || []).length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {(profile.expertiseTags || []).slice(0, 2).map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-black px-4 py-1 text-[11px] font-bold text-black"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            {/* Bio */}
            <p className="text-sm text-gray-500 font-medium leading-relaxed mt-5 mb-2">
              {profile?.bio || "No bio added yet. Edit your profile to add a short bio."}
            </p>

            {/* Work Exp */}
            {workExpDisplay && (
              <p className="text-xs font-bold text-gray-400 mb-6">{workExpDisplay}</p>
            )}

            {/* Preview button */}
            <button className="mt-4 w-full rounded-2xl border-2 border-black bg-[#5061E4] py-4 text-base font-black text-white shadow-[2px_2px_0_0_#000] hover:opacity-90 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all">
              Preview Full Profile
            </button>
          </div>
        </div>

        {/* ── RIGHT: Personal Information Card ── */}
        <div className="flex-1 w-full min-w-0">
          <div
            className="rounded-[28px] border-2 border-black bg-white overflow-hidden"
            style={{ boxShadow: "6px 6px 0 0 #F59E0B" }}
          >
            {/* Card Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b-2 border-black">
              <div className="flex items-center gap-3">
                <User size={22} strokeWidth={2.5} />
                <h2 className="text-xl font-black text-black">Personal Information</h2>
              </div>
              {isEditing ? (
                <div className="flex gap-3">
                  <button
                    onClick={handleCancel}
                    disabled={saving}
                    className="flex items-center gap-2 rounded-xl border-2 border-black bg-white px-4 py-2 text-sm font-black hover:bg-gray-50 disabled:opacity-50 transition-all"
                  >
                    <X size={14} /> Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 rounded-xl border-2 border-black bg-[#F59E0B] px-5 py-2 text-sm font-black hover:opacity-90 disabled:opacity-50 shadow-[2px_2px_0_0_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
                  >
                    {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                    Save Changes
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 rounded-xl border-2 border-black bg-[#5061E4] px-5 py-2.5 text-sm font-black text-white hover:opacity-90 shadow-[2px_2px_0_0_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
                >
                  Edit Profile <Edit2 size={15} />
                </button>
              )}
            </div>

            {/* Card Body */}
            <div className="p-8">
              {isEditing ? (
                /* ── EDIT FORM ── */
                <div className="grid gap-6 sm:grid-cols-2">
                  {/* Full Name */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-black uppercase tracking-wider text-gray-400">Full Name</label>
                    <input
                      value={form.fullName}
                      onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
                      className="rounded-xl border border-black px-4 py-3 text-base focus:outline-none focus:ring-4 focus:ring-[#5061E4]/20"
                    />
                  </div>
                  {/* Phone */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-black uppercase tracking-wider text-gray-400">Phone Number</label>
                    <input
                      value={form.contactNumber}
                      onChange={(e) => setForm((f) => ({ ...f, contactNumber: e.target.value }))}
                      className="rounded-xl border border-black px-4 py-3 text-base focus:outline-none focus:ring-4 focus:ring-[#5061E4]/20"
                    />
                  </div>
                  {/* B-School */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-black uppercase tracking-wider text-gray-400">B-School</label>
                    <select
                      value={form.bSchool}
                      onChange={(e) => setForm((f) => ({ ...f, bSchool: e.target.value }))}
                      className="rounded-xl border border-black px-4 py-3 text-base focus:outline-none focus:ring-4 focus:ring-[#5061E4]/20"
                    >
                      <option value="">Select B-School</option>
                      {IIM_SCHOOLS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  {/* Batch Year */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-black uppercase tracking-wider text-gray-400">Batch Year</label>
                    <input
                      type="number"
                      min="1990"
                      max="2040"
                      value={form.bSchoolYear}
                      onChange={(e) => setForm((f) => ({ ...f, bSchoolYear: e.target.value }))}
                      className="rounded-xl border border-black px-4 py-3 text-base focus:outline-none focus:ring-4 focus:ring-[#5061E4]/20"
                    />
                  </div>
                  {/* Work Experience */}
                  <div className="flex flex-col gap-2 sm:col-span-2">
                    <label className="text-xs font-black uppercase tracking-wider text-gray-400">Work Experience</label>
                    <div className="grid grid-cols-3 gap-3">
                      <input
                        type="number"
                        min="0"
                        placeholder="Years"
                        value={form.workExpYears}
                        onChange={(e) => setForm((f) => ({ ...f, workExpYears: e.target.value }))}
                        className="rounded-xl border border-black px-4 py-3 text-base focus:outline-none"
                      />
                      <input
                        placeholder="Company"
                        value={form.workExpCompany}
                        onChange={(e) => setForm((f) => ({ ...f, workExpCompany: e.target.value }))}
                        className="rounded-xl border border-black px-4 py-3 text-base focus:outline-none"
                      />
                      <input
                        placeholder="Role"
                        value={form.workExpRole}
                        onChange={(e) => setForm((f) => ({ ...f, workExpRole: e.target.value }))}
                        className="rounded-xl border border-black px-4 py-3 text-base focus:outline-none"
                      />
                    </div>
                  </div>
                  {/* Bio */}
                  <div className="flex flex-col gap-2 sm:col-span-2">
                    <label className="text-xs font-black uppercase tracking-wider text-gray-400">About / Bio</label>
                    <textarea
                      rows={4}
                      value={form.bio}
                      onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
                      className="rounded-xl border border-black px-4 py-3 text-base focus:outline-none focus:ring-4 focus:ring-[#5061E4]/20"
                    />
                  </div>
                  {/* Expertise */}
                  <div className="flex flex-col gap-3 sm:col-span-2">
                    <label className="text-xs font-black uppercase tracking-wider text-gray-400">Expertise Areas</label>
                    <div className="flex flex-wrap gap-2">
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
                            className={`px-3 py-1.5 rounded-full border border-black text-xs font-black transition-all ${
                              sel
                                ? "bg-[#5061E4] text-white border-black shadow-[2px_2px_0_0_#000]"
                                : "bg-white text-gray-500 border-gray-200 hover:border-black"
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                /* ── READ-ONLY VIEW ── */
                <div className="flex flex-col gap-7">
                  {/* Name */}
                  <InfoRow
                    icon={<User size={20} className="text-gray-500" />}
                    label={displayName}
                  />
                  {/* Email */}
                  {user?.email && (
                    <InfoRow
                      icon={<Mail size={20} className="text-gray-500" />}
                      label={user.email}
                    />
                  )}
                  {/* Phone */}
                  {profile?.contactNumber && (
                    <InfoRow
                      icon={<Phone size={20} className="text-gray-500" />}
                      label={`+91 ${profile.contactNumber}`}
                    />
                  )}
                  {/* Education */}
                  {schoolName && (
                    <InfoRow
                      icon={<GraduationCap size={20} className="text-gray-500" />}
                      label={schoolName}
                      sub={batchYear ? `Batch of ${batchYear}` : undefined}
                    />
                  )}
                  {/* Work Experience */}
                  {workExpDisplay && (
                    <InfoRow
                      icon={<Briefcase size={20} className="text-gray-500" />}
                      label={weParts[2] || "Work Experience"}
                      sub={workExpDisplay}
                    />
                  )}
                  {/* About */}
                  {profile?.bio && (
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 mt-0.5">
                        <User size={20} className="text-gray-500" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-black mb-1">About</p>
                        <p className="text-sm text-gray-500 leading-relaxed whitespace-pre-wrap">
                          {profile.bio}
                        </p>
                      </div>
                    </div>
                  )}
                  {/* Expertise */}
                  {profile?.expertiseTags && profile.expertiseTags.length > 0 && (
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 mt-0.5">
                        <Award size={20} className="text-gray-500" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-black mb-1">Expertise Areas</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {profile.expertiseTags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1.5 rounded-full border border-gray-200 bg-white text-xs font-black text-gray-600"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  {/* Empty state */}
                  {!user?.email && !profile?.contactNumber && !schoolName && !workExpDisplay && !profile?.bio && (!profile?.expertiseTags || profile.expertiseTags.length === 0) && (
                    <div className="text-center py-10 text-gray-400">
                      <User size={40} className="mx-auto mb-3 opacity-30" />
                      <p className="font-bold">No information added yet.</p>
                      <p className="text-sm mt-1">Click "Edit Profile" to fill in your details.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

function InfoRow({ icon, label, sub }) {
  return (
    <div className="flex items-center gap-4">
      <div className="shrink-0">{icon}</div>
      <div>
        <p className="text-sm font-bold text-black leading-tight">{label}</p>
        {sub && <p className="text-xs text-gray-500 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}
