// ✅ src/hooks/usePaymentMethods.ts
import { useEffect, useState } from "react";

export type PaymentMethod = {
  id: number | string;
  ten_phuong_thuc: string;
};

export default function usePaymentMethods() {
  const [data, setData] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/payment-methods")
      .then(res => {
        if (!res.ok) throw new Error("Lỗi khi load phương thức thanh toán");
        return res.json();
      })
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
