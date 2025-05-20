import { useState } from "react";
import styles       from "./DogFoodSection.module.css";
import sharedStyles from "../common/SharedStyles.module.css";

import useProducts    from "../../hooks/useProducts";
import { Product }    from "../../types/Product";
import ProductCard    from "../common/ProductCard/ProductCard";
import QuickViewModal from "../QuickViewModal/QuickViewModal";
import CompareBar     from "../CompareBar/CompareBar";

const TABS = [
  { key: "dry",   label: "Thức ăn khô",  type: "Thức ăn cho chó"        },
  { key: "snack", label: "Bánh thưởng", type: "Bánh thưởng cho chó"    },
] as const;

export default function DogFoodSection() {
  const [activeTab, setActiveTab] =
    useState<typeof TABS[number]["key"]>("dry");

  const { products, loading } = useProducts(
    TABS.find((t) => t.key === activeTab)!.type,
  );

  const [quick,   setQuick]   = useState(false);
  const [current, setCurrent] = useState<Product | null>(null);
  const [compare, setCompare] = useState<Product[]>([]);

  const renderCard = (p: Product) => (
    <ProductCard
      key={p.id}
      data={p}
      onQuickView={() => { setCurrent(p); setQuick(true); }}
      onCompare={() => {
        setCompare((prev) =>
          prev.find((x) => x.id === p.id)
            ? prev.filter((x) => x.id !== p.id)
            : prev.length >= 3
              ? (alert("Chỉ so sánh tối đa 3 sản phẩm!"), prev)
              : [...prev, p]);
      }}
    />
  );

  return (
    <section className={styles.sectionWrap}>
     <div className={styles.section}>
      <h2 className={sharedStyles.sectionTitle}>
        Dinh dưỡng cho chó 🐶
      </h2>

      <div className={styles.tabButtons}>
        {TABS.map((t) => (
          <button
            key={t.key}
            className={activeTab === t.key ? styles.activeTab : ""}
            onClick={() => setActiveTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {loading ? (
            <p style={{gridColumn:"1/-1"}}>Đang tải…</p>
          ) : products.length ? (
            products.slice(0,6).map(renderCard)
          ) : (
            <p style={{gridColumn:"1/-1"}}>Chưa có sản phẩm.</p>
          )
        }
      </div>


      <QuickViewModal
        product={current}
        isOpen={quick}
        onClose={() => setQuick(false)}
      />

      <CompareBar
        compareList={compare}
        onRemoveItem={(id) => setCompare(compare.filter((x) => x.id !== id))}
        onClearAll={() => setCompare([])}
        onCompareNow={() => alert("So sánh ngay!")}
      />
    </div>
    </section>
  );
}
