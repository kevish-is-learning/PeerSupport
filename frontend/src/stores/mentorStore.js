import { create } from "zustand";
import { mentorApi } from "../lib/api";

export const useMentorStore = create((set, get) => ({
  // Dashboard
  dashboard: null,
  dashboardLoading: false,

  // Slots
  slots: [],
  slotsLoading: false,

  // Bookings
  bookings: [],
  bookingsLoading: false,
  bookingsPagination: { page: 1, limit: 10, total: 0, totalPages: 0 },

  // Earnings
  earnings: null,
  earningsLoading: false,
  transactions: [],
  transactionsLoading: false,

  // Withdrawals
  withdrawals: [],
  withdrawalsLoading: false,

  // Incentives
  incentives: [],
  incentivesLoading: false,

  // Ratings
  ratings: [],
  ratingsLoading: false,

  // Can Accept Bookings
  canAccept: false,
  canAcceptLoading: false,

  // Actions
  checkCanAcceptBookings: async () => {
    set({ canAcceptLoading: true });
    try {
      const response = await mentorApi.canAcceptBookings();
      set({ canAccept: response.data.data.canAccept, canAcceptLoading: false });
      return response.data.data;
    } catch (error) {
      set({ canAcceptLoading: false });
      return { canAccept: false };
    }
  },

  fetchDashboard: async () => {
    set({ dashboardLoading: true });
    try {
      const response = await mentorApi.getDashboard();
      set({ dashboard: response.data.data, dashboardLoading: false });
    } catch (error) {
      console.error("Failed to fetch dashboard:", error);
      set({ dashboardLoading: false });
    }
  },

  // Slot Actions
  fetchSlots: async (params = {}) => {
    set({ slotsLoading: true });
    try {
      const response = await mentorApi.getSlots(params);
      set({ slots: response.data.data, slotsLoading: false });
    } catch (error) {
      console.error("Failed to fetch slots:", error);
      set({ slotsLoading: false });
    }
  },

  createSlots: async (slots) => {
    try {
      await mentorApi.createSlots(slots);
      get().fetchSlots();
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || "Failed to create slots" 
      };
    }
  },

  updateSlot: async (id, data) => {
    try {
      await mentorApi.updateSlot(id, data);
      get().fetchSlots();
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || "Failed to update slot" 
      };
    }
  },

  deleteSlot: async (id) => {
    try {
      await mentorApi.deleteSlot(id);
      get().fetchSlots();
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || "Failed to delete slot" 
      };
    }
  },

  // Booking Actions
  fetchBookings: async (params = {}) => {
    set({ bookingsLoading: true });
    try {
      const response = await mentorApi.getBookings(params);
      const { bookings, pagination } = response.data.data;
      set({ bookings, bookingsPagination: pagination, bookingsLoading: false });
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      set({ bookingsLoading: false });
    }
  },

  completeBooking: async (id, data) => {
    try {
      await mentorApi.completeBooking(id, data);
      get().fetchBookings();
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || "Failed to complete booking" 
      };
    }
  },

  cancelBooking: async (id, reason) => {
    try {
      await mentorApi.cancelBooking(id, reason);
      get().fetchBookings();
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || "Cancellation failed" 
      };
    }
  },

  rescheduleBooking: async (id, data) => {
    try {
      await mentorApi.rescheduleBooking(id, data);
      get().fetchBookings();
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || "Rescheduling failed" 
      };
    }
  },

  // Earnings Actions
  fetchEarnings: async () => {
    set({ earningsLoading: true });
    try {
      const response = await mentorApi.getEarnings();
      set({ earnings: response.data.data, earningsLoading: false });
    } catch (error) {
      console.error("Failed to fetch earnings:", error);
      set({ earningsLoading: false });
    }
  },

  fetchTransactions: async (params = {}) => {
    set({ transactionsLoading: true });
    try {
      const response = await mentorApi.getTransactions(params);
      set({ transactions: response.data.data, transactionsLoading: false });
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
      set({ transactionsLoading: false });
    }
  },

  // Withdrawal Actions
  fetchWithdrawals: async () => {
    set({ withdrawalsLoading: true });
    try {
      const response = await mentorApi.getWithdrawals();
      set({ withdrawals: response.data.data, withdrawalsLoading: false });
    } catch (error) {
      console.error("Failed to fetch withdrawals:", error);
      set({ withdrawalsLoading: false });
    }
  },

  requestWithdrawal: async (data) => {
    try {
      await mentorApi.requestWithdrawal(data);
      get().fetchWithdrawals();
      get().fetchEarnings();
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || "Withdrawal request failed" 
      };
    }
  },

  // Incentive Actions
  fetchIncentives: async () => {
    set({ incentivesLoading: true });
    try {
      const response = await mentorApi.getIncentives();
      set({ incentives: response.data.data, incentivesLoading: false });
    } catch (error) {
      console.error("Failed to fetch incentives:", error);
      set({ incentivesLoading: false });
    }
  },

  claimIncentive: async (id) => {
    try {
      await mentorApi.claimIncentive(id);
      get().fetchIncentives();
      get().fetchEarnings();
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || "Claim failed" 
      };
    }
  },

  // Ratings Actions
  fetchRatings: async () => {
    set({ ratingsLoading: true });
    try {
      const response = await mentorApi.getRatings();
      set({ ratings: response.data.data, ratingsLoading: false });
    } catch (error) {
      console.error("Failed to fetch ratings:", error);
      set({ ratingsLoading: false });
    }
  },
}));
