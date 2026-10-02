"use client";

import { useEffect, useState } from "react";
import { FileText, MessageSquareQuote } from "lucide-react";
import Link from "next/link";
import { menteeDocumentApi } from "../../lib/api";
import { Card, Checkbox, Skeleton, cx, formatDate } from "../ui/kit";

/**
 * The optional extras a mentee can attach while booking:
 *   - share resumes / SOPs with the mentor
 *   - resurface feedback from their last session with this mentor
 *
 * Reports selections upward via `onChange`; it owns no booking state itself.
 */
export default function BookingExtras({ mentorProfileId, value, onChange }) {
  const [documents, setDocuments] = useState({ resumes: [], sops: [] });
  const [previousFeedback, setPreviousFeedback] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const [docsRes, prevRes] = await Promise.allSettled([
        menteeDocumentApi.list(),
        menteeDocumentApi.getPreviousFeedback(mentorProfileId),
      ]);

      if (cancelled) return;

      if (docsRes.status === "fulfilled") {
        setDocuments({
          resumes: docsRes.value.data?.resumes || [],
          sops: docsRes.value.data?.sops || [],
        });
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
    // Intentionally keyed on the mentor only — re-running on every
    // `value` change would fight the caller's state.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mentorProfileId]);

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
