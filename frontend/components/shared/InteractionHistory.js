"use client";

import { useEffect, useState } from "react";
import { MessageSquareQuote, Star, Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { feedbackApi } from "../../lib/api";
import { Badge, Card, EmptyState, Skeleton, cx, formatDate } from "../ui/kit";

/**
 * The running record of every session between the viewer and one counterpart,
 * laid out as a thread: the mentor's feedback on one side, the mentee's review
 * on the other.
 */
export default function InteractionHistory({ counterpartId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(null);

  useEffect(() => {
    let cancelled = false;

    feedbackApi
      .getHistory(counterpartId)
      .then((res) => {
        if (!cancelled) setData(res.data);
      })
      .catch(() => {
        if (!cancelled) setData(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [counterpartId]);

  const handleDownload = async (bookingId) => {
    setDownloading(bookingId);
    try {
      await feedbackApi.downloadPdf(bookingId);
    } catch (err) {
      toast.error(err.message || "Could not download that feedback");
    } finally {
      setDownloading(null);
    }
  };

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 2 }).map((_, i) => (
          <Skeleton key={i} className="h-28" />
        ))}
      </div>
    );
  }

  const sessions = data?.sessions ?? [];

  if (sessions.length === 0) {
    return (
      <EmptyState
        icon={MessageSquareQuote}
        title="No shared sessions yet"
        description="Feedback and reviews will appear here after your first session together."
      />
    );
  }

  return (
    <div className="space-y-4">
      {sessions.map((session) => (
        <Card key={session.bookingId} className="p-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-gray-900">{session.serviceName}</p>
              <p className="mt-0.5 text-[11px] text-gray-400">{formatDate(session.startTime)}</p>
            </div>
            <Badge tone={session.status === "COMPLETED" ? "success" : "neutral"}>
              {session.status.replace(/_/g, " ").toLowerCase()}
            </Badge>
          </div>

          <div className="mt-3 space-y-3">
            {session.feedback ? (
              <Bubble side="left" author="Mentor feedback">
                <Section label="Strengths" value={session.feedback.strengths} />
                <Section label="Areas to improve" value={session.feedback.weaknesses} />
                <Section label="Recommendations" value={session.feedback.recommendations} />

                <button
                  onClick={() => handleDownload(session.bookingId)}
                  disabled={downloading === session.bookingId}
                  className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#5061E4] transition-colors hover:text-[#4453cc] disabled:opacity-50"
                >
                  {downloading === session.bookingId ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <Download className="h-3 w-3" />
                  )}
                  Download PDF
                </button>
              </Bubble>
            ) : (
              <p className="rounded-lg bg-gray-50 px-3 py-2 text-[11px] text-gray-400">
                No mentor feedback for this session.
              </p>
            )}

            {session.review && (
              <Bubble side="right" author="Mentee review">
                <div className="mb-1.5 flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={
                        i < session.review.rating
                          ? "h-3 w-3 fill-[#F59E0B] text-[#F59E0B]"
                          : "h-3 w-3 text-gray-300"
                      }
                    />
                  ))}
                </div>
                {session.review.review && (
                  <p className="text-xs leading-relaxed">{session.review.review}</p>
                )}
              </Bubble>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}

function Bubble({ side, author, children }) {
  const isLeft = side === "left";
  return (
    <div className={cx("flex", isLeft ? "justify-start" : "justify-end")}>
      <div
        className={cx(
          "max-w-[88%] rounded-xl px-3.5 py-3",
          isLeft ? "bg-gray-50 text-gray-800" : "bg-[#F8F9FF] text-gray-800 ring-1 ring-[#5061E4]/15"
        )}
      >
        <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400">
          {author}
        </p>
        {children}
      </div>
    </div>
  );
}

function Section({ label, value }) {
  if (!value) return null;
  return (
    <div className="mb-2 last:mb-0">
      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{label}</p>
      <p className="mt-0.5 whitespace-pre-wrap text-xs leading-relaxed">{value}</p>
    </div>
  );
}
