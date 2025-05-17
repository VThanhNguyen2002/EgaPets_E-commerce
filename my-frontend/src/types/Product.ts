export interface ProductImage {
  id: number;
  san_pham_id: number;
  image_url: string;
  public_id: string;
  format?: string | null;
  width?: number | null;
  height?: number | null;
  bytes?: number | null;
  is_main: 0 | 1;
  uploaded_at: string;
}

export interface Product {
  id: number;
  ma_san_pham: string;
  ten_san_pham: string;
  thuong_hieu: string;
  so_gram: number;
  loai: string;
  nguon_goc: string;
  han_su_dung: string;
  so_luong: number;
  gia_thanh: number;
  giam_gia: number;
  danh_gia: number;
  thanh_phan?: string;
  danh_muc_id?: number;

  /* bổ sung khi fetch list */
  thumb?: string;       // ảnh chính
  hover?: string;       // ảnh hover
  images?: ProductImage[];

  /** giá sau giảm */
  finalPrice?: number;
}
