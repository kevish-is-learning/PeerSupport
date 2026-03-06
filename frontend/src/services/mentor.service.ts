import { apiClient } from '@/lib/api-client';
import {
  ApiResponse,
  MentorApplication,
  MentorProfile,
  Slot,
  Booking,
  DashboardStats,
  Earning,
  Transaction,
  Withdrawal,
  Incentive,
  Review,
  MentorResume,
  SocialLink,
  WorkExperience,
  ResumeFile,
} from '@/types';

export interface MentorApplicationData {
  // Step 1: Personal Details & Social Links
  bio: string;
  headline?: string;
  phone?: string;
  location?: string;
  socialLinks?: SocialLink[];
  
  // Step 2: Expertise
  expertise: string[];
  
  // Step 3: Education
  education10th?: string[];
  education12th?: string[];
  bachelors?: string[];
  masters?: string[];
  
  // Step 4: Work Experience
  workExperience?: WorkExperience[];
  
  // Step 5: CAT Score
  catScore?: number;
  catYear?: number;
  catPercentile?: number;
  
  // Step 6: Certifications
  certifications?: string[];
  
  // Step 7: Resumes
  resumes?: ResumeFile[];
  
  // Pricing
  pricePerSession: number;
}

interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

class MentorService {
  private readonly BASE_URL = '/mentor';

  ///////////////////////////
  // APPLICATION
  ///////////////////////////

  // Submit mentor application
  async submitApplication(data: MentorApplicationData) {
    const response = await apiClient.post<ApiResponse<MentorApplication>>(
      `${this.BASE_URL}/apply`,
      data
    );
    return response.data;
  }

  // Update mentor application
  async updateApplication(data: Partial<MentorApplicationData>) {
    const response = await apiClient.put<ApiResponse<MentorApplication>>(
      `${this.BASE_URL}/apply`,
      data
    );
    return response.data;
  }

  // Get my application
  async getMyApplication() {
    const response = await apiClient.get<ApiResponse<MentorApplication>>(
      `${this.BASE_URL}/application/my`
    );
    return response.data;
  }

  ///////////////////////////
  // PROFILE
  ///////////////////////////

  // Get mentor profile
  async getProfile() {
    const response = await apiClient.get<ApiResponse<MentorProfile>>(
      `${this.BASE_URL}/profile`
    );
    return response.data;
  }

  // Update mentor profile
  async updateProfile(data: Partial<MentorProfile>) {
    const response = await apiClient.put<ApiResponse<MentorProfile>>(
      `${this.BASE_URL}/profile`,
      data
    );
    return response.data;
  }

  // Check if can accept bookings
  async canAcceptBookings() {
    const response = await apiClient.get<ApiResponse<{ canAccept: boolean; reason?: string }>>(
      `${this.BASE_URL}/can-accept-bookings`
    );
    return response.data;
  }

  ///////////////////////////
  // SLOTS
  ///////////////////////////

  // Create slots
  async createSlots(data: {
    date: string;
    startTime: string;
    endTime: string;
    isRecurring?: boolean;
    recurringDays?: string[];
    recurringEndDate?: string;
  }) {
    const response = await apiClient.post<ApiResponse<Slot[]>>(
      `${this.BASE_URL}/slots`,
      data
    );
    return response.data;
  }

  // Get slots
  async getSlots(filters?: { status?: string; startDate?: string; endDate?: string }) {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.startDate) params.append('startDate', filters.startDate);
    if (filters?.endDate) params.append('endDate', filters.endDate);

