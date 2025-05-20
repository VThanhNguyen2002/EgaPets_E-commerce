import axios, { InternalAxiosRequestConfig, AxiosRequestHeaders } from "axios";
import { getCookie } from "@/utils/cookie";

const adminApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/product`,
  headers: { "Content-Type": "application/json" },   // OK
});

adminApi.interceptors.request.use((cfg: InternalAxiosRequestConfig) => {
  const token = getCookie("token");

  if (token) {
    /* Bảo đảm headers tồn tại và có đúng kiểu */
    cfg.headers = {
      ...(cfg.headers as AxiosRequestHeaders | undefined),
      Authorization: `Bearer ${token}`,
    } as AxiosRequestHeaders;
  }

  return cfg;
});

export default adminApi;
