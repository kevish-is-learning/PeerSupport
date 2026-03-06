'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { mentorService } from '@/services/mentor.service';
import { Booking, BookingStatus } from '@/types';

export default function MentorBookingsPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed' | 'cancelled'>('upcoming');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [rescheduleData, setRescheduleData] = useState({ newDate: '', newTime: '', reason: '' });
  const [cancelReason, setCancelReason] = useState('');
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (user?.role !== 'MENTOR') {
      router.push('/dashboard');
      return;
    }
    loadBookings();
  }, [user, router, filter]);

  const loadBookings = async () => {
    try {
      setIsLoading(true);
      const response = await mentorService.getBookings({ status: filter !== 'all' ? filter : undefined });
      setBookings(response.data?.bookings || []);
    } catch (error: any) {
      console.error('Error loading bookings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReschedule = async () => {
    if (!selectedBooking || !rescheduleData.newDate || !rescheduleData.newTime) {
      setMessage({ type: 'error', text: 'Date and time are required for rescheduling' });
      return;
    }

    setIsProcessing(true);
    try {
      await mentorService.rescheduleBooking(selectedBooking.id, {
        newDate: rescheduleData.newDate,
        newTime: rescheduleData.newTime,
        reason: rescheduleData.reason,
      });
      setMessage({ type: 'success', text: 'Booking rescheduled successfully' });
      setShowRescheduleModal(false);
      setSelectedBooking(null);
      setRescheduleData({ newDate: '', newTime: '', reason: '' });
      loadBookings();
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to reschedule booking',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancel = async () => {
    if (!selectedBooking) return;

    setIsProcessing(true);
    try {
      await mentorService.cancelBooking(selectedBooking.id, cancelReason);
      setMessage({ type: 'success', text: 'Booking cancelled successfully' });
      setShowCancelModal(false);
      setSelectedBooking(null);
      setCancelReason('');
      loadBookings();
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to cancel booking',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleComplete = async (bookingId: string) => {
    if (!confirm('Mark this session as completed?')) return;

    try {
      await mentorService.completeBooking(bookingId, { notes: '' });
      setMessage({ type: 'success', text: 'Session marked as completed' });
      loadBookings();
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to complete session',
      });
    }
  };

  const getStatusBadge = (status: BookingStatus) => {
    const styles: Record<BookingStatus, string> = {
      [BookingStatus.PENDING]: 'bg-yellow-100 text-yellow-800',
      [BookingStatus.CONFIRMED]: 'bg-blue-100 text-blue-800',
      [BookingStatus.COMPLETED]: 'bg-green-100 text-green-800',
      [BookingStatus.CANCELLED]: 'bg-red-100 text-red-800',
      [BookingStatus.RESCHEDULED]: 'bg-purple-100 text-purple-800',
      [BookingStatus.NO_SHOW]: 'bg-gray-100 text-gray-800',
      [BookingStatus.REFUNDED]: 'bg-orange-100 text-orange-800',
    };
    return styles[status] || 'bg-gray-100 text-gray-800';
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-IN', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      time: date.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Bookings</h1>
        <p className="text-gray-600">Manage your session bookings</p>
      </div>

      {/* Message */}
      {message && (
        <div className={`p-4 rounded-lg ${
          message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {message.text}
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {(['all', 'upcoming', 'completed', 'cancelled'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              filter === tab
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      {bookings.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <span className="text-6xl">📋</span>
          <h2 className="text-xl font-semibold mt-4">No bookings found</h2>
          <p className="text-gray-600 mt-2">
            {filter === 'upcoming'
              ? 'No upcoming sessions scheduled'
              : `No ${filter} bookings`}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => {
            const { date, time } = formatDateTime(booking.scheduledAt);
            return (
              <div
                key={booking.id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">
                        Session with {booking.mentee?.user?.name || 'Student'}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm ${getStatusBadge(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-gray-600">
                      <span className="flex items-center gap-1">
                        📅 {date}
                      </span>
                      <span className="flex items-center gap-1">
                        🕐 {time}
                      </span>
                      <span className="flex items-center gap-1">
                        ⏱️ {booking.duration || 60} mins
                      </span>
                      <span className="flex items-center gap-1">
                        💰 ₹{booking.amount}
                      </span>
                    </div>
                    {booking.notes && (
                      <p className="text-gray-500 mt-2 text-sm">
                        <strong>Notes:</strong> {booking.notes}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {(booking.status === BookingStatus.PENDING || 
                      booking.status === BookingStatus.CONFIRMED) && (
                      <>
                        <button
                          onClick={() => {
                            setSelectedBooking(booking);
                            setShowRescheduleModal(true);
                          }}
                          className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50"
                        >
                          Reschedule
                        </button>
                        <button
                          onClick={() => {
                            setSelectedBooking(booking);
                            setShowCancelModal(true);
                          }}
                          className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {booking.status === BookingStatus.CONFIRMED && (
                      <button
                        onClick={() => handleComplete(booking.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        Complete
                      </button>
                    )}
                    {booking.meetingLink && (
                      <a
                        href={booking.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                      >
                        Join Meeting
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Reschedule Modal */}
      {showRescheduleModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6">
            <h2 className="text-xl font-bold mb-4">Reschedule Session</h2>
            <p className="text-gray-600 mb-4">
              Rescheduling with {selectedBooking.mentee?.user?.name || 'Student'}
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Date *</label>
                <input
                  type="date"
                  value={rescheduleData.newDate}
                  onChange={(e) => setRescheduleData(prev => ({ ...prev, newDate: e.target.value }))}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Time *</label>
                <input
                  type="time"
                  value={rescheduleData.newTime}
                  onChange={(e) => setRescheduleData(prev => ({ ...prev, newTime: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reason</label>
                <textarea
                  value={rescheduleData.reason}
                  onChange={(e) => setRescheduleData(prev => ({ ...prev, reason: e.target.value }))}
                  placeholder="Reason for rescheduling..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  rows={3}
                />
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => {
                  setShowRescheduleModal(false);
                  setSelectedBooking(null);
                  setRescheduleData({ newDate: '', newTime: '', reason: '' });
                }}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleReschedule}
                disabled={isProcessing}
                className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
              >
                {isProcessing ? 'Rescheduling...' : 'Confirm Reschedule'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Modal */}
      {showCancelModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6">
            <h2 className="text-xl font-bold mb-4 text-red-600">Cancel Session</h2>
            <p className="text-gray-600 mb-4">
              Are you sure you want to cancel the session with {selectedBooking.mentee?.user?.name || 'Student'}?
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> Cancellation within 24 hours of the session may affect your mentor rating.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Reason for cancellation</label>
              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Please provide a reason..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                rows={3}
              />
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => {
                  setShowCancelModal(false);
                  setSelectedBooking(null);
                  setCancelReason('');
                }}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Go Back
              </button>
              <button
                onClick={handleCancel}
                disabled={isProcessing}
                className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                {isProcessing ? 'Cancelling...' : 'Confirm Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
