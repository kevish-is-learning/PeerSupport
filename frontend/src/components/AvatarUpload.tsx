"use client";

import { useState, useRef } from "react";
import { Camera, Loader2, Trash2, User } from "lucide-react";
import { toast } from "sonner";
import { uploadAvatar, deleteAvatar } from "@/lib/uploadApi";
import Image from "next/image";

interface AvatarUploadProps {
  currentAvatar?: string | null;
  onUploadSuccess?: (avatarUrl: string) => void;
  onDeleteSuccess?: () => void;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "w-16 h-16",
  md: "w-24 h-24",
  lg: "w-32 h-32",
  xl: "w-40 h-40",
};

export default function AvatarUpload({
  currentAvatar,
  onUploadSuccess,
  onDeleteSuccess,
  size = "lg",
}: AvatarUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload
    setUploading(true);
    try {
      const response = await uploadAvatar(file);
      toast.success("Avatar uploaded successfully!");
      onUploadSuccess?.(response.data.profilePicture);
    } catch (error) {
      setPreview(null);
      // Error handled by interceptor
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDelete = async () => {
    if (!currentAvatar) return;

    setDeleting(true);
    try {
      await deleteAvatar();
      toast.success("Avatar deleted successfully!");
      setPreview(null);
      onDeleteSuccess?.();
    } catch (error) {
      // Error handled by interceptor
    } finally {
      setDeleting(false);
    }
  };

  const avatarUrl = preview || currentAvatar;
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

  return (
    <div className="flex flex-col items-center gap-4">
      <div className={`relative ${sizeClasses[size]} rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-lg`}>
        {avatarUrl ? (
          <Image
            src={avatarUrl.startsWith("/") ? `${apiBaseUrl}${avatarUrl}` : avatarUrl}
            alt="Avatar"
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
            <User className="w-1/2 h-1/2 text-white" />
          </div>
        )}

        {(uploading || deleting) && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading || deleting}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Camera className="w-4 h-4" />
          {currentAvatar ? "Change" : "Upload"} Avatar
        </button>

        {currentAvatar && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={uploading || deleting}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
        onChange={handleFileSelect}
        className="hidden"
      />

      <p className="text-xs text-gray-500 text-center">
        JPG, PNG, GIF or WebP. Max 5MB.
      </p>
    </div>
  );
}
