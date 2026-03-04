import { apiClient } from '../lib/api-client';
import { 
  ApiResponse, 
  ProfileResponse, 
  MenteeProfile, 
  MentorProfile, 
  AdminProfile 
} from '../types';

export const profileService = {
  // Role-based profile operations (auto-detects role)
  async getCurrentProfile() {
    const response = await apiClient.get<ApiResponse<ProfileResponse>>('/users/profile/me');
    return response.data;
  },

  async updateCurrentProfile(data: Partial<MenteeProfile | MentorProfile | AdminProfile>) {
    const response = await apiClient.put<ApiResponse<MenteeProfile | MentorProfile | AdminProfile>>('/users/profile/me', data);
    return response.data;
  },

  async deleteCurrentProfile() {
    const response = await apiClient.delete<ApiResponse>('/users/profile/me');
    return response.data;
  },

  // Mentee Profile Operations
  async getMenteeProfile(userId?: string) {
    const url = userId ? `/users/profile/mentee/${userId}` : '/users/profile/mentee';
    const response = await apiClient.get<ApiResponse<MenteeProfile>>(url);
    return response.data;
  },

  async createOrUpdateMenteeProfile(data: Partial<MenteeProfile>, userId?: string) {
    const url = userId ? `/users/profile/mentee/${userId}` : '/users/profile/mentee';
    const response = await apiClient.post<ApiResponse<MenteeProfile>>(url, data);
    return response.data;
  },

  async deleteMenteeProfile(userId?: string) {
    const url = userId ? `/users/profile/mentee/${userId}` : '/users/profile/mentee';
    const response = await apiClient.delete<ApiResponse>(url);
    return response.data;
  },

  // Mentor Profile Operations
  async getMentorProfile(userId?: string) {
    const url = userId ? `/users/profile/mentor/${userId}` : '/users/profile/mentor';
    const response = await apiClient.get<ApiResponse<MentorProfile>>(url);
    return response.data;
  },

  async createOrUpdateMentorProfile(data: Partial<MentorProfile>, userId?: string) {
    const url = userId ? `/users/profile/mentor/${userId}` : '/users/profile/mentor';
    const response = await apiClient.post<ApiResponse<MentorProfile>>(url, data);
    return response.data;
  },

  async deleteMentorProfile(userId?: string) {
    const url = userId ? `/users/profile/mentor/${userId}` : '/users/profile/mentor';
    const response = await apiClient.delete<ApiResponse>(url);
    return response.data;
  },

  // Admin Profile Operations
  async getAdminProfile(userId?: string) {
    const url = userId ? `/users/profile/admin/${userId}` : '/users/profile/admin';
    const response = await apiClient.get<ApiResponse<AdminProfile>>(url);
    return response.data;
  },

  async createOrUpdateAdminProfile(data: Partial<AdminProfile>, userId?: string) {
    const url = userId ? `/users/profile/admin/${userId}` : '/users/profile/admin';
    const response = await apiClient.post<ApiResponse<AdminProfile>>(url, data);
    return response.data;
  },

  async deleteAdminProfile(userId?: string) {
    const url = userId ? `/users/profile/admin/${userId}` : '/users/profile/admin';
    const response = await apiClient.delete<ApiResponse>(url);
    return response.data;
  },

  // Resume Operations (Mentee)
  async addResume(name: string, fileUrl: string) {
    const response = await apiClient.post<ApiResponse>('/users/resumes', { name, fileUrl });
    return response.data;
  },

  async getResumes() {
    const response = await apiClient.get<ApiResponse>('/users/resumes');
    return response.data;
  },

  async deleteResumeById(resumeId: string) {
    const response = await apiClient.delete<ApiResponse>(`/users/resumes/${resumeId}`);
    return response.data;
  },
};
