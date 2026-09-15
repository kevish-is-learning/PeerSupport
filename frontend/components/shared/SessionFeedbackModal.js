"use client";

import { useEffect, useState } from "react";
import { X, Loader2, Download, FileText } from "lucide-react";
import { toast } from "sonner";
import { feedbackApi } from "../../lib/api";

const MIN_LENGTH = 20;

const FIELDS = [
  {
    key: "strengths",
    label: "Strengths",
    hint: "What did the mentee do well?",
  },
  {
    key: "weaknesses",
    label: "Areas for Improvement",
    hint: "Where should they focus next?",
  },
  {
    key: "recommendations",
    label: "Recommendations & Next Steps",
    hint: "Concrete actions, resources, or practice areas.",
  },
];

const EMPTY = { strengths: "", weaknesses: "", recommendations: "" };

/**
 * Post-session feedback. Mentors fill it in (mode="write"); mentees read it and
 * download the PDF (mode="read").
 */
export default function SessionFeedbackModal({
  bookingId,
  mode = "read",
  onClose,
  onSubmitted,
}) {
  const [form, setForm] = useState(EMPTY);
  const [existing, setExisting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const isWrite = mode === "write";

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await feedbackApi.get(bookingId);
        const feedback = res.data?.feedback;
        if (cancelled || !feedback) return;
        setExisting(feedback);
        setForm({
          strengths: feedback.strengths || "",
          weaknesses: feedback.weaknesses || "",
          recommendations: feedback.recommendations || "",
        });
      } catch {
        // 404 just means nothing has been written yet.
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [bookingId]);

  const handleSubmit = async () => {
    const short = FIELDS.find((f) => form[f.key].trim().length < MIN_LENGTH);
    if (short) {
      toast.error(`${short.label} must be at least ${MIN_LENGTH} characters`);
      return;
    }

    setSaving(true);
    try {
      const res = await feedbackApi.submit(bookingId, {
        strengths: form.strengths.trim(),
        weaknesses: form.weaknesses.trim(),
        recommendations: form.recommendations.trim(),
      });
      setExisting(res.data?.feedback || null);
      toast.success(existing ? "Feedback updated" : "Feedback shared with your mentee");
      onSubmitted?.();
      onClose?.();
    } catch (err) {
      toast.error(err.message || "Failed to submit feedback");
    } finally {
      setSaving(false);
    }
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await feedbackApi.downloadPdf(bookingId);
    } catch (err) {
      toast.error(err.message || "Failed to download feedback PDF");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="relative flex max-h-[88vh] w-full max-w-lg flex-col overflow-hidden rounded-[24px] border-2 border-black bg-white shadow-[8px_8px_0_0_#5763E6]">
        <div className="flex items-start justify-between p-6 pb-3">
          <div>
            <h2 className="text-xl font-extrabold text-gray-900">
              {isWrite ? "Session Feedback" : "Feedback from your mentor"}
            </h2>
            <p className="mt-0.5 text-xs font-medium text-gray-500">
              {isWrite
                ? "Required before you can mark this session complete."
                : "Your mentor's notes from this session."}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black bg-white transition-all hover:bg-gray-100 cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto px-6 pb-4">
          {loading && (
            <div className="flex items-center justify-center py-12 text-gray-400">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          )}

          {!loading && isWrite &&
            FIELDS.map((field) => (
              <div key={field.key}>
                <label className="mb-1.5 block text-sm font-extrabold text-gray-800">
                  {field.label}
                </label>
                <p className="mb-2 text-xs font-medium text-gray-500">{field.hint}</p>
                <textarea
                  value={form[field.key]}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, [field.key]: e.target.value }))
                  }
                  rows={4}
                  maxLength={2000}
                  placeholder={field.hint}
                  className="w-full resize-none rounded-xl border-2 border-gray-200 bg-white p-3 text-sm font-medium text-gray-900 outline-none transition-colors focus:border-[#5061E4]"
                />
                <p
                  className={`mt-1 text-right text-[11px] font-semibold ${
                    form[field.key].trim().length < MIN_LENGTH
                      ? "text-gray-400"
                      : "text-[#10B981]"
                  }`}
                >
                  {form[field.key].trim().length} / {MIN_LENGTH} min
                </p>
              </div>
            ))}

          {!loading && !isWrite && !existing && (
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 py-12 text-center">
              <FileText className="h-8 w-8 text-gray-300" />
              <p className="mt-3 text-sm font-bold text-gray-900">No feedback yet</p>
              <p className="mt-1 text-xs font-medium text-gray-500">
                Your mentor hasn&apos;t shared feedback for this session.
              </p>
            </div>
          )}

          {!loading && !isWrite && existing &&
            FIELDS.map((field) => (
              <div key={field.key}>
                <h3 className="mb-2 text-sm font-extrabold text-gray-800">
                  {field.label}
                </h3>
                <div className="rounded-xl border border-[#E5E7EB] bg-[#FAFAFF] p-4">
                  <p className="whitespace-pre-wrap text-sm font-medium leading-relaxed text-gray-700">
                    {existing[field.key] || "Not provided."}
                  </p>
                </div>
              </div>
            ))}
        </div>

        {!loading && (
          <div className="flex gap-3 border-t-2 border-black bg-gray-50 p-5">
            {existing && (
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="flex items-center justify-center gap-2 rounded-xl border-2 border-black bg-white px-4 py-3 text-sm font-extrabold text-gray-700 transition-transform hover:-translate-y-0.5 hover:bg-gray-100 disabled:opacity-50 cursor-pointer"
                style={{ boxShadow: "2px 2px 0 0 #000" }}
              >
                {downloading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Download size={16} />
                )}
                PDF
              </button>
            )}

            {isWrite ? (
              <button
                onClick={handleSubmit}
                disabled={saving}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-black bg-[#5061E4] py-3 text-sm font-extrabold text-white transition-transform hover:-translate-y-0.5 disabled:opacity-50 cursor-pointer"
                style={{ boxShadow: "2px 2px 0 0 #000" }}
              >
                {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                {existing ? "Update Feedback" : "Share Feedback"}
              </button>
            ) : (
              <button
                onClick={onClose}
                className="flex-1 rounded-xl border-2 border-black bg-white py-3 text-sm font-extrabold text-gray-700 transition-transform hover:-translate-y-0.5 hover:bg-gray-100 cursor-pointer"
                style={{ boxShadow: "2px 2px 0 0 #000" }}
              >
                Close
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
