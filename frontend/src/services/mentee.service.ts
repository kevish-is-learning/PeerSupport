import { apiClient } from '../lib/api-client';
import { ApiResponse, PaginatedResponse } from '../types';

export interface MentorWithProfile {
  id: string;
  email: string;
  name?: string;
  profilePicture?: string;
  role: string;
  mentorProfile: {
    id: string;
    bio: string;
    expertise: string[];
    certifications: string[];
    pricePerSession: number;
    rating: number;
    totalReviews: number;
    verificationStatus: string;
    verifiedBadge: boolean;
  };
}

export interface Booking {
  id: string;
  mentorId: string;
  menteeId: string;
  slotId: string;
  status: string;
  sessionMode: string;
  sessionType: string;
  purpose: string;
  meetingLink?: string;
  createdAt: string;
  updatedAt: string;
  mentor?: {
    id: string;
    name?: string;
    email: string;
    profilePicture?: string;
  };
  slot?: {
    id: string;
    startTime: string;
    endTime: string;
    status: string;
  };
  payment?: {
    id: string;
    amount: number;
    status: string;
    razorpayOrderId: string;
    razorpayPaymentId?: string;
  };
  feedback?: {
    id: string;
    rating: number;
    comment?: string;
  };
}

export interface Webinar {
  id: string;
  title: string;
  description: string;
  price?: number;
  type: 'FREE' | 'PAID';
  startTime: string;
  endTime: string;
  meetingLink?: string;
  isRegistered: boolean;
  totalRegistrations: number;
}

export interface WebinarRegistration {
  id: string;
  webinarId: string;
  userId: string;
  paymentId?: string;
  createdAt: string;
  webinar: Webinar;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface DashboardStats {
  upcomingBookings: number;
  completedBookings: number;
  pendingBookings: number;
  totalSpent: number;
  upcomingWebinars: number;
  unreadNotifications: number;
}

export const menteeService = {
  // Dashboard
  async getDashboardStats() {
    const response = await apiClient.get<ApiResponse<DashboardStats>>('/mentee/dashboard/stats');
    return response.data;
  },

  // Mentors
  async getAllMentors(params?: {
    page?: number;
    limit?: number;
    expertise?: string;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
  }) {
    const response = await apiClient.get<
      ApiResponse<{
        mentors: MentorWithProfile[];
        pagination: any;
      }>
    >('/mentee/mentors', { params });
    return response.data;
  },

  async getMentorById(mentorId: string) {
    const response = await apiClient.get<ApiResponse<MentorWithProfile>>(
      `/mentee/mentors/${mentorId}`
    );
    return response.data;
  },

  // Bookings
  async getMyBookings(params?: {
    status?: string;
    page?: number;
    limit?: number;
  }) {
    const response = await apiClient.get<ApiResponse<{
      bookings: Booking[];
      pagination: any;
    }>>(
      '/mentee/bookings',
      { params }
    );
    return response.data;
  },

  async getBookingById(bookingId: string) {
    const response = await apiClient.get<ApiResponse<Booking>>(
      `/mentee/bookings/${bookingId}`
    );
    return response.data;
  },

  async createBooking(data: {
    mentorId: string;
    slotId: string;
    sessionMode: string;
    purpose: string;
  }) {
    const response = await apiClient.post<ApiResponse<Booking>>(
      '/mentee/bookings',
      data
    );
    return response.data;
  },

  async cancelBooking(bookingId: string) {
    const response = await apiClient.patch<ApiResponse<Booking>>(
      `/mentee/bookings/${bookingId}/cancel`
    );
    return response.data;
  },

  // Reviews
  async submitReview(bookingId: string, data: { rating: number; comment?: string }) {
    const response = await apiClient.post<ApiResponse<any>>(
      `/mentee/bookings/${bookingId}/review`,
      data
    );
    return response.data;
  },

  // Webinars
  async getAllWebinars(params?: {
    type?: 'FREE' | 'PAID';
    page?: number;
    limit?: number;
  }) {
    const response = await apiClient.get<ApiResponse<{
      webinars: Webinar[];
      pagination: any;
    }>>(
      '/mentee/webinars',
      { params }
    );
    return response.data;
  },

  async registerForWebinar(webinarId: string) {
    const response = await apiClient.post<ApiResponse<WebinarRegistration>>(
      `/mentee/webinars/${webinarId}/register`
    );
    return response.data;
  },

  async getMyWebinarRegistrations() {
    const response = await apiClient.get<ApiResponse<WebinarRegistration[]>>(
      '/mentee/webinars/registrations/my'
    );
    return response.data;
  },

  // Notifications
  async getNotifications(params?: {
    page?: number;
    limit?: number;
    isRead?: boolean;
  }) {
    const response = await apiClient.get<
      ApiResponse<{
        notifications: Notification[];
        unreadCount: number;
        pagination: any;
      }>
    >('/mentee/notifications', { params });
    return response.data;
  },

  async markNotificationAsRead(notificationId: string) {
    const response = await apiClient.patch<ApiResponse<Notification>>(
      `/mentee/notifications/${notificationId}/read`
    );
    return response.data;
  },

  async markAllNotificationsAsRead() {
    const response = await apiClient.patch<ApiResponse<null>>(
      '/mentee/notifications/read-all'
    );
    return response.data;
  },
};
