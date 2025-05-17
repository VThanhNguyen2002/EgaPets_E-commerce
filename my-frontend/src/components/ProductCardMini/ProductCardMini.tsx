// src/components/ProductCardMini/ProductCardMini.tsx
import { Product } from "@/types/Product";
import { formatCurrency } from "@/utils/formatCurrency";
import noImg from "@/assets/img-placeholder.png";
import styles from "./ProductCardMini.module.css";

interface Props {
  p: Product;
  onAdd: () => void;
  onClick: () => void;
}

export default function ProductCardMini({ p, onAdd, onClick }: Props) {
  return (
    <div className={styles.card}>
      <img src={p.thumb || noImg} onClick={onClick} />
      <span className={styles.name}>{p.ten_san_pham}</span>
      <b>{formatCurrency(p.finalPrice)}</b>
      <button className={styles.addBtn} onClick={onAdd}>
        + Thêm
      </button>
    </div>
  );
}
