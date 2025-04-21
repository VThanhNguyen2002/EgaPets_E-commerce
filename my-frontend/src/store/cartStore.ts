// src/store/cartStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [],
      addToCart: (item) => {
        const existing = get().cartItems.find(i => i.id === item.id);
        if (existing) {
          set({
            cartItems: get().cartItems.map(i =>
              i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
            )
          });
        } else {
          set({ cartItems: [...get().cartItems, item] });
        }
      },
      removeFromCart: (id) =>
        set({ cartItems: get().cartItems.filter(item => item.id !== id) }),
      updateQuantity: (id, quantity) =>
        set({
          cartItems: get().cartItems.map(item =>
            item.id === id ? { ...item, quantity } : item
          )
        }),
      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: 'cart-storage', // tên key trong localStorage
    }
  )
);
