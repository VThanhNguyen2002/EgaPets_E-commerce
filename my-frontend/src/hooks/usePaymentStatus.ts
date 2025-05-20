import { useEffect } from "react";
import axios from "axios";
import { usePaymentStore } from "@/store/paymentStore";

/**
 * Gọi BE liên tục (polling) hỏi trạng thái thanh toán.
 *   – Nếu thành công → store.setSuccess()
 *   – Thất bại      → store.setFail()
 */
export default function usePaymentStatus() {
  const { orderId, status, setSuccess, setFail } = usePaymentStore();

  useEffect(() => {
    if (!orderId || status !== "pending") return;

    const timer = setInterval(async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/orders/${orderId}/payment-status`
        );
        if (data.status === "success") setSuccess();
        if (data.status === "fail") setFail(); // tuỳ backend
      } catch {
        /* network error – giữ nguyên pending */
      }
    }, 4000); // 4s

    return () => clearInterval(timer);
  }, [orderId, status, setSuccess, setFail]);
}
