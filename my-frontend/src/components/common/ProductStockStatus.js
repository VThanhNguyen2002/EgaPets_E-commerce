import { jsxs as _jsxs } from "react/jsx-runtime";
// Giả sử logic: nếu sold < 20 => remain = 100
// Còn nếu sold >= 20 => remain = remain (chính xác)
const ProductStockStatus = ({ sold, remain }) => {
    let displayedSold = sold;
    let displayedRemain = remain;
    // Bài toán min-max tuỳ bạn
    if (sold < 20) {
        displayedRemain = 100;
    }
    return (_jsxs("div", { style: { marginTop: "8px", color: "#fff" }, children: [_jsxs("p", { children: ["\u0110\u00E3 b\u00E1n ", displayedSold, " s\u1EA3n ph\u1EA9m"] }), _jsxs("p", { children: ["Ch\u1EC9 c\u00F2n ", displayedRemain, " s\u1EA3n ph\u1EA9m"] })] }));
};
export default ProductStockStatus;
