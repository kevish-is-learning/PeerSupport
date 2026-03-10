"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import api from "@/lib/api";
import { toast } from "sonner";
import AvatarUpload from "@/components/AvatarUpload";
import {
  User as UserIcon,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Link2,
  Save,
  Loader2,
  Star,
  Shield,
  Edit3,
} from "lucide-react";

export default function MentorProfilePage() {
  const {
    user,
    mentorProfile,
    fetchMe,
    isLoading: authLoading,
  } = useAuthStore();

  // User fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Mentor profile fields
  const [bio, setBio] = useState("");
  const [headline, setHeadline] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [expertise, setExpertise] = useState<string[]>([]);
  const [expertiseInput, setExpertiseInput] = useState("");
  const [certifications, setCertifications] = useState<string[]>([]);
  const [certInput, setCertInput] = useState("");
  const [socialLinks, setSocialLinks] = useState<
    { platform: string; url: string }[]
  >([]);

  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);

  if (!user) {
    useEffect(() => {
      fetchMe();
    }, [fetchMe]);
  }

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
    if (mentorProfile) {
      setBio(mentorProfile.bio || "");
      setHeadline(mentorProfile.headline || "");
      setPhone(mentorProfile.phone || "");
      setLocation(mentorProfile.location || "");
      setExpertise(mentorProfile.expertise || []);
      setCertifications(mentorProfile.certifications || []);
      setSocialLinks(
        Array.isArray(mentorProfile.socialLinks)
          ? mentorProfile.socialLinks
          : [],
      );
    }
  }, [user, mentorProfile]);

  const handleSave = async () => {
    if (!bio.trim()) {
      toast.error("Bio is required");
      return;
    }
    setSaving(true);
    try {
      // Update user name
      await api.put("/users/me", { name });

      // Update mentor profilex
      await api.post("/users/profile/mentor", {
        bio,
        headline,
        phone,
        location,
        expertise,
        certifications,
        socialLinks,
      });

      toast.success("Profile updated successfully");
      setEditMode(false);
      fetchMe();
    } catch {
      // handled by interceptor
    } finally {
      setSaving(false);
    }
  };

  const addExpertise = () => {
    const tag = expertiseInput.trim();
    if (tag && !expertise.includes(tag)) {
      setExpertise([...expertise, tag]);
      setExpertiseInput("");
    }
  };

  const removeExpertise = (tag: string) => {
    setExpertise(expertise.filter((t) => t !== tag));
  };

  const addCertification = () => {
    const cert = certInput.trim();
    if (cert && !certifications.includes(cert)) {
      setCertifications([...certifications, cert]);
      setCertInput("");
    }
  };

  const removeCertification = (cert: string) => {
    setCertifications(certifications.filter((c) => c !== cert));
  };

  const addSocialLink = () => {
    setSocialLinks([...socialLinks, { platform: "", url: "" }]);
  };

  const removeSocialLink = (idx: number) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== idx));
  };

  const updateSocialLink = (
    idx: number,
    field: "platform" | "url",
    value: string,
  ) => {
    const updated = [...socialLinks];
    updated[idx] = { ...updated[idx], [field]: value };
    setSocialLinks(updated);
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Profile</h1>
          <p className="text-muted-foreground mt-1">
            Manage your mentor profile
          </p>
        </div>
        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition flex items-center gap-2"
          >
            <Edit3 size={14} /> Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => {
                setEditMode(false);
                fetchMe(); // reset changes
              }}
              className="px-4 py-2 bg-secondary text-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition disabled:opacity-50 flex items-center gap-2"
            >
              {saving ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Save size={14} />
              )}
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* Profile Header Card */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-start gap-4">
          {editMode ? (
            <AvatarUpload 
              currentAvatar={user?.profilePicture}
              onUploadSuccess={() => fetchMe()}
              size="lg"
            />
          ) : (
            <div className="w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center text-primary text-3xl font-bold shrink-0 overflow-hidden">
              {user?.profilePicture ? (
                <img 
                  src={user.profilePicture} 
                  alt={user.name || "Profile"}
                  className="w-full h-full object-cover"
                />
              ) : (
                user?.name?.[0]?.toUpperCase() || "M"
              )}
            </div>
          )}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-foreground">
                {user?.name}
              </h2>
              {mentorProfile?.verifiedBadge && (
                <Shield size={16} className="text-primary" />
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {mentorProfile?.headline || "Mentor"}
            </p>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Mail size={14} /> {user?.email}
              </span>
              {mentorProfile?.phone && (
                <span className="flex items-center gap-1">
                  <Phone size={14} /> {mentorProfile.phone}
                </span>
              )}
              {mentorProfile?.location && (
                <span className="flex items-center gap-1">
                  <MapPin size={14} /> {mentorProfile.location}
                </span>
              )}
            </div>
            <div className="flex items-center gap-4 mt-2">
              <span className="flex items-center gap-1 text-sm">
                <Star size={14} className="text-yellow-400" />
                <span className="text-foreground font-medium">
                  {mentorProfile?.rating?.toFixed(1) || "0.0"}
                </span>
                <span className="text-muted-foreground">
                  ({mentorProfile?.totalReviews || 0} reviews)
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Editable Fields */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Info */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <UserIcon size={18} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">
              Basic Information
            </h3>
          </div>

          <div>
            <label className="text-sm text-muted-foreground block mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!editMode}
              className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-60"
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground block mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-muted-foreground text-sm opacity-60"
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground block mb-1">
              Headline
            </label>
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              disabled={!editMode}
              placeholder="e.g. CAT 99.5 percentiler, IIM Ahmedabad"
              className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-60"
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground block mb-1">
              Phone
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={!editMode}
              className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-60"
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground block mb-1">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              disabled={!editMode}
              className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-60"
            />
          </div>
        </div>

        {/* Bio */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Briefcase size={18} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">
              Bio & About
            </h3>
          </div>

          <div>
            <label className="text-sm text-muted-foreground block mb-1">
              Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              disabled={!editMode}
              rows={6}
              placeholder="Tell mentees about yourself..."
              className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-60 resize-none"
            />
          </div>

          {/* Social Links */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-muted-foreground flex items-center gap-1">
                <Link2 size={14} /> Social Links
              </label>
              {editMode && (
                <button
                  onClick={addSocialLink}
                  className="text-xs text-primary hover:underline"
                >
                  + Add Link
                </button>
              )}
            </div>
            {socialLinks.length === 0 ? (
              <p className="text-xs text-muted-foreground">
                No social links added
              </p>
            ) : (
              <div className="space-y-2">
                {socialLinks.map((link, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      value={link.platform}
                      onChange={(e) =>
                        updateSocialLink(idx, "platform", e.target.value)
                      }
                      disabled={!editMode}
                      placeholder="Platform"
                      className="w-1/3 px-2 py-1.5 bg-secondary border border-border rounded-lg text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-60"
                    />
                    <input
                      type="url"
                      value={link.url}
                      onChange={(e) =>
                        updateSocialLink(idx, "url", e.target.value)
                      }
                      disabled={!editMode}
                      placeholder="URL"
                      className="flex-1 px-2 py-1.5 bg-secondary border border-border rounded-lg text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-60"
                    />
                    {editMode && (
                      <button
                        onClick={() => removeSocialLink(idx)}
                        className="text-red-400 hover:text-red-300 text-xs px-2"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Expertise */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <GraduationCap size={18} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Expertise</h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {expertise.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full flex items-center gap-1"
              >
                {tag}
                {editMode && (
                  <button
                    onClick={() => removeExpertise(tag)}
                    className="text-primary/60 hover:text-primary ml-1"
                  >
                    &times;
                  </button>
                )}
              </span>
            ))}
            {expertise.length === 0 && (
              <p className="text-xs text-muted-foreground">No expertise tags</p>
            )}
          </div>

          {editMode && (
            <div className="flex gap-2">
              <input
                type="text"
                value={expertiseInput}
                onChange={(e) => setExpertiseInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addExpertise())
                }
                placeholder="Add expertise tag"
                className="flex-1 px-3 py-2 bg-secondary border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                onClick={addExpertise}
                className="px-3 py-2 bg-primary/10 text-primary rounded-lg text-sm hover:bg-primary/20 transition"
              >
                Add
              </button>
            </div>
          )}
        </div>

        {/* Certifications */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield size={18} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">
              Certifications
            </h3>
          </div>

          <div className="space-y-1">
            {certifications.map((cert) => (
              <div
                key={cert}
                className="flex items-center justify-between px-3 py-2 bg-secondary rounded-lg"
              >
                <span className="text-sm text-foreground">{cert}</span>
                {editMode && (
                  <button
                    onClick={() => removeCertification(cert)}
                    className="text-red-400 hover:text-red-300 text-xs"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            {certifications.length === 0 && (
              <p className="text-xs text-muted-foreground">No certifications</p>
            )}
          </div>

          {editMode && (
            <div className="flex gap-2">
              <input
                type="text"
                value={certInput}
                onChange={(e) => setCertInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addCertification())
                }
                placeholder="Add certification"
                className="flex-1 px-3 py-2 bg-secondary border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                onClick={addCertification}
                className="px-3 py-2 bg-primary/10 text-primary rounded-lg text-sm hover:bg-primary/20 transition"
              >
                Add
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
