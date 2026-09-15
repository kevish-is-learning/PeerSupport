"use client";

import { useCallback, useEffect, useState } from "react";
import { Video, Plus, Pencil, Trash2, Users } from "lucide-react";
import { toast } from "sonner";
import { adminApi } from "../../../lib/api";
import {
  Badge,
  Button,
  Card,
  Checkbox,
  EmptyState,
  Field,
  Input,
  Modal,
  Select,
  Skeleton,
  Textarea,
  formatCurrency,
  formatDateTime,
} from "../../../components/ui/kit";

const STATUS_TONES = {
  DRAFT: "neutral",
  PUBLISHED: "success",
  LIVE: "brand",
  COMPLETED: "neutral",
  CANCELLED: "danger",
};

/** `datetime-local` wants a local "YYYY-MM-DDTHH:mm" string, not an ISO instant. */
const toLocalInput = (value) => {
  if (!value) return "";
  const d = new Date(value);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

export default function AdminWebinarsPage() {
  const [webinars, setWebinars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await adminApi.listWebinars();
      setWebinars(res.data?.webinars || []);
    } catch (err) {
      toast.error(err.message || "Could not load webinars");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleDelete = async (webinar) => {
    try {
      const res = await adminApi.deleteWebinar(webinar.id);
      toast.success(
        res.data?.cancelled
          ? "Webinar cancelled — registrants keep their record"
          : "Webinar deleted"
      );
      load();
    } catch (err) {
      toast.error(err.message || "Could not remove that webinar");
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <header className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
            Webinars
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Schedule live sessions and track registrations. Drafts stay hidden from the public site.
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
          New webinar
        </Button>
      </header>

      {loading && (
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
      )}

      {!loading && webinars.length === 0 && (
        <EmptyState
          icon={Video}
          title="No webinars yet"
          description="Schedule a session and publish it when you're ready for sign-ups."
        />
      )}

      {!loading && webinars.length > 0 && (
        <div className="space-y-2">
          {webinars.map((webinar) => (
            <Card key={webinar.id} className="flex flex-wrap items-center gap-4 p-4">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="truncate text-sm font-bold text-gray-900">{webinar.title}</h3>
                  <Badge tone={STATUS_TONES[webinar.status]}>{webinar.status.toLowerCase()}</Badge>
                  {webinar.isPaid ? (
                    <Badge tone="brand">{formatCurrency(webinar.price)}</Badge>
                  ) : (
                    <Badge tone="success">Free</Badge>
                  )}
                </div>
                <p className="mt-0.5 text-[11px] text-gray-400">
                  {formatDateTime(webinar.startsAt)}
                  {webinar.hostName && ` · ${webinar.hostName}`}
                </p>
              </div>

              <span className="inline-flex items-center gap-1.5 text-[11px] text-gray-500">
                <Users className="h-3.5 w-3.5" />
                {webinar.registeredCount}
                {webinar.capacity ? `/${webinar.capacity}` : ""}
              </span>

              <div className="flex shrink-0 gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setEditing(webinar);
                    setOpen(true);
                  }}
                >
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(webinar)}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <WebinarModal
        open={open}
        webinar={editing}
        onClose={() => setOpen(false)}
        onSaved={() => {
          setOpen(false);
          load();
        }}
      />
    </div>
  );
}

function WebinarModal({ open, webinar, onClose, onSaved }) {
  const isEdit = Boolean(webinar);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    setForm({
      title: webinar?.title ?? "",
      description: webinar?.description ?? "",
      coverImageUrl: webinar?.coverImageUrl ?? "",
      startsAt: toLocalInput(webinar?.startsAt),
      endsAt: toLocalInput(webinar?.endsAt),
      isPaid: webinar?.isPaid ?? false,
      price: String(webinar?.price ?? 0),
      capacity: webinar?.capacity ? String(webinar.capacity) : "",
      status: webinar?.status ?? "DRAFT",
    });
  }, [open, webinar]);

  const set = (key) => (e) =>
    setForm((prev) => ({
      ...prev,
      [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));

  const handleSave = async () => {
    if (form.title.trim().length < 3) return toast.error("Title is required");
    if (form.description.trim().length < 20) {
      return toast.error("Description must be at least 20 characters");
    }
    if (!form.startsAt || !form.endsAt) return toast.error("Set a start and end time");
    if (new Date(form.endsAt) <= new Date(form.startsAt)) {
      return toast.error("End time must be after the start time");
    }
    if (form.isPaid && Number(form.price) <= 0) {
      return toast.error("A paid webinar needs a price above zero");
    }

    setSaving(true);
    try {
      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        coverImageUrl: form.coverImageUrl.trim() || undefined,
        startsAt: new Date(form.startsAt).toISOString(),
        endsAt: new Date(form.endsAt).toISOString(),
        isPaid: form.isPaid,
        price: form.isPaid ? Number(form.price) : 0,
        capacity: form.capacity ? Number(form.capacity) : null,
        status: form.status,
      };

      if (isEdit) {
        await adminApi.updateWebinar(webinar.id, payload);
        toast.success("Webinar updated");
      } else {
        await adminApi.createWebinar(payload);
        toast.success("Webinar created");
      }
      onSaved();
    } catch (err) {
      toast.error(err.message || "Could not save that webinar");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="lg"
      title={isEdit ? "Edit webinar" : "New webinar"}
      description="Publish when you're ready to accept registrations."
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={handleSave} loading={saving}>
            {isEdit ? "Save changes" : "Create webinar"}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <Field label="Title" required>
          <Input value={form.title ?? ""} onChange={set("title")} maxLength={200} />
        </Field>

        <Field label="Description" required>
          <Textarea value={form.description ?? ""} onChange={set("description")} rows={4} maxLength={5000} />
        </Field>

        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Starts at" required>
            <Input type="datetime-local" value={form.startsAt ?? ""} onChange={set("startsAt")} />
          </Field>
          <Field label="Ends at" required>
            <Input type="datetime-local" value={form.endsAt ?? ""} onChange={set("endsAt")} />
          </Field>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Cover image URL">
            <Input value={form.coverImageUrl ?? ""} onChange={set("coverImageUrl")} placeholder="https://…" />
          </Field>
          <Field label="Capacity" hint="Leave blank for unlimited">
            <Input type="number" min={1} value={form.capacity ?? ""} onChange={set("capacity")} />
          </Field>
        </div>

        <Checkbox
          checked={form.isPaid ?? false}
          onChange={set("isPaid")}
          label="Paid webinar"
          description="Registrants pay through Razorpay before their seat is confirmed."
        />

        {form.isPaid && (
          <Field label="Price (₹)" required>
            <Input type="number" min={1} value={form.price ?? ""} onChange={set("price")} />
          </Field>
        )}

        <Field label="Status">
          <Select value={form.status ?? "DRAFT"} onChange={set("status")}>
            <option value="DRAFT">Draft — hidden</option>
            <option value="PUBLISHED">Published — open for registration</option>
            <option value="LIVE">Live</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </Select>
        </Field>
      </div>
    </Modal>
  );
}
