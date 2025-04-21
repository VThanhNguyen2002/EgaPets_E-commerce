// 📁 src/services/productService.ts
import axios from "axios";
import { Product } from "../types/Product";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 10000,
});

export const fetchProductById = async (id: string): Promise<Product> => {
  const res = await api.get(`/product/${id}`);
  return res.data;
};

export const fetchAllProducts = async (): Promise<Product[]> => {
  const res = await api.get("/product");
  return res.data;
};
