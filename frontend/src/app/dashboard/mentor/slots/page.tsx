'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { mentorService } from '@/services/mentor.service';
import { Slot } from '@/types';

export default function MentorSlotsPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [slots, setSlots] = useState<Slot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  // Create slot form
  const [newSlot, setNewSlot] = useState({
    date: '',
    startTime: '',
    endTime: '',
    isRecurring: false,
    recurringDays: [] as string[],
    recurringEndDate: '',
  });

  useEffect(() => {
    if (user?.role !== 'MENTOR') {
      router.push('/dashboard');
      return;
    }
    loadSlots();
  }, [user, router]);

  const loadSlots = async () => {
    try {
      setIsLoading(true);
      const response = await mentorService.getSlots();
      setSlots(response.data || []);
    } catch (error: any) {
      console.error('Error loading slots:', error);
      if (error.response?.status === 403) {
        setMessage({ type: 'error', text: 'Your application must be approved before you can create slots.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    
    if (!newSlot.date || !newSlot.startTime || !newSlot.endTime) {
      setMessage({ type: 'error', text: 'Date, start time, and end time are required' });
      return;
    }

    setIsCreating(true);
    try {
      const slotData = {
        date: newSlot.date,
        startTime: newSlot.startTime,
        endTime: newSlot.endTime,
        isRecurring: newSlot.isRecurring,
        recurringDays: newSlot.isRecurring ? newSlot.recurringDays : undefined,
        recurringEndDate: newSlot.isRecurring ? newSlot.recurringEndDate : undefined,
      };

      await mentorService.createSlots(slotData);
      setMessage({ type: 'success', text: 'Slot created successfully!' });
      setShowCreateModal(false);
      setNewSlot({
        date: '',
        startTime: '',
        endTime: '',
        isRecurring: false,
        recurringDays: [],
        recurringEndDate: '',
      });
      loadSlots();
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to create slot',
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteSlot = async (slotId: string) => {
    if (!confirm('Are you sure you want to delete this slot?')) return;
    
    try {
      await mentorService.deleteSlot(slotId);
      setMessage({ type: 'success', text: 'Slot deleted successfully' });
      loadSlots();
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to delete slot',
      });
    }
  };

  const toggleRecurringDay = (day: string) => {
    setNewSlot(prev => ({
      ...prev,
      recurringDays: prev.recurringDays.includes(day)
        ? prev.recurringDays.filter(d => d !== day)
        : [...prev.recurringDays, day],
    }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Group slots by date
  const groupedSlots = slots.reduce((acc, slot) => {
    const date = slot.date?.split('T')[0] || 'Unknown';
    if (!acc[date]) acc[date] = [];
    acc[date].push(slot);
    return acc;
  }, {} as Record<string, Slot[]>);

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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Manage Availability</h1>
          <p className="text-gray-600">Set your available time slots for sessions</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
        >
          <span>+</span> Add Slot
        </button>
      </div>

      {/* Message */}
      {message && (
        <div className={`p-4 rounded-lg ${
          message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {message.text}
        </div>
      )}

      {/* Slots List */}
      {Object.keys(groupedSlots).length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <span className="text-6xl">📅</span>
          <h2 className="text-xl font-semibold mt-4">No slots available</h2>
          <p className="text-gray-600 mt-2">Create your first slot to start receiving bookings</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Create First Slot
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedSlots)
            .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
            .map(([date, daySlots]) => (
              <div key={date} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-indigo-50 px-6 py-3 border-b">
                  <h3 className="font-semibold text-indigo-800">{formatDate(date)}</h3>
                </div>
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {daySlots.map((slot) => (
                    <div
                      key={slot.id}
                      className={`p-4 rounded-lg border-2 ${
                        slot.isBooked
                          ? 'border-gray-200 bg-gray-50'
                          : 'border-green-200 bg-green-50'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold">
                            {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                          </p>
                          <p className={`text-sm mt-1 ${
                            slot.isBooked ? 'text-gray-500' : 'text-green-600'
                          }`}>
                            {slot.isBooked ? 'Booked' : 'Available'}
                          </p>
                        </div>
                        {!slot.isBooked && (
                          <button
                            onClick={() => handleDeleteSlot(slot.id)}
                            className="text-red-500 hover:text-red-700 p-1"
                            title="Delete slot"
                          >
                            🗑️
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Create Slot Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Create New Slot</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
            </div>

            <form onSubmit={handleCreateSlot} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                <input
                  type="date"
                  value={newSlot.date}
                  onChange={(e) => setNewSlot(prev => ({ ...prev, date: e.target.value }))}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Time *</label>
                  <input
                    type="time"
                    value={newSlot.startTime}
                    onChange={(e) => setNewSlot(prev => ({ ...prev, startTime: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Time *</label>
                  <input
                    type="time"
                    value={newSlot.endTime}
                    onChange={(e) => setNewSlot(prev => ({ ...prev, endTime: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newSlot.isRecurring}
                    onChange={(e) => setNewSlot(prev => ({ ...prev, isRecurring: e.target.checked }))}
                    className="w-4 h-4 text-indigo-600"
                  />
                  <span className="text-sm font-medium text-gray-700">Make this a recurring slot</span>
                </label>
              </div>

              {newSlot.isRecurring && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Repeat on</label>
                    <div className="flex flex-wrap gap-2">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                        <button
                          key={day}
                          type="button"
                          onClick={() => toggleRecurringDay(day)}
                          className={`px-3 py-2 rounded-lg border ${
                            newSlot.recurringDays.includes(day)
                              ? 'bg-indigo-600 text-white border-indigo-600'
                              : 'bg-white text-gray-700 border-gray-300'
                          }`}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Recurring until
                    </label>
                    <input
                      type="date"
                      value={newSlot.recurringEndDate}
                      onChange={(e) => setNewSlot(prev => ({ ...prev, recurringEndDate: e.target.value }))}
                      min={newSlot.date || new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </>
              )}

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating}
                  className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                >
                  {isCreating ? 'Creating...' : 'Create Slot'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
