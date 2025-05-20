// src/store/authStore.ts
import { create } from "zustand";
import { setCookie, getCookie, removeCookie } from "@/utils/cookie";
export const useAuthStore = create()((set) => {
    const tokenLS = getCookie("token") ?? null;
    const usernameLS = getCookie("username") ?? null;
    const roleLS = getCookie("role") ?? null;
    return {
        token: tokenLS,
        username: usernameLS,
        role: roleLS,
        isLoggedIn: !!tokenLS,
        login(token, username, role) {
            ["token", "username", "role"].forEach(removeCookie); // xoá cookie cũ
            setCookie("token", token, 7);
            setCookie("username", username, 7);
            setCookie("role", role, 7);
            set({ token, username, role, isLoggedIn: true });
        },
        logout() {
            ["token", "username", "role"].forEach(removeCookie);
            localStorage.removeItem("user");
            set({ token: null, username: null, role: null, isLoggedIn: false });
        }
    };
});
