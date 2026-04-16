"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import useAuthStore from "../../store/useAuthStore";
import { menteeProfileApi, mentorProfileApi, resolveUploadUrl } from "../../lib/api";

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

export default function ProfilePage() {
  const router = useRouter();
  const {
    user,
    isLoading,
    hasCheckedSession,
    fetchCurrentUser,
    logout,
  } = useAuthStore();

  const [isFetchingDetails, setIsFetchingDetails] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [menteeForm, setMenteeForm] = useState(emptyMenteeForm);
  const [menteeResumeFile, setMenteeResumeFile] = useState(null);
  const [mentorForm, setMentorForm] = useState(emptyMentorForm);
  const [mentorFiles, setMentorFiles] = useState(emptyMentorFiles);
  const [mentorApprovalStatus, setMentorApprovalStatus] = useState(null);

  useEffect(() => {
    if (!hasCheckedSession) {
      fetchCurrentUser();
    }
  }, [hasCheckedSession, fetchCurrentUser]);

  useEffect(() => {
    if (hasCheckedSession && !user) {
      router.replace("/auth?mode=login");
    }
  }, [hasCheckedSession, user, router]);

  useEffect(() => {
    if (hasCheckedSession && user?.role !== "ADMIN" && !user?.onboardingCompleted) {
      router.replace("/onboarding");
    }
  }, [hasCheckedSession, user, router]);

  useEffect(() => {
    const loadProfileDetails = async () => {
      if (!hasCheckedSession || !user || user.role === "ADMIN" || !user.onboardingCompleted) {
        return;
      }

      setIsFetchingDetails(true);
      setError("");

      try {
        if (user.role === "MENTEE") {
          const result = await menteeProfileApi.getMine();
          setMenteeForm(mapMenteeProfileToForm(result?.data?.profile));
          setMenteeResumeFile(null);
        }

        if (user.role === "MENTOR") {
          const result = await mentorProfileApi.getMine();
          const profile = result?.data?.profile;
          setMentorForm(mapMentorProfileToForm(profile));
          setMentorApprovalStatus(profile?.approvalStatus || "PENDING");
          setMentorFiles(emptyMentorFiles);
        }
      } catch (apiError) {
        if (apiError?.status === 404) {
          router.replace("/onboarding");
          return;
        }

        const message = apiError?.message || "Failed to fetch profile details";
        setError(message);
        toast.error(message);
      } finally {
        setIsFetchingDetails(false);
      }
    };

    loadProfileDetails();
  }, [hasCheckedSession, user, router]);

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/auth?mode=login");
    } catch (_error) {
      // Toast is handled by store.
    }
  };

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

  const onMenteeUpdate = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const result = await menteeProfileApi.update(buildMenteeFormData(menteeForm, menteeResumeFile));
      setMenteeForm(mapMenteeProfileToForm(result?.data?.profile));
      setMenteeResumeFile(null);
      await fetchCurrentUser();
      toast.success(result?.message || "Mentee profile updated successfully");
    } catch (apiError) {
      const message = apiError?.message || "Failed to update mentee profile";
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
      setMentorApprovalStatus(profile?.approvalStatus || "PENDING");
      setMentorFiles(emptyMentorFiles);
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

  if (!hasCheckedSession || isLoading || isFetchingDetails) {
    return (
      <main className="min-h-screen bg-[#FFFFFF]  px-4 py-10 text-[#0d0d0f] sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-4xl rounded-[1.75rem] border-2 border-black bg-white p-6 shadow-[6px_6px_0_rgba(0,0,0,1)]">
          <p className="text-lg font-semibold">Loading profile...</p>
        </div>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#FFFFFF]  px-4 py-10 text-[#0d0d0f] sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-4xl rounded-[1.75rem] border-2 border-black bg-white p-6 shadow-[6px_6px_0_rgba(0,0,0,1)] sm:p-8">
        <h1 className="text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">Your Profile</h1>
        <p className="mt-2 text-[#66686d]">Manage your profile details from this page.</p>

        {error ? (
          <p className="mt-4 rounded-xl border border-[#f56565] bg-[#fff1f1] px-4 py-3 text-sm font-semibold text-[#c53030]">
            {error}
          </p>
        ) : null}

        <div className="mt-6 rounded-xl border border-black/20 bg-[#f7fafc] p-4">
          <p className="text-sm text-black/70">Name</p>
          <p className="text-lg font-bold">{user.name || "Not set"}</p>
          <p className="mt-4 text-sm text-black/70">Email</p>
          <p className="text-base font-semibold">{user.email}</p>
          <p className="mt-4 text-sm text-black/70">Onboarding Status</p>
          <p className="text-base font-semibold">
            {user.role === "ADMIN" ? "Not required" : user.onboardingCompleted ? "Completed" : "Pending"}
          </p>
          {user.role === "MENTOR" ? (
            <>
              <p className="mt-4 text-sm text-black/70">Mentor Approval Status</p>
              <p className="text-base font-semibold">{mentorApprovalStatus || user.mentorApprovalStatus || "PENDING"}</p>
              <p className="mt-4 text-sm text-black/70">Mentor Verified</p>
              <p className="text-base font-semibold">{mentorForm.isVerified ? "Yes" : "No"}</p>
            </>
          ) : null}
        </div>

        {user.role === "MENTEE" ? (
          <form onSubmit={onMenteeUpdate} className="mt-6 grid gap-6">
            <section className="rounded-xl border border-black/20 bg-[#f7fafc] p-4">
              <h2 className="text-lg font-bold">Edit Mentee Profile</h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
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
                <div>
                  <label htmlFor="contactNumber" className="mb-1 block text-sm font-semibold">Contact Number *</label>
                  <input
                    id="contactNumber"
                    name="contactNumber"
                    value={menteeForm.contactNumber}
                    onChange={onMenteeFieldChange}
                    placeholder="Contact number"
                    required
                    className="w-full rounded-xl border border-black/30 px-3 py-2 text-sm outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label htmlFor="otherMbaScore" className="mb-1 block text-sm font-semibold">Other MBA Score (Cumulative)</label>
                  <input
                    id="otherMbaScore"
                    name="otherMbaScore"
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    value={menteeForm.otherMbaScore}
                    onChange={onMenteeFieldChange}
                    placeholder="e.g. 76.45"
                    className="w-full rounded-xl border border-black/30 px-3 py-2 text-sm outline-none focus:border-black"
                  />
                </div>
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
                name="resume"
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={(event) => setMenteeResumeFile(event.target.files?.[0] || null)}
                className="mt-3 w-full rounded-xl border border-black/30 px-3 py-2 text-sm"
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
            </section>

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-xl border-2 border-black bg-[#5f6cf3] px-4 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Saving..." : "Save Mentee Profile"}
              </button>
            </div>
          </form>
        ) : null}

        {user.role === "MENTOR" ? (
          <form onSubmit={onMentorUpdate} className="mt-6 grid gap-6">
            <section className="rounded-xl border border-black/20 bg-[#f7fafc] p-4">
              <h2 className="text-lg font-bold">Edit Mentor Profile</h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="linkedInUrl" className="mb-1 block text-sm font-semibold">LinkedIn URL *</label>
                  <input
                    id="linkedInUrl"
                    name="linkedInUrl"
                    type="url"
                    value={mentorForm.linkedInUrl}
                    onChange={onMentorFieldChange}
                    required
                    className="w-full rounded-xl border border-black/30 px-3 py-2 text-sm outline-none focus:border-black"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="contactNumber" className="mb-1 block text-sm font-semibold">Contact Number *</label>
                  <input
                    id="contactNumber"
                    name="contactNumber"
                    value={mentorForm.contactNumber}
                    onChange={onMentorFieldChange}
                    placeholder="Contact number"
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
                    rows={4}
                    minLength={10}
                    required
                    className="w-full rounded-xl border border-black/30 px-3 py-2 text-sm outline-none focus:border-black"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="expertiseTags" className="mb-1 block text-sm font-semibold">Expertise Tags *</label>
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
                  <label htmlFor="profilePhoto" className="mb-1 block text-sm font-semibold">Profile Photo</label>
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
                  <label htmlFor="collegeDocument" className="mb-1 block text-sm font-semibold">College Document</label>
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

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-xl border-2 border-black bg-[#5f6cf3] px-4 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Saving..." : "Save Mentor Profile"}
              </button>
            </div>
          </form>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-xl border-2 border-black bg-[#5f6cf3] px-4 py-2 text-sm font-bold text-white"
          >
            Go to Home
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-xl border-2 border-black bg-[#f56565] px-4 py-2 text-sm font-bold text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </main>
  );
}
