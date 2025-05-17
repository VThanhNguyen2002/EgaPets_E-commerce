// 📁 src/hooks/useProducts.ts
import { useEffect, useState } from "react";
import { fetchAllProducts, fetchImagesByProductId } from "../services/productService";
import { Product } from "../types/Product";

export default function useProducts(loai: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      setLoading(true);
      try {
        const raw = await fetchAllProducts(loai) || [];

        const withImgs: Product[] = await Promise.all(
          raw.map(async (p) => {
            const imgs = await fetchImagesByProductId(p.id);

            const price = p.gia_thanh ?? 0;
            const discount = p.giam_gia ?? 0;
            const finalPrice = Math.round(price * (100 - discount) / 100);

            // Lấy ảnh chính là ảnh có is_main === 1 hoặc fallback là ảnh đầu
            const mainImage = imgs.find(i => i.is_main === 1)?.image_url || imgs[0]?.image_url || null;

            // Lấy ảnh hover là ảnh tiếp theo khác ảnh chính (nếu có)
            const hoverImage = imgs.find(img => img.image_url !== mainImage)?.image_url || null;

            return {
              ...p,
              thumb: mainImage,
              hover: hoverImage,
              finalPrice,
            };
          })
        );

        if (mounted) setProducts(withImgs);
      } catch (err) {
        console.error(err);
        if (mounted) setProducts([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => { mounted = false; };
  }, [loai]);

  return { products, loading };
}
