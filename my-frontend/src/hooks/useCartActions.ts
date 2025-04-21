// src/hooks/useCartActions.ts
import { useCartStore } from '../store/cartStore';

export const useCartActions = () => {
  const { addToCart, removeFromCart, updateQuantity, clearCart } = useCartStore();

  const handleAddToCart = (product: {
    id: string;
    name: string;
    image: string;
    price: number;
    quantity?: number;
  }) => {
    addToCart({
      ...product,
      quantity: product.quantity || 1,
    });
  };

  return {
    addToCart: handleAddToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
};
