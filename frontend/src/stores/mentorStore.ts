import { create } from "zustand";
import api from "@/lib/api";
import type {
  DashboardStats,
  Slot,
  Booking,
  Earnings,
  Transaction,
  Withdrawal,
  Incentive,
} from "@/lib/types";

interface MentorState {
  dashboard: DashboardStats | null;
  slots: Slot[];
  bookings: Booking[];
  earnings: Earnings[];
  transactions: Transaction[];
  withdrawals: Withdrawal[];
  incentives: Incentive[];
  isLoading: boolean;

  fetchDashboard: () => Promise<void>;
  fetchSlots: (params?: Record<string, string>) => Promise<void>;
  createSlots: (slots: { startTime: string; endTime: string }[]) => Promise<void>;
  updateSlot: (slotId: string, data: Record<string, unknown>) => Promise<void>;
  deleteSlot: (slotId: string) => Promise<void>;
  fetchBookings: (params?: Record<string, string>) => Promise<void>;
  rescheduleBooking: (bookingId: string, newSlotId: string, reason?: string) => Promise<void>;
  cancelBooking: (bookingId: string, reason?: string) => Promise<void>;
  completeBooking: (bookingId: string, notes?: string) => Promise<void>;
  fetchEarnings: (params?: Record<string, string>) => Promise<void>;
  fetchTransactions: (params?: Record<string, string>) => Promise<void>;
  fetchWithdrawals: (params?: Record<string, string>) => Promise<void>;
  requestWithdrawal: (data: Record<string, unknown>) => Promise<void>;
  fetchIncentives: () => Promise<void>;
  claimIncentive: (incentiveId: string) => Promise<void>;
}

export const useMentorStore = create<MentorState>((set, get) => ({
  dashboard: null,
  slots: [],
  bookings: [],
  earnings: [],
  transactions: [],
  withdrawals: [],
  incentives: [],
  isLoading: false,

  fetchDashboard: async () => {
    set({ isLoading: true });
    try {
      const res = await api.get("/mentor/dashboard");
      set({ dashboard: res.data.data });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchSlots: async (params) => {
    const res = await api.get("/mentor/slots", { params });
    set({ slots: res.data.data || [] });
  },

  createSlots: async (slots) => {
    await api.post("/mentor/slots", { slots });
    await get().fetchSlots();
  },

  updateSlot: async (slotId, data) => {
    await api.patch(`/mentor/slots/${slotId}`, data);
    await get().fetchSlots();
  },

  deleteSlot: async (slotId) => {
    await api.delete(`/mentor/slots/${slotId}`);
    set((s) => ({ slots: s.slots.filter((sl) => sl.id !== slotId) }));
  },

  fetchBookings: async (params) => {
    const res = await api.get("/mentor/bookings", { params });
    set({ bookings: res.data.data?.bookings || res.data.data || [] });
  },

  rescheduleBooking: async (bookingId, newSlotId, reason) => {
    await api.patch(`/mentor/bookings/${bookingId}/reschedule`, { newSlotId, reason });
    await get().fetchBookings();
  },

  cancelBooking: async (bookingId, reason) => {
    await api.patch(`/mentor/bookings/${bookingId}/cancel`, { reason });
    await get().fetchBookings();
  },

  completeBooking: async (bookingId, mentorNotes) => {
    await api.patch(`/mentor/bookings/${bookingId}/complete`, { mentorNotes });
    await get().fetchBookings();
  },

  fetchEarnings: async (params) => {
    const res = await api.get("/mentor/earnings", { params });
    set({ earnings: res.data.data?.earnings || res.data.data || [] });
  },

  fetchTransactions: async (params) => {
    const res = await api.get("/mentor/transactions", { params });
    set({ transactions: res.data.data?.transactions || res.data.data || [] });
  },

  fetchWithdrawals: async (params) => {
    const res = await api.get("/mentor/withdrawals", { params });
    set({ withdrawals: res.data.data?.withdrawals || res.data.data || [] });
  },

  requestWithdrawal: async (data) => {
    await api.post("/mentor/withdrawals", data);
    await get().fetchWithdrawals();
  },

  fetchIncentives: async () => {
    const res = await api.get("/mentor/incentives");
    set({ incentives: res.data.data || [] });
  },

  claimIncentive: async (incentiveId) => {
    await api.patch(`/mentor/incentives/${incentiveId}/claim`);
    await get().fetchIncentives();
  },
}));
