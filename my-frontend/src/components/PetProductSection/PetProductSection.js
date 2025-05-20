import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./PetProductSection.module.css";
import sharedStyles from "../common/SharedStyles.module.css";
// Data giả cho các loại sản phẩm thú cưng
const petProducts = [
    {
        id: 1,
        title: "Thức ăn cho boss",
        image: "/src/assets/ThucAnChoBoss.jpg",
    },
    {
        id: 2,
        title: "Đồ dùng tỉa lông",
        image: "/src/assets/DoDungTiaLong.jpg",
    },
    {
        id: 3,
        title: "Nhà vệ sinh",
        image: "/src/assets/NhaVeSinh.jpg",
    },
    {
        id: 4,
        title: "Phụ kiện",
        image: "/src/assets/PhuKien.jpg",
    },
    {
        id: 5,
        title: "Đệm - Giường",
        image: "/src/assets/DemGiuong.jpg",
    },
    {
        id: 6,
        title: "Dụng cụ chải lông",
        image: "/src/assets/DungCuChaiLong.jpg",
    },
];
const PetProductSection = () => {
    return (_jsxs("div", { className: styles.petProductSection, children: [_jsx("h2", { className: sharedStyles.sectionTitle, children: "S\u1EA3n ph\u1EA9m cho th\u00FA c\u01B0ng \uD83D\uDC3E" }), _jsx("div", { className: styles.circleContainer, children: petProducts.map((item) => (_jsxs("div", { className: styles.circleItem, children: [_jsx("img", { src: item.image, alt: item.title, className: styles.circleImage }), _jsx("p", { children: item.title })] }, item.id))) })] }));
};
export default PetProductSection;
