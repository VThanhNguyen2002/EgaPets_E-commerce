import React from "react";

interface ProductStockStatusProps {
  sold: number;   // đã bán
  remain: number; // còn lại
}

// Giả sử logic: nếu sold < 20 => remain = 100
// Còn nếu sold >= 20 => remain = remain (chính xác)
const ProductStockStatus: React.FC<ProductStockStatusProps> = ({ sold, remain }) => {
  let displayedSold = sold;
  let displayedRemain = remain;

  // Bài toán min-max tuỳ bạn
  if (sold < 20) {
    displayedRemain = 100; 
  }

  return (
    <div style={{ marginTop: "8px", color: "#fff" }}>
      <p>Đã bán {displayedSold} sản phẩm</p>
      <p>Chỉ còn {displayedRemain} sản phẩm</p>
    </div>
  );
};

export default ProductStockStatus;