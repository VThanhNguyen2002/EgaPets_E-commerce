// src/store/cartUIStore.ts
import { create } from "zustand";
export const useCartUIStore = create((set) => ({
    sidebarOpen: false,
    setSidebar: (b) => set({ sidebarOpen: b }),
}));
