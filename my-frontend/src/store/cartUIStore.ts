// src/store/cartUIStore.ts
import { create } from "zustand";

interface CartUIState {
  sidebarOpen: boolean;
  setSidebar: (b: boolean) => void;
}

export const useCartUIStore = create<CartUIState>((set) => ({
  sidebarOpen: false,
  setSidebar: (b) => set({ sidebarOpen: b }),
}));
