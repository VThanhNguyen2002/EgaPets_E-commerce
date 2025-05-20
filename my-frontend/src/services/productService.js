// 📁 src/services/productService.ts
import axios from "axios";
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
    timeout: 10000,
});
/* lấy toàn bộ (có thể kèm ?loai=) */
export async function fetchAllProducts(loai) {
    const res = await api.get("/product", { params: loai ? { loai } : {} });
    /* ⬇⬇ Xuất ra mảng dù backend bọc hay không bọc */
    return (res.data?.data ?? res.data);
}
/* newest n sp */
export async function fetchNewestProducts(limit = 7) {
    const res = await api.get("/product/newest", { params: { limit } });
    return (res.data?.data ?? res.data);
}
/* chi tiết */
export async function fetchProductById(id) {
    const res = await api.get(`/product/${id}`);
    return (res.data?.data ?? res.data);
}
/* ảnh theo sản phẩm */
export async function fetchImagesByProductId(id) {
    const res = await api.get(`/product/${id}/images`);
    return (res.data?.data ?? res.data);
}
