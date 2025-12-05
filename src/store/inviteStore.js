import { create } from "zustand";
import { sendInvitation, getAllInvitations } from "../api/inviteApi";

export const useInviteStore = create((set, get) => ({
  invitations: [],
  loading: false,
  error: null,

  fetchInvitations: async () => {
    try {
      set({ loading: true, error: null });
      const { data } = await getAllInvitations();
      set({ invitations: data.invitations, loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to fetch invitations",
        loading: false,
      });
    }
  },

  inviteUser: async (payload) => {
    try {
      set({ loading: true, error: null });
      await sendInvitation(payload);
      await get().fetchInvitations(); // Refresh list
      set({ loading: false });
      return true;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to send invite",
        loading: false,
      });
      return false;
    }
  },
}));
