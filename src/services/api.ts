/**
 * Backend API Client
 * Connects directly to server-side SQL database and PHP API endpoints.
 * Handles CSRF tokens, credentials, and error wrapping.
 */

let cachedCsrfToken: string | null = null;

export async function getCsrfToken(): Promise<string> {
  if (cachedCsrfToken) return cachedCsrfToken;
  try {
    const res = await fetch('/api/csrf');
    const json = await res.json();
    if (json.data?.csrf_token) {
      cachedCsrfToken = String(json.data.csrf_token);
      return cachedCsrfToken;
    }
  } catch (e) {
    console.error('Failed to fetch CSRF token:', e);
  }
  return '';
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = await getCsrfToken();
  const headers = new Headers(options.headers || {});

  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  if (token && !headers.has('X-CSRF-Token')) {
    headers.set('X-CSRF-Token', token);
  }

  const response = await fetch(endpoint, {
    ...options,
    headers,
  });

  const json = await response.json();
  if (!response.ok || json.success === false) {
    throw new Error(json.error || json.message || 'API request failed');
  }

  return json.data as T;
}

export const api = {
  // Auth
  async checkAuthStatus() {
    return request<any>('/api/auth');
  },
  async loginAdmin(username: string, password: string) {
    return request<any>('/api/auth?action=admin_login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  },
  async loginMember(memberId: string, password: string) {
    return request<any>('/api/auth?action=member_login', {
      method: 'POST',
      body: JSON.stringify({ memberId, password }),
    });
  },
  async logout() {
    return request<any>('/api/auth?action=logout', { method: 'POST' });
  },

  // Settings
  async getSettings() {
    return request<any>('/api/settings');
  },
  async updateSettings(settings: Record<string, any>) {
    return request<any>('/api/settings', {
      method: 'POST',
      body: JSON.stringify(settings),
    });
  },

  // Savings
  async getSavings() {
    return request<any[]>('/api/savings');
  },
  async createSavings(scheme: any) {
    return request<any>('/api/savings', {
      method: 'POST',
      body: JSON.stringify(scheme),
    });
  },
  async updateSavings(scheme: any) {
    return request<any>('/api/savings', {
      method: 'PUT',
      body: JSON.stringify(scheme),
    });
  },
  async deleteSavings(id: string) {
    return request<any>(`/api/savings?id=${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
  },

  // Loans
  async getLoans() {
    return request<any[]>('/api/loans');
  },
  async createLoan(scheme: any) {
    return request<any>('/api/loans', {
      method: 'POST',
      body: JSON.stringify(scheme),
    });
  },
  async updateLoan(scheme: any) {
    return request<any>('/api/loans', {
      method: 'PUT',
      body: JSON.stringify(scheme),
    });
  },
  async deleteLoan(id: string) {
    return request<any>(`/api/loans?id=${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
  },

  // Loan Applications
  async getApplications() {
    return request<any[]>('/api/applications');
  },
  async submitApplication(app: any) {
    return request<any>('/api/applications', {
      method: 'POST',
      body: JSON.stringify(app),
    });
  },
  async updateApplicationStatus(id: string, status: string, adminRemarks?: string) {
    return request<any>('/api/applications', {
      method: 'PUT',
      body: JSON.stringify({ id, status, adminRemarks }),
    });
  },

  // Notices
  async getNotices() {
    return request<any[]>('/api/notices');
  },
  async createNotice(notice: any) {
    return request<any>('/api/notices', {
      method: 'POST',
      body: JSON.stringify(notice),
    });
  },
  async deleteNotice(id: string) {
    return request<any>(`/api/notices?id=${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
  },

  // News
  async getNews() {
    return request<any[]>('/api/news');
  },
  async createNews(article: any) {
    return request<any>('/api/news', {
      method: 'POST',
      body: JSON.stringify(article),
    });
  },
  async deleteNews(id: string) {
    return request<any>(`/api/news?id=${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
  },

  // Documents
  async getDocuments() {
    return request<any[]>('/api/documents');
  },
  async createDocument(doc: any) {
    return request<any>('/api/documents', {
      method: 'POST',
      body: JSON.stringify(doc),
    });
  },
  async deleteDocument(id: string) {
    return request<any>(`/api/documents?id=${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
  },

  // Messages
  async getMessages() {
    return request<any[]>('/api/messages');
  },
  async submitMessage(message: any) {
    return request<any>('/api/messages', {
      method: 'POST',
      body: JSON.stringify(message),
    });
  },
  async updateMessage(id: string, status: string, adminNotes?: string) {
    return request<any>('/api/messages', {
      method: 'PUT',
      body: JSON.stringify({ id, status, adminNotes }),
    });
  },
  async deleteMessage(id: string) {
    return request<any>(`/api/messages?id=${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
  },

  // Activity Logs
  async getLogs() {
    return request<any[]>('/api/logs');
  },
};
