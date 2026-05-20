import { create } from "zustand";
import apiClient from "../../services/apiClient";

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const response = await apiClient.getMe();
      console.log("response", response)
      if (response && response.data) {
        console.log("USER DATA IN AUTH STORE", response.data);
        set({ user: response.data, isAuthenticated: true, isCheckingAuth: false });
      } else {
        set({ user: null, isAuthenticated: false, isCheckingAuth: false });
      }
    } catch {
      set({ user: null, isAuthenticated: false, isCheckingAuth: false });
    }
  },

  login: (userData) => {
    set({ user: userData, isAuthenticated: true });
  },

  logout: async () => {
    try {
      await apiClient.logOut();
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      set({ user: null, isAuthenticated: false });
    }
  },

  logOut: async () => {
    try {
      await apiClient.logOut();
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      set({ user: null, isAuthenticated: false });
    }
  },
}));

export default useAuthStore;
