'use client';

import { useState, useEffect } from 'react';
import { adminService } from '@/services/admin.service';
import { applicationService } from '@/services/application.service';
import Link from 'next/link';

interface Stats {
  totalUsers: number;
  totalMentors: number;
  totalMentees: number;
  totalAdmins: number;
  pendingApplications: number;
  activeUsers: number;
}

export default function AdminDashboardOverview() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalMentors: 0,
    totalMentees: 0,
    totalAdmins: 0,
    pendingApplications: 0,
    activeUsers: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      // Load all users to calculate stats
      const [allUsers, mentors, mentees, admins, applications] = await Promise.all([
        adminService.getAllUsers(1, 1000),
        adminService.getUsersByRole('MENTOR', 1, 1000),
        adminService.getUsersByRole('MENTEE', 1, 1000),
        adminService.getUsersByRole('ADMIN', 1, 1000),
        applicationService.getAllApplications(1, 100, 'PENDING'),
      ]);

      if (allUsers.data && mentors.data && mentees.data && admins.data && applications.data) {
        const activeUsersCount = allUsers.data.users.filter(u => u.isActive).length;

        setStats({
          totalUsers: allUsers.data.pagination.total,
          totalMentors: mentors.data.pagination.total,
          totalMentees: mentees.data.pagination.total,
          totalAdmins: admins.data.pagination.total,
          pendingApplications: applications.data.pagination.total,
          activeUsers: activeUsersCount,
        });

        // Set recent users as activity
        setRecentActivity(allUsers.data.users.slice(0, 5));
      }
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: '👥',
      color: 'bg-blue-500',
      link: '/admin/users',
    },
    {
      title: 'Mentors',
      value: stats.totalMentors,
      icon: '🎓',
      color: 'bg-green-500',
      link: '/admin/users?role=MENTOR',
    },
    {
      title: 'Mentees',
      value: stats.totalMentees,
      icon: '🎯',
      color: 'bg-purple-500',
      link: '/admin/users?role=MENTEE',
    },
    {
      title: 'Admins',
      value: stats.totalAdmins,
      icon: '👨‍💼',
      color: 'bg-red-500',
      link: '/admin/users?role=ADMIN',
    },
    {
      title: 'Active Users',
      value: stats.activeUsers,
      icon: '✅',
      color: 'bg-teal-500',
      link: '/admin/users?status=active',
    },
    {
      title: 'Pending Applications',
      value: stats.pendingApplications,
      icon: '📝',
      color: 'bg-yellow-500',
      link: '/admin/mentor-applications',
    },
  ];

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-black"></div>
        <p className="mt-4 text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Overview of platform statistics and activity</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((card) => (
          <Link
            key={card.title}
            href={card.link}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
                <p className="text-3xl font-bold text-gray-900">{card.value}</p>
              </div>
              <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center text-2xl`}>
                {card.icon}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              href="/admin/users"
              className="block w-full px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-center"
            >
              Manage Users
            </Link>
            <Link
              href="/admin/mentor-applications"
              className="block w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center"
            >
              Review Applications
            </Link>
            <Link
              href="/admin/reports"
              className="block w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-center"
            >
              View Reports
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4">Recent Users</h2>
          <div className="space-y-3">
            {recentActivity.length === 0 ? (
              <p className="text-gray-500 text-sm">No recent activity</p>
            ) : (
              recentActivity.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-600 text-sm font-medium">
                        {(user.name || user.email).charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {user.name || 'N/A'}
                      </p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      user.role === 'MENTOR'
                        ? 'bg-blue-100 text-blue-800'
                        : user.role === 'MENTEE'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}
                  >
                    {user.role}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Alerts Section */}
      {stats.pendingApplications > 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                You have <strong>{stats.pendingApplications}</strong> pending mentor
                application{stats.pendingApplications !== 1 ? 's' : ''} to review.{' '}
                <Link
                  href="/admin/mentor-applications"
                  className="font-medium underline hover:text-yellow-600"
                >
                  Review now
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
