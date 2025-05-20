import { create } from "zustand";

type PayStatus = "pending" | "success" | "fail";

interface PaymentState {
  status: PayStatus;
  orderId?: number;
  setPending: (id: number) => void;
  setSuccess: () => void;
  setFail: () => void;
  reset: () => void;
}

export const usePaymentStore = create<PaymentState>()((set) => ({
  status: "pending",
  orderId: undefined,

  setPending: (id) => set({ status: "pending", orderId: id }),
  setSuccess: () => set((s) => ({ ...s, status: "success" })),
  setFail: () => set((s) => ({ ...s, status: "fail" })),
  reset: () => set({ status: "pending", orderId: undefined }),
}));
