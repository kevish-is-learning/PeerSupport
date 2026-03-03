'use client';

import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/lib/auth';
import { adminApi } from '@/lib/api';
import { LoadingSpinner, EmptyState, Badge } from '@/components/ui';
import { timeAgo, cn } from '@/lib/utils';
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Ban,
  FileWarning,
  X,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const STATUS_BADGES: Record<string, { variant: 'default' | 'success' | 'warning' | 'destructive'; label: string }> = {
  PENDING: { variant: 'warning', label: 'Pending' },
  REVIEWING: { variant: 'default', label: 'Reviewing' },
  RESOLVED: { variant: 'success', label: 'Resolved' },
  DISMISSED: { variant: 'destructive', label: 'Dismissed' },
};

export default function AdminPage() {
  const { user, token } = useAuth();
  const router = useRouter();
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('PENDING');
  const [resolving, setResolving] = useState<string | null>(null);
  const [resolveNote, setResolveNote] = useState('');
  const [resolveStatus, setResolveStatus] = useState('RESOLVED');

  // Redirect non-admin/mod users
  useEffect(() => {
    if (user && user.role !== 'ADMIN' && user.role !== 'MODERATOR') {
      router.push('/feed');
    }
  }, [user, router]);

  const fetchReports = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const params: Record<string, string> = {};
      if (statusFilter) params.status = statusFilter;
      const res = await adminApi.getReports(token, params) as any;
      setReports(res.data || []);
    } catch {
      setReports([]);
    } finally {
      setLoading(false);
    }
  }, [token, statusFilter]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const handleResolve = async (id: string) => {
    if (!token) return;
    try {
      await adminApi.resolveReport(token, id, {
        status: resolveStatus,
        moderatorNote: resolveNote,
      });
      setResolving(null);
      setResolveNote('');
      await fetchReports();
    } catch {
      // ignore
    }
  };

  const handleBan = async (userId: string) => {
    if (!token || !confirm('Are you sure you want to ban this user?')) return;
    try {
      await adminApi.banUser(token, userId, { reason: 'Violation of community guidelines' });
      alert('User banned successfully');
    } catch {
      // ignore
    }
  };

  if (!user || (user.role !== 'ADMIN' && user.role !== 'MODERATOR')) {
    return <LoadingSpinner className="mt-20" />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Shield className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Moderation Panel</h1>
          <p className="text-sm text-muted-foreground">Review and manage community reports</p>
        </div>
      </div>

      {/* Status Filter */}
      <div className="flex gap-1 bg-muted rounded-lg p-1 mb-6 w-fit">
        {['PENDING', 'REVIEWING', 'RESOLVED', 'DISMISSED'].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={cn(
              'px-3 py-1.5 text-xs font-medium rounded-md transition-colors',
              statusFilter === status
                ? 'bg-white text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {status.charAt(0) + status.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {/* Reports */}
      {loading ? (
        <LoadingSpinner />
      ) : reports.length === 0 ? (
        <EmptyState
          icon={FileWarning}
          title="No reports"
          description={`No ${statusFilter.toLowerCase()} reports found.`}
        />
      ) : (
        <div className="space-y-3">
          {reports.map((report) => {
            const statusInfo = STATUS_BADGES[report.status] || STATUS_BADGES.PENDING;
            return (
              <div
                key={report.id}
                className="bg-card rounded-xl border border-border p-5 animate-fade-in"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
                    <span className="text-xs text-muted-foreground px-2 py-0.5 bg-muted rounded">
                      {report.targetType}
                    </span>
                    <span className="text-xs text-muted-foreground px-2 py-0.5 bg-red-50 text-red-600 rounded">
                      {report.reason}
                    </span>
                  </div>
                  <time className="text-xs text-muted-foreground">{timeAgo(report.createdAt)}</time>
                </div>

                {report.description && (
                  <p className="text-sm text-foreground mb-3">{report.description}</p>
                )}

                <div className="text-xs text-muted-foreground mb-3">
                  Reported by: {report.reporter?.username || 'Unknown'} | Target ID: {report.targetId}
                </div>

                {/* Actions */}
                {report.status === 'PENDING' || report.status === 'REVIEWING' ? (
                  resolving === report.id ? (
                    <div className="space-y-3 pt-3 border-t border-border">
                      <div className="flex gap-2">
                        <select
                          value={resolveStatus}
                          onChange={(e) => setResolveStatus(e.target.value)}
                          className="px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-ring/30"
                        >
                          <option value="RESOLVED">Resolve</option>
                          <option value="DISMISSED">Dismiss</option>
                        </select>
                        <input
                          type="text"
                          value={resolveNote}
                          onChange={(e) => setResolveNote(e.target.value)}
                          placeholder="Moderator note..."
                          className="flex-1 px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-ring/30"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleResolve(report.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          Submit
                        </button>
                        <button
                          onClick={() => setResolving(null)}
                          className="px-3 py-2 border border-border text-sm rounded-lg hover:bg-muted transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-2 pt-3 border-t border-border">
                      <button
                        onClick={() => setResolving(report.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-2 border border-border text-sm rounded-lg hover:bg-muted transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Review
                      </button>
                      {report.targetType === 'USER' && (
                        <button
                          onClick={() => handleBan(report.targetId)}
                          className="inline-flex items-center gap-1.5 px-3 py-2 bg-destructive/10 text-destructive text-sm rounded-lg hover:bg-destructive/20 transition-colors"
                        >
                          <Ban className="w-3.5 h-3.5" />
                          Ban User
                        </button>
                      )}
                    </div>
                  )
                ) : (
                  report.moderatorNote && (
                    <div className="text-xs text-muted-foreground pt-3 border-t border-border">
                      <span className="font-medium">Moderator note:</span> {report.moderatorNote}
                    </div>
                  )
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
