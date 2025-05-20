export interface CartItem {
    id            : number;     // id record trong bảng GioHang
    san_pham_id   : number;
    ma_sp         : string;
    ten_san_pham  : string;
    thumb         : string | null;
    so_luong      : number;
    gia           : number;     // total price (đơn giá x số lượng – đã trừ KM)
    giam_gia      : number;     // % giảm trên SP
    don_gia       : number;
    loai     : "cat"|"dog"|string;
  }
  
  /** Payload khi add 1 item mới */
  // types/Cart.ts
    export interface AddCartDto {
      productId: number;
      quantity : number;
      name?    : string;
      image?   : string;
      price?   : number;
    }


  export interface CheckoutPayload {
    customerId : number | null;
    /* ... */
  }
  