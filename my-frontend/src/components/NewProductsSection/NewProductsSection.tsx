import { useEffect, useState } from "react";
import styles       from "./NewProductsSection.module.css";
import sharedStyles from "../common/SharedStyles.module.css";

import { fetchNewestProducts } from "../../services/productService";
import { Product }             from "../../types/Product";
import ProductCard             from "../common/ProductCard/ProductCard";
import QuickViewModal          from "../QuickViewModal/QuickViewModal";
import CompareBar              from "../CompareBar/CompareBar";
import IntroSanPhamMoi         from "../../assets/IntroSanPhamMoi.jpg";

export default function NewProductsSection() {
  const [items, setItems]   = useState<Product[]>([]);
  const [loading, setLoad]  = useState(true);

  const [quick, setQuick]   = useState(false);
  const [curr,  setCurr]    = useState<Product | null>(null);
  const [cmp,   setCmp]     = useState<Product[]>([]);

  /* lấy 7 sản phẩm mới nhất */
  useEffect(() => {
    fetchNewestProducts(7).then((data) => {
      setItems(Array.isArray(data) ? data : []);
      setLoad(false);
    });    
  }, []);

  const renderCard = (p: Product) => (
    <ProductCard
      key={p.id}
      data={p}
      onQuickView={() => { setCurr(p); setQuick(true); }}
      onCompare={() => {
        setCmp((prev) =>
          prev.find((x) => x.id === p.id)
            ? prev.filter((x) => x.id !== p.id)
            : prev.length >= 3
              ? (alert("Tối đa 3 sản phẩm!"), prev)
              : [...prev, p]);
      }}
    />
  );

  return (
    <div className={styles.section}>
      <h2 className={sharedStyles.sectionTitle}>Sản phẩm mới</h2>

      <div className={styles.content}>
        {/* banner trái */}
        <div className={styles.left}>
          <img
            src={IntroSanPhamMoi}
            className={styles.banner}
            alt="Banner sale"
          />
        </div>

        {/* grid phải */}
        <div className={styles.right}>
          <div className={styles.grid}>
            {loading
              ? <p style={{ gridColumn: "1/-1" }}>Đang tải…</p>
              : items.map(renderCard)}
          </div>

          <div className={styles.viewAll}>
            <button>Xem tất cả »</button>
          </div>
        </div>
      </div>

      <QuickViewModal
        product={curr}
        isOpen={quick}
        onClose={() => setQuick(false)}
      />

      <CompareBar
        compareList={cmp}
        onRemoveItem={(id) => setCmp(cmp.filter((x) => x.id !== id))}
        onClearAll={() => setCmp([])}
        onCompareNow={() => alert("So sánh ngay!")}
      />
    </div>
  );
}
