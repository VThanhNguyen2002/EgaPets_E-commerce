export function decodeSlug(slug) {
    return slug
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase())
        .replace("Giuong", "Giường")
        .replace("Dem", "Nệm");
}
