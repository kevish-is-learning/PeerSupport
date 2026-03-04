import { apiClient } from '@/lib/api-client';
import { MentorApplication, ApiResponse } from '@/types';

interface SubmitApplicationData {
  bio: string;
  expertise: string[];
  certifications: string[];
  pricePerSession: number;
}

interface ApplicationsResponse {
  applications: MentorApplication[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

class ApplicationService {
  private readonly BASE_URL = '/users/mentor-applications';

  // Submit mentor application (user)
  async submitApplication(data: SubmitApplicationData) {
    const response = await apiClient.post<ApiResponse<MentorApplication>>(
      this.BASE_URL,
      data
    );
    return response.data;
  }

  // Get user's own application
  async getMyApplication() {
    const response = await apiClient.get<ApiResponse<MentorApplication>>(
      `${this.BASE_URL}/my`
    );
    return response.data;
  }

  // Get all applications (admin only)
  async getAllApplications(page = 1, limit = 10, status?: string) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(status && { status }),
    });

    const response = await apiClient.get<ApiResponse<ApplicationsResponse>>(
      `${this.BASE_URL}?${params}`
    );
    return response.data;
  }

  // Get single application by ID (admin only)
  async getApplicationById(applicationId: string) {
    const response = await apiClient.get<ApiResponse<MentorApplication>>(
      `${this.BASE_URL}/${applicationId}`
    );
    return response.data;
  }

  // Approve application (admin only)
  async approveApplication(applicationId: string) {
    const response = await apiClient.patch<ApiResponse<any>>(
      `${this.BASE_URL}/${applicationId}/approve`
    );
    return response.data;
  }

  // Reject application (admin only)
  async rejectApplication(applicationId: string, rejectionReason?: string) {
    const response = await apiClient.patch<ApiResponse<MentorApplication>>(
      `${this.BASE_URL}/${applicationId}/reject`,
      { rejectionReason }
    );
    return response.data;
  }
}

export const applicationService = new ApplicationService();
