import { create } from "zustand";
import { adminApi } from "../lib/api";

export const useAdminStore = create((set, get) => ({
  // Users
  users: [],
  usersLoading: false,
  usersPagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
  selectedUser: null,

  // Mentor Applications
  applications: [],
  applicationsLoading: false,
  applicationsPagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
  selectedApplication: null,

  // User Actions
  fetchUsers: async (params = {}) => {
    set({ usersLoading: true });
    try {
      const response = await adminApi.getAllUsers(params);
      const { users, pagination } = response.data.data;
      set({ users, usersPagination: pagination, usersLoading: false });
    } catch (error) {
      console.error("Failed to fetch users:", error);
      set({ usersLoading: false });
    }
  },

  fetchUserById: async (id) => {
    try {
      const response = await adminApi.getUserById(id);
      set({ selectedUser: response.data.data });
      return response.data.data;
    } catch (error) {
      console.error("Failed to fetch user:", error);
      return null;
    }
  },

  createUser: async (data) => {
    try {
      await adminApi.createUser(data);
      get().fetchUsers();
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || "Failed to create user" 
      };
    }
  },

  updateUser: async (id, data) => {
    try {
      await adminApi.updateUser(id, data);
      get().fetchUsers();
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || "Failed to update user" 
      };
    }
  },

  updateUserRole: async (id, role) => {
    try {
      await adminApi.updateUserRole(id, role);
      get().fetchUsers();
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || "Failed to update role" 
      };
    }
  },

  toggleUserStatus: async (id, isActive) => {
    try {
      await adminApi.toggleUserStatus(id, isActive);
      get().fetchUsers();
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || "Failed to toggle status" 
      };
    }
  },

  verifyUser: async (id) => {
    try {
      await adminApi.verifyUser(id);
      get().fetchUsers();
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || "Failed to verify user" 
      };
    }
  },

  deleteUser: async (id) => {
    try {
      await adminApi.deleteUser(id);
      get().fetchUsers();
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || "Failed to delete user" 
      };
    }
  },

  permanentDeleteUser: async (id) => {
    try {
      await adminApi.permanentDeleteUser(id);
      get().fetchUsers();
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || "Failed to permanently delete user" 
      };
    }
  },

  restoreUser: async (id) => {
    try {
      await adminApi.restoreUser(id);
      get().fetchUsers();
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || "Failed to restore user" 
      };
    }
  },

  // Mentor Application Actions
  fetchApplications: async (params = {}) => {
    set({ applicationsLoading: true });
    try {
      const response = await adminApi.getAllApplications(params);
      const { applications, pagination } = response.data.data;
      set({ applications, applicationsPagination: pagination, applicationsLoading: false });
    } catch (error) {
      console.error("Failed to fetch applications:", error);
      set({ applicationsLoading: false });
    }
  },

  fetchApplicationById: async (id) => {
    try {
      const response = await adminApi.getApplicationById(id);
      set({ selectedApplication: response.data.data });
      return response.data.data;
    } catch (error) {
      console.error("Failed to fetch application:", error);
      return null;
    }
  },

  approveApplication: async (id) => {
    try {
      await adminApi.approveApplication(id);
      get().fetchApplications();
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || "Failed to approve application" 
      };
    }
  },

  rejectApplication: async (id, reason) => {
    try {
      await adminApi.rejectApplication(id, reason);
      get().fetchApplications();
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || "Failed to reject application" 
      };
    }
  },
}));
