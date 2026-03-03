const API_URL = 'http://localhost:8080/api';

class APIClient {
  constructor() {
    this.baseURL = API_URL;
    this.token = null;
    this.refreshToken = null;
    
    // Load tokens from localStorage if available
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token');
      this.refreshToken = localStorage.getItem('refreshToken');
    }
  }

  setTokens(token, refreshToken) {
    this.token = token;
    this.refreshToken = refreshToken;
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
    }
  }

  clearTokens() {
    this.token = null;
    this.refreshToken = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
    }
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Auth
  async register(email, username, password) {
    const data = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, username, password }),
    });
    if (data.data?.token) {
      this.setTokens(data.data.token, data.data.refreshToken);
    }
    return data;
  }

  async login(email, password) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (data.data?.token) {
      this.setTokens(data.data.token, data.data.refreshToken);
    }
    return data;
  }

  async refresh() {
    const data = await this.request('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken: this.refreshToken }),
    });
    if (data.data?.token) {
      this.setTokens(data.data.token, data.data.refreshToken);
    }
    return data;
  }

  logout() {
    this.clearTokens();
  }

  // Posts
  async getPosts(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/posts?${queryString}`);
  }

  async getPost(id) {
    return this.request(`/posts/${id}`);
  }

  async createPost(title, content, category, isAnonymous) {
    return this.request('/posts', {
      method: 'POST',
      body: JSON.stringify({ title, content, category, isAnonymous }),
    });
  }

  async updatePost(id, title, content, category) {
    return this.request(`/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content, category }),
    });
  }

  async deletePost(id) {
    return this.request(`/posts/${id}`, {
      method: 'DELETE',
    });
  }

  // Comments
  async getComments(postId) {
    return this.request(`/posts/${postId}/comments`);
  }

  async createComment(postId, content, isAnonymous) {
    return this.request(`/posts/${postId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ content, isAnonymous }),
    });
  }

  async updateComment(id, content) {
    return this.request(`/comments/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ content }),
    });
  }

  async deleteComment(id) {
    return this.request(`/comments/${id}`, {
      method: 'DELETE',
    });
  }

  // Users
  async getProfile(id = null) {
    return this.request(id ? `/users/${id}` : '/users/profile');
  }

  async updateProfile(data) {
    return this.request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async getAllUsers() {
    return this.request('/users');
  }

  // Notifications
  async getNotifications() {
    return this.request('/notifications');
  }

  async getUnreadCount() {
    return this.request('/notifications/unread-count');
  }

  async markAsRead(id) {
    return this.request(`/notifications/${id}/read`, {
      method: 'PUT',
    });
  }

  async markAllAsRead() {
    return this.request('/notifications/read-all', {
      method: 'PUT',
    });
  }

  // Admin
  async createReport(targetType, targetId, reason, description) {
    return this.request('/admin/reports', {
      method: 'POST',
      body: JSON.stringify({ targetType, targetId, reason, description }),
    });
  }

  async getReports(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/admin/reports?${queryString}`);
  }

  async resolveReport(id, action, notes) {
    return this.request(`/admin/reports/${id}/resolve`, {
      method: 'PUT',
      body: JSON.stringify({ action, notes }),
    });
  }

  async banUser(id, reason) {
    return this.request(`/admin/users/${id}/ban`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  }

  // Health check
  async health() {
    return this.request('/health');
  }
}

export default new APIClient();
