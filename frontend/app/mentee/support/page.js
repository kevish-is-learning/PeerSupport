"use client";

import { useCallback, useEffect, useState } from "react";
import { LifeBuoy, Plus, Send } from "lucide-react";
import { toast } from "sonner";
import { supportApi } from "../../../lib/api";
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
  formatDateTime,
} from "../../../components/ui/kit";

const CATEGORIES = ["General", "Booking", "Payments", "Mentors", "Technical"];

const STATUS_TONES = {
  OPEN: "brand",
  IN_PROGRESS: "warning",
  RESOLVED: "success",
  CLOSED: "neutral",
};

export default function MenteeSupportPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState(null);
  const [newOpen, setNewOpen] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await supportApi.listMine();
      const list = res.data?.tickets || [];
      setTickets(list);
      setActiveId((current) => current ?? list[0]?.id ?? null);
    } catch (err) {
      toast.error(err.message || "Could not load your tickets");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const active = tickets.find((t) => t.id === activeId) ?? null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <header className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-gray-900">Support</h1>
          <p className="mt-1 text-sm text-gray-500">
            We reply within 24–48 hours on business days.
          </p>
        </div>
        <Button size="sm" onClick={() => setNewOpen(true)} className="shrink-0">
          <Plus className="h-4 w-4" />
          New ticket
        </Button>
      </header>

      {loading && (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-20" />
          ))}
        </div>
      )}

      {!loading && tickets.length === 0 && (
        <EmptyState
          icon={LifeBuoy}
          title="No tickets yet"
          description="Ran into a problem? Open a ticket and we'll help you out."
          action={
            <Button size="sm" onClick={() => setNewOpen(true)}>
              Open a ticket
            </Button>
          }
        />
      )}

      {!loading && tickets.length > 0 && (
        <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
          <aside className="space-y-2">
            {tickets.map((ticket) => (
              <button
                key={ticket.id}
                onClick={() => setActiveId(ticket.id)}
                className={cx(
                  "w-full rounded-lg border p-3 text-left transition-all",
                  ticket.id === activeId
                    ? "border-[#5061E4] bg-[#F8F9FF]"
                    : "border-gray-200 bg-white hover:border-gray-300"
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="line-clamp-1 text-xs font-bold text-gray-900">{ticket.subject}</p>
                  <Badge tone={STATUS_TONES[ticket.status]}>
                    {ticket.status.replace("_", " ").toLowerCase()}
                  </Badge>
                </div>
                <p className="mt-1 text-[11px] text-gray-400">
                  {ticket.messages.length} message{ticket.messages.length === 1 ? "" : "s"} ·{" "}
                  {formatDateTime(ticket.lastMessageAt)}
                </p>
              </button>
            ))}
          </aside>

          {active && <TicketThread ticket={active} onUpdated={load} />}
        </div>
      )}

      <NewTicketModal
        open={newOpen}
        onClose={() => setNewOpen(false)}
        onCreated={(ticket) => {
          setNewOpen(false);
          setActiveId(ticket.id);
          load();
        }}
      />
    </div>
  );
}

function TicketThread({ ticket, onUpdated }) {
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);

  const closed = ticket.status === "CLOSED";

  const handleReply = async () => {
    if (!reply.trim()) return;

    setSending(true);
    try {
      await supportApi.reply(ticket.id, reply.trim());
      setReply("");
      onUpdated();
    } catch (err) {
      toast.error(err.message || "Could not send your reply");
    } finally {
      setSending(false);
    }
  };

  return (
    <Card className="flex flex-col overflow-hidden">
      <div className="border-b border-gray-100 px-5 py-4">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-sm font-bold text-gray-900">{ticket.subject}</h2>
          <Badge tone={STATUS_TONES[ticket.status]}>
            {ticket.status.replace("_", " ").toLowerCase()}
          </Badge>
        </div>
        <p className="mt-0.5 text-[11px] text-gray-400">
          {ticket.category} · opened {formatDateTime(ticket.createdAt)}
        </p>
      </div>

      <div className="max-h-[420px] flex-1 space-y-3 overflow-y-auto px-5 py-4">
        {ticket.messages.map((message) => (
          <div
            key={message.id}
            className={cx("flex", message.isStaffReply ? "justify-start" : "justify-end")}
          >
            <div
              className={cx(
                "max-w-[85%] rounded-xl px-3.5 py-2.5",
                message.isStaffReply
                  ? "bg-gray-100 text-gray-800"
                  : "bg-[#5061E4] text-white"
              )}
            >
              <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.body}</p>
              <p
                className={cx(
                  "mt-1 text-[10px]",
                  message.isStaffReply ? "text-gray-400" : "text-white/60"
                )}
              >
                {message.isStaffReply ? "PeerSupport team" : "You"} ·{" "}
                {formatDateTime(message.createdAt)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-100 p-4">
        {closed ? (
          <p className="text-center text-xs text-gray-400">
            This ticket is closed. Open a new one if you need more help.
          </p>
        ) : (
          <div className="flex items-end gap-2">
            <Textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              rows={2}
              maxLength={4000}
              placeholder="Write a reply…"
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleReply();
              }}
            />
            <Button onClick={handleReply} loading={sending} disabled={!reply.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}

function NewTicketModal({ open, onClose, onCreated }) {
  const [form, setForm] = useState({ subject: "", category: "General", message: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open) setForm({ subject: "", category: "General", message: "" });
  }, [open]);

  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async () => {
    if (form.subject.trim().length < 5) return toast.error("Subject must be at least 5 characters");
    if (form.message.trim().length < 10) return toast.error("Please add a bit more detail");

    setSubmitting(true);
    try {
      const res = await supportApi.create({
        subject: form.subject.trim(),
        category: form.category,
        message: form.message.trim(),
      });
      toast.success("Ticket created");
      onCreated(res.data.ticket);
    } catch (err) {
      toast.error(err.message || "Could not create your ticket");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="New support ticket"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={submitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} loading={submitting}>
            Create ticket
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <Field label="Subject" required>
          <Input value={form.subject} onChange={set("subject")} maxLength={200} />
        </Field>
        <Field label="Category">
          <Select value={form.category} onChange={set("category")}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Message" required>
          <Textarea value={form.message} onChange={set("message")} rows={5} maxLength={4000} />
        </Field>
      </div>
    </Modal>
  );
}
