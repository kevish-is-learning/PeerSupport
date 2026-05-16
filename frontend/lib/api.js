const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api";

async function parseResponse(response) {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();
  return text ? { message: text } : {};
}

async function apiRequest(path, options = {}) {
  const { method = "GET", body, headers = {} } = options;
  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;

  const requestHeaders = isFormData
    ? { ...headers }
    : {
        "Content-Type": "application/json",
        ...headers,
      };

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    credentials: "include",
    headers: requestHeaders,
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
  });

  const payload = await parseResponse(response);
  if (!response.ok) {
    const errorMessage = payload?.message || payload?.errors || "Request failed";
    const requestError = new Error(errorMessage);
    requestError.status = response.status;
    requestError.payload = payload;
    throw requestError;
  }

  return payload;
}

export const healthApi = {
  check() {
    return apiRequest("/health");
  },
};

export const authApi = {
  me() {
    return apiRequest("/auth/me");
  },
  register(data) {
    return apiRequest("/auth/register", { method: "POST", body: data });
  },
  login(data) {
    return apiRequest("/auth/login", { method: "POST", body: data });
  },
  selectRole(data) {
    return apiRequest("/auth/select-role", { method: "POST", body: data });
  },
  logout() {
    return apiRequest("/auth/logout", { method: "POST" });
  },
  changePassword(data) {
    return apiRequest("/auth/change-password", { method: "POST", body: data });
  },
  updateProfile(data) {
    return apiRequest("/auth/update-profile", { method: "PUT", body: data });
  },
  googleAuthUrl() {
    return `${API_BASE_URL}/auth/google`;
  },
};

export const menteeProfileApi = {
  getMine() {
    return apiRequest('/mentee-profile');
  },
  create(data) {
    return apiRequest('/mentee-profile', { method: 'POST', body: data });
  },
  update(data) {
    return apiRequest('/mentee-profile', { method: 'PUT', body: data });
  },
  remove() {
    return apiRequest('/mentee-profile', { method: 'DELETE' });
  },
};

export const menteeDashboardApi = {
  getDashboardData() {
    return apiRequest('/mentee-dashboard');
  },
};

export const menteeBookingApi = {
  getMySessions() {
    return apiRequest('/mentee-bookings/my-sessions');
  },
};

export const publicMentorApi = {
  listMentors(params = {}) {
    const qs = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([, v]) => v !== '' && v !== null && v !== undefined))
    ).toString();
    return apiRequest(`/mentors${qs ? `?${qs}` : ''}`);
  },
  getMentorProfile(mentorId) {
    return apiRequest(`/mentors/${mentorId}`);
  },
};

export const publicMenteeApi = {
  getMenteeProfile(menteeId) {
    return apiRequest(`/mentees/${menteeId}`);
  },
};


export const mentorProfileApi = {
  getMine() {
    return apiRequest('/mentor-profile');
  },
  create(data) {
    return apiRequest('/mentor-profile', { method: 'POST', body: data });
  },
  update(data) {
    return apiRequest('/mentor-profile', { method: 'PUT', body: data });
  },
  remove() {
    return apiRequest('/mentor-profile', { method: 'DELETE' });
  },
};

// ─── Mentor Services (dedicated endpoints) ───────────────────────────────────

export const mentorServiceApi = {
  /** Fetch available service types + labels (public) */
  getTypes() {
    return apiRequest('/mentor-services/types');
  },
  /** Fetch current mentor's services with pricing */
  getMine() {
    return apiRequest('/mentor-services');
  },
  /** Create a new custom service */
  create(data) {
    return apiRequest('/mentor-services', { method: 'POST', body: data });
  },
  /** Update a service by ID */
  update(id, data) {
    return apiRequest(`/mentor-services/${id}`, { method: 'PUT', body: data });
  },
  /** Toggle active/inactive */
  toggle(id) {
    return apiRequest(`/mentor-services/${id}/toggle`, { method: 'PATCH' });
  },
  /** Delete a service by ID */
  remove(id) {
    return apiRequest(`/mentor-services/${id}`, { method: 'DELETE' });
  },
  /** Bulk upsert services + pricing (legacy) */
  upsert(services) {
    return apiRequest('/mentor-services', { method: 'PUT', body: { services } });
  },
};

// ─── Mentor Availability (dedicated endpoints) ───────────────────────────────

export const mentorAvailabilityApi = {
  /** Fetch current mentor's weekly availability with slots + services */
  getMine() {
    return apiRequest('/mentor-availability');
  },
  /** Bulk upsert weekly availability (days + slots + service mappings) */
  upsert(availability) {
    return apiRequest('/mentor-availability', { method: 'PUT', body: { availability } });
  },
  /** Add a single slot to a day */
  addSlot(dayId, data) {
    return apiRequest(`/mentor-availability/${dayId}/slots`, { method: 'POST', body: data });
  },
  /** Update a slot */
  updateSlot(slotId, data) {
    return apiRequest(`/mentor-availability/slots/${slotId}`, { method: 'PUT', body: data });
  },
  /** Delete a single slot */
  deleteSlot(slotId) {
    return apiRequest(`/mentor-availability/slots/${slotId}`, { method: 'DELETE' });
  },
  /** Delete all availability for a specific day */
  removeDay(dayOfWeek) {
    return apiRequest(`/mentor-availability/${dayOfWeek}`, { method: 'DELETE' });
  },
};

// ─── Booking APIs ────────────────────────────────────────────────────────────

