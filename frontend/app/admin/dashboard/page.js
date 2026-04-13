"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { adminMentorApi, resolveUploadUrl } from "../../../lib/api";

const formatDate = (value) => {
  if (!value) {
    return "-";
  }

  try {
    return new Date(value).toLocaleString();
  } catch (_error) {
    return value;
  }
};

const buildInitialNotes = (profiles) =>
  profiles.reduce((accumulator, profile) => {
    accumulator[profile.id] = profile.adminReviewNotes || "";
    return accumulator;
  }, {});

export default function AdminDashboardPage() {
  const [profiles, setProfiles] = useState([]);
  const [notesByProfile, setNotesByProfile] = useState({});
  const [activeProfileId, setActiveProfileId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const pendingCount = profiles.length;

  const newThisWeek = useMemo(() => {
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

    return profiles.filter((profile) => {
      const createdAt = new Date(profile.createdAt).getTime();
      return Number.isFinite(createdAt) && createdAt >= sevenDaysAgo;
    }).length;
  }, [profiles]);

  const withDocumentsCount = useMemo(
    () => profiles.filter((profile) => Boolean(profile.collegeDocumentUrl)).length,
    [profiles]
  );

  const loadWaitlist = async () => {
    setIsLoading(true);
    setError("");

    try {
      const result = await adminMentorApi.getWaitlist();
      const fetchedProfiles = result?.data?.profiles || [];
      setProfiles(fetchedProfiles);
      setNotesByProfile(buildInitialNotes(fetchedProfiles));
    } catch (apiError) {
      const message = apiError?.message || "Failed to load mentor applications";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadWaitlist();
  }, []);

  const onNoteChange = (profileId, value) => {
    setNotesByProfile((previous) => ({
      ...previous,
      [profileId]: value,
    }));
  };

  const onUpdateStatus = async (profileId, approvalStatus) => {
    setActiveProfileId(profileId);
    setError("");

    try {
      const note = (notesByProfile[profileId] || "").trim();
      const result = await adminMentorApi.updateApproval(profileId, {
        approvalStatus,
        adminReviewNotes: note,
      });

      toast.success(result?.message || `Application marked as ${approvalStatus}`);

      const filteredProfiles = profiles.filter((profile) => profile.id !== profileId);
      setProfiles(filteredProfiles);
      setNotesByProfile((previous) => {
        const next = { ...previous };
        delete next[profileId];
        return next;
      });
    } catch (apiError) {
      const message = apiError?.message || "Failed to update mentor application";
      setError(message);
      toast.error(message);
    } finally {
      setActiveProfileId("");
    }
  };

  return (
    <div className="grid gap-4">
      <section className="rounded-3xl border border-black/10 bg-[linear-gradient(120deg,#14213d_0%,#1d3557_52%,#2b4865_100%)] p-6 text-white sm:p-7">
        <p className="text-xs uppercase tracking-[0.18em] text-white/75">Admin Dashboard</p>
        <h3 className="mt-2 text-3xl font-extrabold tracking-[-0.03em]">Mentor Approval Control Room</h3>
        <p className="mt-3 max-w-2xl text-white/85">
          Review mentor onboarding applications, verify documents, and approve or reject submissions with actionable notes.
        </p>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <article className="rounded-2xl border border-black/10 bg-white p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-black/50">Pending Applications</p>
          <p className="mt-2 text-3xl font-bold tracking-[-0.03em]">{pendingCount}</p>
        </article>
        <article className="rounded-2xl border border-black/10 bg-white p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-black/50">New This Week</p>
          <p className="mt-2 text-3xl font-bold tracking-[-0.03em]">{newThisWeek}</p>
        </article>
        <article className="rounded-2xl border border-black/10 bg-white p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-black/50">With Documents</p>
          <p className="mt-2 text-3xl font-bold tracking-[-0.03em]">{withDocumentsCount}</p>
        </article>
      </section>

      <section className="rounded-2xl border border-black/10 bg-white p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h4 className="text-lg font-bold">Pending Mentor Applications</h4>
          <button
            type="button"
            onClick={loadWaitlist}
            disabled={isLoading || Boolean(activeProfileId)}
            className="rounded-xl border-2 border-black bg-[#dbeafe] px-4 py-2 text-sm font-bold text-[#1d4ed8] disabled:cursor-not-allowed disabled:opacity-60"
          >
            Refresh
          </button>
        </div>

        {error ? (
          <p className="mb-4 rounded-xl border border-[#f56565] bg-[#fff1f1] px-4 py-3 text-sm font-semibold text-[#c53030]">
            {error}
          </p>
        ) : null}

        {isLoading ? (
          <p className="rounded-xl border border-black/10 bg-[#f8fafc] px-4 py-3 text-sm font-semibold text-black/70">
            Loading mentor applications...
          </p>
        ) : null}

        {!isLoading && profiles.length === 0 ? (
          <p className="rounded-xl border border-black/10 bg-[#f0fdf4] px-4 py-3 text-sm font-semibold text-[#166534]">
            No pending applications right now. New mentor submissions will appear here automatically.
          </p>
        ) : null}

        {!isLoading && profiles.length > 0 ? (
          <div className="grid gap-4">
            {profiles.map((profile) => {
              const isMutating = activeProfileId === profile.id;
              const profilePhoto = resolveUploadUrl(profile.profilePhotoUrl);
              const documentUrl = resolveUploadUrl(profile.collegeDocumentUrl);

              return (
                <article key={profile.id} className="rounded-2xl border border-black/15 bg-[#f8fafc] p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-base font-extrabold">{profile.name || "Unnamed Mentor"}</p>
                      <p className="text-sm text-black/70">{profile.email}</p>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-black/50">
                        Submitted {formatDate(profile.createdAt)}
                      </p>
                    </div>
                    {profilePhoto ? (
                      <img
                        src={profilePhoto}
                        alt={`${profile.name || "Mentor"} profile`}
                        className="h-14 w-14 rounded-xl border border-black/15 object-cover"
                      />
                    ) : null}
                  </div>

                  <div className="mt-4 grid gap-3 text-sm text-black/80 sm:grid-cols-2">
                    <p>
                      <span className="font-semibold text-black">Contact:</span> {profile.contactNumber || "-"}
                    </p>
                    <p>
                      <span className="font-semibold text-black">LinkedIn:</span>{" "}
                      {profile.linkedInUrl ? (
                        <a
                          href={profile.linkedInUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="font-semibold text-[#1d4ed8] underline"
                        >
                          Open Profile
                        </a>
                      ) : (
                        "-"
                      )}
                    </p>
                    <p className="sm:col-span-2">
                      <span className="font-semibold text-black">Expertise Tags:</span>{" "}
                      {profile.expertiseTags?.length ? profile.expertiseTags.join(", ") : "-"}
                    </p>
                    <p className="sm:col-span-2">
                      <span className="font-semibold text-black">Bio:</span> {profile.bio || "-"}
                    </p>
                    <p className="sm:col-span-2">
                      <span className="font-semibold text-black">Work Experience:</span>{" "}
                      {profile.workExperience || "-"}
                    </p>
                    <p className="sm:col-span-2">
                      <span className="font-semibold text-black">College Document:</span>{" "}
                      {documentUrl ? (
                        <a
                          href={documentUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="font-semibold text-[#1d4ed8] underline"
                        >
                          View Uploaded Proof
                        </a>
                      ) : (
                        "Not uploaded"
                      )}
                    </p>
                  </div>

                  <div className="mt-4 grid gap-3">
                    <label htmlFor={`admin-notes-${profile.id}`} className="text-sm font-semibold">
                      Review Notes (optional)
                    </label>
                    <textarea
                      id={`admin-notes-${profile.id}`}
                      rows={3}
                      value={notesByProfile[profile.id] || ""}
                      onChange={(event) => onNoteChange(profile.id, event.target.value)}
                      placeholder="Add reason, quality notes, or required corrections for mentor."
                      className="w-full rounded-xl border border-black/20 bg-white px-3 py-2 text-sm outline-none focus:border-black"
                    />
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      disabled={isMutating || Boolean(activeProfileId && !isMutating)}
                      onClick={() => onUpdateStatus(profile.id, "APPROVED")}
                      className="rounded-xl border-2 border-black bg-[#c6f6d5] px-4 py-2 text-sm font-bold text-[#0f3e22] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isMutating ? "Updating..." : "Approve"}
                    </button>
                    <button
                      type="button"
                      disabled={isMutating || Boolean(activeProfileId && !isMutating)}
                      onClick={() => onUpdateStatus(profile.id, "REJECTED")}
                      className="rounded-xl border-2 border-black bg-[#fed7d7] px-4 py-2 text-sm font-bold text-[#7a1f1f] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isMutating ? "Updating..." : "Reject"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        ) : null}
      </section>
    </div>
  );
}
