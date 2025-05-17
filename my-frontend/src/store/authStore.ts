import { create } from "zustand";
import { setCookie, getCookie, removeCookie }  from "@/utils/cookie";
import { saveToLocalStorage, getFromLocalStorage } from "@/utils/storage";

interface AuthState {
  /** JWT do backend trả về (hoặc null khi guest) */
  token      : string | null;
  /** tên hiển thị bên AuthButton */
  username   : string | null;
  /** tiện tra cứu nhanh */
  isLoggedIn : boolean;

  /** lưu token + username (dùng sau khi login thành công) */
  login  : (token: string, username: string) => void;
  /** xoá token, xoá cache, reset state */
  logout : () => void;
}

export const useAuthStore = create<AuthState>()((set) => {
  /* ----- đọc lại từ cookie / localStorage khi load trang ----- */
  const tokenLS    = getCookie("token")    || null;
  const usernameLS = getCookie("username") ||
                     getFromLocalStorage("user") || null;

  return {
    token     : tokenLS,
    username  : usernameLS,
    isLoggedIn: !!tokenLS,

    login(token, username) {
      /* 1. lưu vào cookie (hiệu lực 7 ngày) */
      setCookie("token",    token,    7);
      setCookie("username", username, 7);
      /* 2. để phòng trường hợp user xoá cookie → ta vẫn còn tên hiển thị */
      saveToLocalStorage("user", username);
      /* 3. cập-nhật Zustand */
      set({ token, username, isLoggedIn: true });
    },

    logout() {
      /* 1. xoá cookie + localStorage */
      removeCookie("token");   removeCookie("username");
      localStorage.removeItem("user");
      /* 2. reset Zustand */
      set({ token:null, username:null, isLoggedIn:false });
    },
  };
});
