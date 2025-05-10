import { useState } from "react";
import styles       from "./CompareBar.module.css";
import { Product }  from "../../types/Product";

interface Props {
  compareList  : Product[];
  onRemoveItem : (id: number) => void;
  onClearAll   : () => void;
  onCompareNow : () => void;
}

export default function CompareBar({
  compareList, onRemoveItem, onClearAll, onCompareNow,
}: Props) {
  const [collapsed, setCollapsed] = useState(false);
  if (!compareList.length) return null;

  /* tối đa 3 slot – render ô rỗng cho đẹp */
  const slots = [...compareList];
  while (slots.length < 3) slots.push(null as unknown as Product);

  return (
    <div className={`${styles.bar} ${collapsed ? styles.hide : ""}`}>
      {collapsed ? (
        <button className={styles.floatBtn} onClick={() => setCollapsed(false)}>
          So sánh&nbsp;({compareList.length}) ▶
        </button>
      ) : (
        <>
          <header className={styles.header}>
            <span>So sánh ({compareList.length})</span>
            <button onClick={() => setCollapsed(true)}>Thu gọn</button>
          </header>

          <div className={styles.items}>
            {slots.map((p, i) => (
              <div key={i} className={styles.item}>
                {p ? (
                  <>
                    <img src={p.thumb!} alt={p.ten_san_pham}/>
                    <span title={p.ten_san_pham}>{p.ten_san_pham}</span>
                    <button onClick={() => onRemoveItem(p.id)}>×</button>
                  </>
                ) : (
                  <div className={styles.empty}>+</div>
                )}
              </div>
            ))}
          </div>

          <div className={styles.actions}>
            <button className={styles.primary} onClick={onCompareNow}>
              So sánh ngay
            </button>
            <button onClick={onClearAll}>Xóa tất cả</button>
          </div>
        </>
      )}
    </div>
  );
}
