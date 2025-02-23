import { create } from "zustand";

export const useErrorStore = create((set) => ({
  error: null,
  setError: (message: string) => set({ error: message }),
  clearError: () => set({ error: null }),
}));
