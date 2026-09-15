"use client";

import { useEffect, useState } from "react";
import { FileText, Layers, MessageSquareQuote, Sparkles } from "lucide-react";
import Link from "next/link";
import { menteeDocumentApi, packageApi } from "../../lib/api";
import { Badge, Card, Checkbox, Skeleton, cx, formatCurrency, formatDate } from "../ui/kit";

/**
 * The optional extras a mentee can attach while booking:
 *   - redeem a session from a package they already own
 *   - share resumes / SOPs with the mentor
 *   - resurface feedback from their last session with this mentor
 *
 * Reports selections upward via `onChange`; it owns no booking state itself.
 */
export default function BookingExtras({ mentorProfileId, mentorServiceId, value, onChange }) {
  const [documents, setDocuments] = useState({ resumes: [], sops: [] });
  const [packages, setPackages] = useState([]);
  const [previousFeedback, setPreviousFeedback] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const [docsRes, pkgRes, prevRes] = await Promise.allSettled([
        menteeDocumentApi.list(),
        packageApi.listRedeemable({ mentorProfileId, mentorServiceId }),
        menteeDocumentApi.getPreviousFeedback(mentorProfileId),
      ]);

      if (cancelled) return;

      if (docsRes.status === "fulfilled") {
        setDocuments({
          resumes: docsRes.value.data?.resumes || [],
          sops: docsRes.value.data?.sops || [],
        });
      }
      if (pkgRes.status === "fulfilled") {
        setPackages(pkgRes.value.data?.purchases || []);
      }
      if (prevRes.status === "fulfilled" && prevRes.value.data?.previous) {
        const previous = prevRes.value.data.previous;
        setPreviousFeedback(previous);
        // The contract asks for this to default to checked on a repeat booking.
        onChange({ ...value, sharedFeedbackBookingId: previous.bookingId });
      }

      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
    // Intentionally keyed on the mentor/service pair only — re-running on every
    // `value` change would fight the caller's state.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mentorProfileId, mentorServiceId]);

  const allDocuments = [...documents.resumes, ...documents.sops];

  const toggleDocument = (id) => {
    const selected = value.sharedDocumentIds ?? [];
    onChange({
      ...value,
      sharedDocumentIds: selected.includes(id)
        ? selected.filter((d) => d !== id)
        : [...selected, id],
    });
  };

  if (loading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-24" />
        <Skeleton className="h-32" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* ── Redeem a package ── */}
      {packages.length > 0 && (
        <Card className="p-4">
          <div className="mb-3 flex items-center gap-2">
            <Layers className="h-4 w-4 text-[#5061E4]" />
            <h3 className="text-sm font-bold text-gray-900">Use a package</h3>
            <Badge tone="success">Saves you money</Badge>
          </div>

          <div className="space-y-2">
            {packages.map((pkg) => {
              const selected = value.packagePurchaseId === pkg.id;
              return (
                <button
                  key={pkg.id}
                  type="button"
                  onClick={() =>
                    onChange({
                      ...value,
                      packagePurchaseId: selected ? undefined : pkg.id,
                    })
                  }
                  className={cx(
                    "flex w-full items-center justify-between gap-3 rounded-lg border p-3 text-left transition-all",
                    selected
                      ? "border-[#5061E4] bg-[#F8F9FF]"
                      : "border-gray-200 hover:border-gray-300"
                  )}
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-gray-900">{pkg.title}</p>
                    <p className="mt-0.5 text-[11px] text-gray-500">
                      {pkg.sessionsRemaining} of {pkg.sessionsTotal} sessions left
                      {pkg.expiresAt && ` · expires ${formatDate(pkg.expiresAt)}`}
                    </p>
                  </div>
                  <span
                    className={cx(
                      "shrink-0 rounded-md px-2 py-1 text-[11px] font-bold",
                      selected ? "bg-[#5061E4] text-white" : "bg-gray-100 text-gray-600"
                    )}
                  >
                    {selected ? "Using" : "Use"}
                  </span>
                </button>
              );
            })}
          </div>

          {value.packagePurchaseId && (
            <p className="mt-3 flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-2 text-[11px] font-medium text-emerald-700">
              <Sparkles className="h-3.5 w-3.5" />
              This booking is covered by your package — no payment needed.
            </p>
          )}
        </Card>
      )}

      {/* ── Share documents ── */}
      <Card className="p-4">
        <div className="mb-1 flex items-center gap-2">
          <FileText className="h-4 w-4 text-[#5061E4]" />
          <h3 className="text-sm font-bold text-gray-900">Share your profile</h3>
        </div>
        <p className="mb-3 text-xs text-gray-500">
          Pick what the mentor should read before the session. Optional.
        </p>

        {allDocuments.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-200 px-4 py-5 text-center">
            <p className="text-xs text-gray-500">You haven&apos;t uploaded any documents yet.</p>
            <Link
              href="/mentee/profile"
              className="mt-1.5 inline-block text-xs font-semibold text-[#5061E4] hover:underline"
            >
              Add a resume or SOP
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            {allDocuments.map((doc) => (
              <label
                key={doc.id}
                className={cx(
                  "flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-all",
                  (value.sharedDocumentIds ?? []).includes(doc.id)
                    ? "border-[#5061E4] bg-[#F8F9FF]"
                    : "border-gray-200 hover:border-gray-300"
                )}
              >
                <input
                  type="checkbox"
                  checked={(value.sharedDocumentIds ?? []).includes(doc.id)}
                  onChange={() => toggleDocument(doc.id)}
                  className="h-4 w-4 shrink-0 cursor-pointer rounded border-gray-300 accent-[#5061E4]"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900">{doc.name}</p>
                  <p className="mt-0.5 text-[11px] text-gray-500">
                    {doc.type === "SOP" ? `SOP · ${doc.targetCollege}` : "Resume"}
                  </p>
                </div>
              </label>
            ))}
          </div>
        )}
      </Card>

      {/* ── Resurface previous feedback ── */}
      {previousFeedback && (
        <Card className="p-4">
          <div className="mb-3 flex items-center gap-2">
            <MessageSquareQuote className="h-4 w-4 text-[#5061E4]" />
            <h3 className="text-sm font-bold text-gray-900">Previous feedback</h3>
          </div>

          <Checkbox
            checked={value.sharedFeedbackBookingId === previousFeedback.bookingId}
            onChange={(e) =>
              onChange({
                ...value,
                sharedFeedbackBookingId: e.target.checked
                  ? previousFeedback.bookingId
                  : undefined,
              })
            }
            label="Share the feedback from our last session"
            description={`${previousFeedback.serviceName} on ${formatDate(
              previousFeedback.sessionDate
            )} — helps your mentor pick up where you left off.`}
          />
        </Card>
      )}
    </div>
  );
}
