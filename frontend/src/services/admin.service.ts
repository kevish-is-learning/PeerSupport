import { apiClient } from '@/lib/api-client';
import { User, ApiResponse, Role } from '@/types';

interface UsersResponse {
  users: User[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface CreateUserData {
  email: string;
  password: string;
  name?: string;
  role?: Role;
}

interface UpdateUserData {
  email?: string;
  name?: string;
  profilePicture?: string;
  isActive?: boolean;
}

class AdminService {
  private readonly BASE_URL = '/users';

  // Get all users with pagination and filters
  async getAllUsers(page = 1, limit = 10, role?: string, isActive?: boolean, search?: string) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(role && { role }),
      ...(isActive !== undefined && { isActive: isActive.toString() }),
      ...(search && { search }),
    });

    const response = await apiClient.get<ApiResponse<UsersResponse>>(
      `${this.BASE_URL}?${params}`
    );
    return response.data;
  }

  // Get users by role
  async getUsersByRole(role: string, page = 1, limit = 10) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    const response = await apiClient.get<ApiResponse<UsersResponse>>(
      `${this.BASE_URL}/role/${role}?${params}`
    );
    return response.data;
  }

  // Create new user
  async createUser(userData: CreateUserData) {
    const response = await apiClient.post<ApiResponse<User>>(
      this.BASE_URL,
      userData
    );
    return response.data;
  }

  // Get user by ID
  async getUserById(userId: string) {
    const response = await apiClient.get<ApiResponse<User>>(
      `${this.BASE_URL}/${userId}`
    );
    return response.data;
  }

  // Update user
  async updateUser(userId: string, userData: UpdateUserData) {
    const response = await apiClient.put<ApiResponse<User>>(
      `${this.BASE_URL}/${userId}`,
      userData
    );
    return response.data;
  }

  // Update user role
  async updateUserRole(userId: string, role: Role) {
    const response = await apiClient.patch<ApiResponse<User>>(
      `${this.BASE_URL}/${userId}/role`,
      { role }
    );
    return response.data;
  }

  // Toggle user status (active/inactive)
  async toggleUserStatus(userId: string) {
    const response = await apiClient.patch<ApiResponse<User>>(
      `${this.BASE_URL}/${userId}/status`
    );
    return response.data;
  }

  // Verify user
  async verifyUser(userId: string) {
    const response = await apiClient.patch<ApiResponse<User>>(
      `${this.BASE_URL}/${userId}/verify`
    );
    return response.data;
  }

  // Soft delete user
  async deleteUser(userId: string) {
    const response = await apiClient.delete<ApiResponse<any>>(
      `${this.BASE_URL}/${userId}`
    );
    return response.data;
  }

  // Permanently delete user
  async permanentDeleteUser(userId: string) {
    const response = await apiClient.delete<ApiResponse<any>>(
      `${this.BASE_URL}/${userId}/permanent`
    );
    return response.data;
  }

  // Restore deleted user
  async restoreUser(userId: string) {
    const response = await apiClient.patch<ApiResponse<User>>(
      `${this.BASE_URL}/${userId}/restore`
    );
    return response.data;
  }
}

export const adminService = new AdminService();
