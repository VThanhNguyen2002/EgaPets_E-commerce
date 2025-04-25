import { create } from "zustand";
import { saveToLocalStorage, getFromLocalStorage } from "../utils/storage";

interface AuthState {
  user: string | null;
  login: (userData: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: getFromLocalStorage("user"),
  login: (userData) => {
    saveToLocalStorage("user", userData);
    set({ user: userData });
  },
  logout: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },
}));


