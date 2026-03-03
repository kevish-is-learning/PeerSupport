import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import api from '../lib/api';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!api.token) {
      router.push('/login');
      return;
    }
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const response = await api.getNotifications();
      setNotifications(response.data || []);
    } catch (err) {
      console.error('Failed to load notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await api.markAsRead(id);
      loadNotifications();
    } catch (err) {
      console.error('Failed to mark as read:', err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await api.markAllAsRead();
      loadNotifications();
    } catch (err) {
      console.error('Failed to mark all as read:', err);
    }
  };

  if (loading) {
    return <div className="loading">Loading notifications...</div>;
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="flex-between mb-3">
        <h1 style={{ fontSize: '32px', fontWeight: '700' }}>
          Notifications {unreadCount > 0 && `(${unreadCount} unread)`}
        </h1>
        {unreadCount > 0 && (
          <button onClick={handleMarkAllAsRead} className="btn btn-sm">
            Mark All as Read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
          <p style={{ opacity: 0.7 }}>No notifications yet.</p>
        </div>
      ) : (
        <div>
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="card"
              style={{
                opacity: notification.isRead ? 0.6 : 1,
                borderLeft: notification.isRead ? 'none' : '3px solid #fff',
              }}
            >
              <div className="flex-between">
                <div>
                  <p style={{ fontWeight: notification.isRead ? 'normal' : '600', marginBottom: '8px' }}>
                    {notification.content}
                  </p>
                  <p className="text-sm">{new Date(notification.createdAt).toLocaleString()}</p>
                </div>
                {!notification.isRead && (
                  <button
                    onClick={() => handleMarkAsRead(notification.id)}
                    className="btn btn-sm"
                  >
                    Mark as Read
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
