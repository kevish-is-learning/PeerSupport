"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import useAuthStore from "../../store/useAuthStore";
import {
  authApi,
  menteeProfileApi,
  mentorProfileApi,
  resolveUploadUrl,
} from "../../lib/api";
import MentorOnboardingWizard from "../../components/mentor/MentorOnboardingWizard";

const emptyMenteeForm = {
  dateOfBirth: "",
  contactNumber: "",
  education10: "",
  education12: "",
  bachelors: "",
  masters: "",
  otherMbaScore: "",
  workExperience: "",
  certifications: "",
  skillsets: "",
  catHistory: "",
  resumeUrl: "",
};

const emptyMentorForm = {
  linkedInUrl: "",
  contactNumber: "",
  bio: "",
  expertiseTags: "",
  ugCollegeProfile: "",
  pgProfile: "",
  workExperience: "",
  certifications: "",
  profilePhotoUrl: "",
  collegeDocumentUrl: "",
  isVerified: false,
};

const emptyMentorFiles = {
  profilePhoto: null,
  collegeDocument: null,
};

const mapMenteeProfileToForm = (profile) => ({
  dateOfBirth: profile?.dateOfBirth || "",
  contactNumber: profile?.contactNumber || "",
  education10: profile?.education10 || "",
  education12: profile?.education12 || "",
  bachelors: profile?.bachelors || "",
  masters: profile?.masters || "",
  otherMbaScore:
    typeof profile?.otherMbaScore === "number" ? String(profile.otherMbaScore) : "",
  workExperience: profile?.workExperience || "",
  certifications: profile?.certifications || "",
  skillsets: profile?.skillsets?.join(", ") || "",
  catHistory: profile?.catHistory || "",
  resumeUrl: profile?.resumeUrl || "",
});

const mapMentorProfileToForm = (profile) => ({
  linkedInUrl: profile?.linkedInUrl || "",
  contactNumber: profile?.contactNumber || "",
  bio: profile?.bio || "",
  expertiseTags: profile?.expertiseTags?.join(", ") || "",
  ugCollegeProfile: profile?.ugCollegeProfile || "",
  pgProfile: profile?.pgProfile || "",
  workExperience: profile?.workExperience || "",
  certifications: profile?.certifications || "",
  profilePhotoUrl: profile?.profilePhotoUrl || "",
  collegeDocumentUrl: profile?.collegeDocumentUrl || "",
  isVerified: Boolean(profile?.isVerified),
});

const buildMenteeFormData = (form, resumeFile) => {
  const formData = new FormData();

  formData.append("dateOfBirth", form.dateOfBirth);
  formData.append("contactNumber", form.contactNumber);
  formData.append("education10", form.education10);
  formData.append("education12", form.education12);
  formData.append("bachelors", form.bachelors);
  formData.append("masters", form.masters);
  formData.append("otherMbaScore", form.otherMbaScore);
  formData.append("workExperience", form.workExperience);
  formData.append("certifications", form.certifications);
  formData.append(
    "skillsets",
    JSON.stringify(
      form.skillsets
        .split(/[,\n]/)
        .map((item) => item.trim())
        .filter(Boolean)
    )
  );
  formData.append("catHistory", form.catHistory);

  if (resumeFile) {
    formData.append("resume", resumeFile);
  }

  return formData;
};

const buildMentorFormData = (form, files) => {
  const formData = new FormData();

  formData.append("linkedInUrl", form.linkedInUrl);
  formData.append("contactNumber", form.contactNumber);
  formData.append("bio", form.bio);
  formData.append(
    "expertiseTags",
    JSON.stringify(
      form.expertiseTags
        .split(/[,\n]/)
        .map((item) => item.trim())
        .filter(Boolean)
    )
  );
  formData.append("ugCollegeProfile", form.ugCollegeProfile);
  formData.append("pgProfile", form.pgProfile);
  formData.append("workExperience", form.workExperience);
  formData.append("certifications", form.certifications);

  if (files.profilePhoto) {
    formData.append("profilePhoto", files.profilePhoto);
  }

  if (files.collegeDocument) {
    formData.append("collegeDocument", files.collegeDocument);
  }

  return formData;
};

const roleCardBaseClass = "rounded-2xl border-2 p-4 text-left transition-all sm:p-5";

