import { create } from "zustand";
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";


const useAuthStore = create((set,get) => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,

  isAuthenticated: !!localStorage.getItem("token"),
  setAuth: (auth) => {
    set({ isAuthenticated: auth });

    if (auth) {
      localStorage.setItem("auth", "true"); // ✅ Persist auth state
    } else {
      localStorage.removeItem("auth");
    }
  },


  login: async (email, password) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      console.log("Raw response:", response); // Log raw response

    //   const data = await response.json().catch(() => null); // Catch JSON parsing errors
    //   console.log("Response Data:", data);
      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        console.error("JSON Parse Error:", jsonError);
        return { success: false, message: "Invalid server response." };
      }
      if (!response.ok) {
        return { success: false, message: data.message || "Login failed." };
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      set({ user: data.user, token: data.token, isAuthenticated: true });

      return { success: true, message: "Login successful!" };
    } catch (error) {
      return { success: false, message: "Something went wrong. Try again!" };
    }
  },

  signup: async (username, email, password) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        console.error("JSON Parse Error:", jsonError);
        return { success: false, message: "Invalid server response." };
      }
      if (!response.ok) {
        return { success: false, message: data.message || "Signup failed." };
      }

      return { success: true, message: "Account created successfully! Please log in." };
    } catch (error) {
      return { success: false, message: "Something went wrong. Try again!" };
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    set({ user: null, token: null, isAuthenticated: false });
    return { success: true, message: "Logged out successfully!" };
  },
}));

export default useAuthStore;

