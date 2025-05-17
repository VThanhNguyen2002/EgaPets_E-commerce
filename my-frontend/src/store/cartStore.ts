import { create } from "zustand";
import { persist } from "zustand/middleware";
import debounce from "lodash.debounce";
import { toast } from "react-toastify";

import { CartItem, AddCartDto } from "@/types/Cart";
import { cartApi } from "@/services/cartApi";
import { getUserFriendlyError } from "@/utils/errorHandler";
import { calculateTotalPrice } from "@/utils/calculateTotalPrice";

interface CartState {
  cartItems    : CartItem[];
  getCount     : () => number;
  refresh      : () => Promise<void>;
  add          : (dto: AddCartDto) => Promise<void>;
  updateQty    : (id: number, qty: number) => Promise<void>;
  remove       : (id: number) => Promise<void>;
  clearLocal   : () => void;
  optimisticAdd: (p: any) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => {
      const safeSet = (list: unknown) => {
        const cur = get().cartItems;
        set({
          cartItems: Array.isArray(list)
            ? list.map((it: any) => {
                const don_gia = it.don_gia ?? Math.round(it.gia / Math.max(1, it.so_luong));
                return {
                  ...it,
                  don_gia,
                  gia: calculateTotalPrice(don_gia, it.so_luong),
                };
              })
            : cur,
        });
      };

      const debouncedRefresh = debounce(async () => {
        try {
          const res = await cartApi.list();
          if ((res as any)?.warning) toast.info((res as any).warning);
          else safeSet(res);
        } catch (e) {
          toast.error(getUserFriendlyError(e));
        }
      }, 1000);

      const addQueue = new Map<number, ReturnType<typeof setTimeout>>();
      const enqueueAdd = (dto: AddCartDto) =>
        new Promise<void>((resolve, reject) => {
          if (addQueue.has(dto.productId)) return resolve();
          addQueue.set(
            dto.productId,
            setTimeout(async () => {
              try {
                const updated = await cartApi.add(dto);
                safeSet(updated);
                resolve();
              } catch (e) {
                toast.error(getUserFriendlyError(e));
                reject(e);
              } finally {
                addQueue.delete(dto.productId);
              }
            }, 250)
          );
        });

      return {
        cartItems: [],

        getCount: () => {
          const arr = get().cartItems;
          return Array.isArray(arr) ? arr.reduce((n, i) => n + (i.so_luong || 0), 0) : 0;
        },

        refresh: () => new Promise(r => { debouncedRefresh(); r(); }),

        add: enqueueAdd,

        updateQty: async (id, qty) => {
          try {
            const updated = await cartApi.update(id, qty);
            safeSet(updated);
          } catch (e) {
            toast.error(getUserFriendlyError(e));
          }
        },

        remove: async (id) => {
          try {
            const updated = await cartApi.remove(id);
            safeSet(updated);
          } catch (e) {
            toast.error(getUserFriendlyError(e));
          }
        },

        clearLocal: () => set({ cartItems: [] }),

        optimisticAdd: (p: any) => {
          set(s => ({
            cartItems: [
              ...s.cartItems,
              {
                id           : Date.now(),
                san_pham_id  : p.id,
                ten_san_pham : p.ten_san_pham,
                ma_sp        : p.ma_sp ?? "",
                thumb        : p.thumb ?? null,
                so_luong     : 1,
                don_gia      : p.finalPrice,
                gia          : p.finalPrice,
                loai         : p.loai,
                giam_gia: p.giam_gia ?? 0,
              }
            ]
          }));
        }
      };
    },
    {
      name: "ega-cart-cache",
    }
  )
);
