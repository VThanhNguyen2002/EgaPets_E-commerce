import { create } from "zustand";
import { persist } from "zustand/middleware";
import debounce from "lodash.debounce";
import { getUserFriendlyError } from "@/utils/errorHandler";
import { toast } from "react-toastify";
import { CartItem, AddCartDto } from "@/types/Cart";
import { cartApi } from "@/services/cartApi";

interface CartState {
  cartItems : CartItem[];

  getCount  : () => number;

  refresh   : () => Promise<void>;
  add       : (dto: AddCartDto) => Promise<void>;
  updateQty : (id: number, qty: number) => Promise<void>;
  remove    : (id: number) => Promise<void>;
  clearLocal: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => {
      const safeSet = (list: unknown) =>
        set({ cartItems: Array.isArray(list) ? list : [] });

      // ✅ Giới hạn gọi API list mỗi 1 giây
      const debouncedRefresh = debounce(async () => {
        try {
          const res = await cartApi.list();
          if ((res as any)?.warning) {
            toast.info((res as any).warning);
          } else {
            safeSet(res);
          }
        } catch (e) {
          toast.error(getUserFriendlyError(e));
        }
      }, 1000);

      // ✅ Ngăn spam add cùng 1 SKU
      const addQueue = new Map<number, ReturnType<typeof setTimeout>>();
      const enqueueAdd = (dto: AddCartDto) =>
        new Promise<void>((resolve, reject) => {
          if (addQueue.has(dto.productId)) return resolve(); // đang đợi
          addQueue.set(
            dto.productId,
            setTimeout(async () => {
              try {
                safeSet(await cartApi.add(dto));
                resolve();
              } catch (e) {
                toast.error(getUserFriendlyError(e));
                reject(e);
              } finally {
                addQueue.delete(dto.productId);
              }
            }, 250) // ¼ giây đệm
          );
        });

      return {
        cartItems: [],

        getCount: () =>
          get().cartItems.reduce((n, i) => n + (i.so_luong ?? 0), 0),

        refresh: () =>
          new Promise<void>((resolve) => {
            debouncedRefresh();          // vẫn debounce 1 giây
            resolve();                   // trả Promise để .then/.catch hợp lệ
          }),

        add: enqueueAdd,

        updateQty: async (id, qty) => {
          try {
            safeSet(await cartApi.update(id, qty));
          } catch (e) {
            toast.error(getUserFriendlyError(e));
          }
        },

        remove: async (id) => {
          try {
            safeSet(await cartApi.remove(id));
          } catch (e) {
            toast.error(getUserFriendlyError(e));
          }
        },

        clearLocal: () => set({ cartItems: [] }),
      };
    },
    {
      name: "ega-cart-cache",
      merge: (persisted, current) => ({
        ...current,
        cartItems: Array.isArray((persisted as any)?.state?.cartItems)
          ? (persisted as any).state.cartItems
          : [],
      }),
    }
  )
);
