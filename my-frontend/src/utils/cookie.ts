// src/utils/cookie.ts
import Cookies from 'js-cookie';

// Đọc cookie
export const getCookie = (key: string): string | undefined => {
  return Cookies.get(key);
};

// Ghi cookie
export const setCookie = (key: string, value: string, days = 7) => {
  Cookies.set(key, value, { expires: days, path: '/' });
};

// Xóa cookie
export const removeCookie = (key: string) => {
  Cookies.remove(key);
};
