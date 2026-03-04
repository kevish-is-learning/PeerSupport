'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { menteeService, Booking } from '@/services/mentee.service';

type TabType = 'upcoming' | 'completed' | 'cancelled';

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('upcoming');

  useEffect(() => {
    loadBookings();
  }, [activeTab]);

  const loadBookings = async () => {
    try {
      setLoading(true);
      let status = '';
      if (activeTab === 'upcoming') {
        status = 'CONFIRMED';
      } else if (activeTab === 'completed') {
        status = 'COMPLETED';
      } else {
        status = 'CANCELLED';
      }
      
      const response = await menteeService.getMyBookings({ status, limit: 50 });
      setBookings(response.data?.bookings || []);
    } catch (error) {
      console.error('Failed to load bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-green-100 text-green-700';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-700';
      case 'COMPLETED':
        return 'bg-blue-100 text-blue-700';
      case 'CANCELLED':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const tabs: { key: TabType; label: string; icon: string }[] = [
    { key: 'upcoming', label: 'Upcoming', icon: '📅' },
    { key: 'completed', label: 'Completed', icon: '✅' },
    { key: 'cancelled', label: 'Cancelled', icon: '❌' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold mb-2">My Bookings</h1>
        <p className="text-gray-600">Manage all your mentoring session bookings</p>
      </div>

      {/* Tabs */}
      <div className="bg-white border border-gray-200 rounded-xl p-2 inline-flex">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
              activeTab === tab.key
                ? 'bg-black text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Bookings List */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-16 bg-white border border-gray-200 rounded-xl">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">📅</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">No {activeTab} bookings</h3>
          <p className="text-gray-600 mb-6">
            {activeTab === 'upcoming'
              ? "You don't have any upcoming sessions. Book a session with a mentor!"
              : activeTab === 'completed'
              ? "You haven't completed any sessions yet."
              : "You don't have any cancelled bookings."}
          </p>
          {activeTab === 'upcoming' && (
            <Link
              href="/dashboard/find-mentors"
              className="inline-block px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
            >
              Find a Mentor
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Mentor Info */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {booking.slot?.mentor?.user?.name?.charAt(0).toUpperCase() || 'M'}
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      {booking.slot?.mentor?.user?.name || 'Mentor'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {booking.sessionType === 'ONE_ON_ONE' ? '1-on-1 Session' : 'Group Session'}
                      {' • '}
                      {booking.sessionMode}
                    </p>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="flex items-center gap-6">
                  <div className="text-center md:text-right">
                    <p className="font-medium">{formatDate(booking.slot?.startTime || '')}</p>
                    <p className="text-sm text-gray-600">
                      {formatTime(booking.slot?.startTime || '')} - {formatTime(booking.slot?.endTime || '')}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>💰 ₹{booking.amount}</span>
                  <span>📍 Booking ID: {booking.id.slice(0, 8)}...</span>
                </div>
                
                <div className="flex gap-2">
                  {activeTab === 'upcoming' && (
                    <>
                      <button className="px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-800">
                        Join Session
                      </button>
                      <button className="px-4 py-2 border border-gray-300 text-sm rounded-lg hover:bg-gray-50">
                        Reschedule
                      </button>
                    </>
                  )}
                  {activeTab === 'completed' && (
                    <button className="px-4 py-2 border border-gray-300 text-sm rounded-lg hover:bg-gray-50">
                      Leave Review
                    </button>
                  )}
                  <button className="px-4 py-2 border border-gray-300 text-sm rounded-lg hover:bg-gray-50">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
