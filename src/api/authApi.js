import axiosInstance from "./axios";

export const loginUser = (data) => axiosInstance.post("/auth/login", data, {
    withCredentials: true,
  }
);

export const registerUser = (data) =>
  axiosInstance.post("/auth/register", data, {
    withCredentials: true,
  });

export const uploadProfileImage = (formData) =>
  axiosInstance.post("/auth/upload-image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getProfile = () => axiosInstance.get("/auth/profile");

export const updateProfile = (data) => axiosInstance.put("/auth/update", data);
