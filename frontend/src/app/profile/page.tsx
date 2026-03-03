'use client';

import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/lib/auth';
import { usersApi } from '@/lib/api';
import { LoadingSpinner } from '@/components/ui';
import { getInitials, formatDate, cn } from '@/lib/utils';
import { User, Mail, Calendar, Award, Save, Shield } from 'lucide-react';

export default function ProfilePage() {
  const { user, token, refreshUser } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');

  const fetchProfile = useCallback(async () => {
    if (!token) return;
    try {
      const res = await usersApi.getMyProfile(token) as any;
      setProfile(res.data);
      setDisplayName(res.data.displayName || '');
      setBio(res.data.bio || '');
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleSave = async () => {
    if (!token) return;
    setSaving(true);
    try {
      await usersApi.updateProfile(token, { displayName, bio });
      await refreshUser();
      await fetchProfile();
      setEditing(false);
    } catch {
      // ignore
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner className="mt-20" />;
  if (!profile) return null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground mb-6">Your Profile</h1>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/40 p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
              {getInitials(profile.displayName || profile.username)}
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">
                {profile.displayName || profile.username}
              </h2>
              <p className="text-sm text-muted-foreground">@{profile.username}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className={cn(
                  'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium',
                  profile.role === 'ADMIN' ? 'bg-red-50 text-red-700' :
                  profile.role === 'MODERATOR' ? 'bg-amber-50 text-amber-700' :
                  'bg-primary/10 text-primary'
                )}>
                  <Shield className="w-3 h-3" />
                  {profile.role}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Award className="w-3 h-3" />
                  {profile.reputation} rep
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="w-4 h-4" />
            {profile.email}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            Joined {formatDate(profile.createdAt)}
          </div>

          {/* Bio */}
          {editing ? (
            <div className="space-y-4 pt-4 border-t border-border">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Display Name</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-primary bg-white transition-colors"
                  placeholder="Your display name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2.5 border border-border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-primary bg-white transition-colors"
                  placeholder="Tell the community about yourself..."
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
                >
                  <Save className="w-3.5 h-3.5" />
                  {saving ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="px-4 py-2 border border-border text-sm font-medium rounded-lg hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-4 border-t border-border">
              {profile.bio ? (
                <p className="text-sm text-foreground leading-relaxed">{profile.bio}</p>
              ) : (
                <p className="text-sm text-muted-foreground italic">No bio yet.</p>
              )}
              <button
                onClick={() => setEditing(true)}
                className="mt-4 px-4 py-2 border border-border text-sm font-medium rounded-lg hover:bg-muted transition-colors"
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
