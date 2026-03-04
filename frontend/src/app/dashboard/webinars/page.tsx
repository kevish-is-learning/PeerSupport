'use client';

import { useState, useEffect } from 'react';
import { menteeService, Webinar } from '@/services/mentee.service';

type TabType = 'upcoming' | 'registered' | 'past';

export default function WebinarsPage() {
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('upcoming');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadWebinars();
  }, [activeTab]);

  const loadWebinars = async () => {
    try {
      setLoading(true);
      const response = await menteeService.getAllWebinars({ limit: 50 });
      setWebinars(response.data?.webinars || []);
    } catch (error) {
      console.error('Failed to load webinars:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
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

  const filteredWebinars = webinars.filter((webinar) =>
    searchQuery === '' ||
    webinar.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    webinar.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const tabs: { key: TabType; label: string; icon: string }[] = [
    { key: 'upcoming', label: 'Upcoming', icon: '🎥' },
    { key: 'registered', label: 'My Registrations', icon: '✅' },
    { key: 'past', label: 'Past Webinars', icon: '📚' },
  ];

  // Mock data for display
  const mockWebinars = [
    {
      id: '1',
      title: 'CAT 2026 Preparation Strategy',
      description: 'Master the art of CAT preparation with proven strategies from IIM toppers. Learn time management, section-wise preparation tips, and more.',
      hostName: 'Rahul Sharma',
      hostTitle: 'IIM Ahmedabad, CAT 99.8%ile',
      scheduledAt: '2026-03-10T18:00:00Z',
      duration: 90,
      price: 0,
      maxAttendees: 500,
      currentAttendees: 342,
      tags: ['CAT Prep', 'Strategy', 'Free'],
    },
    {
      id: '2',
      title: 'IIM Interview Masterclass',
      description: 'Crack the IIM interview with confidence. Learn about WAT, PI structure, common questions, and how to present yourself effectively.',
      hostName: 'Priya Verma',
      hostTitle: 'IIM Bangalore, HR Professional',
      scheduledAt: '2026-03-15T17:00:00Z',
      duration: 120,
      price: 499,
      maxAttendees: 100,
      currentAttendees: 67,
      tags: ['Interview', 'IIM', 'Premium'],
    },
    {
      id: '3',
      title: 'Building a Strong MBA Profile',
      description: 'Learn how extracurriculars, work experience, and achievements can strengthen your MBA application and set you apart.',
      hostName: 'Amit Kumar',
      hostTitle: 'Admissions Consultant',
      scheduledAt: '2026-03-20T19:00:00Z',
      duration: 60,
      price: 0,
      maxAttendees: 300,
      currentAttendees: 189,
      tags: ['Profile Building', 'Free'],
    },
  ];

  const displayWebinars = filteredWebinars.length > 0 ? filteredWebinars : mockWebinars;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold mb-2">Browse Webinars</h1>
        <p className="text-gray-600">Attend live webinars and workshops from industry experts</p>
      </div>

      {/* Search Bar */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search webinars by topic, host, or keyword..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  activeTab === tab.key
                    ? 'bg-black text-white'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>{tab.icon}</span>
                <span className="hidden md:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Webinars Grid */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
        </div>
      ) : displayWebinars.length === 0 ? (
        <div className="text-center py-16 bg-white border border-gray-200 rounded-xl">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🎥</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">No webinars found</h3>
          <p className="text-gray-600">Check back later for upcoming webinars</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayWebinars.map((webinar: any) => (
            <div
              key={webinar.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Webinar Banner */}
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-32 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-5xl">🎓</span>
                </div>
                {webinar.price === 0 && (
                  <span className="absolute top-3 right-3 px-2 py-1 bg-green-500 text-white text-xs font-bold rounded">
                    FREE
                  </span>
                )}
                {webinar.price > 0 && (
                  <span className="absolute top-3 right-3 px-2 py-1 bg-yellow-500 text-black text-xs font-bold rounded">
                    ₹{webinar.price}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{webinar.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{webinar.description}</p>

                {/* Host Info */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    {webinar.hostName?.charAt(0).toUpperCase() || 'H'}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{webinar.hostName}</p>
                    <p className="text-xs text-gray-500">{webinar.hostTitle}</p>
                  </div>
                </div>

                {/* Tags */}
                {webinar.tags && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {webinar.tags.map((tag: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Date & Info */}
                <div className="flex items-center justify-between py-3 border-t border-gray-100 text-sm">
                  <div>
                    <p className="font-medium">{formatDate(webinar.scheduledAt)}</p>
                    <p className="text-gray-500">{formatTime(webinar.scheduledAt)} • {webinar.duration} mins</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600">{webinar.currentAttendees}/{webinar.maxAttendees}</p>
                    <p className="text-xs text-gray-500">Registered</p>
                  </div>
                </div>

                {/* Action Button */}
                <button className="w-full mt-4 px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium">
                  Register Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Featured Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
        <div className="max-w-2xl">
          <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4 inline-block">
            🔥 Premium Masterclass
          </span>
          <h2 className="text-2xl font-bold mb-2">Complete MBA Preparation Bundle</h2>
          <p className="opacity-90 mb-6">
            Get access to 10+ premium webinars, 1-on-1 doubt clearing sessions, and exclusive study materials with our comprehensive bundle.
          </p>
          <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
