"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MessagesSquare, Users, Calendar, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import PublicShell from "../../components/public/PublicShell";
import { groupDiscussionApi } from "../../lib/api";
import useAuthStore from "../../store/useAuthStore";
import {
  Badge,
  Button,
  Card,
  Checkbox,
  EmptyState,
  Modal,
  Skeleton,
  Tabs,
  cx,
  formatCurrency,
  formatDateTime,
  useRazorpay,
} from "../../components/ui/kit";

export default function GroupDiscussionsPage() {
  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("upcoming");
  const [selected, setSelected] = useState(null);
  const [busyId, setBusyId] = useState(null);

  const { user } = useAuthStore();
  const router = useRouter();
  const razorpay = useRazorpay();

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await groupDiscussionApi.list({
        past: tab === "past" ? "true" : undefined,
      });
      setDiscussions(res.data?.discussions || []);
    } catch {
      setDiscussions([]);
    } finally {
      setLoading(false);
    }
  }, [tab]);

  useEffect(() => {
    load();
  }, [load]);

  const handleRegister = async (discussion, shareProfile) => {
    setBusyId(discussion.id);
    try {
      const res = await groupDiscussionApi.register(discussion.id, { shareProfile });
      const { requiresPayment, order, registration } = res.data ?? res;

      if (!requiresPayment) {
        toast.success("You're in — we'll confirm once the panel fills up");
        setSelected(null);
        load();
        return;
      }

      const result = await razorpay.open({
        order,
        name: "PeerSupport",
        description: discussion.topic,
        prefill: { name: user?.name, email: user?.email },
      });

      if (!result) {
        toast.message("Payment cancelled");
        return;
      }

      await groupDiscussionApi.verifyPayment({
        registrationId: registration.id,
        razorpayOrderId: result.razorpay_order_id,
        razorpayPaymentId: result.razorpay_payment_id,
        razorpaySignature: result.razorpay_signature,
      });

      toast.success("Registered — see you in the room");
      setSelected(null);
      load();
    } catch (err) {
      toast.error(err.message || "Could not complete your registration");
    } finally {
      setBusyId(null);
    }
  };

  const handleCancel = async (discussion) => {
    setBusyId(discussion.id);
    try {
      await groupDiscussionApi.cancelRegistration(discussion.id);
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
      title="Group Discussions"
      description="Practice GD and WAT rounds with other aspirants, moderated by mentors who have sat on the other side of the table."
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
            <Skeleton key={i} className="h-56" />
          ))}
        </div>
      )}

      {!loading && discussions.length === 0 && (
        <EmptyState
          icon={MessagesSquare}
          title={tab === "past" ? "No past discussions" : "No slots scheduled"}
          description="New GD slots open up every week — check back soon."
        />
      )}

      {!loading && discussions.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {discussions.map((discussion) => (
            <DiscussionCard
              key={discussion.id}
              discussion={discussion}
              busy={busyId === discussion.id}
              isPast={tab === "past"}
              onRegister={() => {
                if (!user) return router.push("/auth");
                setSelected(discussion);
              }}
              onCancel={() => handleCancel(discussion)}
            />
          ))}
        </div>
      )}

      <RegisterModal
        discussion={selected}
        busy={busyId === selected?.id}
        onClose={() => setSelected(null)}
        onConfirm={handleRegister}
      />
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

