const BASE_URL = "https://n8n-automation-qt26.onrender.com";

export const auth = {
  async signup(data: any) {
    const response = await fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Signup failed");
    }
    return response.json();
  },

  async login(data: any) {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Login failed");
    }
    const result = await response.json();
    if (result.access_token) {
      localStorage.setItem("token", result.access_token);
    }
    return result;
  },

  logout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  },

  getToken() {
    return localStorage.getItem("token");
  },

  isAuthenticated() {
    return !!this.getToken();
  },

  getAuthHeader() {
    const token = this.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  },

  async fetchWithAuth(url: string, options: RequestInit = {}) {
    const headers = {
      ...options.headers,
      ...this.getAuthHeader(),
    };
    const response = await fetch(`${BASE_URL}${url}`, {
      ...options,
      headers,
    });
    if (response.status === 401) {
      this.logout();
      throw new Error("Session expired. Please login again.");
    }
    return response;
  },
};