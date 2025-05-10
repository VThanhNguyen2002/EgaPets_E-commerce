import { useState } from "react";
import { Star }        from "lucide-react";
import { Product }     from "../../types/Product";
import styles          from "./QuickViewModal.module.css";
import placeholder     from "../common/placeholder/product.png";

interface Props{
  product:Product|null;
  isOpen:boolean;
  onClose():void;
}

export default function QuickViewModal({product,isOpen,onClose}:Props){
  const [idx,setIdx] = useState(0);
  if(!isOpen||!product) return null;

  const imgs = [product.thumb, product.hover].filter(Boolean) as string[];
  const show = imgs[idx] ?? placeholder;

  const price = product.gia_thanh ?? 0;
  const sale  = product.giam_gia ? Math.round(price*(1-product.giam_gia/100)) : price;

  return(
    <div className={styles.ovl} onClick={onClose}>
      <div className={styles.box} onClick={e=>e.stopPropagation()}>

        {/* LEFT – ảnh */}
        <div className={styles.left}>
          <img src={show} alt={product.ten_san_pham}
               onError={e=>e.currentTarget.src = placeholder}/>
          {imgs.length>1 && (
            <div className={styles.thumbs}>
              {imgs.map((s,i)=>(
                <img key={i} src={s} alt=""
                     className={i===idx?styles.act:""}
                     onClick={()=>setIdx(i)}/>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT – info */}
        <div className={styles.right}>
          <h2 className={styles.title}>{product.ten_san_pham}</h2>

          <p className={styles.price}>
            {sale.toLocaleString()}đ
            {product.giam_gia>0 && <span>{price.toLocaleString()}đ</span>}
          </p>

          <p className={styles.meta}>
            Thương hiệu: <b>{product.thuong_hieu}</b> &nbsp;|&nbsp;
            Nguồn gốc: <b>{product.nguon_goc}</b> &nbsp;|&nbsp;
            Khối lượng: <b>{product.so_gram} g</b>
          </p>

          <p className={styles.rating}>
            {[...Array(5)].map((_,i)=>(
              <Star
                key={i}
                size={20}
                strokeWidth={1.2}
                fill={i < Math.round(product.danh_gia) ? "#ffc400" : "none"}
                stroke={i < Math.round(product.danh_gia) ? "#ffc400" : "#666"}
              />
            ))}
            ({product.danh_gia})
          </p>
        </div>

        <button className={styles.close} onClick={onClose}>×</button>
      </div>
    </div>
  );
}
