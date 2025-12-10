import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Attach token automatically
// api.interceptors.request.use((config) => {
// //   const token = localStorage.getItem("token");

// //   if (!config.url.startsWith("/api/auth/") && token) {
// //     config.headers.Authorization = `Bearer ${token}`;
// //   }

//   return config;
// });

export const AuthApi = {
  login: (data) => api.post("/auth/login", data),
  signup: (data) => api.post("/auth/register", data),
  forgotPassword: (data) => api.post("/auth/forgot-password", data),
};
