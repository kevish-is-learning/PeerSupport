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