export const bookingApi = {
  /** Get available slots for a mentor, filtered by service type and date */
  getAvailableSlots(mentorId, { serviceType, date }) {
    return apiRequest(`/bookings/mentors/${mentorId}/available-slots?serviceType=${serviceType}&date=${date}`);
  },
  /**
   * Initiate a booking with payment (unified flow).
   * Creates PENDING booking + payment + Razorpay order in one call.
   * Returns { booking, order } — order has everything needed to open Razorpay checkout.
   */
  initiate(data) {
    return apiRequest('/bookings', { method: 'POST', body: data });
  },
  /** Get a single booking by ID */
  getById(bookingId) {
    return apiRequest(`/bookings/${bookingId}`);
  },
  /** Cancel a booking */
  cancel(bookingId, data) {
    return apiRequest(`/bookings/${bookingId}/cancel`, { method: 'POST', body: data });
  },
};

// ─── Payment APIs (Razorpay) ─────────────────────────────────────────────────

export const paymentApi = {
  /** Verify Razorpay payment after checkout */
  verify(data) {
    return apiRequest('/payments/verify', { method: 'POST', body: data });
  },
  /** Handle payment failure — immediately releases the slot */
  handleFailure(data) {
    return apiRequest('/payments/failure', { method: 'POST', body: data });
  },
};

export const adminMentorApi = {
  getWaitlist() {
    return apiRequest('/admin/mentor-waitlist');
  },
  updateApproval(profileId, data) {
    return apiRequest(`/admin/mentor-waitlist/${profileId}`, {
      method: 'PATCH',
      body: data,
    });
  },
};

// ─── Mentor Bookings / Mentees / Earnings ────────────────────────────────────

export const mentorBookingApi = {
  getDashboardStats() {
    return apiRequest('/mentor-bookings/dashboard');
  },
  listMentees() {
    return apiRequest('/mentor-bookings/mentees');
  },
  listBookingsForMentee(menteeId) {
    return apiRequest(`/mentor-bookings/mentees/${menteeId}`);
  },
  getEarnings() {
    return apiRequest('/mentor-bookings/earnings');
  },
  getSessions({ month, year } = {}) {
    const params = new URLSearchParams();
    if (month) params.set('month', month);
    if (year) params.set('year', year);
    const qs = params.toString();
    return apiRequest(`/mentor-bookings/sessions${qs ? `?${qs}` : ''}`);
  },
};

// ─── V2 API — New Booking & Availability System ─────────────────────────────

export const v2Api = {
  // ─── Service Catalogue (public) ──────────────────────────────────────
  /** List all 6 seeded services */
  getServices() {
    return apiRequest('/v2/services');
  },

  // ─── Mentor Service Config ───────────────────────────────────────────
  /** Get mentor's configured services (auth + MENTOR) */
  getMentorServices() {
    return apiRequest('/v2/mentor/services');
  },
  /** Upsert mentor service config */
  upsertMentorServices(services) {
    return apiRequest('/v2/mentor/services', { method: 'PUT', body: { services } });
  },

  // ─── Availability Windows ────────────────────────────────────────────
  /** Get mentor's availability windows (auth + MENTOR) */
  getAvailability() {
    return apiRequest('/v2/mentor/availability');
  },
  /** Replace all availability windows */
  upsertAvailability(windows) {
    return apiRequest('/v2/mentor/availability', { method: 'PUT', body: { windows } });
  },
  /** Replace availability windows for a specific date */
  replaceAvailabilityForDate(date, windows) {
    return apiRequest(`/v2/mentor/availability/dates/${date}`, {
      method: 'PUT',
      body: { windows },
    });
  },
  /** Create a date-specific availability window */
  createAvailabilityWindow(data) {
    return apiRequest('/v2/mentor/availability/windows', { method: 'POST', body: data });
  },
  /** Update a date-specific availability window */
  updateAvailabilityWindow(windowId, data) {
    return apiRequest(`/v2/mentor/availability/windows/${windowId}`, { method: 'PATCH', body: data });
  },
  /** Delete a date-specific availability window */
  deleteAvailabilityWindow(windowId) {
    return apiRequest(`/v2/mentor/availability/windows/${windowId}`, { method: 'DELETE' });
  },

  // ─── Slot Generation (mentee side) ───────────────────────────────────
  /** Generate available slots for a mentor + service + date */
  getSlots(mentorProfileId, { serviceId, date }) {
    return apiRequest(`/v2/mentors/${mentorProfileId}/slots?serviceId=${serviceId}&date=${date}`);
  },

  // ─── Bookings ────────────────────────────────────────────────────────
  /** Create a booking with conflict guard */
  createBooking(data) {
    return apiRequest('/v2/bookings', { method: 'POST', body: data });
  },
  /** Get a single booking */
  getBooking(bookingId) {
    return apiRequest(`/v2/bookings/${bookingId}`);
  },
  /** Cancel a booking (mentor only) */
  cancelBooking(bookingId, data = {}) {
    return apiRequest(`/v2/bookings/${bookingId}/cancel`, { method: 'PATCH', body: data });
  },
  /** Reschedule a booking */
  rescheduleBooking(bookingId, data) {
    return apiRequest(`/v2/bookings/${bookingId}/reschedule`, { method: 'PATCH', body: data });
  },
};

// ─── Meeting APIs (Agora Video) ──────────────────────────────────────────────

export const meetingApi = {
  /** Get Agora RTC token for a booking session */
  getToken(bookingId) {
    return apiRequest(`/meetings/${bookingId}/token`);
  },
  /** Mark a session as completed */
  complete(bookingId) {
    return apiRequest(`/meetings/${bookingId}/complete`, { method: "PATCH" });
  },
};

export function resolveUploadUrl(filePath) {
  if (!filePath) {
    return "";
  }

  if (filePath.startsWith("http://") || filePath.startsWith("https://")) {
    return filePath;
  }

  const apiOrigin = API_BASE_URL.replace(/\/api\/?$/, "");
  return `${apiOrigin}${filePath}`;
}

export { API_BASE_URL };
