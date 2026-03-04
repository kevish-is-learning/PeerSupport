'use client';

import { useState, useEffect } from 'react';
import { adminService } from '@/services/admin.service';
import { applicationService } from '@/services/application.service';

interface ReportData {
  userStats: {
    total: number;
    mentors: number;
    mentees: number;
    admins: number;
    active: number;
    inactive: number;
    verified: number;
  };
  applicationStats: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
  };
  recentUsers: any[];
}

export default function AdminReports() {
  const [reportData, setReportData] = useState<ReportData>({
    userStats: {
      total: 0,
      mentors: 0,
      mentees: 0,
      admins: 0,
      active: 0,
      inactive: 0,
      verified: 0,
    },
    applicationStats: {
      total: 0,
      pending: 0,
      approved: 0,
      rejected: 0,
    },
    recentUsers: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('all');

  useEffect(() => {
    loadReportData();
  }, [timeframe]);

  const loadReportData = async () => {
    setIsLoading(true);
    try {
      const [allUsers, applications] = await Promise.all([
        adminService.getAllUsers(1, 1000),
        applicationService.getAllApplications(1, 1000),
      ]);

      if (allUsers.data && applications.data) {
        const users = allUsers.data.users;
        const apps = applications.data.applications;

        setReportData({
          userStats: {
            total: users.length,
            mentors: users.filter((u) => u.role === 'MENTOR').length,
            mentees: users.filter((u) => u.role === 'MENTEE').length,
            admins: users.filter((u) => u.role === 'ADMIN').length,
            active: users.filter((u) => u.isActive).length,
            inactive: users.filter((u) => !u.isActive).length,
            verified: users.filter((u) => u.isVerified).length,
          },
          applicationStats: {
            total: apps.length,
            pending: apps.filter((a) => a.status === 'PENDING').length,
            approved: apps.filter((a) => a.status === 'APPROVED').length,
            rejected: apps.filter((a) => a.status === 'REJECTED').length,
          },
          recentUsers: users
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 10),
        });
      }
    } catch (error) {
      console.error('Failed to load report data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculatePercentage = (value: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-black"></div>
        <p className="mt-4 text-gray-600">Loading reports...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Reports & Analytics</h1>
          <p className="text-gray-600">Platform statistics and insights</p>
        </div>
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
        >
          <option value="all">All Time</option>
          <option value="month">This Month</option>
          <option value="week">This Week</option>
          <option value="today">Today</option>
        </select>
      </div>

      {/* User Statistics */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">User Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Total Users</h3>
              <span className="text-2xl">👥</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{reportData.userStats.total}</p>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Active</span>
                <span className="font-medium">
                  {reportData.userStats.active} (
                  {calculatePercentage(reportData.userStats.active, reportData.userStats.total)}%)
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Verified</span>
                <span className="font-medium">
                  {reportData.userStats.verified} (
                  {calculatePercentage(reportData.userStats.verified, reportData.userStats.total)}%)
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Mentors</h3>
              <span className="text-2xl">🎓</span>
            </div>
            <p className="text-3xl font-bold text-blue-600">{reportData.userStats.mentors}</p>
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Percentage</span>
                <span className="font-medium">
                  {calculatePercentage(reportData.userStats.mentors, reportData.userStats.total)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{
                    width: `${calculatePercentage(
                      reportData.userStats.mentors,
                      reportData.userStats.total
                    )}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Mentees</h3>
              <span className="text-2xl">🎯</span>
            </div>
            <p className="text-3xl font-bold text-green-600">{reportData.userStats.mentees}</p>
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Percentage</span>
                <span className="font-medium">
                  {calculatePercentage(reportData.userStats.mentees, reportData.userStats.total)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{
                    width: `${calculatePercentage(
                      reportData.userStats.mentees,
                      reportData.userStats.total
                    )}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Admins</h3>
              <span className="text-2xl">👨‍💼</span>
            </div>
            <p className="text-3xl font-bold text-purple-600">{reportData.userStats.admins}</p>
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Percentage</span>
                <span className="font-medium">
                  {calculatePercentage(reportData.userStats.admins, reportData.userStats.total)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full"
                  style={{
                    width: `${calculatePercentage(
                      reportData.userStats.admins,
                      reportData.userStats.total
                    )}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Statistics */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Mentor Applications</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Total Applications</h3>
              <span className="text-2xl">📝</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{reportData.applicationStats.total}</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Pending</h3>
              <span className="text-2xl">⏳</span>
            </div>
            <p className="text-3xl font-bold text-yellow-600">
              {reportData.applicationStats.pending}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {calculatePercentage(
                reportData.applicationStats.pending,
                reportData.applicationStats.total
              )}
              % of total
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Approved</h3>
              <span className="text-2xl">✅</span>
            </div>
            <p className="text-3xl font-bold text-green-600">
              {reportData.applicationStats.approved}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {calculatePercentage(
                reportData.applicationStats.approved,
                reportData.applicationStats.total
              )}
              % of total
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Rejected</h3>
              <span className="text-2xl">❌</span>
            </div>
            <p className="text-3xl font-bold text-red-600">
              {reportData.applicationStats.rejected}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {calculatePercentage(
                reportData.applicationStats.rejected,
                reportData.applicationStats.total
              )}
              % of total
            </p>
          </div>
        </div>
      </div>

      {/* Recent Users Table */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Recent Users</h2>
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Joined
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reportData.recentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {user.name || 'N/A'}
                      </div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
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
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        user.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Export Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold mb-4">Export Reports</h2>
        <p className="text-gray-600 mb-4">Download platform data in various formats</p>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
            Export as CSV
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Export as Excel
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            Export as PDF
          </button>
        </div>
      </div>
    </div>
  );
}
