const BASE = "/api/cart";
export const cartApi = {
    add: (body) => fetchJSON(BASE, "POST", body),
    list: () => fetchJSON(BASE, "GET"),
    update: (id, qty) => fetchJSON(`${BASE}/${id}`, "PUT", { quantity: qty }),
    remove: (id) => fetchJSON(`${BASE}/${id}`, "DELETE"),
    summary: () => fetchJSON(`${BASE}/checkout/summary`, "GET"),
};
/* helper fetch – luôn gửi kèm cookie sid / token */
async function fetchJSON(url, method, body) {
    const res = await fetch(url, {
        method,
        credentials: "include", // gửi JWT + sid cookie
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || res.statusText);
    }
    return res.json();
}
