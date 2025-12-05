import api from "./axios";

export const sendInvitation = (data) => api.post("/invite/send", data);

export const getAllInvitations = () => api.get("/invite/all");

export const acceptInvitation = (data) => api.post("/invite/accept", data);
