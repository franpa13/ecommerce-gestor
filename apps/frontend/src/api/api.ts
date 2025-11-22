import axios, { type AxiosInstance } from "axios";
import { toast } from "sonner";

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Interceptor para requests
api.interceptors.request.use(
  async (config) => {
    await delay(2000);

    const persisted = localStorage.getItem("auth-storage");

    if (persisted) {
      try {
        const parsed = JSON.parse(persisted);
        const token = parsed.state?.token;

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (err) {
        console.warn("Error parsing auth-storage");
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para respuestas
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url || "";

    // Si viene desde /auth/... NO redirigir
    const isAuthRoute = requestUrl.startsWith("/auth");

    if (status === 401 && !isAuthRoute) {
      console.warn("No autorizado → redirigiendo a /auth/login");

      // Limpia el estado del usuario
      localStorage.removeItem("auth-storage");

      // Redirección segura
      window.location.href = "/auth/login";
    }

    return Promise.reject(error);
  }
);

export default api;
