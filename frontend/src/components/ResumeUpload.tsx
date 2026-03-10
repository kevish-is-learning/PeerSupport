"use client";

import { useState, useRef } from "react";
import { FileText, Loader2, Trash2, Upload, Download } from "lucide-react";
import { toast } from "sonner";
import { uploadMentorResume, uploadMenteeResume, deleteMentorResume, deleteMenteeResume } from "@/lib/uploadApi";

interface Resume {
  id?: string;
  name: string;
  fileUrl: string;
  createdAt?: string;
}

interface ResumeUploadProps {
  role: "MENTOR" | "MENTEE";
  resumes?: Resume[];
  onUploadSuccess?: (resume: Resume) => void;
  onDeleteSuccess?: (resumeId: string) => void;
  maxResumes?: number;
}

export default function ResumeUpload({
  role,
  resumes = [],
  onUploadSuccess,
  onDeleteSuccess,
  maxResumes = 5,
}: ResumeUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [resumeName, setResumeName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Please select a PDF or DOC/DOCX file");
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be less than 10MB");
      return;
    }

    // Prompt for resume name
    const name = resumeName.trim() || file.name.replace(/\.[^/.]+$/, "");
    if (!name) {
      toast.error("Please provide a name for your resume");
      return;
    }

    // Upload
    setUploading(true);
    try {
      const uploadFn = role === "MENTOR" ? uploadMentorResume : uploadMenteeResume;
      const response = await uploadFn(file, name);
      toast.success("Resume uploaded successfully!");
      onUploadSuccess?.(response.data);
      setResumeName("");
    } catch (error) {
      // Error handled by interceptor
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDelete = async (resumeId: string) => {
    setDeletingId(resumeId);
    try {
      const deleteFn = role === "MENTOR" ? deleteMentorResume : deleteMenteeResume;
      await deleteFn(resumeId);
      toast.success("Resume deleted successfully!");
      onDeleteSuccess?.(resumeId);
    } catch (error) {
      // Error handled by interceptor
    } finally {
      setDeletingId(null);
    }
  };

  const canUploadMore = resumes.length < maxResumes;
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

  return (
    <div className="space-y-4">
      {/* Upload Section */}
      {canUploadMore && (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Resume Name
            </label>
            <input
              type="text"
              value={resumeName}
              onChange={(e) => setResumeName(e.target.value)}
              placeholder="e.g., My Resume - 2026"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex flex-col items-center gap-3">
            <Upload className="w-12 h-12 text-gray-400" />
            <div className="text-center">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="text-blue-600 hover:text-blue-700 font-medium disabled:opacity-50"
              >
                Click to upload
              </button>
              <p className="text-sm text-gray-500">PDF, DOC, or DOCX (Max 10MB)</p>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={handleFileSelect}
            className="hidden"
          />

          {uploading && (
            <div className="flex items-center justify-center gap-2 text-blue-600">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Uploading...</span>
            </div>
          )}
        </div>
      )}

      {/* Resumes List */}
      {resumes.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">
            Uploaded Resumes ({resumes.length}/{maxResumes})
          </h3>
          <div className="space-y-2">
            {resumes.map((resume) => (
              <div
                key={resume.id || resume.fileUrl}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <FileText className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{resume.name}</p>
                    {resume.createdAt && (
                      <p className="text-xs text-gray-500">
                        {new Date(resume.createdAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={resume.fileUrl.startsWith("/") ? `${apiBaseUrl}${resume.fileUrl}` : resume.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4" />
                  </a>

                  {resume.id && (
                    <button
                      type="button"
                      onClick={() => handleDelete(resume.id!)}
                      disabled={deletingId === resume.id}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                    >
                      {deletingId === resume.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!canUploadMore && (
        <p className="text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-lg p-3">
          Maximum {maxResumes} resumes allowed. Delete one to upload a new one.
        </p>
      )}
    </div>
  );
}
