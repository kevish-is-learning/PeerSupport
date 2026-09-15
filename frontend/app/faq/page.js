"use client";

import { useEffect, useMemo, useState } from "react";
import { HelpCircle, LifeBuoy } from "lucide-react";
import { toast } from "sonner";
import PublicShell from "../../components/public/PublicShell";
import { contentApi, supportApi } from "../../lib/api";
import useAuthStore from "../../store/useAuthStore";
import {
  Accordion,
  Button,
  Card,
  EmptyState,
  Field,
  Input,
  Modal,
  Select,
  Skeleton,
  Textarea,
  Tabs,
} from "../../components/ui/kit";

const CATEGORIES = ["General", "Booking", "Payments", "Mentors", "Technical"];

export default function FaqPage() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    contentApi
      .listFaqs()
      .then((res) => setFaqs(res.data?.faqs || []))
      .catch(() => setFaqs([]))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const present = [...new Set(faqs.map((f) => f.category))];
    return [
      { value: "all", label: "All", count: faqs.length },
      ...present.map((c) => ({
        value: c,
        label: c,
        count: faqs.filter((f) => f.category === c).length,
      })),
    ];
  }, [faqs]);

  const visible = category === "all" ? faqs : faqs.filter((f) => f.category === category);

  return (
    <PublicShell
      title="Help & FAQ"
      description="Answers to the questions we get asked most. Still stuck? Send us a message and we'll get back within 24–48 hours."
    >
      {loading && (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-14" />
          ))}
        </div>
      )}

      {!loading && faqs.length === 0 && (
        <EmptyState
          icon={HelpCircle}
          title="No FAQs published yet"
          description="In the meantime, reach out and we'll answer directly."
          action={<Button onClick={() => setContactOpen(true)}>Contact support</Button>}
        />
      )}

      {!loading && faqs.length > 0 && (
        <>
          {categories.length > 2 && (
            <Tabs tabs={categories} value={category} onChange={setCategory} className="mb-6" />
          )}

          <Accordion
            items={visible.map((faq) => ({
              id: faq.id,
              title: faq.question,
              body: faq.answer,
            }))}
          />
        </>
      )}

      <Card className="mt-10 flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EEF0FE]">
            <LifeBuoy className="h-4 w-4 text-[#5061E4]" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">Still need help?</p>
            <p className="mt-0.5 text-xs text-gray-500">
              Open a support ticket and our team will reply by email.
            </p>
          </div>
        </div>
        <Button onClick={() => setContactOpen(true)} className="shrink-0">
          Contact support
        </Button>
      </Card>

      <ContactSupportModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </PublicShell>
  );
}

function ContactSupportModal({ open, onClose }) {
  const { user } = useAuthStore();
  const [form, setForm] = useState({ subject: "", category: "General", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async () => {
    if (form.subject.trim().length < 5) {
      toast.error("Please add a subject of at least 5 characters");
      return;
    }
    if (form.message.trim().length < 10) {
      toast.error("Please describe your issue in at least 10 characters");
      return;
    }

    setSubmitting(true);
    try {
      await supportApi.create({
        subject: form.subject.trim(),
        category: form.category,
        message: form.message.trim(),
      });
      toast.success("Ticket created — we'll reply by email");
      setForm({ subject: "", category: "General", message: "" });
      onClose();
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
      title="Contact support"
      description="We reply within 24–48 hours on business days."
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={submitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} loading={submitting}>
            Send message
          </Button>
        </>
      }
    >
      {!user ? (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          Please sign in first so we can link the ticket to your account and reply to you.
        </div>
      ) : (
        <div className="space-y-4">
          <Field label="Subject" required>
            <Input
              value={form.subject}
              onChange={set("subject")}
              placeholder="Briefly, what's the issue?"
              maxLength={200}
            />
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

          <Field label="Message" required hint={`${form.message.trim().length}/4000`}>
            <Textarea
              value={form.message}
              onChange={set("message")}
              rows={5}
              maxLength={4000}
              placeholder="Give us as much detail as you can — booking IDs help."
            />
          </Field>
        </div>
      )}
    </Modal>
  );
}
