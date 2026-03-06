'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { mentorService } from '@/services/mentor.service';
import { DashboardStats, ApplicationStatus } from '@/types';

export default function MentorDashboardPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [applicationStatus, setApplicationStatus] = useState<ApplicationStatus | null>(null);

  useEffect(() => {
    if (user?.role !== 'MENTOR') {
      router.push('/dashboard');
      return;
    }
    loadDashboardData();
  }, [user, router]);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      
      // Check application status first
      const appResponse = await mentorService.getMyApplication();
      if (appResponse.data?.status) {
        setApplicationStatus(appResponse.data.status);
        
        if (appResponse.data.status !== ApplicationStatus.APPROVED) {
          setIsLoading(false);
          return;
        }
      }

      // Load dashboard stats
      const statsResponse = await mentorService.getDashboardStats();
      setStats(statsResponse.data || null);
    } catch (err: any) {
      console.error('Error loading dashboard:', err);
      setError(err.response?.data?.message || 'Failed to load dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Show pending status message
  if (applicationStatus && applicationStatus !== ApplicationStatus.APPROVED) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className={`rounded-xl p-8 ${
          applicationStatus === ApplicationStatus.PENDING 
            ? 'bg-yellow-50 border-2 border-yellow-300' 
            : 'bg-red-50 border-2 border-red-300'
        }`}>
          <div className="text-center">
            <span className="text-5xl">
              {applicationStatus === ApplicationStatus.PENDING ? '⏳' : '❌'}
            </span>
            <h2 className="text-2xl font-bold mt-4">
              {applicationStatus === ApplicationStatus.PENDING 
                ? 'Application Under Review' 
                : 'Application Rejected'}
            </h2>
            <p className="text-gray-600 mt-4">
              {applicationStatus === ApplicationStatus.PENDING 
                ? 'Your mentor application is currently being reviewed. You will be able to access the dashboard features once approved.'
                : 'Your application was not approved. You can reapply with updated information.'}
            </p>
            {applicationStatus === ApplicationStatus.REJECTED && (
              <Link
                href="/apply-mentor"
                className="inline-block mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Reapply as Mentor
              </Link>
            )}
          </div>
          
          <div className="mt-8 p-4 bg-white rounded-lg">
            <h3 className="font-semibold text-gray-800">While you wait:</h3>
            <ul className="mt-2 text-gray-600 list-disc list-inside space-y-1">
              <li>Ensure your profile information is complete</li>
              <li>Review our mentor guidelines</li>
              <li>Prepare your schedule for when you&apos;re approved</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Available Balance"
          value={`₹${stats?.availableBalance?.toLocaleString() || 0}`}
          icon="💰"
          color="green"
        />
        <StatCard
          title="Total Earnings"
          value={`₹${stats?.totalEarnings?.toLocaleString() || 0}`}
          icon="📈"
          color="blue"
        />
        <StatCard
          title="Completed Sessions"
          value={stats?.completedSessions || 0}
          icon="✅"
          color="purple"
        />
        <StatCard
          title="Average Rating"
          value={stats?.averageRating ? `${stats.averageRating.toFixed(1)} ⭐` : 'No ratings'}
          icon="⭐"
          color="yellow"
        />
      </div>

      {/* Second Row Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Upcoming Sessions"
          value={stats?.upcomingSessions || 0}
          icon="📅"
          color="indigo"
        />
        <StatCard
          title="Pending Withdrawals"
          value={`₹${stats?.pendingWithdrawals?.toLocaleString() || 0}`}
          icon="🏦"
          color="orange"
        />
        <StatCard
          title="Total Reviews"
          value={stats?.totalReviews || 0}
          icon="💬"
          color="teal"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <QuickActionCard
            href="/dashboard/mentor/slots"
            title="Manage Slots"
            icon="📅"
            description="Set your availability"
          />
          <QuickActionCard
            href="/dashboard/mentor/bookings"
            title="View Bookings"
            icon="📋"
            description="Manage your sessions"
          />
          <QuickActionCard
            href="/dashboard/mentor/earnings"
            title="Earnings"
            icon="💰"
            description="Track your income"
          />
          <QuickActionCard
            href="/dashboard/mentor/withdrawals"
            title="Withdrawals"
            icon="🏦"
            description="Request payouts"
          />
        </div>
      </div>

      {/* Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Sessions */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Upcoming Sessions</h2>
            <Link href="/dashboard/mentor/bookings" className="text-indigo-600 hover:underline text-sm">
              View All
            </Link>
          </div>
          {stats?.recentBookings && stats.recentBookings.length > 0 ? (
            <div className="space-y-3">
              {stats.recentBookings.slice(0, 3).map((booking: any) => (
                <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{booking.menteeName || 'Student'}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(booking.scheduledAt).toLocaleDateString()} at{' '}
                      {new Date(booking.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                    booking.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <span className="text-4xl">📅</span>
              <p className="mt-2">No upcoming sessions</p>
              <Link href="/dashboard/mentor/slots" className="text-indigo-600 hover:underline text-sm mt-2 inline-block">
                Set your availability
              </Link>
            </div>
          )}
        </div>

        {/* Recent Reviews */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Recent Reviews</h2>
            <Link href="/dashboard/mentor/ratings" className="text-indigo-600 hover:underline text-sm">
              View All
            </Link>
          </div>
          {stats?.recentReviews && stats.recentReviews.length > 0 ? (
            <div className="space-y-3">
              {stats.recentReviews.slice(0, 3).map((review: any) => (
                <div key={review.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{review.menteeName || 'Anonymous'}</p>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < review.rating ? 'text-yellow-500' : 'text-gray-300'}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  {review.comment && (
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{review.comment}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <span className="text-4xl">💬</span>
              <p className="mt-2">No reviews yet</p>
              <p className="text-sm">Complete sessions to receive feedback</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Links */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Mentor Tools</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          <NavLink href="/dashboard/mentor/slots" icon="📅" label="Slots" />
          <NavLink href="/dashboard/mentor/bookings" icon="📋" label="Bookings" />
          <NavLink href="/dashboard/mentor/earnings" icon="💰" label="Earnings" />
          <NavLink href="/dashboard/mentor/transactions" icon="📊" label="Transactions" />
          <NavLink href="/dashboard/mentor/withdrawals" icon="🏦" label="Withdrawals" />
          <NavLink href="/dashboard/mentor/incentives" icon="🎁" label="Incentives" />
          <NavLink href="/dashboard/mentor/ratings" icon="⭐" label="Ratings" />
          <NavLink href="/dashboard/profile" icon="👤" label="Profile" />
        </div>
      </div>
    </div>
  );
}

// Helper Components
function StatCard({ title, value, icon, color }: { title: string; value: string | number; icon: string; color: string }) {
  const colorClasses: Record<string, string> = {
    green: 'from-green-500 to-green-600',
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    yellow: 'from-yellow-500 to-yellow-600',
    indigo: 'from-indigo-500 to-indigo-600',
    orange: 'from-orange-500 to-orange-600',
    teal: 'from-teal-500 to-teal-600',
  };

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} rounded-xl p-6 text-white`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-90">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <span className="text-3xl opacity-80">{icon}</span>
      </div>
    </div>
  );
}

function QuickActionCard({ href, title, icon, description }: { href: string; title: string; icon: string; description: string }) {
  return (
    <Link
      href={href}
      className="block p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-center"
    >
      <span className="text-3xl">{icon}</span>
      <h3 className="font-semibold mt-2">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </Link>
  );
}

function NavLink({ href, icon, label }: { href: string; icon: string; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
    >
      <span>{icon}</span>
      <span className="font-medium">{label}</span>
    </Link>
  );
}
