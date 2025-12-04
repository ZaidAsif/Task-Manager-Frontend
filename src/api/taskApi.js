import api from "./axios";

export const getTasks = (status = "") => api.get(`/tasks?status=${status}`);
export const createTask = (data) => api.post("/tasks/create", data);
export const updateTask = (id, data) => api.put(`/tasks/${id}`, data);
export const deleteTask = (id) => api.delete(`/tasks/${id}`);
export const updateTaskStatus = (id, status) =>
  api.put(`/tasks/${id}/status`, { status });
export const updateChecklist = (id, data) =>
  api.put(`/tasks/${id}/todo`, data);
export const getDashboardData = () => api.get("/tasks/dashboard-data");
export const getUserDashboardData = () => api.get("/tasks/user-dashboard-data");
