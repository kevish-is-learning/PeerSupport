"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Video, Users, Calendar, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import PublicShell from "../../components/public/PublicShell";
import { webinarApi } from "../../lib/api";
import useAuthStore from "../../store/useAuthStore";
import {
  Badge,
  Button,
  Card,
  EmptyState,
  Skeleton,
  Tabs,
  formatCurrency,
  formatDateTime,
  useRazorpay,
} from "../../components/ui/kit";

export default function WebinarsPage() {
  const [webinars, setWebinars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("upcoming");
  const [busyId, setBusyId] = useState(null);

  const { user } = useAuthStore();
  const router = useRouter();
  const razorpay = useRazorpay();

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await webinarApi.list({ past: tab === "past" ? "true" : undefined });
      setWebinars(res.data?.webinars || []);
    } catch {
      setWebinars([]);
    } finally {
      setLoading(false);
    }
  }, [tab]);

  useEffect(() => {
    load();
  }, [load]);

  const handleRegister = async (webinar) => {
    if (!user) {
      router.push("/auth");
      return;
    }

    setBusyId(webinar.id);
    try {
      const res = await webinarApi.register(webinar.id);
      const { requiresPayment, order, registration } = res.data ?? res;

      if (!requiresPayment) {
        toast.success("You're registered — check your email for the joining link");
        load();
        return;
      }

      const result = await razorpay.open({
        order,
        name: "PeerSupport",
        description: webinar.title,
        prefill: { name: user.name, email: user.email },
      });

      if (!result) {
        toast.message("Payment cancelled");
        return;
      }

      await webinarApi.verifyPayment({
        registrationId: registration.id,
        razorpayOrderId: result.razorpay_order_id,
        razorpayPaymentId: result.razorpay_payment_id,
        razorpaySignature: result.razorpay_signature,
      });

      toast.success("Registered — see you there");
      load();
    } catch (err) {
      toast.error(err.message || "Could not complete your registration");
    } finally {
      setBusyId(null);
    }
  };

  const handleCancel = async (webinar) => {
    setBusyId(webinar.id);
    try {
      await webinarApi.cancelRegistration(webinar.id);
      toast.success("Registration cancelled");
      load();
    } catch (err) {
      toast.error(err.message || "Could not cancel your registration");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <PublicShell
      wide
      title="Webinars"
      description="Live strategy sessions hosted by IIM alumni and CAT toppers. Join from anywhere, ask questions in real time."
    >
      <Tabs
        tabs={[
          { value: "upcoming", label: "Upcoming" },
          { value: "past", label: "Past" },
        ]}
        value={tab}
        onChange={setTab}
        className="mb-6"
      />

      {loading && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      )}

      {!loading && webinars.length === 0 && (
        <EmptyState
          icon={Video}
          title={tab === "past" ? "No past webinars" : "No webinars scheduled"}
          description="Check back soon — new sessions are announced regularly."
        />
      )}

      {!loading && webinars.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {webinars.map((webinar) => (
            <WebinarCard
              key={webinar.id}
              webinar={webinar}
              busy={busyId === webinar.id}
              isPast={tab === "past"}
              onRegister={() => handleRegister(webinar)}
              onCancel={() => handleCancel(webinar)}
            />
          ))}
        </div>
      )}
    </PublicShell>
  );
}

/** The room opens 15 minutes before the start and closes 30 after the end. */
function isRoomOpen(session) {
  const now = Date.now();
  return (
    now >= new Date(session.startsAt).getTime() - 15 * 60 * 1000 &&
    now <= new Date(session.endsAt).getTime() + 30 * 60 * 1000
  );
}

function WebinarCard({ webinar, busy, isPast, onRegister, onCancel }) {
  const full = webinar.seatsLeft === 0 && !webinar.isRegistered;

  return (
    <Card interactive className="flex h-full flex-col overflow-hidden">
      {webinar.coverImageUrl ? (
        <img src={webinar.coverImageUrl} alt="" className="h-32 w-full object-cover" />
      ) : (
        <div className="flex h-32 w-full items-center justify-center bg-gradient-to-br from-[#EEF0FE] to-[#F8F9FF]">
          <Video className="h-7 w-7 text-[#5061E4]/40" strokeWidth={1.5} />
        </div>
      )}

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex flex-wrap items-center gap-1.5">
          {webinar.isPaid ? (
            <Badge tone="brand">{formatCurrency(webinar.price)}</Badge>
          ) : (
            <Badge tone="success">Free</Badge>
          )}
          {webinar.isRegistered && (
            <Badge tone="success">
              <CheckCircle2 className="h-3 w-3" /> Registered
            </Badge>
          )}
          {full && <Badge tone="danger">Full</Badge>}
        </div>

        <h2 className="line-clamp-2 text-sm font-bold leading-snug text-gray-900">
          {webinar.title}
        </h2>

        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-gray-500">
          {webinar.description}
        </p>

        <div className="mt-3 space-y-1.5 text-[11px] text-gray-500">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 shrink-0 text-gray-400" />
            {formatDateTime(webinar.startsAt)}
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 shrink-0 text-gray-400" />
            {webinar.registeredCount} registered
            {webinar.seatsLeft !== null && ` · ${webinar.seatsLeft} seats left`}
          </div>
          {webinar.hostName && (
            <div className="text-gray-400">Hosted by {webinar.hostName}</div>
          )}
        </div>

        <div className="mt-auto pt-4">
          {isPast ? (
            <Button variant="secondary" size="sm" className="w-full" disabled>
              Session ended
            </Button>
          ) : webinar.isRegistered ? (
            <div className="space-y-2">
              {isRoomOpen(webinar) && (
                <Link href={`/rooms/webinar/${webinar.id}`} className="block">
                  <Button size="sm" className="w-full">
                    Join room
                  </Button>
                </Link>
              )}
              <Button
                variant="secondary"
                size="sm"
                className="w-full"
                loading={busy}
                onClick={onCancel}
              >
                Cancel registration
              </Button>
            </div>
          ) : (
            <Button size="sm" className="w-full" loading={busy} disabled={full} onClick={onRegister}>
              {full ? "Fully booked" : webinar.isPaid ? "Register & pay" : "Register free"}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
