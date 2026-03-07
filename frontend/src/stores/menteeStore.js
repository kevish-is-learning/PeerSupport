import { create } from "zustand";
import { menteeApi } from "../lib/api";

export const useMenteeStore = create((set, get) => ({
  // Dashboard
  dashboardStats: null,
  dashboardLoading: false,

  // Mentors
  mentors: [],
  mentorsLoading: false,
  mentorsPagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
  selectedMentor: null,

  // Bookings
  bookings: [],
  bookingsLoading: false,
  bookingsPagination: { page: 1, limit: 10, total: 0, totalPages: 0 },

  // Notifications
  notifications: [],
  notificationsLoading: false,

  // Dashboard Actions
  fetchDashboardStats: async () => {
    set({ dashboardLoading: true });
    try {
      const response = await menteeApi.getDashboardStats();
      set({ dashboardStats: response.data.data, dashboardLoading: false });
    } catch (error) {
      console.error("Failed to fetch dashboard stats:", error);
      set({ dashboardLoading: false });
    }
  },

  // Mentor Actions
  fetchMentors: async (params = {}) => {
    set({ mentorsLoading: true });
    try {
      const response = await menteeApi.getAllMentors(params);
      const { mentors, pagination } = response.data.data;
      set({ mentors, mentorsPagination: pagination, mentorsLoading: false });
    } catch (error) {
      console.error("Failed to fetch mentors:", error);
      set({ mentorsLoading: false });
    }
  },

  fetchMentorById: async (id) => {
    try {
      const response = await menteeApi.getMentorById(id);
      set({ selectedMentor: response.data.data });
      return response.data.data;
    } catch (error) {
      console.error("Failed to fetch mentor:", error);
      return null;
    }
  },

  // Booking Actions
  fetchBookings: async (params = {}) => {
    set({ bookingsLoading: true });
    try {
      const response = await menteeApi.getMyBookings(params);
      const { bookings, pagination } = response.data.data;
      set({ bookings, bookingsPagination: pagination, bookingsLoading: false });
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      set({ bookingsLoading: false });
    }
  },

  createBooking: async (data) => {
    try {
      const response = await menteeApi.createBooking(data);
      // Refresh bookings
      get().fetchBookings();
      return { success: true, data: response.data.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || "Booking failed" 
      };
    }
  },

  cancelBooking: async (id, reason) => {
    try {
      await menteeApi.cancelBooking(id, reason);
      get().fetchBookings();
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || "Cancellation failed" 
      };
    }
  },

  submitReview: async (bookingId, data) => {
    try {
      await menteeApi.submitReview(bookingId, data);
      get().fetchBookings();
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || "Review submission failed" 
      };
    }
  },

  // Notification Actions
  fetchNotifications: async () => {
    set({ notificationsLoading: true });
    try {
      const response = await menteeApi.getNotifications();
      set({ notifications: response.data.data, notificationsLoading: false });
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
      set({ notificationsLoading: false });
    }
  },
}));
