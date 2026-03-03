import { apiClient } from '../lib/api-client';
import { User, ApiResponse, PaginatedResponse } from '../types';

export const userService = {
  async getCurrentUser() {
    const response = await apiClient.get<ApiResponse<User>>('/users/me');
    return response.data;
  },

  async updateCurrentUser(data: Partial<User>) {
    const response = await apiClient.put<ApiResponse<User>>('/users/me', data);
    return response.data;
  },

  async checkEmailExists(email: string) {
    const response = await apiClient.get<ApiResponse<{ exists: boolean }>>('/users/check-email', {
      params: { email },
    });
    return response.data;
  },

  // Admin endpoints
  async getAllUsers(params?: {
    page?: number;
    limit?: number;
    role?: string;
    isActive?: boolean;
    search?: string;
  }) {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<User>>>('/users', { params });
    return response.data;
  },

  async getUserById(id: string) {
    const response = await apiClient.get<ApiResponse<User>>(`/users/${id}`);
    return response.data;
  },

  async createUser(data: Partial<User> & { password: string }) {
    const response = await apiClient.post<ApiResponse<User>>('/users', data);
    return response.data;
  },

  async updateUser(id: string, data: Partial<User>) {
    const response = await apiClient.put<ApiResponse<User>>(`/users/${id}`, data);
    return response.data;
  },

  async updateUserRole(id: string, role: string) {
    const response = await apiClient.patch<ApiResponse<User>>(`/users/${id}/role`, { role });
    return response.data;
  },

  async toggleUserStatus(id: string) {
    const response = await apiClient.patch<ApiResponse<User>>(`/users/${id}/status`);
    return response.data;
  },

  async verifyUser(id: string) {
    const response = await apiClient.patch<ApiResponse<User>>(`/users/${id}/verify`);
    return response.data;
  },

  async deleteUser(id: string) {
    const response = await apiClient.delete<ApiResponse>(`/users/${id}`);
    return response.data;
  },

  async permanentDeleteUser(id: string) {
    const response = await apiClient.delete<ApiResponse>(`/users/${id}/permanent`);
    return response.data;
  },

  async restoreUser(id: string) {
    const response = await apiClient.patch<ApiResponse<User>>(`/users/${id}/restore`);
    return response.data;
  },
};
