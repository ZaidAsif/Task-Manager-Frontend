import { create } from "zustand";
import { getDashboardData } from "../api/taskApi";

export const useDashboardStore = create((set) => ({
  loading: false,
  data: null,
  error: null,

  fetchDashboard: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await getDashboardData();
      set({ data, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || "Failed to load dashboard", loading: false });
    }
  },
}));
