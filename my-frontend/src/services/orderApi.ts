// src/services/orderApi.ts
import axios from "axios";
import { CartItem } from "@/types/Cart";

const BASE = import.meta.env.VITE_API_URL as string;

export interface CheckoutPayload {
  customerId: number | null;
  guestInfo : { hoTen: string; phone: string; email: string };
  items     : {
    id: number; qty: number; price: number; discount: number;
  }[];
  discount  : number;
  payMethod : number;
  payMethodLabel?: string;
}

export async function createOrder(payload: CheckoutPayload) {
  const { data } = await axios.post(`${BASE}/orders/checkout`, payload);
  return data as { orderId: number; amount: number };
}

export async function createMomo(body: { orderId: number; amount: number }) {
  const { data } = await axios.post(`${BASE}/payments/momo`, body);
  return data as { payUrl: string; qrCodeUrl: string };
}
