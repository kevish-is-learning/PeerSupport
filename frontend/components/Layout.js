import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import api from '../lib/api';
import styles from '../styles/Layout.module.css';

export default function Layout({ children }) {
  const [user, setUser] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (api.token) {
      loadUser();
      loadUnreadCount();
    }
  }, [router.pathname]);

  const loadUser = async () => {
    try {
      const response = await api.getProfile();
      setUser(response.data);
    } catch (error) {
      console.error('Failed to load user:', error);
    }
  };

  const loadUnreadCount = async () => {
    try {
      const response = await api.getUnreadCount();
      setUnreadCount(response.data.unreadCount || 0);
    } catch (error) {
      console.error('Failed to load unread count:', error);
    }
  };

  const handleLogout = () => {
    api.logout();
    setUser(null);
    router.push('/login');
  };

  return (
    <div className={styles.layout}>
      <nav className={styles.nav}>
        <div className="container">
          <div className={styles.navContent}>
            <Link href="/" className={styles.logo}>
              PeerSupport
            </Link>
            <div className={styles.navLinks}>
              {user ? (
                <>
                  <Link href="/posts">Posts</Link>
                  <Link href="/notifications">
                    Notifications {unreadCount > 0 && `(${unreadCount})`}
                  </Link>
                  <Link href="/profile">Profile</Link>
                  {(user.role === 'ADMIN' || user.role === 'MODERATOR') && (
                    <Link href="/admin">Admin</Link>
                  )}
                  <button onClick={handleLogout} className="btn btn-sm">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login">Login</Link>
                  <Link href="/register">Register</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main className={styles.main}>
        <div className="container">{children}</div>
      </main>
    </div>
  );
}
