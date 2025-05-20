// src/store/authStore.ts
import { create } from "zustand";
import { setCookie, getCookie, removeCookie } from "@/utils/cookie";
import { saveToLocalStorage, getFromLocalStorage } from "@/utils/storage";

interface AuthState {
  token       : string | null;
  username    : string | null;
  khachHangId : number | null;
  isLoggedIn  : boolean;

  /* ⇢ login nhận thêm id */
  login  : (token: string, username: string, id: number) => void;
  logout : () => void;
}

export const useAuthStore = create<AuthState>()((set) => {
  const tokenLS       = getCookie("token") ?? null;
  const usernameLS    = getCookie("username") ??
                        getFromLocalStorage("user") ?? null;

  const khachHangIdLS = Number(getCookie("khachHangId") ?? "") || null;
  

  return {
    token       : tokenLS,
    username    : usernameLS,
    khachHangId : khachHangIdLS,
    isLoggedIn  : !!tokenLS,

    login(token, username, khId) {
      setCookie("token",        token,       7);
      setCookie("username",     username,    7);
      setCookie("khachHangId",  String(khId), 7);  // ✅ dùng tên chuẩn
      saveToLocalStorage("user", username);
    
      set({ token, username, khachHangId: khId, isLoggedIn: true });
    },
    
    logout() {
      ["token", "username", "khachHangId"].forEach(removeCookie); // ✅ đồng bộ xoá
      localStorage.removeItem("user");
      set({ token: null, username: null, khachHangId: null, isLoggedIn: false });
    }
  };
});
