"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FileText, Plus, Trash2, Upload, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { menteeDocumentApi, API_BASE_URL } from "../../lib/api";
import {
  Badge,
  Button,
  Card,
  EmptyState,
  Field,
  Input,
  Modal,
  Skeleton,
  Tabs,
} from "../ui/kit";

/**
 * Manages a mentee's named resumes and college-specific SOPs.
 * Resumes are universal; an SOP is tied to the college it was written for.
 */
export default function DocumentManager() {
  const [documents, setDocuments] = useState({ resumes: [], sops: [] });
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("RESUME");
  const [addOpen, setAddOpen] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await menteeDocumentApi.list();
      setDocuments({ resumes: res.data?.resumes || [], sops: res.data?.sops || [] });
    } catch (err) {
      // A mentee who hasn't finished onboarding has no profile yet.
      if (err.status !== 404) toast.error(err.message || "Could not load your documents");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleDelete = async (doc) => {
    try {
      await menteeDocumentApi.remove(doc.id);
      toast.success(`${doc.name} deleted`);
      load();
    } catch (err) {
      toast.error(err.message || "Could not delete that document");
    }
  };

  const items = tab === "RESUME" ? documents.resumes : documents.sops;

  return (
    <Card className="p-5">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-gray-900">Documents</h2>
          <p className="mt-0.5 text-xs text-gray-500">
            Keep multiple versions on file and pick which ones to share when you book.
          </p>
        </div>
        <Button size="sm" onClick={() => setAddOpen(true)} className="shrink-0">
          <Plus className="h-4 w-4" />
          Add
        </Button>
      </div>

      <Tabs
        tabs={[
          { value: "RESUME", label: "Resumes", count: documents.resumes.length },
          { value: "SOP", label: "SOPs", count: documents.sops.length },
        ]}
        value={tab}
        onChange={setTab}
        className="mb-4"
      />

      {loading && (
        <div className="space-y-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="h-16" />
          ))}
        </div>
      )}

      {!loading && items.length === 0 && (
        <EmptyState
          icon={FileText}
          title={tab === "RESUME" ? "No resumes yet" : "No SOPs yet"}
          description={
            tab === "RESUME"
              ? "Upload a resume so mentors can review it before your session."
              : "SOPs are college-specific — add one per application."
          }
          action={
            <Button size="sm" onClick={() => setAddOpen(true)}>
              Add {tab === "RESUME" ? "resume" : "SOP"}
            </Button>
          }
        />
      )}

      {!loading && items.length > 0 && (
        <ul className="space-y-2">
          {items.map((doc) => (
            <li
              key={doc.id}
              className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 transition-colors hover:border-gray-300"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EEF0FE]">
                <FileText className="h-4 w-4 text-[#5061E4]" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-gray-900">{doc.name}</p>
                {doc.targetCollege && (
                  <Badge tone="neutral" className="mt-0.5">
                    {doc.targetCollege}
                  </Badge>
                )}
              </div>

              <a
                href={doc.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${doc.name}`}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
              <button
                onClick={() => handleDelete(doc)}
                aria-label={`Delete ${doc.name}`}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <AddDocumentModal
        open={addOpen}
        defaultType={tab}
        onClose={() => setAddOpen(false)}
        onAdded={() => {
          setAddOpen(false);
          load();
        }}
      />
    </Card>
  );
}

function AddDocumentModal({ open, defaultType, onClose, onAdded }) {
  const [type, setType] = useState(defaultType);
  const [name, setName] = useState("");
  const [targetCollege, setTargetCollege] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef(null);

  useEffect(() => {
    if (open) {
      setType(defaultType);
      setName("");
      setTargetCollege("");
      setFileUrl("");
    }
  }, [open, defaultType]);

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const body = new FormData();
      body.append("file", file);
      body.append("folder", "general");

      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: "POST",
        credentials: "include",
        body,
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload?.message || "Upload failed");

      setFileUrl(payload.url);
      if (!name) setName(file.name.replace(/\.[^.]+$/, ""));
      toast.success("File uploaded");
    } catch (err) {
      toast.error(err.message || "Could not upload that file");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const handleSave = async () => {
    if (name.trim().length < 2) return toast.error("Give this document a name");
    if (!fileUrl) return toast.error("Upload a file first");
    if (type === "SOP" && !targetCollege.trim()) {
      return toast.error("An SOP needs the college it was written for");
    }

    setSaving(true);
    try {
      await menteeDocumentApi.add({
        type,
        name: name.trim(),
        fileUrl,
        targetCollege: type === "SOP" ? targetCollege.trim() : undefined,
      });
      toast.success("Document added");
      onAdded();
    } catch (err) {
      toast.error(err.message || "Could not save that document");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add a document"
      description="Uploads are private until you share them on a booking."
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={handleSave} loading={saving}>
            Save document
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {["RESUME", "SOP"].map((option) => (
            <button
              key={option}
              onClick={() => setType(option)}
              className={`rounded-lg border px-3 py-2.5 text-sm font-semibold transition-all ${
                type === option
                  ? "border-[#5061E4] bg-[#EEF0FE] text-[#5061E4]"
                  : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
              }`}
            >
              {option === "RESUME" ? "Resume" : "SOP"}
            </button>
          ))}
        </div>

        <Field
          label="Name"
          required
          hint={type === "RESUME" ? "e.g. Consulting resume v3" : "e.g. IIM-A SOP final"}
        >
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Give it a name you'll recognise"
            maxLength={120}
          />
        </Field>

        {type === "SOP" && (
          <Field label="Target college" required>
            <Input
              value={targetCollege}
              onChange={(e) => setTargetCollege(e.target.value)}
              placeholder="e.g. IIM Ahmedabad"
              maxLength={160}
            />
          </Field>
        )}

        <Field label="File" required hint="PDF, DOC or DOCX, up to 5 MB">
          <div className="flex items-center gap-2">
            <input
              ref={fileRef}
              type="file"
              accept=".pdf,.doc,.docx,image/*"
              onChange={handleUpload}
              className="hidden"
              id="document-upload"
            />
            <label
              htmlFor="document-upload"
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
            >
              <Upload className="h-4 w-4" />
              {uploading ? "Uploading…" : "Choose file"}
            </label>
            {fileUrl && <Badge tone="success">Uploaded</Badge>}
          </div>
        </Field>
      </div>
    </Modal>
  );
}
