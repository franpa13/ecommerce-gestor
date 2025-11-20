import axios, {type AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://mi-api.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para requests
api.interceptors.request.use(
  (config) => {
    // Si usas token:
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para respuestas
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Manejo de errores global (por ej: expiración de token)
    if (error.response?.status === 401) {
      console.warn("No autorizado — redirigir a login");
    }
    return Promise.reject(error);
  }
);

export default api;
