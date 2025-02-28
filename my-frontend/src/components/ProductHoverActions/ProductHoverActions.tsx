import React from "react";
import styles from "./ProductHoverActions.module.css";

interface ProductHoverActionsProps {
  onQuickView: () => void;
  onCompare: () => void;
}

const ProductHoverActions: React.FC<ProductHoverActionsProps> = ({
  onQuickView,
  onCompare,
}) => {
  return (
    <div className={styles.hoverIcons}>
      <div
        className={styles.iconItem}
        title="Xem nhanh"
        onClick={onQuickView}
      >
        👁
      </div>
      <div
        className={styles.iconItem}
        title="So sánh"
        onClick={onCompare}
      >
        ⇄
      </div>
    </div>
  );
};

export default ProductHoverActions;