function DiscussionCard({ discussion, busy, isPast, onRegister, onCancel }) {
  const full = discussion.seatsLeft === 0 && !discussion.isRegistered;
  const fillPercent = Math.min(
    100,
    Math.round((discussion.registeredCount / discussion.minParticipants) * 100)
  );

  return (
    <Card interactive className="flex h-full flex-col p-4">
      <div className="mb-2 flex flex-wrap items-center gap-1.5">
        {discussion.price > 0 ? (
          <Badge tone="brand">{formatCurrency(discussion.price)}</Badge>
        ) : (
          <Badge tone="success">Free</Badge>
        )}
        {discussion.thresholdMet ? (
          <Badge tone="success">Confirmed</Badge>
        ) : (
          <Badge tone="warning">Filling up</Badge>
        )}
        {discussion.isRegistered && (
          <Badge tone="success">
            <CheckCircle2 className="h-3 w-3" /> Registered
          </Badge>
        )}
      </div>

      <h2 className="line-clamp-2 text-sm font-bold leading-snug text-gray-900">
        {discussion.topic}
      </h2>

      {discussion.description && (
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-gray-500">
          {discussion.description}
        </p>
      )}

      <div className="mt-3 space-y-1.5 text-[11px] text-gray-500">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5 shrink-0 text-gray-400" />
          {formatDateTime(discussion.startsAt)}
        </div>
        <div className="flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5 shrink-0 text-gray-400" />
          {discussion.registeredCount}/{discussion.maxParticipants} joined
        </div>
        {discussion.moderatorName && (
          <div className="text-gray-400">Moderated by {discussion.moderatorName}</div>
        )}
      </div>

      {/* Progress toward the minimum panel size the slot needs to run. */}
      <div className="mt-3">
        <div className="h-1 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className={cx(
              "h-full rounded-full transition-all duration-500",
              discussion.thresholdMet ? "bg-emerald-500" : "bg-[#5061E4]"
            )}
            style={{ width: `${fillPercent}%` }}
          />
        </div>
        <p className="mt-1.5 text-[11px] text-gray-400">
          {discussion.thresholdMet
            ? "Minimum panel reached — this slot will run"
            : `${discussion.spotsToConfirm} more to confirm this slot`}
        </p>
      </div>

      <div className="mt-auto pt-4">
        {isPast ? (
          <Button variant="secondary" size="sm" className="w-full" disabled>
            Session ended
          </Button>
        ) : discussion.isRegistered ? (
          <div className="space-y-2">
            {isRoomOpen(discussion) && (
              <Link href={`/rooms/discussion/${discussion.id}`} className="block">
                <Button size="sm" className="w-full">
                  Join room
                </Button>
              </Link>
            )}
            <Button variant="secondary" size="sm" className="w-full" loading={busy} onClick={onCancel}>
              Cancel registration
            </Button>
          </div>
        ) : (
          <Button size="sm" className="w-full" disabled={full} onClick={onRegister}>
            {full ? "Slot full" : "Reserve a spot"}
          </Button>
        )}
      </div>
    </Card>
  );
}

function RegisterModal({ discussion, busy, onClose, onConfirm }) {
  const [shareProfile, setShareProfile] = useState(true);

  useEffect(() => {
    if (discussion) setShareProfile(true);
  }, [discussion]);

  if (!discussion) return null;

  return (
    <Modal
      open
      onClose={onClose}
      title="Reserve your spot"
      description={discussion.topic}
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={busy}>
            Cancel
          </Button>
          <Button loading={busy} onClick={() => onConfirm(discussion, shareProfile)}>
            {discussion.price > 0
              ? `Pay ${formatCurrency(discussion.price)}`
              : "Confirm spot"}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <dl className="divide-y divide-gray-100 rounded-lg border border-gray-200">
          <Row label="When" value={formatDateTime(discussion.startsAt)} />
          <Row label="Panel size" value={`${discussion.minParticipants}–${discussion.maxParticipants} participants`} />
          <Row
            label="Price"
            value={discussion.price > 0 ? formatCurrency(discussion.price) : "Free"}
          />
        </dl>

        <Checkbox
          checked={shareProfile}
          onChange={(e) => setShareProfile(e.target.checked)}
          label="Share my profile with the panel"
          description="Lets the moderator and other participants see your education and skills before the discussion."
        />

        {!discussion.thresholdMet && (
          <p className="rounded-lg bg-amber-50 px-3 py-2.5 text-xs text-amber-800">
            This slot needs {discussion.spotsToConfirm} more participant
            {discussion.spotsToConfirm === 1 ? "" : "s"} to run. You'll be notified once it's
            confirmed.
          </p>
        )}
      </div>
    </Modal>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between px-3 py-2.5">
      <dt className="text-xs text-gray-500">{label}</dt>
      <dd className="text-xs font-semibold text-gray-900">{value}</dd>
    </div>
  );
}
