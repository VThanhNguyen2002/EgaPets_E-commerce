// src/services/orderApi.ts
import axios from "axios";
const BASE = import.meta.env.VITE_API_URL;
export async function createOrder(payload) {
    const { data } = await axios.post(`${BASE}/orders/checkout`, payload);
    return data;
}
export async function createMomo(body) {
    const { data } = await axios.post(`${BASE}/payments/momo`, body);
    return data;
}
