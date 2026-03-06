'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { Role } from '@/types';
import MenteeDashboardContent from '@/components/MenteeDashboardContent';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuthStore();

  // Redirect mentors to their specific dashboard
  useEffect(() => {
    if (user?.role === Role.MENTOR) {
      router.push('/dashboard/mentor');
    }
  }, [user, router]);

  // Show loading while redirecting mentors
  if (user?.role === Role.MENTOR) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const getMentorDashboard = () => null; // Mentors are redirected to /dashboard/mentor

  const getAdminDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
          <p className="text-sm text-gray-600 mb-1">Total Users</p>
          <p className="text-3xl font-bold">-</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
          <p className="text-sm text-gray-600 mb-1">Total Mentors</p>
          <p className="text-3xl font-bold text-blue-600">-</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
          <p className="text-sm text-gray-600 mb-1">Total Bookings</p>
          <p className="text-3xl font-bold text-green-600">-</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
          <p className="text-sm text-gray-600 mb-1">Revenue</p>
          <p className="text-3xl font-bold text-purple-600">₹-</p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid md:grid-cols-3 gap-4">
        <Link href="/admin/users" className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all group">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <span className="text-2xl">👥</span>
          </div>
          <h3 className="font-semibold mb-1">Manage Users</h3>
          <p className="text-sm text-gray-600">View and manage all users</p>
        </Link>
        <Link href="/admin/mentor-applications" className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all group">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <span className="text-2xl">📝</span>
          </div>
          <h3 className="font-semibold mb-1">Applications</h3>
          <p className="text-sm text-gray-600">Review mentor applications</p>
        </Link>
        <Link href="/admin/reports" className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all group">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <span className="text-2xl">📈</span>
          </div>
          <h3 className="font-semibold mb-1">Reports</h3>
          <p className="text-sm text-gray-600">View analytics and reports</p>
        </Link>
      </div>

      {/* Pending Applications */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Pending Applications</h2>
        <div className="text-center py-8 text-gray-500">
          <p className="text-4xl mb-2">📋</p>
          <p>No pending applications</p>
        </div>
      </div>
    </div>
  );

  const getRoleSpecificContent = () => {
    switch (user?.role) {
      case Role.MENTOR:
        return getMentorDashboard();
      case Role.ADMIN:
        return getAdminDashboard();
      case Role.MENTEE:
      default:
        return <MenteeDashboardContent />;
    }
  };

  return getRoleSpecificContent();
}
