export interface CartItem {
    id            : number;     // id record trong bảng GioHang
    san_pham_id   : number;
    ten_san_pham  : string;
    thumb         : string | null;
    so_luong      : number;
    gia           : number;     // total price (đơn giá x số lượng – đã trừ KM)
    giam_gia      : number;     // % giảm trên SP
  }
  
  /** Payload khi add 1 item mới */
  export interface AddCartDto {
    productId : number;
    quantity  : number;
  }
  