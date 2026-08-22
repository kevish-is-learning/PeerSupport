"use client";

import { create } from "zustand";
import { toast } from "sonner";
import { authApi, healthApi } from "../lib/api";

const useAuthStore = create((set) => ({
  user: null,
  isLoading: false,
  isConnected: null,
  hasCheckedSession: false,
  error: null,
  statusMessage: "",

  clearError: () => set({ error: null }),
  setUser: (user) => set({ user, hasCheckedSession: true, isLoading: false }),

  checkBackendHealth: async () => {
    set({ isLoading: true, error: null });

    try {
      const result = await healthApi.check();
      set({
        isConnected: true,
        statusMessage: result?.message || "Backend connected",
        isLoading: false,
      });
      return result;
    } catch (error) {
      set({
        isConnected: false,
        error: error.message || "Backend is not reachable",
        isLoading: false,
      });
      throw error;
    }
  },

  fetchCurrentUser: async () => {
    set({ isLoading: true, error: null });

    try {
      const result = await authApi.me();
      set({
        user: result?.data?.user || null,
        hasCheckedSession: true,
        isLoading: false,
      });
      return result?.data?.user || null;
    } catch (error) {
      set({
        user: null,
        hasCheckedSession: true,
        isLoading: false,
        error:
          error.status === 401 ? null : error.message || "Failed to fetch user",
      });
      return null;
    }
  },

  register: async (payload) => {
    set({ isLoading: true, error: null });

    try {
      const result = await authApi.register(payload);
      const message = result?.message || "Registration successful";
      set({
        user: result?.data?.user || null,
        hasCheckedSession: true,
        statusMessage: message,
        isLoading: false,
      });
      toast.success(message);
      return result;
    } catch (error) {
      const errorMessage = error.message || "Registration failed";
      set({ isLoading: false, error: errorMessage });
      toast.error(errorMessage);
      throw error;
    }
  },

  login: async (payload) => {
    set({ isLoading: true, error: null });

    try {
      const result = await authApi.login(payload);
      const message = result?.message || "Login successful";
      set({
        user: result?.data?.user || null,
        hasCheckedSession: true,
        statusMessage: message,
        isLoading: false,
      });
      toast.success(message);
      return result;
    } catch (error) {
      const errorMessage = error.message || "Login failed";
      set({ isLoading: false, error: errorMessage });
      toast.error(errorMessage);
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });

    try {
      const result = await authApi.logout();
      const message = result?.message || "Logged out";
      set({
        user: null,
        hasCheckedSession: true,
        statusMessage: message,
        isLoading: false,
      });
      toast.success(message);
    } catch (error) {
      const errorMessage = error.message || "Logout failed";
      set({ isLoading: false, error: errorMessage });
      toast.error(errorMessage);
      throw error;
    }
  },
}));

export default useAuthStore;
