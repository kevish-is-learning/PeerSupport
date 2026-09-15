"use client";

import { useCallback, useEffect, useState } from "react";
import { MessagesSquare, Plus, Pencil, Trash2, Users } from "lucide-react";
import { toast } from "sonner";
import { adminApi } from "../../../lib/api";
import {
  Badge,
  Button,
  Card,
  EmptyState,
  Field,
  Input,
  Modal,
  Select,
  Skeleton,
  Textarea,
  cx,
  formatCurrency,
  formatDateTime,
} from "../../../components/ui/kit";

const STATUS_TONES = {
  SCHEDULED: "warning",
  CONFIRMED: "success",
  LIVE: "brand",
  COMPLETED: "neutral",
  CANCELLED: "danger",
};

const toLocalInput = (value) => {
  if (!value) return "";
  const d = new Date(value);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

export default function AdminGroupDiscussionsPage() {
  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await adminApi.listDiscussions();
      setDiscussions(res.data?.discussions || []);
    } catch (err) {
      toast.error(err.message || "Could not load group discussions");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleDelete = async (discussion) => {
    try {
      const res = await adminApi.deleteDiscussion(discussion.id);
      toast.success(
        res.data?.cancelled ? "Slot cancelled — registrants keep their record" : "Slot deleted"
      );
      load();
    } catch (err) {
      toast.error(err.message || "Could not remove that slot");
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <header className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
            Group Discussions
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            A slot confirms automatically once it reaches its minimum panel size.
          </p>
        </div>
        <Button
          size="sm"
          className="shrink-0"
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
        >
          <Plus className="h-4 w-4" />
          New slot
        </Button>
      </header>

      {loading && (
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
      )}

      {!loading && discussions.length === 0 && (
        <EmptyState
          icon={MessagesSquare}
          title="No slots yet"
          description="Open a GD/WAT practice slot for aspirants to join."
        />
      )}

      {!loading && discussions.length > 0 && (
        <div className="space-y-2">
          {discussions.map((gd) => {
            const percent = Math.min(
              100,
              Math.round((gd.registeredCount / gd.minParticipants) * 100)
            );

            return (
              <Card key={gd.id} className="p-4">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="truncate text-sm font-bold text-gray-900">{gd.topic}</h3>
                      <Badge tone={STATUS_TONES[gd.status]}>{gd.status.toLowerCase()}</Badge>
                      {gd.price > 0 ? (
                        <Badge tone="brand">{formatCurrency(gd.price)}</Badge>
                      ) : (
                        <Badge tone="success">Free</Badge>
                      )}
                    </div>
                    <p className="mt-0.5 text-[11px] text-gray-400">
                      {formatDateTime(gd.startsAt)}
                      {gd.moderatorName && ` · ${gd.moderatorName}`}
                    </p>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-[11px] text-gray-500">
                    <Users className="h-3.5 w-3.5" />
                    {gd.registeredCount}/{gd.maxParticipants}
                  </span>

                  <div className="flex shrink-0 gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditing(gd);
                        setOpen(true);
                      }}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(gd)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="h-1 w-full overflow-hidden rounded-full bg-gray-100">
                    <div
                      className={cx(
                        "h-full rounded-full transition-all duration-500",
                        gd.thresholdMet ? "bg-emerald-500" : "bg-[#5061E4]"
                      )}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <p className="mt-1 text-[11px] text-gray-400">
                    {gd.thresholdMet
                      ? "Minimum panel reached"
                      : `${gd.spotsToConfirm} more needed to confirm (min ${gd.minParticipants})`}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      <DiscussionModal
        open={open}
        discussion={editing}
        onClose={() => setOpen(false)}
        onSaved={() => {
          setOpen(false);
          load();
        }}
      />
    </div>
  );
}

function DiscussionModal({ open, discussion, onClose, onSaved }) {
  const isEdit = Boolean(discussion);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    setForm({
      topic: discussion?.topic ?? "",
      description: discussion?.description ?? "",
      startsAt: toLocalInput(discussion?.startsAt),
      endsAt: toLocalInput(discussion?.endsAt),
      minParticipants: String(discussion?.minParticipants ?? 6),
      maxParticipants: String(discussion?.maxParticipants ?? 12),
      price: String(discussion?.price ?? 0),
      status: discussion?.status ?? "SCHEDULED",
    });
  }, [open, discussion]);

  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSave = async () => {
    if (form.topic.trim().length < 3) return toast.error("Topic is required");
    if (!form.startsAt || !form.endsAt) return toast.error("Set a start and end time");
    if (new Date(form.endsAt) <= new Date(form.startsAt)) {
      return toast.error("End time must be after the start time");
    }

    const min = Number(form.minParticipants);
    const max = Number(form.maxParticipants);
    if (max < min) return toast.error("Maximum must be at least the minimum");

    setSaving(true);
    try {
      const payload = {
        topic: form.topic.trim(),
        description: form.description.trim() || undefined,
        startsAt: new Date(form.startsAt).toISOString(),
        endsAt: new Date(form.endsAt).toISOString(),
        minParticipants: min,
        maxParticipants: max,
        price: Number(form.price) || 0,
        status: form.status,
      };

      if (isEdit) {
        await adminApi.updateDiscussion(discussion.id, payload);
        toast.success("Slot updated");
      } else {
        await adminApi.createDiscussion(payload);
        toast.success("Slot created");
      }
      onSaved();
    } catch (err) {
      toast.error(err.message || "Could not save that slot");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="lg"
      title={isEdit ? "Edit slot" : "New GD slot"}
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={handleSave} loading={saving}>
            {isEdit ? "Save changes" : "Create slot"}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <Field label="Topic" required>
          <Input
            value={form.topic ?? ""}
            onChange={set("topic")}
            placeholder="e.g. Is remote work here to stay?"
            maxLength={200}
          />
        </Field>

        <Field label="Description">
          <Textarea value={form.description ?? ""} onChange={set("description")} rows={3} maxLength={3000} />
        </Field>

        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Starts at" required>
            <Input type="datetime-local" value={form.startsAt ?? ""} onChange={set("startsAt")} />
          </Field>
          <Field label="Ends at" required>
            <Input type="datetime-local" value={form.endsAt ?? ""} onChange={set("endsAt")} />
          </Field>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <Field label="Min participants" hint="Threshold to confirm">
            <Input
              type="number"
              min={2}
              max={50}
              value={form.minParticipants ?? ""}
              onChange={set("minParticipants")}
            />
          </Field>
          <Field label="Max participants">
            <Input
              type="number"
              min={2}
              max={50}
              value={form.maxParticipants ?? ""}
              onChange={set("maxParticipants")}
            />
          </Field>
          <Field label="Price (₹)" hint="0 for free">
            <Input type="number" min={0} value={form.price ?? ""} onChange={set("price")} />
          </Field>
        </div>

        <Field label="Status">
          <Select value={form.status ?? "SCHEDULED"} onChange={set("status")}>
            <option value="SCHEDULED">Scheduled — filling up</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="LIVE">Live</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </Select>
        </Field>
      </div>
    </Modal>
  );
}
