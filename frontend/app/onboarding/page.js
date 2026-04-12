"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import useAuthStore from "../../store/useAuthStore";
import { menteeProfileApi } from "../../lib/api";

const emptyForm = {
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

const mapProfileToForm = (profile) => ({
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

const buildPayload = (form) => ({
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

export default function OnboardingPage() {
  const router = useRouter();
  const [form, setForm] = useState(emptyForm);
  const [profileExists, setProfileExists] = useState(false);
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

      if (user.role !== "MENTEE") {
        router.replace("/profile");
        return;
      }

      setIsFetchingProfile(true);
      setError("");

      try {
        const result = await menteeProfileApi.getMine();
        const profile = result?.data?.profile;

        setProfileExists(true);
        setForm(mapProfileToForm(profile));
      } catch (apiError) {
        if (apiError?.status === 404) {
          setProfileExists(false);
          setForm(emptyForm);
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
    return profileExists ? "Update Your Onboarding" : "Complete Your Onboarding";
  }, [profileExists]);

  const onFieldChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const onCreate = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const result = await menteeProfileApi.create(buildPayload(form));
      setProfileExists(true);
      setForm(mapProfileToForm(result?.data?.profile));
      await fetchCurrentUser();
      toast.success(result?.message || "Onboarding profile created");
    } catch (apiError) {
      const message = apiError?.message || "Failed to create onboarding profile";
      setError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onUpdate = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const result = await menteeProfileApi.update(buildPayload(form));
      setForm(mapProfileToForm(result?.data?.profile));
      await fetchCurrentUser();
      toast.success(result?.message || "Onboarding profile updated");
    } catch (apiError) {
      const message = apiError?.message || "Failed to update onboarding profile";
      setError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onDelete = async () => {
    const shouldDelete = window.confirm("Delete your onboarding profile? This will remove all saved mentee onboarding details.");
    if (!shouldDelete) {
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const result = await menteeProfileApi.remove();
      setProfileExists(false);
      setForm(emptyForm);
      await fetchCurrentUser();
      toast.success(result?.message || "Onboarding profile deleted");
    } catch (apiError) {
      const message = apiError?.message || "Failed to delete onboarding profile";
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

  if (!user || user.role !== "MENTEE") {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#FFFFFF] bg-grid-paper px-4 py-10 text-[#0d0d0f] sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-4xl rounded-[1.75rem] border-2 border-black bg-white p-6 shadow-[6px_6px_0_rgba(0,0,0,1)] sm:p-8">
        <h1 className="text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">{headingLabel}</h1>
        <p className="mt-2 text-[#66686d]">
          Please add your DOB and optional academic details. Name and email are fetched from your sign-up account.
        </p>

        {error ? (
          <p className="mt-4 rounded-xl border border-[#f56565] bg-[#fff1f1] px-4 py-3 text-sm font-semibold text-[#c53030]">
            {error}
          </p>
        ) : null}

        <form onSubmit={profileExists ? onUpdate : onCreate} className="mt-6 grid gap-6">
          <section className="rounded-xl border border-black/20 bg-[#f7fafc] p-4">
            <h2 className="text-lg font-bold">Basic Details</h2>
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
                  value={form.dateOfBirth}
                  onChange={onFieldChange}
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
                value={form.education10}
                onChange={onFieldChange}
                placeholder="Class 10 details"
                className="rounded-xl border border-black/30 px-3 py-2 text-sm outline-none focus:border-black"
              />
              <input
                name="education12"
                value={form.education12}
                onChange={onFieldChange}
                placeholder="Class 12 details"
                className="rounded-xl border border-black/30 px-3 py-2 text-sm outline-none focus:border-black"
              />
              <input
                name="bachelors"
                value={form.bachelors}
                onChange={onFieldChange}
                placeholder="Bachelors"
                className="rounded-xl border border-black/30 px-3 py-2 text-sm outline-none focus:border-black"
              />
              <input
                name="masters"
                value={form.masters}
                onChange={onFieldChange}
                placeholder="Masters"
                className="rounded-xl border border-black/30 px-3 py-2 text-sm outline-none focus:border-black"
              />
            </div>
            <textarea
              name="workExperience"
              value={form.workExperience}
              onChange={onFieldChange}
              placeholder="Work experience"
              rows={3}
              className="mt-3 w-full rounded-xl border border-black/30 px-3 py-2 text-sm outline-none focus:border-black"
            />
            <textarea
              name="certifications"
              value={form.certifications}
              onChange={onFieldChange}
              placeholder="Certifications"
              rows={2}
              className="mt-3 w-full rounded-xl border border-black/30 px-3 py-2 text-sm outline-none focus:border-black"
            />
            <textarea
              name="skillsets"
              value={form.skillsets}
              onChange={onFieldChange}
              placeholder="Skillsets (comma separated)"
              rows={2}
              className="mt-3 w-full rounded-xl border border-black/30 px-3 py-2 text-sm outline-none focus:border-black"
            />
            <textarea
              name="catHistory"
              value={form.catHistory}
              onChange={onFieldChange}
              placeholder="CAT history"
              rows={2}
              className="mt-3 w-full rounded-xl border border-black/30 px-3 py-2 text-sm outline-none focus:border-black"
            />
            <input
              name="resumeUrl"
              value={form.resumeUrl}
              onChange={onFieldChange}
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
              {isSubmitting ? "Saving..." : profileExists ? "Update Profile" : "Create Profile"}
            </button>

            {profileExists ? (
              <button
                type="button"
                onClick={onDelete}
                disabled={isBusy}
                className="rounded-xl border-2 border-black bg-[#f56565] px-4 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-70"
              >
                Delete Profile
              </button>
            ) : null}

            <Link
              href="/profile"
              className="rounded-xl border-2 border-black bg-[#ffc20f] px-4 py-2 text-sm font-bold text-black"
            >
              Go to Profile
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
