import adminApi from "./adminApi";
const ROOT = "/product";
export const getProducts = () => adminApi.get("");
export const getProduct = (id) => adminApi.get(`/${id}`);
export const createProduct = (d) => adminApi.post("", d);
export const updateProduct = (id, d) => adminApi.put(`/${id}`, d);
export const deleteProduct = (id) => adminApi.delete(`/${id}`);
