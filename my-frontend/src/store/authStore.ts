import { create } from "zustand";
import { saveToLocalStorage, getFromLocalStorage } from "../utils/storage";

interface AuthState {
  user: string | null;
  isLoggedIn: boolean;
  login: (userData: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: getFromLocalStorage("user"),
  isLoggedIn: !!getFromLocalStorage("user"),
  login: (userData) => {
    saveToLocalStorage("user", userData);
    set({ user: userData, isLoggedIn: true });
  },
  logout: () => {
    localStorage.removeItem("user");
    set({ user: null, isLoggedIn: false });
  },
}));



