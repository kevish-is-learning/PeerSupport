"use client";

import { useEffect, useState, useRef } from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  FileText,
  Camera,
  Download,
  RefreshCw,
  AlertCircle,
  GraduationCap,
  Briefcase,
  Award,
  BarChart3,
  BookOpen,
  Plus,
  Trash2,
  Save,
  X,
  Loader2,
} from "lucide-react";
import useAuthStore from "../../../store/useAuthStore";
import { menteeProfileApi, resolveUploadUrl } from "../../../lib/api";
import { toast } from "sonner";

// ─── Education type options ─────────────────────────────────────────────────
const EDUCATION_TYPES = ["10th", "12th", "Graduation", "Post Graduation"];

const emptyEducation = () => ({
  type: "Graduation",
  institutionName: "",
  fromYear: "",
  toYear: "",
  score: "",
});

// ─── Section Card Component ─────────────────────────────────────────────────
function SectionCard({ title, icon: Icon, shadowColor, children }) {
  return (
    <div
      className="relative rounded-2xl border-2 border-black bg-white overflow-hidden"
      style={{ boxShadow: `6px 6px 0px 0px ${shadowColor}` }}
    >
      <div className="flex items-center gap-3 border-b-2 border-black bg-[#F8EBE6] px-6 py-4 rounded-t-[14px]">
        <Icon className="h-5 w-5 text-gray-900" strokeWidth={2.5} />
        <h3 className="text-base font-extrabold text-gray-900 uppercase tracking-wide">
          {title}
        </h3>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

// ─── Field Row Component ────────────────────────────────────────────────────
function FieldGroup({ label, required, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-bold text-gray-500 uppercase tracking-wider">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border-2 border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-900 transition-all focus:border-[#8B5CF6] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20 placeholder:text-gray-400";
const inputDisabledClass =
  "w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-500 cursor-not-allowed focus:outline-none";
const selectClass =
  "w-full rounded-xl border-2 border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-900 bg-white transition-all focus:border-[#8B5CF6] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20 appearance-none";

export default function MenteeProfileSettingsPage() {
  const { user, fetchCurrentUser } = useAuthStore();
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    dateOfBirth: "",
    contactNumber: "",
    education: [],
    workExperience: "",
    certifications: "",
    catHistory: { LRDI: "", VARC: "", Quants: "" },
    otherMbaScore: "",
  });

  const [resumeFile, setResumeFile] = useState(null);
  const resumeInputRef = useRef(null);

  // ─── Fetch Profile ──────────────────────────────────────────────────────
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const res = await menteeProfileApi.getMine();
        const p = res.data?.profile;
        if (p) {
          setProfileData(p);
          setForm({
            name: p.name || user?.name || "",
            email: p.email || user?.email || "",
            dateOfBirth: p.dateOfBirth
              ? p.dateOfBirth.split("T")[0]
              : "",
            contactNumber: p.contactNumber || "",
            education: (p.education || []).map((e) => ({
              type: e.type || "Graduation",
              institutionName: e.institutionName || "",
              fromYear: e.fromYear?.toString() || "",
              toYear: e.toYear?.toString() || "",
              score: e.score?.toString() || "",
            })),
            workExperience: p.workExperience || "",
            certifications: p.certifications || "",
            catHistory: {
              LRDI: p.catHistory?.LRDI?.toString() || "",
              VARC: p.catHistory?.VARC?.toString() || "",
              Quants: p.catHistory?.Quants?.toString() || "",
            },
            otherMbaScore: p.otherMbaScore?.toString() || "",
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

  // ─── Education helpers ──────────────────────────────────────────────────
  const addEducation = () => {
    setForm((prev) => ({
      ...prev,
      education: [...prev.education, emptyEducation()],
    }));
  };

  const updateEducation = (index, field, value) => {
    const updated = [...form.education];
    updated[index] = { ...updated[index], [field]: value };
    setForm((prev) => ({ ...prev, education: updated }));
  };

  const removeEducation = (index) => {
    setForm((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  // ─── Reset form ─────────────────────────────────────────────────────────
  const handleCancel = () => {
    if (!profileData) return;
    setForm({
      name: profileData.name || user?.name || "",
      email: profileData.email || user?.email || "",
      dateOfBirth: profileData.dateOfBirth
        ? profileData.dateOfBirth.split("T")[0]
        : "",
      contactNumber: profileData.contactNumber || "",
      education: (profileData.education || []).map((e) => ({
        type: e.type || "Graduation",
        institutionName: e.institutionName || "",
        fromYear: e.fromYear?.toString() || "",
        toYear: e.toYear?.toString() || "",
        score: e.score?.toString() || "",
      })),
      workExperience: profileData.workExperience || "",
      certifications: profileData.certifications || "",
      catHistory: {
        LRDI: profileData.catHistory?.LRDI?.toString() || "",
        VARC: profileData.catHistory?.VARC?.toString() || "",
        Quants: profileData.catHistory?.Quants?.toString() || "",
      },
      otherMbaScore: profileData.otherMbaScore?.toString() || "",
    });
    setResumeFile(null);
  };

  // ─── Save handler ───────────────────────────────────────────────────────
  const handleSave = async () => {
    // Validation
    if (!form.name?.trim()) {
      toast.error("Please enter your full name.");
      return;
    }

    const cleanNumber = form.contactNumber
      ?.replace(/^\+91\s*/, "")
      .replace(/\D/g, "");
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
      if (
        !edu.institutionName?.trim() ||
        !edu.fromYear ||
        !edu.toYear ||
        !edu.score
      ) {
        toast.error(
          `Please fill all required fields in Education #${i + 1}.`
        );
        return;
      }
      if (Number(edu.fromYear) > Number(edu.toYear)) {
        toast.error(
          `From Year cannot be greater than To Year in Education #${i + 1}.`
        );
        return;
      }
    }

    try {
      setIsSaving(true);
      const formData = new FormData();
      formData.append("name", form.name.trim());
      formData.append(
        "dateOfBirth",
        new Date(form.dateOfBirth).toISOString()
      );
      formData.append("contactNumber", `+91 ${cleanNumber}`);

      const parsedEdu = form.education.map((e) => ({
        type: e.type,
        institutionName: e.institutionName,
        fromYear: Number(e.fromYear),
        toYear: Number(e.toYear),
        score: Number(e.score),
      }));
      formData.append("education", JSON.stringify(parsedEdu));

      if (form.workExperience)
        formData.append("workExperience", form.workExperience);
      if (form.certifications)
        formData.append("certifications", form.certifications);

      const catHist = {
        LRDI: form.catHistory.LRDI
          ? Number(form.catHistory.LRDI)
          : undefined,
        VARC: form.catHistory.VARC
          ? Number(form.catHistory.VARC)
          : undefined,
        Quants: form.catHistory.Quants
          ? Number(form.catHistory.Quants)
          : undefined,
      };
      if (catHist.LRDI || catHist.VARC || catHist.Quants) {
        formData.append("catHistory", JSON.stringify(catHist));
      }

      if (form.otherMbaScore)
        formData.append("otherMbaScore", form.otherMbaScore);

      if (resumeFile) formData.append("resume", resumeFile);

      await menteeProfileApi.update(formData);
      toast.success("Profile updated successfully!");
      fetchCurrentUser();

      // Refresh profile data
      const res = await menteeProfileApi.getMine();
      const p = res.data?.profile;
      setProfileData(p);
      setResumeFile(null);
    } catch (err) {
      toast.error(
        err?.response?.data?.message || err?.message || "Failed to update profile"
      );
    } finally {
      setIsSaving(false);
    }
  };

  // ─── Loading Skeleton ───────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-5xl pb-10">
        <div className="mb-8 animate-pulse">
          <div className="h-8 w-48 rounded-lg bg-gray-200 mb-2" />
          <div className="h-4 w-56 rounded bg-gray-200" />
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <div className="space-y-6 animate-pulse">
            <div
              className="rounded-2xl border-2 border-gray-200 bg-white p-6"
              style={{ boxShadow: "6px 6px 0px 0px #E5E7EB" }}
            >
              <div className="h-5 w-32 rounded bg-gray-200 mb-4" />
              <div className="flex flex-col items-center">
                <div className="relative mb-4 h-28 w-28">
                  <div className="h-full w-full rounded-2xl bg-gray-200" />
                </div>
                <div className="h-3 w-40 rounded bg-gray-200" />
              </div>
            </div>

            <div
              className="rounded-2xl border-2 border-gray-200 bg-white p-6"
              style={{ boxShadow: "6px 6px 0px 0px #E5E7EB" }}
            >
              <div className="h-5 w-20 rounded bg-gray-200 mb-4" />
              <div className="rounded-xl border border-gray-100 p-4">
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-gray-200 shrink-0" />
                  <div className="flex-1">
                    <div className="h-4 w-32 rounded bg-gray-200 mb-1" />
                    <div className="h-3 w-24 rounded bg-gray-200" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="h-9 flex-1 rounded-lg bg-gray-200" />
                  <div className="h-9 flex-1 rounded-lg bg-gray-200" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl border-2 border-gray-200 bg-white overflow-hidden"
                style={{ boxShadow: "6px 6px 0px 0px #E5E7EB" }}
              >
                <div className="flex items-center gap-3 border-b-2 border-gray-200 px-6 py-4">
                  <div className="h-5 w-5 rounded-full bg-gray-200" />
                  <div className="h-5 w-40 rounded bg-gray-200" />
                </div>
                <div className="p-6 space-y-4">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <div key={j}>
                      <div className="h-3 w-24 rounded bg-gray-200 mb-2" />
                      <div className="h-10 w-full rounded-xl bg-gray-100" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ─── Error State ────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="flex h-64 flex-col items-center justify-center text-center">
        <AlertCircle className="mb-2 h-8 w-8 text-red-500" />
        <p className="font-bold text-red-500">{error}</p>
      </div>
    );
  }

  // ─── Main Render ────────────────────────────────────────────────────────
  return (
    <div className="mx-auto w-full max-w-5xl pb-10">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">
          Profile Settings
        </h1>
        <p className="mt-1 text-sm font-medium text-gray-500">
          Manage your account and preferences
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        {/* ═══════════ LEFT SIDEBAR ═══════════ */}
        <div className="space-y-6">
          {/* ── Profile Picture Card ── */}
          <div className="relative rounded-2xl border-2 border-black bg-white p-6 shadow-[6px_6px_0px_0px_#8B5CF6]">
            <h3 className="mb-4 text-base font-extrabold text-gray-900">
              Profile Picture
            </h3>
            <div className="flex flex-col items-center">
              <div className="relative mb-4 h-28 w-28">
                <div className="h-full w-full overflow-hidden rounded-2xl border-2 border-black bg-gray-100">
                  {user?.profilePicture ? (
                    <img
                      src={resolveUploadUrl(user.profilePicture)}
                      alt={form.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#F3E8FF] text-4xl font-black text-[#8B5CF6]">
                      {form.name?.charAt(0)?.toUpperCase() || "M"}
                    </div>
                  )}
                </div>
                <button
                  className="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-xl border-2 border-black bg-[#8B5CF6] text-white shadow-[2px_2px_0px_0px_#1E1E1E] transition-transform active:translate-y-0.5 active:shadow-[0px_0px_0px_0px_#1E1E1E]"
                  onClick={() =>
                    toast.info("Profile picture upload coming soon")
                  }
                >
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <p className="text-center text-xs font-medium text-gray-500">
                Click the camera icon to upload a new photo
              </p>
            </div>
          </div>

          {/* ── Resume Card ── */}
          <div className="relative rounded-2xl border-2 border-black bg-white p-6 shadow-[6px_6px_0px_0px_#06B6D4]">
            <h3 className="mb-4 text-base font-extrabold text-gray-900">
              Resume
            </h3>
            <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-4">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F3E8FF] text-[#8B5CF6]">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-gray-900">
                    {resumeFile
                      ? resumeFile.name
                      : profileData?.resumeUrl
                      ? profileData.resumeUrl.split("/").pop()
                      : "No resume uploaded"}
                  </p>
                  <p className="text-xs font-medium text-gray-500">
                    {resumeFile
                      ? "Ready to upload"
                      : profileData?.resumeUrl
                      ? "Uploaded resume"
                      : "PDF, DOC, DOCX"}
                  </p>
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
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border-2 border-black bg-white py-2 text-xs font-bold text-gray-900 shadow-[2px_2px_0px_0px_#1E1E1E] transition-transform active:translate-y-0.5 active:shadow-[0px_0px_0px_0px_#1E1E1E] disabled:opacity-50"
                  onClick={() => {
                    if (profileData?.resumeUrl) {
                      window.open(
                        resolveUploadUrl(profileData.resumeUrl),
                        "_blank"
                      );
                    } else {
                      toast.error("No resume available to download");
                    }
                  }}
                  disabled={!profileData?.resumeUrl && !resumeFile}
                >
                  <Download className="h-3.5 w-3.5" /> Download
                </button>
                <button
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border-2 border-black bg-[#06B6D4] py-2 text-xs font-bold text-white shadow-[2px_2px_0px_0px_#1E1E1E] transition-transform hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#1E1E1E] active:translate-y-0 active:shadow-[0px_0px_0px_0px_#1E1E1E]"
                  onClick={() => resumeInputRef.current?.click()}
                >
                  <RefreshCw className="h-3.5 w-3.5" /> Replace
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════ RIGHT CONTENT ═══════════ */}
        <div className="space-y-6">
          {/* ── Personal Information ── */}
          <SectionCard
            title="Personal Information"
            icon={User}
            shadowColor="#8B5CF6"
          >
            <div className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <FieldGroup label="Full Name" required>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    placeholder="Enter your full name"
                    className={inputClass}
                  />
                </FieldGroup>

                <FieldGroup label="Date of Birth" required>
                  <input
                    type="date"
                    value={form.dateOfBirth}
                    onChange={(e) =>
                      setForm({ ...form, dateOfBirth: e.target.value })
                    }
                    className={inputClass}
                  />
                </FieldGroup>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <FieldGroup label="Phone Number" required>
                  <div className="relative flex items-center">
                    <div className="absolute left-0 flex items-center pl-3.5 pointer-events-none">
                      <Phone className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-sm font-bold text-gray-500">
                        +91
                      </span>
                    </div>
                    <input
                      type="tel"
                      maxLength="10"
                      value={form.contactNumber.replace(/^\+91\s*/, "")}
                      onChange={(e) => {
                        const digits = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 10);
                        setForm({
                          ...form,
                          contactNumber: `+91 ${digits}`,
                        });
                      }}
                      placeholder="9876543210"
                      className={`${inputClass} pl-[4.5rem]`}
                    />
                  </div>
                </FieldGroup>

                <FieldGroup label="Email Address">
                  <div className="relative flex items-center">
                    <div className="absolute left-0 flex items-center pl-3.5 pointer-events-none">
                      <Mail className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={form.email}
                      disabled
                      className={`${inputDisabledClass} pl-10`}
                    />
                  </div>
                </FieldGroup>
              </div>
            </div>
          </SectionCard>

          {/* ── Education Details ── */}
          <SectionCard
            title="Education Details"
            icon={GraduationCap}
            shadowColor="#FABE28"
          >
            <div className="space-y-5">
              {form.education.map((edu, idx) => (
                <div
                  key={idx}
                  className="relative rounded-xl border-2 border-gray-200 bg-gray-50/60 p-5 space-y-4 transition-all hover:border-gray-300"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-gray-500 uppercase tracking-wider">
                      Education #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeEducation(idx)}
                      className="flex items-center gap-1 text-xs font-bold text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Remove
                    </button>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FieldGroup label="Degree Type" required>
                      <select
                        value={edu.type}
                        onChange={(e) =>
                          updateEducation(idx, "type", e.target.value)
                        }
                        className={selectClass}
                      >
                        {EDUCATION_TYPES.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </FieldGroup>

                    <FieldGroup label="Institution Name" required>
                      <input
                        type="text"
                        placeholder="e.g. Delhi University"
                        value={edu.institutionName}
                        onChange={(e) =>
                          updateEducation(
                            idx,
                            "institutionName",
                            e.target.value
                          )
                        }
                        className={inputClass}
                      />
                    </FieldGroup>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <FieldGroup label="From Year" required>
                      <input
                        type="number"
                        placeholder="2018"
                        value={edu.fromYear}
                        onChange={(e) =>
                          updateEducation(idx, "fromYear", e.target.value)
                        }
                        className={inputClass}
                      />
                    </FieldGroup>

                    <FieldGroup label="To Year" required>
                      <input
                        type="number"
                        placeholder="2022"
                        value={edu.toYear}
                        onChange={(e) =>
                          updateEducation(idx, "toYear", e.target.value)
                        }
                        className={inputClass}
                      />
                    </FieldGroup>

                    <FieldGroup label="Score" required>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="8.5 CGPA"
                        value={edu.score}
                        onChange={(e) =>
                          updateEducation(idx, "score", e.target.value)
                        }
                        className={inputClass}
                      />
                    </FieldGroup>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addEducation}
                className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 bg-white py-3 text-sm font-bold text-gray-500 transition-all hover:border-black hover:text-black hover:bg-gray-50"
              >
                <Plus className="h-4 w-4" />
                Add Education
              </button>
            </div>
          </SectionCard>

          {/* ── Work Experience Details ── */}
          <SectionCard
            title="Work Experience Details"
            icon={Briefcase}
            shadowColor="#F08B4D"
          >
            <FieldGroup label="Work Experience">
              <input
                type="text"
                value={form.workExperience}
                onChange={(e) =>
                  setForm({ ...form, workExperience: e.target.value })
                }
                placeholder="e.g. 2 years in Marketing at Accenture"
                className={inputClass}
              />
            </FieldGroup>
          </SectionCard>

          {/* ── Certifications ── */}
          <SectionCard
            title="Certifications"
            icon={Award}
            shadowColor="#EC4899"
          >
            <FieldGroup label="Certifications">
              <textarea
                value={form.certifications}
                onChange={(e) =>
                  setForm({ ...form, certifications: e.target.value })
                }
                placeholder="List your significant certifications (e.g. Google Analytics Certification from Google, 2025)"
                rows={3}
                className={`${inputClass} resize-none`}
              />
            </FieldGroup>
          </SectionCard>

          {/* ── CAT Score (Percentile) ── */}
          <SectionCard
            title="CAT Score (Percentile)"
            icon={BarChart3}
            shadowColor="#5B6EF5"
          >
            <div className="grid gap-5 sm:grid-cols-3">
              <FieldGroup label="LRDI">
                <input
                  type="number"
                  step="0.01"
                  value={form.catHistory.LRDI}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      catHistory: {
                        ...form.catHistory,
                        LRDI: e.target.value,
                      },
                    })
                  }
                  placeholder="Percentile"
                  className={inputClass}
                />
              </FieldGroup>

              <FieldGroup label="VARC">
                <input
                  type="number"
                  step="0.01"
                  value={form.catHistory.VARC}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      catHistory: {
                        ...form.catHistory,
                        VARC: e.target.value,
                      },
                    })
                  }
                  placeholder="Percentile"
                  className={inputClass}
                />
              </FieldGroup>

              <FieldGroup label="Quants">
                <input
                  type="number"
                  step="0.01"
                  value={form.catHistory.Quants}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      catHistory: {
                        ...form.catHistory,
                        Quants: e.target.value,
                      },
                    })
                  }
                  placeholder="Percentile"
                  className={inputClass}
                />
              </FieldGroup>
            </div>
          </SectionCard>

          {/* ── Other MBA Test Score ── */}
          <SectionCard
            title="Other MBA Test Score"
            icon={BookOpen}
            shadowColor="#06B6D4"
          >
            <FieldGroup label="Cumulative Percentile">
              <input
                type="number"
                step="0.01"
                value={form.otherMbaScore}
                onChange={(e) =>
                  setForm({ ...form, otherMbaScore: e.target.value })
                }
                placeholder="e.g. GMAT: 720"
                className={inputClass}
              />
            </FieldGroup>
          </SectionCard>

          {/* ── Action Buttons ── */}
          <div className="flex justify-end gap-4 pt-2 pb-4">
            <button
              className="flex items-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-6 py-2.5 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-50 hover:border-gray-300"
              onClick={handleCancel}
            >
              <X className="h-4 w-4" />
              Cancel
            </button>
            <button
              className="flex items-center gap-2 rounded-xl border-2 border-black bg-[#8B5CF6] px-8 py-2.5 text-sm font-bold text-white shadow-[3px_3px_0px_0px_#1E1E1E] transition-all hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_#1E1E1E] active:translate-y-0 active:shadow-[0px_0px_0px_0px_#1E1E1E] disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-[3px_3px_0px_0px_#1E1E1E]"
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
