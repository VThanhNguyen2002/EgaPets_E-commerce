import api from "@/services/axios";
import adminApi from "./adminApi";

export type ProductDTO = {
  id?: number;
  ma_san_pham: string;
  ten_san_pham: string;
  loai: string;
  thuong_hieu?: string;
  gia_thanh: number;
  giam_gia?: number;
  so_gram?: number;
  nguon_goc?: string;
  han_su_dung?: string;          // ISO date
  so_luong?: number;
};

const ROOT = "/product";

export const getProducts   = ()                    => adminApi.get<ProductDTO[]>("");
export const getProduct    = (id:number)           => adminApi.get<ProductDTO>(`/${id}`);
export const createProduct = (d:ProductDTO)        => adminApi.post("", d);
export const updateProduct = (id:number, d:ProductDTO)=> adminApi.put(`/${id}`, d);
export const deleteProduct = (id:number)           => adminApi.delete(`/${id}`);
