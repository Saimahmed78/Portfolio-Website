import useAuthStore from "../src/store/authStore";

class ApiClient {
  constructor() {
    this.baseUrl = `${import.meta.env.VITE_BASE_URL}/api/v1`;
    this.defaultHeaders = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  }

  async customFetch(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const { headers: customHeaders, ...restOptions } = options;
    const headers = { ...this.defaultHeaders, ...customHeaders };
    if (customHeaders && customHeaders["Content-Type"] === null) {
      delete headers["Content-Type"];
    }
    const config = {
      headers,
      ...restOptions,
      credentials: "include",
    };

    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      // Global auth guard: if 401 and not already on an auth endpoint, redirect to login
      const isAuthEndpoint = endpoint.startsWith("/auth/");
      if (response.status === 401 && !isAuthEndpoint && !options.skipRedirect) {
        // Clear Zustand auth state so UI reflects logged-out status
        useAuthStore.setState({ user: null, isAuthenticated: false });
        // Redirect to login page
        window.location.href = "/login";
        return;
      }
      throw data;
    }
    console.log("Data returned by ApiClient",data)
    return data;
  }

  // Register a new user
  async register(name, email, password) {
    let deviceModel = "";
    
    if (typeof navigator !== "undefined" && navigator.userAgentData) {
      try {
        const hints = await navigator.userAgentData.getHighEntropyValues(["model"]);
        deviceModel = hints.model || "";
      } catch (e) {
        console.error("Client Hints model capture failed:", e);
      }
    }

    const headers = {};
    if (deviceModel) {
      headers["x-device-model"] = deviceModel;
    }

    return this.customFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers,
    });
  }

  // Verify email with token
  async verify(token) {
    return this.customFetch(`/auth/verify/${token}`, {
      method: "GET",
    });
  }

  // Log in with email + password
  async login(email, password) {
    let deviceModel = "";

    if (typeof navigator !== "undefined" && navigator.userAgentData) {
      try {
        const hints = await navigator.userAgentData.getHighEntropyValues(["model"]);
        deviceModel = hints.model || "";
      } catch (e) {
        console.error("Client Hints model capture failed:", e);
      }
    }

    const headers = {};
    if (deviceModel) {
      headers["x-device-model"] = deviceModel;
    }

    return this.customFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers,
    });
  }

  // Resend verification email
  async resendVerifyEmail(email) {
    return this.customFetch("/auth/resendVerification", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  }
  // Log out the current user
  async logOut() {
    return this.customFetch("/auth/logout", {
      method: "GET",
    });
  }

  // Get details of the current user
  async getMe() {
    return this.customFetch("/auth/getMe", {
      method: "GET",
    });
  }

  // Update identity
  async updateIdentity(data) {
    return this.customFetch("/auth/updateIdentity", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  // Update preferences
  async updatePreferences(data) {
    return this.customFetch("/auth/updatePreferences", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  // Get active sessions
  async getSessions() {
    return this.customFetch("/auth/sessions", {
      method: "GET",
    });
  }

  // Revoke a session
  async revokeSession(sessionId) {
    return this.customFetch(`/auth/sessions/${sessionId}`, {
      method: "DELETE",
    });
  }

  // Revoke all other sessions
  async revokeAllSessions() {
    return this.customFetch("/auth/sessions/revoke-all", {
      method: "DELETE",
    });
  }

  // Forgot password (send reset link)
  async forgotPass(email) {
    return this.customFetch("/auth/forgotPass", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  }

  // Reset password with token
  async resetPass(token, password, confirmPass) {
    return this.customFetch(`/auth/resetPass/${token}`, {
      method: "POST",
      body: JSON.stringify({ password, confirmPass }),
    });
  }

  // Change password (while logged in)
  async changePass(oldPass, newPass, confirmPass) {
    return this.customFetch("/auth/changePass", {
      method: "POST",
      body: JSON.stringify({ oldPass, newPass, confirmPass }),
    });
  }

  // Delete account
  async deleteAccount(password) {
    return this.customFetch("/auth/deleteAccount", {
      method: "POST",
      body: JSON.stringify({ password }),
    });
  }

  async uploadAvatar(formData) {
    return this.customFetch("/auth/profile/avatar", {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": null,
      },
    });
  }

  async contact(data) {
    return this.customFetch("/contact/submit", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }


}

const apiClient = new ApiClient();

export default apiClient;
