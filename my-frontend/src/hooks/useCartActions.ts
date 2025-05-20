// src/hooks/useCartActions.ts
import { useCartStore } from "@/store/cartStore";

export const useCartActions = () => {
  const {
    add:          addToCart,
    remove:       removeFromCart,
    updateQty:    updateQuantity,
    clearLocal:   clearCart,
  } = useCartStore();

  const handleAddToCart = (product: {
    id: string;
    name: string;
    image: string;
    price: number;
    quantity?: number;
  }) => {
    addToCart({
      productId: +product.id, 
      name:      product.name,
      image:     product.image,
      price:     product.price,
      quantity:  product.quantity || 1,
    });
    
  };

  return {
    addToCart: handleAddToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
};
