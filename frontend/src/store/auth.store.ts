import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';
import { authService } from '../services/auth.service';
import { RegisterInput, LoginInput } from '../lib/validations';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  
  // Actions
  register: (data: RegisterInput) => Promise<void>;
  login: (data: LoginInput) => Promise<void>;
  logout: () => Promise<void>;
  fetchProfile: () => Promise<void>;
  initialize: () => Promise<void>;
  setUser: (user: User | null) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      error: null,
      isAuthenticated: false,
      isInitialized: false,

      initialize: async () => {
        // Skip if already initialized
        if (get().isInitialized) return;
        
        set({ isLoading: true });
        
        // Check if we have persisted auth state
        const { isAuthenticated } = get();
        
        if (isAuthenticated) {
          // Verify the cookie is still valid by fetching profile
          try {
            const response = await authService.getProfile();
            set({ 
              user: response.data || null, 
              isAuthenticated: true,
              isLoading: false,
              isInitialized: true
            });
          } catch (error: any) {
            // Cookie expired or invalid, clear auth state
            set({ 
              user: null, 
              isAuthenticated: false,
              isLoading: false,
              isInitialized: true
            });
          }
        } else {
          // No persisted auth, just mark as initialized
          set({ 
            isLoading: false,
            isInitialized: true
          });
        }
      },

      register: async (data: RegisterInput) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.register(data);
          set({ 
            user: response.data?.user || null, 
            isAuthenticated: true,
            isLoading: false 
          });
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || 'Registration failed';
          set({ error: errorMessage, isLoading: false });
          throw new Error(errorMessage);
        }
      },

      login: async (data: LoginInput) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.login(data);
          set({ 
            user: response.data?.user || null, 
            isAuthenticated: true,
            isLoading: false 
          });
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || 'Login failed';
          set({ error: errorMessage, isLoading: false });
          throw new Error(errorMessage);
        }
      },

      logout: async () => {
        set({ isLoading: true, error: null });
        try {
          await authService.logout();
          set({ 
            user: null, 
            isAuthenticated: false,
            isLoading: false,
            isInitialized: true
          });
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || 'Logout failed';
          set({ error: errorMessage, isLoading: false });
          throw new Error(errorMessage);
        }
      },

      fetchProfile: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.getProfile();
          set({ 
            user: response.data || null, 
            isAuthenticated: true,
            isLoading: false 
          });
        } catch (error: any) {
          set({ 
            user: null, 
            isAuthenticated: false,
            isLoading: false 
          });
        }
      },

      setUser: (user: User | null) => {
        set({ user, isAuthenticated: !!user });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user,
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);
