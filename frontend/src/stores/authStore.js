import { create } from "zustand";
import { persist } from "zustand/middleware";
import { userApi, authApi } from "../lib/api";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      isAuthenticated: false,

      setUser: (user) => set({ 
        user, 
        isAuthenticated: !!user,
        isLoading: false 
      }),

      login: async (credentials) => {
        try {
          const response = await authApi.login(credentials);
          const { user } = response.data.data;
          set({ user, isAuthenticated: true, isLoading: false });
          return { success: true, user };
        } catch (error) {
          return { 
            success: false, 
            error: error.response?.data?.message || "Login failed" 
          };
        }
      },

      register: async (data) => {
        try {
          const response = await authApi.register(data);
          const { user } = response.data.data;
          set({ user, isAuthenticated: true, isLoading: false });
          return { success: true, user };
        } catch (error) {
          return { 
            success: false, 
            error: error.response?.data?.message || "Registration failed" 
          };
        }
      },

      logout: async () => {
        try {
          await authApi.logout();
        } catch (error) {
          console.error("Logout error:", error);
        } finally {
          set({ user: null, isAuthenticated: false });
        }
      },

      fetchUser: async () => {
        try {
          set({ isLoading: true });
          const response = await userApi.getCurrentUser();
          const user = response.data.data;
          set({ user, isAuthenticated: true, isLoading: false });
          return user;
        } catch (error) {
          set({ user: null, isAuthenticated: false, isLoading: false });
          return null;
        }
      },

      updateUser: async (data) => {
        try {
          const response = await userApi.updateCurrentUser(data);
          const user = response.data.data;
          set({ user });
          return { success: true, user };
        } catch (error) {
          return { 
            success: false, 
            error: error.response?.data?.message || "Update failed" 
          };
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);

// Helper hooks
export const useUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);
export const useIsLoading = () => useAuthStore((state) => state.isLoading);
