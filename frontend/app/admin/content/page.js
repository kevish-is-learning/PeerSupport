"use client";

import { useCallback, useEffect, useState } from "react";
import { FileText, Plus, Pencil, Trash2, Quote, HelpCircle } from "lucide-react";
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
  Tabs,
  Textarea,
  formatDate,
} from "../../../components/ui/kit";

const TABS = [
  { value: "posts", label: "Articles" },
  { value: "faqs", label: "FAQs" },
  { value: "testimonials", label: "Testimonials" },
];

export default function AdminContentPage() {
  const [tab, setTab] = useState("posts");

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <header className="mb-6">
        <h1 className="text-xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
          Content
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Blog articles, help centre FAQs and homepage testimonials.
        </p>
      </header>

      <Tabs tabs={TABS} value={tab} onChange={setTab} className="mb-6" />

      {tab === "posts" && <PostsPanel />}
      {tab === "faqs" && <FaqsPanel />}
      {tab === "testimonials" && <TestimonialsPanel />}
    </div>
  );
}

/* ─── Articles ────────────────────────────────────────────────────────────── */

function PostsPanel() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await adminApi.listPosts({ limit: 50 });
      setPosts(res.data?.posts || []);
    } catch (err) {
      toast.error(err.message || "Could not load articles");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleDelete = async (post) => {
    try {
      await adminApi.deletePost(post.id);
      toast.success("Article deleted");
      load();
    } catch (err) {
      toast.error(err.message || "Could not delete that article");
    }
  };

  return (
    <>
      <div className="mb-4 flex justify-end">
        <Button
          size="sm"
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
        >
          <Plus className="h-4 w-4" />
          New article
        </Button>
      </div>

      {loading && <ListSkeleton />}

      {!loading && posts.length === 0 && (
        <EmptyState
          icon={FileText}
          title="No articles yet"
          description="Publish CAT prep guides to bring organic traffic to the platform."
        />
      )}

      {!loading && posts.length > 0 && (
        <div className="space-y-2">
          {posts.map((post) => (
            <Card key={post.id} className="flex items-center gap-4 p-4">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="truncate text-sm font-bold text-gray-900">{post.title}</h3>
                  <Badge tone={post.status === "PUBLISHED" ? "success" : "neutral"}>
                    {post.status.toLowerCase()}
                  </Badge>
                </div>
                <p className="mt-0.5 text-[11px] text-gray-400">
                  {post.readingMinutes} min read
                  {post.publishedAt && ` · ${formatDate(post.publishedAt)}`}
                  {post.tags?.length > 0 && ` · ${post.tags.join(", ")}`}
                </p>
              </div>

              <div className="flex shrink-0 gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setEditing(post);
                    setOpen(true);
                  }}
                >
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(post)}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <PostModal
        open={open}
        post={editing}
        onClose={() => setOpen(false)}
        onSaved={() => {
          setOpen(false);
          load();
        }}
      />
    </>
  );
}

function PostModal({ open, post, onClose, onSaved }) {
  const isEdit = Boolean(post);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    setForm({
      title: post?.title ?? "",
      excerpt: post?.excerpt ?? "",
      content: post?.content ?? "",
      coverImageUrl: post?.coverImageUrl ?? "",
      tags: post?.tags?.join(", ") ?? "",
      status: post?.status ?? "DRAFT",
    });
  }, [open, post]);

  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSave = async () => {
    if (form.title.trim().length < 3) return toast.error("Title is required");
    if (form.content.trim().length < 50) return toast.error("Body must be at least 50 characters");

    setSaving(true);
    try {
      const payload = {
        title: form.title.trim(),
        excerpt: form.excerpt.trim() || undefined,
        content: form.content.trim(),
        coverImageUrl: form.coverImageUrl.trim() || undefined,
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        status: form.status,
      };

      if (isEdit) {
        await adminApi.updatePost(post.id, payload);
        toast.success("Article updated");
      } else {
        await adminApi.createPost(payload);
        toast.success("Article created");
      }
      onSaved();
    } catch (err) {
      toast.error(err.message || "Could not save that article");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="lg"
      title={isEdit ? "Edit article" : "New article"}
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={handleSave} loading={saving}>
            {isEdit ? "Save changes" : "Create article"}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <Field label="Title" required>
          <Input value={form.title ?? ""} onChange={set("title")} maxLength={200} />
        </Field>

        <Field label="Excerpt" hint="Shown on the article card and in search results">
          <Textarea value={form.excerpt ?? ""} onChange={set("excerpt")} rows={2} maxLength={400} />
        </Field>

        <Field label="Body" required hint="Separate paragraphs with a blank line">
          <Textarea value={form.content ?? ""} onChange={set("content")} rows={12} />
        </Field>

        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Cover image URL">
            <Input value={form.coverImageUrl ?? ""} onChange={set("coverImageUrl")} placeholder="https://…" />
          </Field>
          <Field label="Tags" hint="Comma separated">
            <Input value={form.tags ?? ""} onChange={set("tags")} placeholder="Quant, Strategy" />
          </Field>
        </div>

        <Field label="Status">
          <Select value={form.status ?? "DRAFT"} onChange={set("status")}>
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </Select>
        </Field>
      </div>
    </Modal>
  );
}

/* ─── FAQs ────────────────────────────────────────────────────────────────── */

function FaqsPanel() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await adminApi.listFaqs();
      setFaqs(res.data?.faqs || []);
    } catch (err) {
      toast.error(err.message || "Could not load FAQs");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleDelete = async (faq) => {
    try {
      await adminApi.deleteFaq(faq.id);
      toast.success("FAQ deleted");
      load();
    } catch (err) {
      toast.error(err.message || "Could not delete that FAQ");
    }
  };

  return (
    <>
      <div className="mb-4 flex justify-end">
        <Button
          size="sm"
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
        >
          <Plus className="h-4 w-4" />
          New FAQ
        </Button>
      </div>

      {loading && <ListSkeleton />}

      {!loading && faqs.length === 0 && (
        <EmptyState icon={HelpCircle} title="No FAQs yet" description="Answer the questions users ask most." />
      )}

      {!loading && faqs.length > 0 && (
        <div className="space-y-2">
          {faqs.map((faq) => (
            <Card key={faq.id} className="flex items-start gap-4 p-4">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-sm font-bold text-gray-900">{faq.question}</h3>
                  <Badge tone="neutral">{faq.category}</Badge>
                  {!faq.isPublished && <Badge tone="warning">hidden</Badge>}
                </div>
                <p className="mt-1 line-clamp-2 text-xs text-gray-500">{faq.answer}</p>
              </div>

              <div className="flex shrink-0 gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setEditing(faq);
                    setOpen(true);
                  }}
                >
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(faq)}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <FaqModal
        open={open}
        faq={editing}
        onClose={() => setOpen(false)}
        onSaved={() => {
          setOpen(false);
          load();
        }}
      />
    </>
  );
}

function FaqModal({ open, faq, onClose, onSaved }) {
  const isEdit = Boolean(faq);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    setForm({
      question: faq?.question ?? "",
      answer: faq?.answer ?? "",
      category: faq?.category ?? "General",
      sortOrder: String(faq?.sortOrder ?? 0),
      isPublished: faq?.isPublished ?? true,
    });
  }, [open, faq]);

  const set = (key) => (e) =>
    setForm((prev) => ({
      ...prev,
      [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));

  const handleSave = async () => {
    if (form.question.trim().length < 5) return toast.error("Question is required");
    if (form.answer.trim().length < 5) return toast.error("Answer is required");

    setSaving(true);
    try {
      const payload = {
        question: form.question.trim(),
        answer: form.answer.trim(),
        category: form.category.trim() || "General",
        sortOrder: Number(form.sortOrder) || 0,
        isPublished: form.isPublished,
      };

      if (isEdit) {
        await adminApi.updateFaq(faq.id, payload);
        toast.success("FAQ updated");
      } else {
        await adminApi.createFaq(payload);
        toast.success("FAQ created");
      }
      onSaved();
    } catch (err) {
      toast.error(err.message || "Could not save that FAQ");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit FAQ" : "New FAQ"}
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={handleSave} loading={saving}>
            Save
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <Field label="Question" required>
          <Input value={form.question ?? ""} onChange={set("question")} maxLength={300} />
        </Field>
        <Field label="Answer" required>
          <Textarea value={form.answer ?? ""} onChange={set("answer")} rows={5} maxLength={3000} />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Category">
            <Input value={form.category ?? ""} onChange={set("category")} maxLength={60} />
          </Field>
          <Field label="Sort order" hint="Lower shows first">
            <Input type="number" value={form.sortOrder ?? "0"} onChange={set("sortOrder")} />
          </Field>
        </div>
        <Checkbox checked={form.isPublished ?? true} onChange={set("isPublished")} label="Published" />
      </div>
    </Modal>
  );
}

/* ─── Testimonials ────────────────────────────────────────────────────────── */

function TestimonialsPanel() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await adminApi.listTestimonials();
      setItems(res.data?.testimonials || []);
    } catch (err) {
      toast.error(err.message || "Could not load testimonials");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleDelete = async (item) => {
    try {
      await adminApi.deleteTestimonial(item.id);
      toast.success("Testimonial deleted");
      load();
    } catch (err) {
      toast.error(err.message || "Could not delete that testimonial");
    }
  };

  return (
    <>
      <div className="mb-4 flex justify-end">
        <Button
          size="sm"
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
        >
          <Plus className="h-4 w-4" />
          New testimonial
        </Button>
      </div>

      {loading && <ListSkeleton />}

      {!loading && items.length === 0 && (
        <EmptyState
          icon={Quote}
          title="No testimonials yet"
          description="Published testimonials appear on the homepage."
        />
      )}

      {!loading && items.length > 0 && (
        <div className="space-y-2">
          {items.map((item) => (
            <Card key={item.id} className="flex items-start gap-4 p-4">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-sm font-bold text-gray-900">{item.authorName}</h3>
                  {item.authorRole && <Badge tone="neutral">{item.authorRole}</Badge>}
                  {!item.isPublished && <Badge tone="warning">hidden</Badge>}
                </div>
                <p className="mt-1 line-clamp-2 text-xs italic text-gray-500">“{item.quote}”</p>
              </div>

              <div className="flex shrink-0 gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setEditing(item);
                    setOpen(true);
                  }}
                >
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(item)}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <TestimonialModal
        open={open}
        item={editing}
        onClose={() => setOpen(false)}
        onSaved={() => {
          setOpen(false);
          load();
        }}
      />
    </>
  );
}

function TestimonialModal({ open, item, onClose, onSaved }) {
  const isEdit = Boolean(item);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    setForm({
      authorName: item?.authorName ?? "",
      authorRole: item?.authorRole ?? "",
      authorImageUrl: item?.authorImageUrl ?? "",
      quote: item?.quote ?? "",
      rating: String(item?.rating ?? 5),
      sortOrder: String(item?.sortOrder ?? 0),
      isPublished: item?.isPublished ?? true,
    });
  }, [open, item]);

  const set = (key) => (e) =>
    setForm((prev) => ({
      ...prev,
      [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));

  const handleSave = async () => {
    if (form.authorName.trim().length < 2) return toast.error("Author name is required");
    if (form.quote.trim().length < 10) return toast.error("Quote must be at least 10 characters");

    setSaving(true);
    try {
      const payload = {
        authorName: form.authorName.trim(),
        authorRole: form.authorRole.trim() || undefined,
        authorImageUrl: form.authorImageUrl.trim() || undefined,
        quote: form.quote.trim(),
        rating: Number(form.rating) || 5,
        sortOrder: Number(form.sortOrder) || 0,
        isPublished: form.isPublished,
      };

      if (isEdit) {
        await adminApi.updateTestimonial(item.id, payload);
        toast.success("Testimonial updated");
      } else {
        await adminApi.createTestimonial(payload);
        toast.success("Testimonial created");
      }
      onSaved();
    } catch (err) {
      toast.error(err.message || "Could not save that testimonial");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit testimonial" : "New testimonial"}
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={handleSave} loading={saving}>
            Save
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Author name" required>
            <Input value={form.authorName ?? ""} onChange={set("authorName")} maxLength={120} />
          </Field>
          <Field label="Role" hint="e.g. IIM-A '26">
            <Input value={form.authorRole ?? ""} onChange={set("authorRole")} maxLength={160} />
          </Field>
        </div>

        <Field label="Quote" required>
          <Textarea value={form.quote ?? ""} onChange={set("quote")} rows={4} maxLength={1000} />
        </Field>

        <div className="grid gap-3 sm:grid-cols-3">
          <Field label="Photo URL">
            <Input value={form.authorImageUrl ?? ""} onChange={set("authorImageUrl")} placeholder="https://…" />
          </Field>
          <Field label="Rating">
            <Select value={form.rating ?? "5"} onChange={set("rating")}>
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>
                  {r} star{r === 1 ? "" : "s"}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Sort order">
            <Input type="number" value={form.sortOrder ?? "0"} onChange={set("sortOrder")} />
          </Field>
        </div>

        <Checkbox checked={form.isPublished ?? true} onChange={set("isPublished")} label="Published" />
      </div>
    </Modal>
  );
}

function ListSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-20" />
      ))}
    </div>
  );
}