    const response = await apiClient.get<ApiResponse<Slot[]>>(
      `${this.BASE_URL}/slots?${params}`
    );
    return response.data;
  }

  // Update slot
  async updateSlot(slotId: string, data: Partial<Slot>) {
    const response = await apiClient.patch<ApiResponse<Slot>>(
      `${this.BASE_URL}/slots/${slotId}`,
      data
    );
    return response.data;
  }

  // Delete slot
  async deleteSlot(slotId: string) {
    const response = await apiClient.delete<ApiResponse<null>>(
      `${this.BASE_URL}/slots/${slotId}`
    );
    return response.data;
  }

  ///////////////////////////
  // BOOKINGS
  ///////////////////////////

  // Get bookings
  async getBookings(filters?: { status?: string; page?: number; limit?: number }) {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());

    const response = await apiClient.get<ApiResponse<{
      bookings: Booking[];
      pagination: { page: number; limit: number; total: number; totalPages: number };
    }>>(`${this.BASE_URL}/bookings?${params}`);
    return response.data;
  }

  // Reschedule booking
  async rescheduleBooking(bookingId: string, data: { newDate: string; newTime: string; reason?: string }) {
    const response = await apiClient.patch<ApiResponse<Booking>>(
      `${this.BASE_URL}/bookings/${bookingId}/reschedule`,
      data
    );
    return response.data;
  }

  // Cancel booking
  async cancelBooking(bookingId: string, reason?: string) {
    const response = await apiClient.patch<ApiResponse<{ booking: Booking; refundEligible: boolean }>>(
      `${this.BASE_URL}/bookings/${bookingId}/cancel`,
      { reason }
    );
    return response.data;
  }

  // Complete booking
  async completeBooking(bookingId: string, data?: { notes?: string }) {
    const response = await apiClient.patch<ApiResponse<{ booking: Booking; earning: Earning }>>(
      `${this.BASE_URL}/bookings/${bookingId}/complete`,
      data
    );
    return response.data;
  }

  ///////////////////////////
  // DASHBOARD & ANALYTICS
  ///////////////////////////

  // Get dashboard stats
  async getDashboardStats() {
    const response = await apiClient.get<ApiResponse<DashboardStats>>(
      `${this.BASE_URL}/dashboard`
    );
    return response.data;
  }

  // Get earnings history
  async getEarningsHistory(filters?: { page?: number; limit?: number; startDate?: string; endDate?: string }) {
    const params = new URLSearchParams();
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.startDate) params.append('startDate', filters.startDate);
    if (filters?.endDate) params.append('endDate', filters.endDate);

    const response = await apiClient.get<ApiResponse<{
      earnings: Earning[];
      pagination: { page: number; limit: number; total: number; totalPages: number };
    }>>(`${this.BASE_URL}/earnings?${params}`);
    return response.data;
  }

  // Get transactions
  async getTransactions(filters?: { page?: number; limit?: number; type?: string }) {
    const params = new URLSearchParams();
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.type) params.append('type', filters.type);

    const response = await apiClient.get<ApiResponse<{
      transactions: Transaction[];
      pagination: { page: number; limit: number; total: number; totalPages: number };
    }>>(`${this.BASE_URL}/transactions?${params}`);
    return response.data;
  }

  ///////////////////////////
  // WITHDRAWALS
  ///////////////////////////

  // Request withdrawal
  async requestWithdrawal(data: {
    amount: number;
    paymentMethod: 'bank_transfer' | 'upi';
    bankDetails?: {
      accountNumber: string;
      ifscCode: string;
      accountHolderName: string;
      bankName: string;
    };
    upiId?: string;
  }) {
    const response = await apiClient.post<ApiResponse<Withdrawal>>(
      `${this.BASE_URL}/withdrawals`,
      data
    );
    return response.data;
  }

  // Get withdrawals
  async getWithdrawals(filters?: { page?: number; limit?: number; status?: string }) {
    const params = new URLSearchParams();
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.status) params.append('status', filters.status);

    const response = await apiClient.get<ApiResponse<{
      withdrawals: Withdrawal[];
      pagination: { page: number; limit: number; total: number; totalPages: number };
    }>>(`${this.BASE_URL}/withdrawals?${params}`);
    return response.data;
  }

  ///////////////////////////
  // INCENTIVES
  ///////////////////////////

  // Get incentives
  async getIncentives(filters?: { page?: number; limit?: number; status?: string; type?: string }) {
    const params = new URLSearchParams();
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.status) params.append('status', filters.status);
    if (filters?.type) params.append('type', filters.type);

    const response = await apiClient.get<ApiResponse<{
      incentives: Incentive[];
      pagination: { page: number; limit: number; total: number; totalPages: number };
    }>>(`${this.BASE_URL}/incentives?${params}`);
    return response.data;
  }

  // Claim incentive
  async claimIncentive(incentiveId: string) {
    const response = await apiClient.patch<ApiResponse<Incentive>>(
      `${this.BASE_URL}/incentives/${incentiveId}/claim`
    );
    return response.data;
  }

  ///////////////////////////
  // RATINGS & REVIEWS
  ///////////////////////////

  // Get ratings and feedback
  async getRatingsAndFeedback(filters?: { page?: number; limit?: number }) {
    const params = new URLSearchParams();
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());

    const response = await apiClient.get<ApiResponse<{
      reviews: Review[];
      pagination: { page: number; limit: number; total: number; totalPages: number };
    }>>(`${this.BASE_URL}/ratings?${params}`);
    return response.data;
  }

  ///////////////////////////
  // RESUMES
  ///////////////////////////

  // Add resume
  async addResume(data: { name: string; fileUrl: string }) {
    const response = await apiClient.post<ApiResponse<MentorResume>>(
      `${this.BASE_URL}/resumes`,
      data
    );
    return response.data;
  }

  // Get resumes
  async getResumes() {
    const response = await apiClient.get<ApiResponse<MentorResume[]>>(
      `${this.BASE_URL}/resumes`
    );
    return response.data;
  }

  // Delete resume
  async deleteResume(resumeId: string) {
    const response = await apiClient.delete<ApiResponse<null>>(
      `${this.BASE_URL}/resumes/${resumeId}`
    );
    return response.data;
  }
}

export const mentorService = new MentorService();
