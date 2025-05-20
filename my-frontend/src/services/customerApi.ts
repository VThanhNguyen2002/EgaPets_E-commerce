// src/services/customerApi.ts
import api from "@/services/axios";

export type Profile = {
  id: number;
  ho_ten: string;
  so_dien_thoai: string;
  dia_chi?: string;
  tinh_thanh?: string;
  quan_huyen?: string;
  phuong_xa?: string;
};

export const getProfile = () =>
  api.get<Profile>("/customers/me").then(r => r.data);

export const updateProfile = (dto: Partial<Profile>) =>
  api.put("/customers/me", dto).then(r => r.data);
