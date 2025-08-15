class ApiClient {
  constructor() {
    this.baseUrl = "http://localhost:5000/api/v1";
    this.defaultHeaders = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  }

  async customFetch(endpoint, options = {}) {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const headers = { ...this.defaultHeaders, ...options.headers };
      const config = {
        headers,
        ...options,
        credentials: "include",
      };

      const response = await fetch(url, config);
      const data = await response.json();
      console.log(`Data in Api Client =`, data);
      if (!response.ok) {
        throw data;
      }

      return data;
    } catch (error) {
      console.log("Api Error = ", error);
      throw error;
    }
  }

  async register(name, email, password) {
    return this.customFetch("/users/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
  }

  async verify(token) {
    return this.customFetch(`/users/verify/${token}`, {
      method: "GET",
    });
  }

  async login(email, password) {
    return this.customFetch("/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  async resendVerifyEmail(email) {
    return this.customFetch("/users/resendVerifyEmail", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  }
  async logOut() {
    return;
    this.customFetch("/users/logOut"),
      {
        method: "GET",
      };
  }
  async getMe() {
    return this.customFetch("/users/getMe", { method: "GET" });
  }

  async getMe() {
    return;
    this.customFetch("/users/getMe"),
      {
        method: "GET",
      };
  }
}

const apiClient = new ApiClient();

export default apiClient;
