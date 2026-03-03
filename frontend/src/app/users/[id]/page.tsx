'use client';

import { useEffect, useState, useCallback, use } from 'react';
import { usersApi } from '@/lib/api';
import { LoadingSpinner } from '@/components/ui';
import { getInitials, formatDate, cn } from '@/lib/utils';
import { Calendar, Award, Shield, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function UserProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    usersApi.getProfile(id)
      .then((res: any) => setProfile(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner className="mt-20" />;
  if (!profile) return <p className="text-center text-muted-foreground py-20">User not found.</p>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 animate-fade-in">
      <Link
        href="/feed"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Feed
      </Link>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
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

        <div className="p-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Calendar className="w-4 h-4" />
            Joined {formatDate(profile.createdAt)}
          </div>
          {profile.bio ? (
            <p className="text-sm text-foreground leading-relaxed">{profile.bio}</p>
          ) : (
            <p className="text-sm text-muted-foreground italic">This user hasn&apos;t added a bio yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
