'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth.store';
import { Role } from '@/types';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isInitialized, user, logout } = useAuthStore();

  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isInitialized, router]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Don't render until initialized and authenticated
  if (!isInitialized || !isAuthenticated) {
    return null;
  }

  // Define navigation items based on user role
  const getMenteeNavItems = () => [
    { href: '/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/dashboard/find-mentors', label: 'Find Mentors', icon: '🔍' },
    { href: '/dashboard/bookings', label: 'My Bookings', icon: '📅' },
    { href: '/dashboard/webinars', label: 'Webinars', icon: '🎥' },
    { href: '/dashboard/profile', label: 'My Profile', icon: '👤' },
  ];

  const getMentorNavItems = () => [
    { href: '/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/dashboard/slots', label: 'Manage Slots', icon: '📅' },
    { href: '/dashboard/sessions', label: 'My Sessions', icon: '🎯' },
    { href: '/dashboard/profile', label: 'My Profile', icon: '👤' },
  ];

  const getAdminNavItems = () => [
    { href: '/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/admin/users', label: 'Users', icon: '👥' },
    { href: '/admin/mentor-applications', label: 'Applications', icon: '📝' },
    { href: '/admin/reports', label: 'Reports', icon: '📈' },
  ];

  const getNavItems = () => {
    switch (user?.role) {
      case Role.MENTOR:
        return getMentorNavItems();
      case Role.ADMIN:
        return getAdminNavItems();
      default:
        return getMenteeNavItems();
    }
  };

  const navItems = getNavItems();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <Link href="/" className="text-xl font-bold">
                PeerSupport
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium">{user?.name || user?.email}</p>
                  <p className="text-xs text-gray-500">{user?.role}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Secondary Navigation - Tab Style */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-1 overflow-x-auto py-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== '/dashboard' && pathname.startsWith(item.href));
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2 ${
                    isActive
                      ? 'bg-black text-white'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-black'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
