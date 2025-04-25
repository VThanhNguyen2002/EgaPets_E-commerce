// src/utils/cookie.ts
import Cookies from 'js-cookie';

// Đọc cookie
export const getCookie = (key: string): string | undefined => {
  return Cookies.get(key);
};

// Ghi cookie
export function setCookie(name: string, value: string, days = 7) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
}

// Xóa cookie
export const removeCookie = (key: string) => {
  Cookies.remove(key);
};
