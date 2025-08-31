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
      if (!response.ok) {
        throw data;
      }
      return data;
    } catch (error) {
      throw error;
    }
  }

  // Register a new user
  async register(name, email, password) {
    return this.customFetch("/users/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
  }

  // Verify email with token
  async verify(token) {
    return this.customFetch(`/users/verify/${token}`, {
      method: "GET",
    });
  }

  // Log in with email + password
  async login(email, password) {
    return this.customFetch("/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  // Resend verification email
  async resendVerifyEmail(email) {
    return this.customFetch("/users/resendVerifyEmail", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  }
  // Log out the current user
  async logOut() {
    return this.customFetch("/users/logOut", {
      method: "GET",
    });
  }

  // Get details of the current user
  async getMe() {
    return this.customFetch("/users/getMe", {
      method: "GET",
    });
  }

  // Forgot password (send reset link)
  async forgotPass(email) {
    return this.customFetch("/users/forgotPass", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  }

  // Reset password with token
  async resetPass(token, password, confirmPass) {
    return this.customFetch(`/users/resetPass/${token}`, {
      method: "POST",
      body: JSON.stringify({ password , confirmPass}),
    });
  }

  // Change password (while logged in)
  async changePass(oldPass, newPass, confirmPass) {
    return this.customFetch("/users/changePass", {
      method: "POST",
      body: JSON.stringify({ oldPass, newPass, confirmPass }),
    });
  }

  // Delete account
  async deleteAccount(password) {
    return this.customFetch("/users/deleteAccount", {
      method: "POST",
      body: JSON.stringify({ password }),
    });
  }
}

const apiClient = new ApiClient();

export default apiClient;
