'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { menteeService, type DashboardStats, type Booking, type Webinar, type Notification, type MentorWithProfile } from '@/services/mentee.service';
import { profileService } from '@/services/profile.service';
import { applicationService } from '@/services/application.service';
import { MenteeProfile, MentorApplication, Resume } from '@/types';
import Link from 'next/link';

export default function MenteeDashboardContent() {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [profile, setProfile] = useState<MenteeProfile | null>(null);
  const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([]);
  const [pastBookings, setPastBookings] = useState<Booking[]>([]);
  const [mentors, setMentors] = useState<MentorWithProfile[]>([]);
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [mentorApplication, setMentorApplication] = useState<MentorApplication | null>(null);
  const [resumes, setResumes] = useState<Resume[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // Load all data in parallel
      const [
        statsRes,
        profileRes,
        upcomingRes,
        pastRes,
        mentorsRes,
        webinarsRes,
        notificationsRes,
        applicationRes,
        resumesRes,
      ] = await Promise.all([
        menteeService.getDashboardStats().catch(() => null),
        profileService.getCurrentProfile().catch(() => null),
        menteeService.getMyBookings({ status: 'CONFIRMED', limit: 5 }).catch(() => ({ data: { bookings: [], pagination: {} } })),
        menteeService.getMyBookings({ status: 'COMPLETED', limit: 5 }).catch(() => ({ data: { bookings: [], pagination: {} } })),
        menteeService.getAllMentors({ limit: 5 }).catch(() => ({ data: { mentors: [], pagination: {} } })),
        menteeService.getAllWebinars({ limit: 3 }).catch(() => ({ data: { webinars: [], pagination: {} } })),
        menteeService.getNotifications({ limit: 5 }).catch(() => ({ data: { notifications: [], unreadCount: 0, pagination: {} } })),
        applicationService.getMyApplication().catch(() => ({ data: null })),
        profileService.getResumes().catch(() => ({ data: [] })),
      ]);

      setStats(statsRes?.data || null);
      setProfile(profileRes?.data?.profile as MenteeProfile || null);
      setUpcomingBookings(upcomingRes?.data?.bookings || []);
      setPastBookings(pastRes?.data?.bookings || []);
      setMentors(mentorsRes?.data?.mentors || []);
      setWebinars(webinarsRes?.data?.webinars || []);
      setNotifications(notificationsRes?.data?.notifications || []);
      setMentorApplication(applicationRes?.data || null);
      setResumes(resumesRes?.data || []);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
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

  const getApplicationStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'text-green-600 bg-green-50';
      case 'REJECTED':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-yellow-600 bg-yellow-50';
    }
  };

  const getBookingStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'text-green-600 bg-green-50';
      case 'COMPLETED':
        return 'text-blue-600 bg-blue-50';
      case 'CANCELLED':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-yellow-600 bg-yellow-50';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="border border-gray-200 rounded-lg p-6 bg-gradient-to-r from-gray-50 to-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-gray-600">Here's everything happening in your learning journey</p>
      </div>

      {/* Dashboard Stats */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
            <p className="text-sm text-gray-600 mb-1">Upcoming Sessions</p>
            <p className="text-3xl font-bold text-blue-600">{stats.upcomingBookings}</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
            <p className="text-sm text-gray-600 mb-1">Completed</p>
            <p className="text-3xl font-bold text-green-600">{stats.completedBookings}</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
            <p className="text-sm text-gray-600 mb-1">Pending</p>
            <p className="text-3xl font-bold text-yellow-600">{stats.pendingBookings}</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
            <p className="text-sm text-gray-600 mb-1">Total Spent</p>
            <p className="text-3xl font-bold text-purple-600">₹{stats.totalSpent.toLocaleString()}</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
            <p className="text-sm text-gray-600 mb-1">Webinars</p>
            <p className="text-3xl font-bold text-indigo-600">{stats.upcomingWebinars}</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
            <p className="text-sm text-gray-600 mb-1">Notifications</p>
            <p className="text-3xl font-bold text-red-600">{stats.unreadNotifications}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Overview */}
          {profile && (
            <section className="border border-gray-200 rounded-lg p-6 bg-white">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Profile Overview</h2>
                <Link href="/profile" className="text-sm text-blue-600 hover:text-blue-700">
                  Edit Profile →
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Education</p>
                  {profile.bachelors.length > 0 && (
                    <p className="font-medium">{profile.bachelors[0]} - {profile.bachelors[1]}</p>
                  )}
                  {profile.masters.length > 0 && (
                    <p className="text-sm text-gray-600">Masters: {profile.masters[0]}</p>
                  )}
                </div>
                {profile.catScore && (
                  <div>
                    <p className="text-sm text-gray-600">CAT Score</p>
                    <p className="font-medium text-2xl">{profile.catScore}%</p>
                  </div>
                )}
                {profile.workExperience && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-600">Work Experience</p>
                    <p className="font-medium">{profile.workExperience}</p>
                  </div>
                )}
                {profile.certifications.length > 0 && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-600 mb-2">Certifications</p>
                    <div className="flex flex-wrap gap-2">
                      {profile.certifications.map((cert, idx) => (
                        <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {profile.expectations && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-600">Career Expectations</p>
                    <p className="text-gray-700">{profile.expectations}</p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Resumes */}
          {resumes.length > 0 && (
            <section className="border border-gray-200 rounded-lg p-6 bg-white">
              <h2 className="text-xl font-semibold mb-4">My Resumes ({resumes.length})</h2>
              <div className="space-y-3">
                {resumes.map((resume) => (
                  <div key={resume.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-100 rounded flex items-center justify-center">
                        <span className="text-red-600 font-semibold text-sm">PDF</span>
                      </div>
                      <div>
                        <p className="font-medium">{resume.name}</p>
                        <p className="text-sm text-gray-500">Uploaded {formatDate(resume.createdAt)}</p>
                      </div>
                    </div>
                    <a
                      href={resume.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                    >
                      View
                    </a>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Mentor Application Status */}
          {mentorApplication && (
            <section className="border border-gray-200 rounded-lg p-6 bg-white">
              <h2 className="text-xl font-semibold mb-4">Mentor Application Status</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getApplicationStatusColor(mentorApplication.status)}`}>
                    {mentorApplication.status}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600 text-sm">Applied on</span>
                  <p className="font-medium">{formatDate(mentorApplication.createdAt)}</p>
                </div>
                {mentorApplication.status === 'REJECTED' && mentorApplication.rejectionReason && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded">
                    <p className="text-sm text-red-800">
                      <span className="font-medium">Rejection Reason:</span> {mentorApplication.rejectionReason}
                    </p>
                  </div>
                )}
                {mentorApplication.status === 'PENDING' && (
                  <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
                    <p className="text-sm text-yellow-800">
                      Your application is under review. You'll be notified once it's processed.
                    </p>
                  </div>
                )}
                {mentorApplication.status === 'APPROVED' && (
                  <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded">
                    <p className="text-sm text-green-800">
                      Congratulations! Your mentor application has been approved. You can now start accepting mentees.
                    </p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Upcoming Bookings */}
          <section className="border border-gray-200 rounded-lg p-6 bg-white">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Upcoming Sessions</h2>
              <Link href="/bookings" className="text-sm text-blue-600 hover:text-blue-700">
                View All →
              </Link>
            </div>
            {upcomingBookings.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No upcoming sessions</p>
                <p className="text-sm mt-2">Book a session with a mentor to get started</p>
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingBookings.map((booking) => (
                  <div key={booking.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-3">
                        {booking.mentor?.profilePicture && (
                          <img
                            src={booking.mentor.profilePicture}
                            alt={booking.mentor.name}
                            className="w-12 h-12 rounded-full"
                          />
                        )}
                        <div>
                          <p className="font-semibold">{booking.mentor?.name}</p>
                          <p className="text-sm text-gray-600">{booking.purpose}</p>
                          {booking.slot && (
                            <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                              <span>📅 {formatDate(booking.slot.startTime)}</span>
                              <span>•</span>
                              <span>🕒 {formatTime(booking.slot.startTime)} - {formatTime(booking.slot.endTime)}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2 mt-2">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getBookingStatusColor(booking.status)}`}>
                              {booking.status}
                            </span>
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                              {booking.sessionMode}
                            </span>
                          </div>
                        </div>
                      </div>
                      {booking.meetingLink && (
                        <a
                          href={booking.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors text-sm"
                        >
                          Join
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Past Bookings */}
          {pastBookings.length > 0 && (
            <section className="border border-gray-200 rounded-lg p-6 bg-white">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Past Sessions</h2>
              </div>
              <div className="space-y-3">
                {pastBookings.map((booking) => (
                  <div key={booking.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-3">
                        {booking.mentor?.profilePicture && (
                          <img
                            src={booking.mentor.profilePicture}
                            alt={booking.mentor.name}
                            className="w-10 h-10 rounded-full"
                          />
                        )}
                        <div>
                          <p className="font-semibold">{booking.mentor?.name}</p>
                          <p className="text-sm text-gray-600">{booking.purpose}</p>
                          {booking.slot && (
                            <p className="text-sm text-gray-500 mt-1">
                              {formatDate(booking.slot.startTime)}
                            </p>
                          )}
                          {booking.feedback && (
                            <div className="mt-2 flex items-center gap-2">
                              <span className="text-yellow-500">{'⭐'.repeat(booking.feedback.rating)}</span>
                              <span className="text-sm text-gray-600">You rated this session</span>
                            </div>
                          )}
                        </div>
                      </div>
                      {!booking.feedback && (
                        <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm">
                          Leave Review
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Available Mentors */}
          <section className="border border-gray-200 rounded-lg p-6 bg-white">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Top Mentors</h2>
              <Link href="/mentors" className="text-sm text-blue-600 hover:text-blue-700">
                Browse All →
              </Link>
            </div>
            {mentors.length === 0 ? (
              <p className="text-center py-8 text-gray-500">No mentors available</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mentors.slice(0, 4).map((mentor) => (
                  <div key={mentor.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                      {mentor.profilePicture && (
                        <img
                          src={mentor.profilePicture}
                          alt={mentor.name}
                          className="w-12 h-12 rounded-full"
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">{mentor.name}</p>
                          {mentor.mentorProfile.verifiedBadge && (
                            <span className="text-blue-500" title="Verified">✓</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">{mentor.mentorProfile.bio}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-500">⭐</span>
                            <span className="text-sm font-medium">{mentor.mentorProfile.rating.toFixed(1)}</span>
                            <span className="text-sm text-gray-500">({mentor.mentorProfile.totalReviews})</span>
                          </div>
                          <span className="text-sm font-semibold text-green-600">
                            ₹{mentor.mentorProfile.pricePerSession}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {mentor.mentorProfile.expertise.slice(0, 3).map((skill, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Link
                      href={`/mentors/${mentor.id}`}
                      className="block mt-3 w-full text-center px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors text-sm"
                    >
                      View Profile
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Webinars */}
          <section className="border border-gray-200 rounded-lg p-6 bg-white">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Upcoming Webinars</h2>
              <Link href="/webinars" className="text-sm text-blue-600 hover:text-blue-700">
                View All →
              </Link>
            </div>
            {webinars.length === 0 ? (
              <p className="text-center py-8 text-gray-500">No upcoming webinars</p>
            ) : (
              <div className="space-y-3">
                {webinars.map((webinar) => (
                  <div key={webinar.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{webinar.title}</h3>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            webinar.type === 'FREE' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {webinar.type}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{webinar.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>📅 {formatDate(webinar.startTime)}</span>
                          <span>🕒 {formatTime(webinar.startTime)}</span>
                          {webinar.price && <span className="font-semibold text-green-600">₹{webinar.price}</span>}
                          <span className="text-gray-500">{webinar.totalRegistrations} registered</span>
                        </div>
                      </div>
                      {webinar.isRegistered ? (
                        <span className="px-4 py-2 bg-green-50 text-green-700 rounded text-sm font-medium">
                          Registered ✓
                        </span>
                      ) : (
                        <button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors text-sm">
                          Register
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Sidebar - 1 column */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <section className="border border-gray-200 rounded-lg p-6 bg-white">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <Link
                href="/mentors"
                className="block w-full px-4 py-3 bg-black text-white rounded hover:bg-gray-800 transition-colors text-center font-medium"
              >
                Find Mentors
              </Link>
              <Link
                href="/bookings"
                className="block w-full px-4 py-3 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-center font-medium"
              >
                My Bookings
              </Link>
              <Link
                href="/webinars"
                className="block w-full px-4 py-3 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-center font-medium"
              >
                Browse Webinars
              </Link>
              <Link
                href="/profile"
                className="block w-full px-4 py-3 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-center font-medium"
              >
                Edit Profile
              </Link>
              {!mentorApplication && (
                <Link
                  href="/apply-mentor"
                  className="block w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded hover:from-purple-600 hover:to-indigo-600 transition-colors text-center font-medium"
                >
                  Become a Mentor
                </Link>
              )}
            </div>
          </section>

          {/* Notifications */}
          <section className="border border-gray-200 rounded-lg p-6 bg-white">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Notifications</h2>
              {notifications.length > 0 && (
                <Link href="/notifications" className="text-xs text-blue-600 hover:text-blue-700">
                  View All
                </Link>
              )}
            </div>
            {notifications.length === 0 ? (
              <p className="text-center py-4 text-gray-500 text-sm">No new notifications</p>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg border ${
                      notification.isRead ? 'bg-white border-gray-200' : 'bg-blue-50 border-blue-200'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-1 flex-shrink-0"></div>
                      )}
                      <div className="flex-1">
                        <p className="font-medium text-sm">{notification.title}</p>
                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-400 mt-1">{formatDate(notification.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Learning Progress */}
          {stats && (
            <section className="border border-gray-200 rounded-lg p-6 bg-gradient-to-br from-purple-50 to-indigo-50">
              <h2 className="text-lg font-semibold mb-4">Learning Progress</h2>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">Sessions Completed</span>
                    <span className="font-semibold">{stats.completedBookings}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full"
                      style={{ width: `${Math.min((stats.completedBookings / 10) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Goal: 10 sessions</p>
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-sm text-gray-700 mb-2">Keep it up!</p>
                  <p className="text-xs text-gray-600">
                    You've completed {stats.completedBookings} session{stats.completedBookings !== 1 ? 's' : ''} so far. 
                    Book more sessions to accelerate your learning.
                  </p>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
