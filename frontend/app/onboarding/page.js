"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import useAuthStore from "../../store/useAuthStore";
import {
  authApi,
  menteeProfileApi,
  mentorProfileApi,
  resolveUploadUrl,
} from "../../lib/api";

const emptyMenteeForm = {
  dateOfBirth: "",
  education10: "",
  education12: "",
  bachelors: "",
  masters: "",
  workExperience: "",
  certifications: "",
  skillsets: "",
  catHistory: "",
  resumeUrl: "",
};

const emptyMentorForm = {
  linkedInUrl: "",
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
  education10: profile?.education10 || "",
  education12: profile?.education12 || "",
  bachelors: profile?.bachelors || "",
  masters: profile?.masters || "",
  workExperience: profile?.workExperience || "",
  certifications: profile?.certifications || "",
  skillsets: profile?.skillsets?.join(", ") || "",
  catHistory: profile?.catHistory || "",
  resumeUrl: profile?.resumeUrl || "",
});

const mapMentorProfileToForm = (profile) => ({
  linkedInUrl: profile?.linkedInUrl || "",
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

const buildMenteePayload = (form) => ({
  dateOfBirth: form.dateOfBirth,
  education10: form.education10,
  education12: form.education12,
  bachelors: form.bachelors,
  masters: form.masters,
  workExperience: form.workExperience,
  certifications: form.certifications,
  skillsets: form.skillsets
    .split(/[,\n]/)
    .map((item) => item.trim())
    .filter(Boolean),
  catHistory: form.catHistory,
  resumeUrl: form.resumeUrl,
});

const buildMentorFormData = (form, files) => {
  const formData = new FormData();

  formData.append("linkedInUrl", form.linkedInUrl);
  formData.append("bio", form.bio);

  const tags = form.expertiseTags
    .split(/[,\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
  formData.append("expertiseTags", JSON.stringify(tags));

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

const getPostOnboardingRoute = (currentUser) => {
  if (currentUser?.role === "MENTOR") {
    return "/mentor/dashboard";
  }

  return "/profile";
};

export default function OnboardingPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState(null);

  const [menteeForm, setMenteeForm] = useState(emptyMenteeForm);
  const [mentorForm, setMentorForm] = useState(emptyMentorForm);
  const [mentorFiles, setMentorFiles] = useState(emptyMentorFiles);

  const [menteeProfileExists, setMenteeProfileExists] = useState(false);
  const [mentorProfileExists, setMentorProfileExists] = useState(false);
  const [mentorApprovalStatus, setMentorApprovalStatus] = useState(null);

  const [isSelectingRole, setIsSelectingRole] = useState(false);
  const [isFetchingProfile, setIsFetchingProfile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const { user, isLoading, hasCheckedSession, fetchCurrentUser } = useAuthStore();

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
        router.replace(getPostOnboardingRoute(user));
        return;
      }

      if (user.onboardingCompleted) {
        router.replace(getPostOnboardingRoute(user));
        return;
      }

      if (!user.isRoleSelected) {
        setSelectedRole(null);
        setMenteeProfileExists(false);
        setMentorProfileExists(false);
        setMentorApprovalStatus(null);
        setMenteeForm(emptyMenteeForm);
        setMentorForm(emptyMentorForm);
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
          setMentorProfileExists(false);
          setMentorApprovalStatus(null);
          setMentorFiles(emptyMentorFiles);
        }

        if (user.role === "MENTOR") {
          const result = await mentorProfileApi.getMine();
          const profile = result?.data?.profile;

          setMentorProfileExists(true);
          setMentorForm(mapMentorProfileToForm(profile));
          setMentorApprovalStatus(profile?.approvalStatus || "PENDING");
          setMentorFiles(emptyMentorFiles);
          setMenteeProfileExists(false);
        }
      } catch (apiError) {
        if (apiError?.status === 404) {
          if (user.role === "MENTEE") {
            setMenteeProfileExists(false);
            setMenteeForm(emptyMenteeForm);
          }
          if (user.role === "MENTOR") {
            setMentorProfileExists(false);
            setMentorForm(emptyMentorForm);
            setMentorApprovalStatus("PENDING");
            setMentorFiles(emptyMentorFiles);
          }
        } else {
          const message = apiError?.message || "Failed to fetch onboarding profile";
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
    if (!selectedRole) {
      return "Choose Your Role";
    }

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
    const selectedFile = files?.[0] || null;

    setMentorFiles((previous) => ({
      ...previous,
      [name]: selectedFile,
    }));
  };

  const selectRole = async (role) => {
    if (isBusy || isSelectingRole) {
      return;
    }

    if (selectedRole === role && user?.isRoleSelected) {
      return;
    }

    if (selectedRole && selectedRole !== role) {
      const shouldSwitch = window.confirm(
        `Switch to ${role}? This can change which onboarding form is shown.`
      );

      if (!shouldSwitch) {
        return;
      }
    }

    setIsSelectingRole(true);
    setError("");

    try {
      const result = await authApi.selectRole({ role });
      setSelectedRole(role);
      setMenteeProfileExists(false);
      setMentorProfileExists(false);
      setMentorApprovalStatus(null);
      setMentorForm(emptyMentorForm);
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

  const onMenteeCreate = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const result = await menteeProfileApi.create(buildMenteePayload(menteeForm));
      setMenteeProfileExists(true);
      setMenteeForm(mapMenteeProfileToForm(result?.data?.profile));
      await fetchCurrentUser();
      toast.success(result?.message || "Mentee onboarding profile created");
    } catch (apiError) {
      const message = apiError?.message || "Failed to create mentee profile";
      setError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onMenteeUpdate = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const result = await menteeProfileApi.update(buildMenteePayload(menteeForm));
      setMenteeForm(mapMenteeProfileToForm(result?.data?.profile));
      await fetchCurrentUser();
      toast.success(result?.message || "Mentee onboarding profile updated");
    } catch (apiError) {
      const message = apiError?.message || "Failed to update mentee profile";
      setError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onMenteeDelete = async () => {
    const shouldDelete = window.confirm(
      "Delete your mentee onboarding profile? This will remove saved mentee details."
    );

    if (!shouldDelete) {
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const result = await menteeProfileApi.remove();
      setMenteeProfileExists(false);
      setMenteeForm(emptyMenteeForm);
      await fetchCurrentUser();
      toast.success(result?.message || "Mentee onboarding profile deleted");
    } catch (apiError) {
      const message = apiError?.message || "Failed to delete mentee profile";
      setError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onMentorCreate = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const result = await mentorProfileApi.create(buildMentorFormData(mentorForm, mentorFiles));
      const profile = result?.data?.profile;
      setMentorProfileExists(true);
      setMentorForm(mapMentorProfileToForm(profile));
      setMentorFiles(emptyMentorFiles);
      setMentorApprovalStatus(profile?.approvalStatus || "PENDING");
      await fetchCurrentUser();
      toast.success(result?.message || "Mentor onboarding profile created");
    } catch (apiError) {
      const message = apiError?.message || "Failed to create mentor profile";
      setError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onMentorUpdate = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const result = await mentorProfileApi.update(buildMentorFormData(mentorForm, mentorFiles));
      const profile = result?.data?.profile;
      setMentorForm(mapMentorProfileToForm(profile));
      setMentorFiles(emptyMentorFiles);
      setMentorApprovalStatus(profile?.approvalStatus || "PENDING");
      await fetchCurrentUser();
      toast.success(result?.message || "Mentor profile updated and sent for re-verification");
    } catch (apiError) {
      const message = apiError?.message || "Failed to update mentor profile";
      setError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onMentorDelete = async () => {
    const shouldDelete = window.confirm(
      "Delete your mentor onboarding profile? This will remove your waitlist entry."
    );

    if (!shouldDelete) {
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const result = await mentorProfileApi.remove();
      setMentorProfileExists(false);
      setMentorForm(emptyMentorForm);
      setMentorFiles(emptyMentorFiles);
      setMentorApprovalStatus(null);
      await fetchCurrentUser();
      toast.success(result?.message || "Mentor onboarding profile deleted");
    } catch (apiError) {
      const message = apiError?.message || "Failed to delete mentor profile";
      setError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!hasCheckedSession || isLoading || isFetchingProfile) {
    return (
      <main className="min-h-screen bg-[#FFFFFF] bg-grid-paper px-4 py-10 text-[#0d0d0f] sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-4xl rounded-[1.75rem] border-2 border-black bg-white p-6 shadow-[6px_6px_0_rgba(0,0,0,1)]">
          <p className="text-lg font-semibold">Loading onboarding...</p>
        </div>
      </main>
    );
  }

  if (!user || user.role === "ADMIN") {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#FFFFFF] bg-grid-paper px-4 py-10 text-[#0d0d0f] sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-4xl rounded-[1.75rem] border-2 border-black bg-white p-6 shadow-[6px_6px_0_rgba(0,0,0,1)] sm:p-8">
        <h1 className="text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">{headingLabel}</h1>
        <p className="mt-2 text-[#66686d]">
          Select your role and complete onboarding. Name and email are fetched from your sign-up account.
        </p>

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
            <p className="mt-1 text-sm text-black/70">Fill academic background, skills, CAT details, and resume.</p>
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
            <p className={`mt-1 text-sm ${selectedRole === "MENTOR" ? "text-white/80" : "text-black/70"}`}>
              Add LinkedIn and career profile. Profile goes to admin waitlist after submission.
            </p>
          </button>
        </section>

        {selectedRole === "MENTEE" ? (
          <form onSubmit={menteeProfileExists ? onMenteeUpdate : onMenteeCreate} className="mt-6 grid gap-6">
            <section className="rounded-xl border border-black/20 bg-[#f7fafc] p-4">
              <h2 className="text-lg font-bold">Mentee Basic Details</h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-semibold">Name</label>
                  <input
                    value={user.name || ""}
                    disabled
                    className="w-full rounded-xl border border-black/25 bg-[#edf2f7] px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold">Email</label>
                  <input
                    value={user.email}
                    disabled
                    className="w-full rounded-xl border border-black/25 bg-[#edf2f7] px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="dateOfBirth" className="mb-1 block text-sm font-semibold">Date of Birth *</label>
                  <input
                    id="dateOfBirth"
                    type="date"
                    name="dateOfBirth"
                    value={menteeForm.dateOfBirth}
                    onChange={onMenteeFieldChange}
                    required
                    className="w-full rounded-xl border border-black/30 px-3 py-2 text-sm outline-none focus:border-black"
                  />
                </div>
              </div>
            </section>

            <section className="rounded-xl border border-black/20 bg-[#f7fafc] p-4">
              <h2 className="text-lg font-bold">Education & Experience (Optional)</h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
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
              <input
                name="resumeUrl"
                value={menteeForm.resumeUrl}
                onChange={onMenteeFieldChange}
                placeholder="Resume URL"
                className="mt-3 w-full rounded-xl border border-black/30 px-3 py-2 text-sm outline-none focus:border-black"
              />
            </section>

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={isBusy}
                className="rounded-xl border-2 border-black bg-[#5f6cf3] px-4 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Saving..." : menteeProfileExists ? "Update Mentee Profile" : "Create Mentee Profile"}
              </button>

              {menteeProfileExists ? (
                <button
                  type="button"
                  onClick={onMenteeDelete}
                  disabled={isBusy}
                  className="rounded-xl border-2 border-black bg-[#f56565] px-4 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-70"
                >
                  Delete Mentee Profile
                </button>
              ) : null}

              <Link
                href={selectedRole === "MENTOR" ? "/mentor/profile" : "/profile"}
                className="rounded-xl border-2 border-black bg-[#ffc20f] px-4 py-2 text-sm font-bold text-black"
              >
                Go to Profile
              </Link>
            </div>
          </form>
        ) : null}

        {selectedRole === "MENTOR" ? (
          <form onSubmit={mentorProfileExists ? onMentorUpdate : onMentorCreate} className="mt-6 grid gap-6">
            <section className="rounded-xl border border-black/20 bg-[#f7fafc] p-4">
              <h2 className="text-lg font-bold">Mentor Required Details</h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-semibold">Name</label>
                  <input
                    value={user.name || ""}
                    disabled
                    className="w-full rounded-xl border border-black/25 bg-[#edf2f7] px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold">Email</label>
                  <input
                    value={user.email}
                    disabled
                    className="w-full rounded-xl border border-black/25 bg-[#edf2f7] px-3 py-2 text-sm"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="linkedInUrl" className="mb-1 block text-sm font-semibold">LinkedIn URL *</label>
                  <input
                    id="linkedInUrl"
                    name="linkedInUrl"
                    type="url"
                    value={mentorForm.linkedInUrl}
                    onChange={onMentorFieldChange}
                    placeholder="https://www.linkedin.com/in/your-profile"
                    required
                    className="w-full rounded-xl border border-black/30 px-3 py-2 text-sm outline-none focus:border-black"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="bio" className="mb-1 block text-sm font-semibold">Bio *</label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={mentorForm.bio}
                    onChange={onMentorFieldChange}
                    placeholder="Write a short mentor bio"
                    rows={4}
                    minLength={10}
                    required
                    className="w-full rounded-xl border border-black/30 px-3 py-2 text-sm outline-none focus:border-black"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="expertiseTags" className="mb-1 block text-sm font-semibold">
                    Expertise Tags * (e.g., Verbal, Quant, DI/LR, PI)
                  </label>
                  <input
                    id="expertiseTags"
                    name="expertiseTags"
                    value={mentorForm.expertiseTags}
                    onChange={onMentorFieldChange}
                    placeholder="Verbal, Quant, DI/LR, PI"
                    required
                    className="w-full rounded-xl border border-black/30 px-3 py-2 text-sm outline-none focus:border-black"
                  />
                </div>
              </div>
            </section>

            <section className="rounded-xl border border-black/20 bg-[#f7fafc] p-4">
              <h2 className="text-lg font-bold">Optional Details</h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <textarea
                  name="ugCollegeProfile"
                  value={mentorForm.ugCollegeProfile}
                  onChange={onMentorFieldChange}
                  placeholder="UG college profile"
                  rows={3}
                  className="rounded-xl border border-black/30 px-3 py-2 text-sm outline-none focus:border-black"
                />
                <textarea
                  name="pgProfile"
                  value={mentorForm.pgProfile}
                  onChange={onMentorFieldChange}
                  placeholder="PG profile"
                  rows={3}
                  className="rounded-xl border border-black/30 px-3 py-2 text-sm outline-none focus:border-black"
                />
              </div>
              <textarea
                name="workExperience"
                value={mentorForm.workExperience}
                onChange={onMentorFieldChange}
                placeholder="Work experience"
                rows={4}
                className="mt-3 w-full rounded-xl border border-black/30 px-3 py-2 text-sm outline-none focus:border-black"
              />
              <textarea
                name="certifications"
                value={mentorForm.certifications}
                onChange={onMentorFieldChange}
                placeholder="Certifications"
                rows={3}
                className="mt-3 w-full rounded-xl border border-black/30 px-3 py-2 text-sm outline-none focus:border-black"
              />

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="profilePhoto" className="mb-1 block text-sm font-semibold">
                    Profile Photo (JPG/PNG/WEBP)
                  </label>
                  <input
                    id="profilePhoto"
                    name="profilePhoto"
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={onMentorFileChange}
                    className="w-full rounded-xl border border-black/30 px-3 py-2 text-sm"
                  />
                  {mentorForm.profilePhotoUrl ? (
                    <img
                      src={resolveUploadUrl(mentorForm.profilePhotoUrl)}
                      alt="Mentor avatar"
                      className="mt-2 h-20 w-20 rounded-xl border border-black/20 object-cover"
                    />
                  ) : null}
                </div>

                <div>
                  <label htmlFor="collegeDocument" className="mb-1 block text-sm font-semibold">
                    College ID Card / Document Image
                  </label>
                  <input
                    id="collegeDocument"
                    name="collegeDocument"
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={onMentorFileChange}
                    className="w-full rounded-xl border border-black/30 px-3 py-2 text-sm"
                  />
                  {mentorForm.collegeDocumentUrl ? (
                    <a
                      href={resolveUploadUrl(mentorForm.collegeDocumentUrl)}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-block text-sm font-semibold text-[#5f6cf3] underline"
                    >
                      View uploaded document
                    </a>
                  ) : null}
                </div>
              </div>
            </section>

            <section className="rounded-xl border border-black/20 bg-[#eef2ff] p-4">
              <h2 className="text-lg font-bold">Mentor Status</h2>
              <p className="mt-2 text-sm text-black/80">
                Your mentor profile remains on waitlist until approved by admin.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <p className="inline-flex rounded-full border border-black bg-white px-3 py-1 text-sm font-bold">
                  Waitlist: {mentorApprovalStatus || "Not submitted"}
                </p>
                <p className="inline-flex rounded-full border border-black bg-white px-3 py-1 text-sm font-bold">
                  Verified: {mentorForm.isVerified ? "Yes" : "No"}
                </p>
              </div>
            </section>

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={isBusy}
                className="rounded-xl border-2 border-black bg-[#5f6cf3] px-4 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Saving..." : mentorProfileExists ? "Update Mentor Profile" : "Create Mentor Profile"}
              </button>

              {mentorProfileExists ? (
                <button
                  type="button"
                  onClick={onMentorDelete}
                  disabled={isBusy}
                  className="rounded-xl border-2 border-black bg-[#f56565] px-4 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-70"
                >
                  Delete Mentor Profile
                </button>
              ) : null}

              <Link
                href="/mentor/profile"
                className="rounded-xl border-2 border-black bg-[#ffc20f] px-4 py-2 text-sm font-bold text-black"
              >
                Go to Profile
              </Link>
            </div>
          </form>
        ) : null}
      </div>
    </main>
  );
}
