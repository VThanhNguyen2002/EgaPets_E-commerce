// src/components/PromoInput/index.tsx
import { useState, useEffect } from "react";
import { toast }               from "react-toastify";
import { formatCurrency }      from "@/utils/formatCurrency";
import styles                  from "./PromoInput.module.css";

const PROMO = "EGA50";
const RATE  = .5;

interface Props {
  enabled   : boolean;
  cartCount : number;
  subTotal  : number;
  applied   : boolean;          // NEW
  onApply() : void;             // NEW
}

export default function PromoInput({
  enabled, cartCount, subTotal, applied, onApply
}: Props) {
  const [code, setCode] = useState("");

  /* Khi parent huỷ áp dụng (cart < 2 SP) → clear input */
  useEffect(() => {
    if (!applied) setCode("");
  }, [applied]);

  const apply = () => {
    if (code.trim().toUpperCase() !== PROMO)
      return toast.error("Mã không hợp lệ!");

    if (cartCount < 2)
      return toast.info("Cần ≥ 2 sản phẩm để áp dụng EGA50");

    onApply();
    toast.success(`Đã giảm ${formatCurrency(subTotal * RATE)}`);
  };

  return (
    <>
      <div className={styles.box}>
        <input
          placeholder="Mã giảm giá"
          value={code}
          disabled={!enabled || applied}
          onChange={e => setCode(e.target.value)}
        />
        <button onClick={apply} disabled={!enabled || applied}>
          Áp dụng
        </button>
      </div>

      {applied && (
        <p className={styles.msg}>
          ✔ Giảm {formatCurrency(subTotal * RATE)}
        </p>
      )}
    </>
  );
}
