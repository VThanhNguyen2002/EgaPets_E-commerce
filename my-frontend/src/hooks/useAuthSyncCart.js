import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
/**
 * Đồng bộ lại giỏ hàng mỗi khi login/logout:
 * - Nếu login: xoá cart guest từ localStorage + store
 * - Luôn gọi refresh để lấy giỏ đúng từ backend
 */
export default function useAuthSyncCart() {
    const { isLoggedIn } = useAuthStore();
    const { refresh, clearLocal } = useCartStore();
    useEffect(() => {
        if (isLoggedIn) {
            // 1) Xoá cache trong localStorage (persisted)
            localStorage.removeItem("ega-cart-cache");
            // 2) Xoá cache trong Zustand store (runtime)
            clearLocal();
        }
        // 3) Gọi lại API để lấy cart chính xác (user/guest)
        refresh();
    }, [isLoggedIn]);
}
