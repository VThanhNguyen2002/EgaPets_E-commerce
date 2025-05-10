// src/hooks/useAuthSyncCart.ts
import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";   // store login của bạn
import { useCartStore } from "../store/cartStore";

export default function useAuthSyncCart() {
  const isLogged = useAuthStore((s) => s.isLoggedIn);
  const refresh  = useCartStore((s) => s.refresh);

  useEffect(() => { refresh(); }, [isLogged]);
}
