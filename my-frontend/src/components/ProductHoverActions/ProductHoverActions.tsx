import React from "react";
import styles from "./ProductHoverActions.module.css";

interface ProductHoverActionsProps {
  wrapperClass?: string;
  onQuickView: () => void;
  onCompare: () => void;
}

const ProductHoverActions: React.FC<ProductHoverActionsProps> = ({
  wrapperClass,
  onQuickView,
  onCompare,
}) => {
  return (
    <div className={`${styles.hoverIcons} ${wrapperClass || ""}`}>
      <div className={styles.iconItem} onClick={onQuickView}>👁</div>
      <div className={styles.iconItem} onClick={onCompare}>⇄</div>
    </div>
  );
};

export default ProductHoverActions;
