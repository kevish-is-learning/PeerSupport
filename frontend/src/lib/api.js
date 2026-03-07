import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined" && !window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  logout: () => api.post("/auth/logout"),
  changePassword: (data) => api.post("/auth/change-password", data),
  googleAuth: () => `${API_URL}/auth/google`,
};

// User API
export const userApi = {
  getCurrentUser: () => api.get("/users/me"),
  updateCurrentUser: (data) => api.put("/users/me", data),
  deleteCurrentUser: () => api.delete("/users/me"),
  checkEmail: (email) => api.get(`/users/check-email?email=${email}`),
  
  // Profile management
  getMenteeProfile: () => api.get("/users/profile/mentee"),
  createMenteeProfile: (data) => api.post("/users/profile/mentee", data),
  updateMenteeProfile: (data) => api.put("/users/profile/mentee", data),
  
  getMentorProfile: () => api.get("/users/profile/mentor"),
  createMentorProfile: (data) => api.post("/users/profile/mentor", data),
  updateMentorProfile: (data) => api.put("/users/profile/mentor", data),
  
  // Mentor applications
  submitMentorApplication: (data) => api.post("/users/mentor-applications", data),
  updateMentorApplication: (data) => api.put("/users/mentor-applications", data),
  getMyMentorApplication: () => api.get("/users/mentor-applications/my"),
  
  // Resumes
  getResumes: () => api.get("/users/resumes"),
  uploadResume: (data) => api.post("/users/resumes", data),
  deleteResume: (id) => api.delete(`/users/resumes/${id}`),
};

// Admin API
export const adminApi = {
  getAllUsers: (params) => api.get("/users", { params }),
  getUsersByRole: (role) => api.get(`/users/role/${role}`),
  createUser: (data) => api.post("/users", data),
  getUserById: (id) => api.get(`/users/${id}`),
  updateUser: (id, data) => api.put(`/users/${id}`, data),
  updateUserRole: (id, role) => api.patch(`/users/${id}/role`, { role }),
  toggleUserStatus: (id, isActive) => api.patch(`/users/${id}/status`, { isActive }),
  verifyUser: (id) => api.patch(`/users/${id}/verify`),
  deleteUser: (id) => api.delete(`/users/${id}`),
  permanentDeleteUser: (id) => api.delete(`/users/${id}/permanent`),
  restoreUser: (id) => api.patch(`/users/${id}/restore`),
  
  // Mentor applications
  getAllApplications: (params) => api.get("/users/mentor-applications", { params }),
  getApplicationById: (id) => api.get(`/users/mentor-applications/${id}`),
  approveApplication: (id) => api.patch(`/users/mentor-applications/${id}/approve`),
  rejectApplication: (id, reason) => api.patch(`/users/mentor-applications/${id}/reject`, { rejectionReason: reason }),
};

// Mentee API
export const menteeApi = {
  getDashboardStats: () => api.get("/mentee/dashboard/stats"),
  
  // Mentors
  getAllMentors: (params) => api.get("/mentee/mentors", { params }),
  getMentorById: (id) => api.get(`/mentee/mentors/${id}`),
  
  // Bookings
  getMyBookings: (params) => api.get("/mentee/bookings", { params }),
  createBooking: (data) => api.post("/mentee/bookings", data),
  cancelBooking: (id) => api.patch(`/mentee/bookings/${id}/cancel`),
  submitReview: (bookingId, data) => api.post(`/mentee/bookings/${bookingId}/review`, data),
  
  // Webinars
  getWebinars: () => api.get("/mentee/webinars"),
  registerForWebinar: (id) => api.post(`/mentee/webinars/${id}/register`),
  
  // Notifications
  getNotifications: () => api.get("/mentee/notifications"),
};

// Mentor API
export const mentorApi = {
  canAcceptBookings: () => api.get("/mentor/can-accept-bookings"),
  getDashboard: () => api.get("/mentor/dashboard"),
  
  // Slots
  getSlots: (params) => api.get("/mentor/slots", { params }),
  createSlots: (slots) => api.post("/mentor/slots", { slots }),
  updateSlot: (id, data) => api.patch(`/mentor/slots/${id}`, data),
  deleteSlot: (id) => api.delete(`/mentor/slots/${id}`),
  
  // Bookings
  getBookings: (params) => api.get("/mentor/bookings", { params }),
  rescheduleBooking: (id, data) => api.patch(`/mentor/bookings/${id}/reschedule`, data),
  cancelBooking: (id, reason) => api.patch(`/mentor/bookings/${id}/cancel`, { reason }),
  completeBooking: (id, data) => api.patch(`/mentor/bookings/${id}/complete`, data),
  
  // Earnings
  getEarnings: () => api.get("/mentor/earnings"),
  getTransactions: (params) => api.get("/mentor/transactions", { params }),
  
  // Withdrawals
  getWithdrawals: () => api.get("/mentor/withdrawals"),
  requestWithdrawal: (data) => api.post("/mentor/withdrawals", data),
  
  // Incentives
  getIncentives: () => api.get("/mentor/incentives"),
  claimIncentive: (id) => api.patch(`/mentor/incentives/${id}/claim`),
  
  // Ratings
  getRatings: () => api.get("/mentor/ratings"),
  
  // Resumes
  getResumes: () => api.get("/mentor/resumes"),
  uploadResume: (data) => api.post("/mentor/resumes", data),
  deleteResume: (id) => api.delete(`/mentor/resumes/${id}`),
};

// Payment API
export const paymentApi = {
  createOrder: (bookingId) => api.post("/payments/create-order", { bookingId }),
  verifyPayment: (data) => api.post("/payments/verify", data),
  handleFailure: (data) => api.post("/payments/failure", data),
};

// Combined API object for easier imports
api.auth = authApi;
api.user = {
  ...userApi,
  updateProfile: (data) => api.put("/users/me", data),
};
api.admin = {
  ...adminApi,
  getUsers: (params) => api.get("/users", { params }),
  getApplications: (params) => api.get("/users/mentor-applications", { params }),
};
api.mentee = {
  ...menteeApi,
  getMentorSlots: (mentorId) => api.get(`/mentee/mentors/${mentorId}/slots`),
  getMentorReviews: (mentorId) => api.get(`/mentee/mentors/${mentorId}/reviews`),
};
api.mentor = {
  ...mentorApi,
  createSlot: (data) => api.post("/mentor/slots", data),
};
api.payment = paymentApi;
