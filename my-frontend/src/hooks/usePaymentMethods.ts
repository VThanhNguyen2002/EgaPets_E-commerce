// src/hooks/usePaymentMethods.ts
import { useEffect, useState } from "react";

export interface PaymentMethod {
  id: string;
  ten_phuong_thuc: string;
}

export default function usePaymentMethods() {
  const [data,    setData]    = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string>();

  useEffect(() => {
    const ctrl  = new AbortController();
    const fetchData = async () => {
      try {
        const api = `${import.meta.env.VITE_API_URL}/payment-methods`;
        const res = await fetch(api, { signal: ctrl.signal });
        if (!res.ok) throw new Error("Không lấy được phương thức thanh toán");
        const raw = await res.json();
        setData(raw.map((m: any) => ({
          id: String(m.id),
          ten_phuong_thuc: m.ten_phuong_thuc,
        })));
      } catch (err: any) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return () => ctrl.abort();
  }, []);

  return { data, loading, error };
}
