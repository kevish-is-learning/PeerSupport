import { create } from "zustand";
import api from "@/lib/api";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  isVerified: boolean;
  createdAt: string;
}

interface MentorApplication {
  id: string;
  userId: string;
  status: string;
  bio: string;
  expertise: string[];
  pricePerSession: number;
  createdAt: string;
  updatedAt: string;
  user?: User;
}

interface AdminStats {
  totalUsers: number;
  totalMentors: number;
  totalMentees: number;
  pendingApplications: number;
  totalBookings?: number;
  totalRevenue?: number;
}

interface AdminState {
  stats: AdminStats | null;
  users: User[];
  applications: MentorApplication[];
  isLoading: boolean;
  pagination: {
    total: number;
    page: number;
    totalPages: number;
  };

  fetchStats: () => Promise<void>;
  fetchUsers: (params?: Record<string, unknown>) => Promise<void>;
  fetchApplications: (params?: Record<string, unknown>) => Promise<void>;
  approveApplication: (applicationId: string) => Promise<void>;
  rejectApplication: (applicationId: string, reason: string) => Promise<void>;
  updateUser: (userId: string, data: Record<string, unknown>) => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
  toggleUserStatus: (userId: string, isActive: boolean) => Promise<void>;
  verifyUser: (userId: string) => Promise<void>;
}

export const useAdminStore = create<AdminState>((set, get) => ({
  stats: null,
  users: [],
  applications: [],
  isLoading: false,
  pagination: {
    total: 0,
    page: 1,
    totalPages: 1,
  },

  fetchStats: async () => {
    set({ isLoading: true });
    try {
      // Fetch various stats
      const [usersRes, applicationsRes] = await Promise.all([
        api.get("/users", { params: { limit: 1 } }),
        api.get("/users/mentor-applications", { params: { limit: 1 } }),
      ]);

      const usersData = usersRes.data.data;
      const applicationsData = applicationsRes.data.data;

      // Get role counts
      const [mentorsRes, menteesRes, pendingRes] = await Promise.all([
        api.get("/users/role/MENTOR", { params: { limit: 1 } }),
        api.get("/users/role/MENTEE", { params: { limit: 1 } }),
        api.get("/users/mentor-applications", {
          params: { status: "PENDING", limit: 1 },
        }),
      ]);

      set({
        stats: {
          totalUsers: usersData.total || 0,
          totalMentors: mentorsRes.data.data.total || 0,
          totalMentees: menteesRes.data.data.total || 0,
          pendingApplications: pendingRes.data.data.total || 0,
        },
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  fetchUsers: async (params = {}) => {
    set({ isLoading: true });
    try {
      const res = await api.get("/users", { params });
      const data = res.data.data;
      set({
        users: data.users || [],
        pagination: {
          total: data.total || 0,
          page: data.page || 1,
          totalPages: data.totalPages || 1,
        },
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  fetchApplications: async (params = {}) => {
    set({ isLoading: true });
    try {
      const res = await api.get("/users/mentor-applications", { params });
      const data = res.data.data;
      set({
        applications: data.applications || [],
        pagination: {
          total: data.total || 0,
          page: data.page || 1,
          totalPages: data.totalPages || 1,
        },
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  approveApplication: async (applicationId: string) => {
    await api.patch(`/users/mentor-applications/${applicationId}/approve`);
    await get().fetchApplications();
    await get().fetchStats();
  },

  rejectApplication: async (applicationId: string, reason: string) => {
    await api.patch(`/users/mentor-applications/${applicationId}/reject`, {
      rejectionReason: reason,
    });
    await get().fetchApplications();
    await get().fetchStats();
  },

  updateUser: async (userId: string, data: Record<string, unknown>) => {
    await api.put(`/users/${userId}`, data);
    await get().fetchUsers();
  },

  deleteUser: async (userId: string) => {
    await api.delete(`/users/${userId}`);
    await get().fetchUsers();
  },

  toggleUserStatus: async (userId: string, isActive: boolean) => {
    await api.patch(`/users/${userId}/status`, { isActive });
    await get().fetchUsers();
  },

  verifyUser: async (userId: string) => {
    await api.patch(`/users/${userId}/verify`);
    await get().fetchUsers();
  },
}));
