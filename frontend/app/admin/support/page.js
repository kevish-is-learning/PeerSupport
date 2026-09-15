"use client";

import { useCallback, useEffect, useState } from "react";
import { LifeBuoy, Send } from "lucide-react";
import { toast } from "sonner";
import { adminApi } from "../../../lib/api";
import {
  Badge,
  Button,
  Card,
  EmptyState,
  Select,
  Skeleton,
  Tabs,
  Textarea,
  cx,
  formatDateTime,
} from "../../../components/ui/kit";

const STATUS_TONES = {
  OPEN: "brand",
  IN_PROGRESS: "warning",
  RESOLVED: "success",
  CLOSED: "neutral",
};

const TABS = [
  { value: "", label: "All" },
  { value: "OPEN", label: "Open" },
  { value: "IN_PROGRESS", label: "In progress" },
  { value: "RESOLVED", label: "Resolved" },
  { value: "CLOSED", label: "Closed" },
];

export default function AdminSupportPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [activeId, setActiveId] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminApi.listTickets({ status: status || undefined, limit: 50 });
      const list = res.data?.tickets || [];
      setTickets(list);
      setActiveId((current) =>
        current && list.some((t) => t.id === current) ? current : list[0]?.id ?? null
      );
    } catch (err) {
      toast.error(err.message || "Could not load tickets");
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    load();
  }, [load]);

  const active = tickets.find((t) => t.id === activeId) ?? null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <header className="mb-6">
        <h1 className="text-xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
          Support
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Reply to user tickets. Replying moves an open ticket into progress automatically.
        </p>
      </header>

      <Tabs tabs={TABS} value={status} onChange={setStatus} className="mb-6" />

      {loading && (
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-20" />
          ))}
        </div>
      )}

      {!loading && tickets.length === 0 && (
        <EmptyState icon={LifeBuoy} title="No tickets here" description="Nothing matches this filter." />
      )}

      {!loading && tickets.length > 0 && (
        <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
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
                <p className="mt-1 truncate text-[11px] text-gray-500">
                  {ticket.user?.name} · {ticket.category}
                </p>
                <p className="mt-0.5 text-[11px] text-gray-400">
                  {formatDateTime(ticket.lastMessageAt)}
                </p>
              </button>
            ))}
          </aside>

          {active && <TicketPanel ticket={active} onUpdated={load} />}
        </div>
      )}
    </div>
  );
}

function TicketPanel({ ticket, onUpdated }) {
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);
  const [updating, setUpdating] = useState(false);

  const handleReply = async () => {
    if (!reply.trim()) return;
    setSending(true);
    try {
      await adminApi.replyToTicket(ticket.id, reply.trim());
      setReply("");
      toast.success("Reply sent");
      onUpdated();
    } catch (err) {
      toast.error(err.message || "Could not send your reply");
    } finally {
      setSending(false);
    }
  };

  const handleStatus = async (next) => {
    setUpdating(true);
    try {
      await adminApi.updateTicketStatus(ticket.id, next);
      toast.success("Status updated");
      onUpdated();
    } catch (err) {
      toast.error(err.message || "Could not update the status");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <Card className="flex flex-col overflow-hidden">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-gray-100 px-5 py-4">
        <div className="min-w-0">
          <h2 className="text-sm font-bold text-gray-900">{ticket.subject}</h2>
          <p className="mt-0.5 text-[11px] text-gray-400">
            {ticket.user?.name} · {ticket.user?.email} · {ticket.category}
          </p>
        </div>
        <Select
          value={ticket.status}
          onChange={(e) => handleStatus(e.target.value)}
          disabled={updating}
          className="w-auto min-w-[140px]"
        >
          <option value="OPEN">Open</option>
          <option value="IN_PROGRESS">In progress</option>
          <option value="RESOLVED">Resolved</option>
          <option value="CLOSED">Closed</option>
        </Select>
      </div>

      <div className="max-h-[440px] flex-1 space-y-3 overflow-y-auto px-5 py-4">
        {ticket.messages.map((message) => (
          <div
            key={message.id}
            className={cx("flex", message.isStaffReply ? "justify-end" : "justify-start")}
          >
            <div
              className={cx(
                "max-w-[85%] rounded-xl px-3.5 py-2.5",
                message.isStaffReply ? "bg-[#5061E4] text-white" : "bg-gray-100 text-gray-800"
              )}
            >
              <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.body}</p>
              <p
                className={cx(
                  "mt-1 text-[10px]",
                  message.isStaffReply ? "text-white/60" : "text-gray-400"
                )}
              >
                {message.authorName} · {formatDateTime(message.createdAt)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-100 p-4">
        {ticket.status === "CLOSED" ? (
          <p className="text-center text-xs text-gray-400">
            This ticket is closed. Reopen it above to continue the conversation.
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
