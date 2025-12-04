import { create } from "zustand";

export const useUserStore = create((set) => ({
  users: [],
  selectedUser: null,
  loading: false,
  error: null,

  setUsers: (users) => set({ users }),
  setSelectedUser: (user) => set({ selectedUser: user }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
