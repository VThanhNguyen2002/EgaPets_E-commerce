// src/utils/formatCurrency.ts
export const formatCurrency = (amount, locale = "vi-VN", currency = "VND") => new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
}).format(amount);
