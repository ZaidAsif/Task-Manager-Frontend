import api from "./axios";

export const getUsers = () => api.get("/users/get-users");
export const getUserById = (id) => api.get(`/users/${id}`);

export const getProfile = async () => {
  return await api.get("/auth/profile");
};

export const updateProfile = async (formData) => {
  return await api.put("/auth/profile-update", formData);
};

export const uploadProfileImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);
  return await api.post("/auth/upload-image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};