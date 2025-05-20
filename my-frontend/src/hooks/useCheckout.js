import { useState } from "react";
import { createOrder, createMomo } from "@/services/orderApi";
import { PAY_METHOD } from "@/constants/payment";
export default function useCheckout() {
    const [step, setStep] = useState("form");
    const [qr, setQr] = useState();
    const [msg, setMsg] = useState("");
    async function submit(payload) {
        // 1) Tạo đơn
        const { orderId, amount } = await createOrder(payload);
        // 2) Nếu MoMo (so sánh bằng số)
        if (payload.payMethodLabel?.toLowerCase().includes(PAY_METHOD.MOMO)) {
            const { payUrl, qrCodeUrl } = await createMomo({ orderId, amount });
            setQr(qrCodeUrl);
            window.open(payUrl, "_blank");
            setStep("waiting");
        }
        else {
            setMsg("Đặt hàng thành công – COD");
            setStep("done");
        }
    }
    function markPaid(customMsg) {
        setMsg(customMsg || "Đơn hàng của bạn đã được thanh toán MoMo thành công!");
        setStep("done");
        setQr(undefined);
    }
    return { step, qr, msg, submit, markPaid };
}
