const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

type FetchOptions = RequestInit & {
  token?: string | null;
};

class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

async function fetchApi<T = unknown>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { token, ...fetchOptions } = options;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(fetchOptions.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ApiError(
      data?.message || 'Something went wrong',
      response.status,
      data
    );
  }

  return data as T;
}

// --- Auth ---
export const authApi = {
  register: (body: { username: string; email: string; password: string }) =>
    fetchApi('/auth/register', { method: 'POST', body: JSON.stringify(body) }),

  login: (body: { email: string; password: string }) =>
    fetchApi('/auth/login', { method: 'POST', body: JSON.stringify(body) }),

  refresh: (refreshToken: string) =>
    fetchApi('/auth/refresh', { method: 'POST', body: JSON.stringify({ refreshToken }) }),

  getMe: (token: string) =>
    fetchApi('/auth/me', { token }),

  changePassword: (token: string, body: { currentPassword: string; newPassword: string }) =>
    fetchApi('/auth/change-password', { method: 'PUT', body: JSON.stringify(body), token }),
};

// --- Posts ---
export const postsApi = {
  getAll: (params?: Record<string, string>, token?: string) => {
    const qs = params ? '?' + new URLSearchParams(params).toString() : '';
    return fetchApi(`/posts${qs}`, { token });
  },

  getOne: (id: string, token?: string) =>
    fetchApi(`/posts/${id}`, { token }),

  create: (token: string, body: Record<string, unknown>) =>
    fetchApi('/posts', { method: 'POST', body: JSON.stringify(body), token }),

  update: (token: string, id: string, body: Record<string, unknown>) =>
    fetchApi(`/posts/${id}`, { method: 'PUT', body: JSON.stringify(body), token }),

  delete: (token: string, id: string) =>
    fetchApi(`/posts/${id}`, { method: 'DELETE', token }),
};

// --- Comments ---
export const commentsApi = {
  getByPost: (postId: string, params?: Record<string, string>) => {
    const qs = params ? '?' + new URLSearchParams(params).toString() : '';
    return fetchApi(`/posts/${postId}/comments${qs}`);
  },

  create: (token: string, postId: string, body: Record<string, unknown>) =>
    fetchApi(`/posts/${postId}/comments`, { method: 'POST', body: JSON.stringify(body), token }),

  update: (token: string, id: string, content: string) =>
    fetchApi(`/comments/${id}`, { method: 'PUT', body: JSON.stringify({ content }), token }),

  delete: (token: string, id: string) =>
    fetchApi(`/comments/${id}`, { method: 'DELETE', token }),
};

// --- Users ---
export const usersApi = {
  getProfile: (id: string) =>
    fetchApi(`/users/${id}`),

  getMyProfile: (token: string) =>
    fetchApi('/users/profile', { token }),

  updateProfile: (token: string, body: Record<string, unknown>) =>
    fetchApi('/users/profile', { method: 'PUT', body: JSON.stringify(body), token }),

  getAll: (token: string, params?: Record<string, string>) => {
    const qs = params ? '?' + new URLSearchParams(params).toString() : '';
    return fetchApi(`/users${qs}`, { token });
  },
};

// --- Notifications ---
export const notificationsApi = {
  getAll: (token: string, params?: Record<string, string>) => {
    const qs = params ? '?' + new URLSearchParams(params).toString() : '';
    return fetchApi(`/notifications${qs}`, { token });
  },

  getUnreadCount: (token: string) =>
    fetchApi('/notifications/unread-count', { token }),

  markAsRead: (token: string, id: string) =>
    fetchApi(`/notifications/${id}/read`, { method: 'PUT', token }),

  markAllAsRead: (token: string) =>
    fetchApi('/notifications/read-all', { method: 'PUT', token }),
};

// --- Admin ---
export const adminApi = {
  createReport: (token: string, body: Record<string, unknown>) =>
    fetchApi('/admin/reports', { method: 'POST', body: JSON.stringify(body), token }),

  getReports: (token: string, params?: Record<string, string>) => {
    const qs = params ? '?' + new URLSearchParams(params).toString() : '';
    return fetchApi(`/admin/reports${qs}`, { token });
  },

  resolveReport: (token: string, id: string, body: Record<string, unknown>) =>
    fetchApi(`/admin/reports/${id}/resolve`, { method: 'PUT', body: JSON.stringify(body), token }),

  banUser: (token: string, id: string, body?: Record<string, unknown>) =>
    fetchApi(`/admin/users/${id}/ban`, { method: 'POST', body: JSON.stringify(body || {}), token }),
};

export { ApiError };
export default fetchApi;
