import { create } from "zustand";

export const useTaskStore = create((set) => ({
  tasks: [],
  statusSummary: {},
  loading: false,
  error: null,

  setTasks: (tasks) => set({ tasks }),
  setStatusSummary: (summary) => set({ statusSummary: summary }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
