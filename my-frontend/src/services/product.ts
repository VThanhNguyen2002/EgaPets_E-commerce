import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

export const fetchProducts = async () => {
  try {
    const response = await api.get("/products");
    return response.data;
  } catch (error: any) {
    console.error("Lỗi khi lấy sản phẩm:", error.response?.data || error.message);
    throw new Error("Không thể lấy danh sách sản phẩm");
  }
};
