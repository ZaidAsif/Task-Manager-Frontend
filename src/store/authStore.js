import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getProfile } from "../api/authApi"; 

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      loading: false,
      error: null,

      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),

      clearAuth: () => set({ user: null, token: null }),

      /** ⏳ Rehydrate user on app start if token exists */
      loadUser: async () => {
        const token = get().token;
        if (!token) return;
        try {
          set({ loading: true });
          const { data } = await getProfile(); // backend should read token
          set({ user: data.user });
        } catch (err) {
          console.error("❌ Failed to restore user session:", err.message);
          set({ token: null, user: null });
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: "auth-storage", // key in localStorage
      partialize: (state) => ({ token: state.token, user: state.user }), // persist only token+user
    }
  )
);
