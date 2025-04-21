// src/utils/calculateTotalPrice.ts

/**
 * Tính tổng giá từ API trả về
 * @param basePrice Giá gốc một sản phẩm
 * @param quantity Số lượng
 * @returns Tổng giá (đã nhân)
 */
export const calculateTotalPrice = (basePrice: number, quantity: number): number => {
    if (!basePrice || !quantity || basePrice < 0 || quantity < 0) return 0;
    return basePrice * quantity;
  };
  