// 📁 src/services/productService.ts
import axios from "axios";
import { Product } from "../types/Product";

const api = axios.create({
  baseURL : import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout : 10000,
});

/* lấy toàn bộ (có thể kèm ?loai=) */
export async function fetchAllProducts(loai?: string): Promise<Product[]> {
  const res = await api.get("/product", { params: loai ? { loai } : {} });

  /* ⬇⬇ Xuất ra mảng dù backend bọc hay không bọc */
  return (res.data?.data ?? res.data) as Product[];
}

/* newest n sp */
export async function fetchNewestProducts(limit = 7): Promise<Product[]> {
  const res = await api.get("/product/newest", { params: { limit } });

  return (res.data?.data ?? res.data) as Product[];
}

/* chi tiết */
export async function fetchProductById(id: number): Promise<Product> {
  const res = await api.get(`/product/${id}`);
  return (res.data?.data ?? res.data) as Product;
}

/* ảnh theo sản phẩm */
export async function fetchImagesByProductId(id: number) {
  const res = await api.get(`/product/${id}/images`);
  return (res.data?.data ?? res.data);
}

