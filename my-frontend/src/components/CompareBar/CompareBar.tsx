import React, { useState } from "react";
import styles from "./CompareBar.module.css";
import { Product } from "../CatFoodSection/CatFoodSection";

interface CompareBarProps {
  compareList: Product[];
  onRemoveItem: (productId: number) => void;
  onClearAll: () => void;
  onCompareNow: () => void;
}

const CompareBar: React.FC<CompareBarProps> = ({
  compareList,
  onRemoveItem,
  onClearAll,
  onCompareNow,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  
  if (compareList.length === 0) return null;

  return (
    <div className={`${styles.compareBar} ${collapsed ? styles.collapsed : ""}`}>
      {/* 
        Nếu collapsed = true, ta hiển thị 1 nút nổi “So sánh (x) =>”.
        Ngược lại, hiển thị thanh CompareBar đầy đủ. 
      */}
      {collapsed ? (
        <button
          className={styles.collapsedButton}
          onClick={() => setCollapsed(false)}
        >
          {/* Vd: “So sánh (3) ⇒” */}
          So sánh ({compareList.length}) &raquo;
        </button>
      ) : (
        <>
          {/* Header */}
          <div className={styles.compareBarHeader}>
            <div className={styles.barTitle}>
              So sánh ({compareList.length})
            </div>
            <button
              className={styles.toggleButton}
              onClick={() => setCollapsed(true)}
            >
              Thu gọn
            </button>
          </div>

          {/* Danh sách sản phẩm */}
          <div className={styles.compareItems}>
            {compareList.map((item) => (
              <div key={item.id} className={styles.compareItem}>
                <div className={styles.itemInfo}>
                  <img src={item.image} alt={item.name} className={styles.itemImage} />
                  <div className={styles.itemName}>{item.name}</div>
                </div>
                <button
                  className={styles.removeItemBtn}
                  onClick={() => onRemoveItem(item.id)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* 2 nút So sánh - Xóa tất cả */}
          <div className={styles.compareActions}>
            <div className={styles.actionButtons}>
              <button className={styles.compareNowBtn} onClick={onCompareNow}>
                So sánh ngay
              </button>
              <button className={styles.clearAllBtn} onClick={onClearAll}>
                Xóa tất cả sản phẩm
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CompareBar;
