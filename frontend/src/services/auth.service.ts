import { apiClient } from '../lib/api-client';
import { User, ApiResponse } from '../types';
import { RegisterInput, LoginInput, UpdateProfileInput } from '../lib/validations';

export const authService = {
  async register(data: RegisterInput) {
    const response = await apiClient.post<ApiResponse<{ user: User }>>('/auth/register', data);
    return response.data;
  },

  async login(data: LoginInput) {
    const response = await apiClient.post<ApiResponse<{ user: User }>>('/auth/login', data);
    return response.data;
  },

  async logout() {
    const response = await apiClient.post<ApiResponse>('/auth/logout');
    return response.data;
  },

  async getProfile() {
    const response = await apiClient.get<ApiResponse<User>>('/auth/profile');
    return response.data;
  },

  async updateProfile(data: UpdateProfileInput) {
    const response = await apiClient.put<ApiResponse<User>>('/auth/profile', data);
    return response.data;
  },

  async changePassword(currentPassword: string, newPassword: string) {
    const response = await apiClient.post<ApiResponse>('/auth/change-password', {
      currentPassword,
      newPassword,
    });
    return response.data;
  },
};
