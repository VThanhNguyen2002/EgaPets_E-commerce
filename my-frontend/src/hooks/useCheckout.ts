// src/hooks/useCheckout.ts
import { useState } from "react";
import { createOrder, createMomo, CheckoutPayload } from "@/services/orderApi";

type Step = "form" | "waiting" | "done";

export default function useCheckout() {
  const [step, setStep]   = useState<Step>("form");
  const [qr,   setQr]     = useState<string>();
  const [msg,  setMsg]    = useState<string>("");

  async function submit(payload: CheckoutPayload) {
    /* 1) Tạo đơn */
    const { orderId, amount } = await createOrder(payload);

    /* 2) Nếu MoMo */
    if (payload.payMethod === 1) {
      const { payUrl, qrCodeUrl } = await createMomo({ orderId, amount });
      setQr(qrCodeUrl);
      window.open(payUrl, "_blank");
      setStep("waiting");
    } else {
      setMsg("Đặt hàng thành công – COD");          // thanh toán COD
      setStep("done");
    }
  }

  /** Guest bấm “Tôi đã thanh toán” (môi trường test) */
  function markPaid(customMsg?: string) {
    setMsg(customMsg || "Đơn hàng của bạn đã được thanh toán MoMo thành công!");
    setStep("done");
    setQr(undefined);
  }
  

  return { step, qr, msg, submit, markPaid };
}