export default function OnboardingPage() {
  const router = useRouter();
  const { user, isLoading, hasCheckedSession, fetchCurrentUser } = useAuthStore();

  const [selectedRole, setSelectedRole] = useState(null);
  const [menteeForm, setMenteeForm] = useState(emptyMenteeForm);
  const [mentorForm, setMentorForm] = useState(emptyMentorForm);
  const [mentorFiles, setMentorFiles] = useState(emptyMentorFiles);
  const [menteeResumeFile, setMenteeResumeFile] = useState(null);

  const [menteeProfileExists, setMenteeProfileExists] = useState(false);
  const [mentorProfileExists, setMentorProfileExists] = useState(false);
  const [mentorApprovalStatus, setMentorApprovalStatus] = useState(null);

  const [isSelectingRole, setIsSelectingRole] = useState(false);
  const [isFetchingProfile, setIsFetchingProfile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!hasCheckedSession) {
      fetchCurrentUser();
    }
  }, [hasCheckedSession, fetchCurrentUser]);

  useEffect(() => {
    const loadProfile = async () => {
      if (!hasCheckedSession || !user) {
        return;
      }

      if (user.role === "ADMIN") {
        router.replace("/admin/dashboard");
        return;
      }

      if (user.onboardingCompleted) {
        if (user.role === "MENTEE") {
          router.replace("/mentee/profile");
        } else if (user.role === "MENTOR") {
          router.replace("/mentor/profile");
        } else {
          router.replace("/auth?mode=login");
        }
        return;
      }

      if (!user.isRoleSelected) {
        setSelectedRole(null);
        setMenteeProfileExists(false);
        setMentorProfileExists(false);
        setMenteeForm(emptyMenteeForm);
        setMentorForm(emptyMentorForm);
        setMenteeResumeFile(null);
        setMentorFiles(emptyMentorFiles);
        return;
      }

      setSelectedRole(user.role);
      setIsFetchingProfile(true);
      setError("");

      try {
        if (user.role === "MENTEE") {
          const result = await menteeProfileApi.getMine();
          const profile = result?.data?.profile;
          setMenteeProfileExists(true);
          setMenteeForm(mapMenteeProfileToForm(profile));
          setMenteeResumeFile(null);
        }

        if (user.role === "MENTOR") {
          const result = await mentorProfileApi.getMine();
          const profile = result?.data?.profile;
          setMentorProfileExists(true);
          setMentorForm(mapMentorProfileToForm(profile));
          setMentorApprovalStatus(profile?.approvalStatus || "PENDING");
          setMentorFiles(emptyMentorFiles);
        }
      } catch (apiError) {
        if (apiError?.status === 404) {
          setMenteeProfileExists(false);
          setMentorProfileExists(false);
        } else {
          const message = apiError?.message || "Failed to load onboarding details";
          setError(message);
          toast.error(message);
        }
      } finally {
        setIsFetchingProfile(false);
      }
    };

    if (hasCheckedSession && !user) {
      router.replace("/auth?mode=login");
      return;
    }

    loadProfile();
  }, [hasCheckedSession, user, router]);

  const isBusy = isLoading || isFetchingProfile || isSubmitting;

  const headingLabel = useMemo(() => {
    if (!selectedRole) return "Choose Your Role";
    if (selectedRole === "MENTEE") {
      return menteeProfileExists ? "Update Mentee Onboarding" : "Complete Mentee Onboarding";
    }
    return mentorProfileExists ? "Update Mentor Onboarding" : "Complete Mentor Onboarding";
  }, [selectedRole, menteeProfileExists, mentorProfileExists]);

  const onMenteeFieldChange = (event) => {
    const { name, value } = event.target;
    setMenteeForm((previous) => ({ ...previous, [name]: value }));
  };

  const onMentorFieldChange = (event) => {
    const { name, value } = event.target;
    setMentorForm((previous) => ({ ...previous, [name]: value }));
  };

  const onMentorFileChange = (event) => {
    const { name, files } = event.target;
    setMentorFiles((previous) => ({ ...previous, [name]: files?.[0] || null }));
  };

  const selectRole = async (role) => {
    if (isBusy || isSelectingRole) {
      return;
    }

    if (selectedRole === role && user?.isRoleSelected) {
      return;
    }

    setIsSelectingRole(true);
    setError("");

    try {
      const result = await authApi.selectRole({ role });
      setSelectedRole(role);
      setMenteeProfileExists(false);
      setMentorProfileExists(false);
      setMenteeForm(emptyMenteeForm);
      setMentorForm(emptyMentorForm);
      setMenteeResumeFile(null);
      setMentorFiles(emptyMentorFiles);
      await fetchCurrentUser();
      toast.success(result?.message || "Role selected successfully");
    } catch (apiError) {
      const message = apiError?.message || "Failed to select role";
      setError(message);
      toast.error(message);
    } finally {
      setIsSelectingRole(false);
    }
  };

  const onMenteeSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const payload = buildMenteeFormData(menteeForm, menteeResumeFile);
      const result = menteeProfileExists
        ? await menteeProfileApi.update(payload)
        : await menteeProfileApi.create(payload);
      const profile = result?.data?.profile;
      setMenteeProfileExists(true);
      setMenteeForm(mapMenteeProfileToForm(profile));
      setMenteeResumeFile(null);
      await fetchCurrentUser();
      toast.success(result?.message || "Mentee profile saved");
      router.replace("/mentee/profile");
    } catch (apiError) {
      const message = apiError?.message || "Failed to save mentee profile";
      setError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onMentorSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const payload = buildMentorFormData(mentorForm, mentorFiles);
      const result = mentorProfileExists
        ? await mentorProfileApi.update(payload)
        : await mentorProfileApi.create(payload);
      const profile = result?.data?.profile;
      setMentorProfileExists(true);
      setMentorForm(mapMentorProfileToForm(profile));
      setMentorApprovalStatus(profile?.approvalStatus || "PENDING");
      setMentorFiles(emptyMentorFiles);
      await fetchCurrentUser();
      toast.success(result?.message || "Mentor profile saved");
      router.replace("/mentor/profile");
    } catch (apiError) {
      const message = apiError?.message || "Failed to save mentor profile";
      setError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!hasCheckedSession || isLoading || isFetchingProfile) {
    return (
      <main className="min-h-screen bg-[#FFFFFF]  px-4 py-10 text-[#0d0d0f] sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-4xl rounded-[1.75rem] border-2 border-black bg-white p-6 shadow-[6px_6px_0_rgba(0,0,0,1)]">
          <p className="text-lg font-semibold">Loading onboarding...</p>
        </div>
      </main>
    );
  }

  if (!user || user.role === "ADMIN") {
    return null;
  }

  if (selectedRole === "MENTOR") {
    return (
      <main className="min-h-screen bg-[#FFFFFF] px-4 py-10 text-[#0d0d0f] sm:px-6 lg:px-8">
        <MentorOnboardingWizard
          existingProfile={mentorProfileExists ? mentorForm : null}
          onComplete={async () => {
            await fetchCurrentUser();
            router.replace("/mentor/profile");
          }}
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FFFFFF]  px-4 py-10 text-[#0d0d0f] sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-4xl rounded-[1.75rem] border-2 border-black bg-white p-6 shadow-[6px_6px_0_rgba(0,0,0,1)] sm:p-8">
        <h1 className="text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">{headingLabel}</h1>
        <p className="mt-2 text-[#66686d]">Complete your onboarding to continue.</p>

        {error ? (
          <p className="mt-4 rounded-xl border border-[#f56565] bg-[#fff1f1] px-4 py-3 text-sm font-semibold text-[#c53030]">
            {error}
          </p>
        ) : null}

        <section className="mt-6 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            disabled={isBusy || isSelectingRole}
            onClick={() => selectRole("MENTEE")}
            className={`${roleCardBaseClass} ${
              selectedRole === "MENTEE"
                ? "border-black bg-[#ffc20f]"
                : "border-black/30 bg-[#f7fafc] hover:border-black"
            }`}
          >
            <p className="text-base font-extrabold">I am a Mentee</p>
          </button>

          <button
            type="button"
            disabled={isBusy || isSelectingRole}
            onClick={() => selectRole("MENTOR")}
            className={`${roleCardBaseClass} ${
              selectedRole === "MENTOR"
                ? "border-black bg-[#5f6cf3] text-white"
                : "border-black/30 bg-[#f7fafc] hover:border-black"
            }`}
          >
            <p className="text-base font-extrabold">I am a Mentor</p>
          </button>
        </section>

        {selectedRole === "MENTEE" ? (
          <form onSubmit={onMenteeSubmit} className="mt-6 grid gap-6">
            <section className="rounded-xl border border-black/20 bg-[#f7fafc] p-4">
              <h2 className="text-lg font-bold">Mentee Details</h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <input
                  type="date"
                  name="dateOfBirth"
                  value={menteeForm.dateOfBirth}
                  onChange={onMenteeFieldChange}
                  required
                  className="rounded-xl border border-black/30 px-3 py-2 text-sm outline-none focus:border-black"
                />
                <input
                  name="contactNumber"
                  value={menteeForm.contactNumber}
                  onChange={onMenteeFieldChange}
                  placeholder="Contact Number *"
                  required
                  className="rounded-xl border border-black/30 px-3 py-2 text-sm outline-none focus:border-black"
                />
                <input
                  name="otherMbaScore"
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  value={menteeForm.otherMbaScore}
                  onChange={onMenteeFieldChange}
                  placeholder="Other MBA Score (Cumulative)"
                  className="rounded-xl border border-black/30 px-3 py-2 text-sm outline-none focus:border-black"
                />
                <input
                  name="education10"
                  value={menteeForm.education10}
                  onChange={onMenteeFieldChange}
                  placeholder="Class 10 details"
                  className="rounded-xl border border-black/30 px-3 py-2 text-sm outline-none focus:border-black"
                />
                <input
                  name="education12"
                  value={menteeForm.education12}
                  onChange={onMenteeFieldChange}
                  placeholder="Class 12 details"
                  className="rounded-xl border border-black/30 px-3 py-2 text-sm outline-none focus:border-black"
                />
                <input
                  name="bachelors"
                  value={menteeForm.bachelors}
                  onChange={onMenteeFieldChange}
                  placeholder="Bachelors"
                  className="rounded-xl border border-black/30 px-3 py-2 text-sm outline-none focus:border-black"
                />
                <input
                  name="masters"
                  value={menteeForm.masters}
                  onChange={onMenteeFieldChange}
                  placeholder="Masters"
                  className="rounded-xl border border-black/30 px-3 py-2 text-sm outline-none focus:border-black"
                />
              </div>
              <textarea
                name="workExperience"
                value={menteeForm.workExperience}
                onChange={onMenteeFieldChange}
                placeholder="Work experience"
                rows={3}
                className="mt-3 w-full rounded-xl border border-black/30 px-3 py-2 text-sm outline-none focus:border-black"
              />
              <textarea
                name="certifications"
                value={menteeForm.certifications}
                onChange={onMenteeFieldChange}
                placeholder="Certifications"
                rows={2}
                className="mt-3 w-full rounded-xl border border-black/30 px-3 py-2 text-sm outline-none focus:border-black"
              />
              <textarea
                name="skillsets"
                value={menteeForm.skillsets}
                onChange={onMenteeFieldChange}
                placeholder="Skillsets (comma separated)"
                rows={2}
                className="mt-3 w-full rounded-xl border border-black/30 px-3 py-2 text-sm outline-none focus:border-black"
              />
              <textarea
                name="catHistory"
                value={menteeForm.catHistory}
                onChange={onMenteeFieldChange}
                placeholder="CAT history"
                rows={2}
                className="mt-3 w-full rounded-xl border border-black/30 px-3 py-2 text-sm outline-none focus:border-black"
              />
              <div className="mt-3">
                <label className="mb-1 block text-sm font-semibold">Resume (PDF/DOC/DOCX)</label>
                <input
                  name="resume"
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={(event) => setMenteeResumeFile(event.target.files?.[0] || null)}
                  className="w-full rounded-xl border border-black/30 px-3 py-2 text-sm"
                />
                {menteeForm.resumeUrl ? (
                  <a
                    href={resolveUploadUrl(menteeForm.resumeUrl)}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-block text-sm font-semibold text-[#5f6cf3] underline"
                  >
                    View uploaded resume
                  </a>
                ) : null}
              </div>
            </section>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl border-2 border-black bg-[#5f6cf3] px-4 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Saving..." : "Save and Continue"}
            </button>
          </form>
        ) : null}
      </div>
    </main>
  );
}
