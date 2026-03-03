'use client';

import { useAuthStore } from '@/store/auth.store';
import { Role } from '@/types';

export default function DashboardPage() {
  const { user } = useAuthStore();

  const getRoleSpecificContent = () => {
    switch (user?.role) {
      case Role.MENTOR:
        return (
          <div className="space-y-6">
            <section className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Mentor Dashboard</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded">
                  <p className="text-sm text-gray-600">Upcoming Sessions</p>
                  <p className="text-2xl font-bold mt-1">0</p>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <p className="text-sm text-gray-600">Total Earnings</p>
                  <p className="text-2xl font-bold mt-1">₹0</p>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <p className="text-sm text-gray-600">Rating</p>
                  <p className="text-2xl font-bold mt-1">-</p>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-sm text-gray-600 mb-2">Quick Actions</p>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors">
                    Manage Slots
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                    View Bookings
                  </button>
                </div>
              </div>
            </section>
          </div>
        );
      case Role.MENTEE:
        return (
          <div className="space-y-6">
            <section className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Mentee Dashboard</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded">
                  <p className="text-sm text-gray-600">Upcoming Sessions</p>
                  <p className="text-2xl font-bold mt-1">0</p>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <p className="text-sm text-gray-600">Completed Sessions</p>
                  <p className="text-2xl font-bold mt-1">0</p>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-sm text-gray-600 mb-2">Quick Actions</p>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors">
                    Find Mentors
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                    My Bookings
                  </button>
                </div>
              </div>
            </section>
          </div>
        );
      case Role.ADMIN:
        return (
          <div className="space-y-6">
            <section className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Admin Dashboard</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded">
                  <p className="text-sm text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold mt-1">-</p>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <p className="text-sm text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold mt-1">-</p>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <p className="text-sm text-gray-600">Revenue</p>
                  <p className="text-2xl font-bold mt-1">₹-</p>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-sm text-gray-600 mb-2">Quick Actions</p>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors">
                    Manage Users
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                    View Reports
                  </button>
                </div>
              </div>
            </section>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {user?.name || 'User'}
        </h1>
        <p className="text-gray-600">
          {user?.isVerified ? (
            <span className="text-green-600">✓ Verified</span>
          ) : (
            <span className="text-yellow-600">⚠ Account not verified</span>
          )}
        </p>
      </div>

      {getRoleSpecificContent()}

      <section className="border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <p className="text-gray-500 text-sm">No recent activity</p>
      </section>
    </div>
  );
}
