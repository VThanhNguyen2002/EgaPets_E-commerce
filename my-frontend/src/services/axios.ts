// src/services/axios.ts
import axios from "axios";
import { getCookie } from "@/utils/cookie";

const api = axios.create({
  baseURL : import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers : { "Content-Type": "application/json" } as Record<string, string>,
});

api.interceptors.request.use(cfg => {
  const tk = getCookie("token");
  if (tk) {
    // Ép kiểu về Record<string, string> nếu dùng index
    if (!cfg.headers) cfg.headers = {} as any;
    (cfg.headers as Record<string, string>)["Authorization"] = `Bearer ${tk}`;
  }
  return cfg;
});

export default api;
