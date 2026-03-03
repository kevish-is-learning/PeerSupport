'use client';

import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/lib/auth';
import { notificationsApi } from '@/lib/api';
import { LoadingSpinner, EmptyState } from '@/components/ui';
import { timeAgo, cn } from '@/lib/utils';
import {
  Bell,
  BellOff,
  MessageCircle,
  ArrowBigUp,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Award,
  Info,
  CheckCheck,
} from 'lucide-react';
import Link from 'next/link';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  NEW_COMMENT: MessageCircle,
  COMMENT_REPLY: MessageCircle,
  POST_UPVOTE: ArrowBigUp,
  POST_APPROVED: CheckCircle,
  POST_REJECTED: XCircle,
  POST_FLAGGED: AlertTriangle,
  REPORT_RESOLVED: CheckCircle,
  BADGE_EARNED: Award,
  SYSTEM: Info,
};

export default function NotificationsPage() {
  const { token } = useAuth();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = useCallback(async () => {
    if (!token) return;
    try {
      const res = await notificationsApi.getAll(token) as any;
      setNotifications(res.data || []);
    } catch {
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleMarkAsRead = async (id: string) => {
    if (!token) return;
    await notificationsApi.markAsRead(token, id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const handleMarkAllAsRead = async () => {
    if (!token) return;
    await notificationsApi.markAllAsRead(token);
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  if (loading) return <LoadingSpinner className="mt-20" />;

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up!'}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllAsRead}
            className="inline-flex items-center gap-1.5 px-3 py-2 border border-border text-sm rounded-lg hover:bg-muted transition-colors"
          >
            <CheckCheck className="w-4 h-4" />
            Mark all read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <EmptyState
          icon={BellOff}
          title="No notifications"
          description="You're all caught up! We'll notify you when something happens."
        />
      ) : (
        <div className="space-y-2">
          {notifications.map((notification) => {
            const Icon = ICON_MAP[notification.type] || Bell;
            return (
              <div
                key={notification.id}
                onClick={() => !notification.isRead && handleMarkAsRead(notification.id)}
                className={cn(
                  'flex items-start gap-3 p-4 rounded-xl border transition-colors cursor-pointer',
                  notification.isRead
                    ? 'bg-card border-border'
                    : 'bg-primary/5 border-primary/20 hover:bg-primary/10'
                )}
              >
                <div className={cn(
                  'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0',
                  notification.isRead ? 'bg-muted text-muted-foreground' : 'bg-primary/10 text-primary'
                )}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn(
                    'text-sm leading-snug',
                    notification.isRead ? 'text-muted-foreground' : 'text-foreground font-medium'
                  )}>
                    {notification.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{notification.message}</p>
                  <time className="text-xs text-muted-foreground mt-1 block">
                    {timeAgo(notification.createdAt)}
                  </time>
                </div>
                {!notification.isRead && (
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
