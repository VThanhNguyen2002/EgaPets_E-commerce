import { create } from "zustand";
export const usePaymentStore = create()((set) => ({
    status: "pending",
    orderId: undefined,
    setPending: (id) => set({ status: "pending", orderId: id }),
    setSuccess: () => set((s) => ({ ...s, status: "success" })),
    setFail: () => set((s) => ({ ...s, status: "fail" })),
    reset: () => set({ status: "pending", orderId: undefined }),
}));
