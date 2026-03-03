'use client';

import { useAuth } from '@/lib/auth';
import { notificationsApi } from '@/lib/api';
import { Bell } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';

export function NotificationBell() {
  const { token } = useAuth();
  const [count, setCount] = useState(0);

  const fetchCount = useCallback(async () => {
    if (!token) return;
    try {
      const res = await notificationsApi.getUnreadCount(token) as { data: { count: number } };
      setCount(res.data.count);
    } catch {
      // ignore
    }
  }, [token]);

  useEffect(() => {
    fetchCount();
    const interval = setInterval(fetchCount, 30000);
    return () => clearInterval(interval);
  }, [fetchCount]);

  return (
    <Link
      href="/notifications"
      className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
    >
      <Bell className="w-4 h-4" />
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-destructive text-white text-[10px] font-bold rounded-full flex items-center justify-center">
          {count > 9 ? '9+' : count}
        </span>
      )}
    </Link>
  );
}
