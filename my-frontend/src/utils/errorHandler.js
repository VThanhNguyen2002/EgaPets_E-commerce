// 📁 src/utils/errorHandler.ts
export function getUserFriendlyError(error) {
    const msg = (error?.message || error?.error || "").toLowerCase();
    if (msg.includes("too many requests") || msg.includes("429"))
        return "Bạn thao tác quá nhanh, vui lòng thử lại sau ít phút.";
    if (msg.includes("network") || msg.includes("failed to fetch"))
        return "Không thể kết nối máy chủ. Vui lòng kiểm tra mạng.";
    return "Đã xảy ra lỗi. Vui lòng thử lại.";
}
