// src/services/customerApi.ts
import api from "@/services/axios";
export const getProfile = () => api.get("/customers/me").then(r => r.data);
export const updateProfile = (dto) => api.put("/customers/me", dto).then(r => r.data);
