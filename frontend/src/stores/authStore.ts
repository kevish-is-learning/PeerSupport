import { create } from "zustand";
import api from "@/lib/api";
import type { User, MentorProfile, MentorApplication } from "@/lib/types";

interface AuthState {
  user: User | null;
  mentorProfile: MentorProfile | null;
  mentorApplication: MentorApplication | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchMe: () => Promise<void>;
  fetchMentorApplication: () => Promise<void>;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  mentorProfile: null,
  mentorApplication: null,
  isLoading: true,
  isAuthenticated: false,

  login: async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    const user = res.data.data?.user;
    set({ user, isAuthenticated: true });
  },

  register: async (email, password, name) => {
    const res = await api.post("/auth/register", { email, password, name });
    const user = res.data.data?.user;
    set({ user, isAuthenticated: true });
  },

  logout: async () => {
    await api.post("/auth/logout");
    set({ user: null, isAuthenticated: false, mentorProfile: null, mentorApplication: null });
  },

  fetchMe: async () => {
    try {
      set({ isLoading: true });
      const res = await api.get("/users/me");
      const data = res.data.data;
      set({
        user: data?.user || data,
        mentorProfile: data?.mentorProfile || null,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  fetchMentorApplication: async () => {
    try {
      const res = await api.get("/users/mentor-applications/my");
      set({ mentorApplication: res.data.data });
    } catch {
      set({ mentorApplication: null });
    }
  },

  setUser: (user) => set({ user, isAuthenticated: !!user }),
}));
