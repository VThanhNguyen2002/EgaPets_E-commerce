// src/utils/calculateTotalPrice.ts
export const calculateTotalPrice = (base, qty) => !base || !qty || base < 0 || qty < 0 ? 0 : base * qty;
// src/utils/formatCurrency.ts
export const formatCurrency = (v, l = "vi-VN", c = "VND") => new Intl.NumberFormat(l, { style: "currency", currency: c }).format(v);
