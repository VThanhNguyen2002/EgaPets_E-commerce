// src/hooks/usePaymentMethods.ts
import { useEffect, useState } from "react";
export default function usePaymentMethods() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    useEffect(() => {
        const ctrl = new AbortController();
        const fetchData = async () => {
            try {
                const api = `${import.meta.env.VITE_API_URL}/payment-methods`;
                const res = await fetch(api, { signal: ctrl.signal });
                if (!res.ok)
                    throw new Error("Không lấy được phương thức thanh toán");
                const raw = await res.json();
                setData(raw.map((m) => ({
                    id: String(m.id),
                    ten_phuong_thuc: m.ten_phuong_thuc,
                })));
            }
            catch (err) {
                if (err.name !== "AbortError")
                    setError(err.message);
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
        return () => ctrl.abort();
    }, []);
    return { data, loading, error };
}
