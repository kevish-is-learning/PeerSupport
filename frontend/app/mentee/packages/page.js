"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Layers, Clock, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { packageApi } from "../../../lib/api";
import {
  Badge,
  Button,
  Card,
  EmptyState,
  Skeleton,
  formatCurrency,
  formatDate,
  cx,
} from "../../../components/ui/kit";

const STATUS_TONES = {
  ACTIVE: "success",
  EXHAUSTED: "neutral",
  EXPIRED: "danger",
};

export default function MenteePackagesPage() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const res = await packageApi.listMyPurchases();
      setPurchases(res.data?.purchases || []);
    } catch (err) {
      toast.error(err.message || "Could not load your packages");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <header className="mb-6">
        <h1 className="text-xl font-extrabold tracking-tight text-gray-900">My Packages</h1>
        <p className="mt-1 text-sm text-gray-500">
          Session bundles you've bought. Redeem them at checkout when you book.
        </p>
      </header>

      {loading && (
        <div className="space-y-3">
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      )}

      {!loading && purchases.length === 0 && (
        <EmptyState
          icon={Layers}
          title="No packages yet"
          description="Buying a bundle works out cheaper than booking sessions one at a time."
          action={
            <Link href="/mentee/find-mentors">
              <Button size="sm">Browse mentors</Button>
            </Link>
          }
        />
      )}

      {!loading && purchases.length > 0 && (
        <div className="space-y-3">
          {purchases.map((purchase) => {
            const used = purchase.sessionsUsed;
            const total = purchase.sessionsTotal;
            const percent = Math.round((used / total) * 100);

            return (
              <Card key={purchase.id} className="p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-sm font-bold text-gray-900">{purchase.title}</h2>
                      <Badge tone={STATUS_TONES[purchase.status] || "neutral"}>
                        {purchase.status.toLowerCase()}
                      </Badge>
                    </div>
                    <p className="mt-0.5 text-xs text-gray-500">
                      {purchase.serviceName} with {purchase.mentorName}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-extrabold text-gray-900">
                      {purchase.sessionsRemaining}
                    </p>
                    <p className="-mt-0.5 text-[11px] text-gray-400">left of {total}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                    <div
                      className={cx(
                        "h-full rounded-full transition-all duration-500",
                        percent >= 100 ? "bg-gray-300" : "bg-[#5061E4]"
                      )}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-gray-500">
                  <span>Paid {formatCurrency(purchase.amount)}</span>
                  {purchase.expiresAt && (
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Valid until {formatDate(purchase.expiresAt)}
                    </span>
                  )}
                </div>

                {purchase.status === "ACTIVE" && purchase.sessionsRemaining > 0 && (
                  <Link
                    href={`/mentee/find-mentors/${purchase.mentorProfileId}`}
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#5061E4] transition-colors hover:text-[#4453cc]"
                  >
                    Book a session
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
