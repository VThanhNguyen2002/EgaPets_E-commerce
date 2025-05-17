import { CartItem, AddCartDto } from "../types/Cart";

const BASE = "/api/cart";

export const cartApi = {
  add      : (body: AddCartDto) => fetchJSON<CartItem[]>(BASE, "POST", body),
  list     : ()                  => fetchJSON<CartItem[]>(BASE, "GET"),
  update   : (id: number, qty: number) =>
               fetchJSON<CartItem[]>(`${BASE}/${id}`, "PUT", { quantity: qty }),
  remove   : (id: number)        => fetchJSON<CartItem[]>(`${BASE}/${id}`, "DELETE"),
  summary  : ()                  => fetchJSON<{
                                        items: CartItem[];
                                        subTotal: number;
                                        shippingFee: number;
                                        grandTotal: number;
                                     }>(`${BASE}/checkout/summary`, "GET"),
};

/* helper fetch – luôn gửi kèm cookie sid / token */
async function fetchJSON<T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body?: unknown
): Promise<T> {
  const res = await fetch(url, {
    method,
    credentials: "include",        // gửi JWT + sid cookie
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || res.statusText);
  }
  return res.json();
}
