// src/pages/PaymentCallback/index.tsx
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle, XCircle } from "lucide-react";

import useCheckout from "@/hooks/useCheckout";
import cls from "./PaymentCallback.module.css";

type Status = "success" | "fail";

export default function PaymentCallback() {
  const [sp] = useSearchParams();
  const { markPaid } = useCheckout();                  // (waiting → done)
  const [status, setStatus] = useState<Status>("fail");

  /* chạy đúng 1 lần khi component mount */
  useEffect(() => {
    const result = sp.get("resultCode");               // "0" = OK theo MoMo

    if (result === "0") {
      markPaid("Đơn hàng của bạn đã được thanh toán thành công!");
      setStatus("success");
    } else {
      setStatus("fail");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Icon = status === "success" ? CheckCircle : XCircle;
  const msg  =
    status === "success"
      ? "Thanh toán thành công! Cảm ơn bạn ♥"
      : "Thanh toán thất bại. Vui lòng thử lại.";

  return (
    <div className={cls.wrapper}>
      <Icon size={80} className={`${cls.icon} ${cls[status]}`} />
      <p>{msg}</p>

      <Link to="/" className={cls.back}>
        ← Về trang chủ
      </Link>
    </div>
  );
}
