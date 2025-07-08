import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./PetProductSection.module.css";
import sharedStyles from "../common/SharedStyles.module.css";
// Data giả cho các loại sản phẩm thú cưng
import ThucAnChoBoss from "../../assets/ThucAnChoBoss.jpg";
import DoDungTiaLong from "../../assets/DoDungTiaLong.jpg";
import NhaVeSinh from "../../assets/NhaVeSinh.jpg";
import PhuKien from "../../assets/PhuKien.jpg";
import DemGiuong from "../../assets/DemGiuong.jpg";
import DungCuChaiLong from "../../assets/DungCuChaiLong.jpg";

const categories = [
    {
        id: 1,
        name: "Thức ăn cho Boss",
        image: ThucAnChoBoss,
    },
    {
        id: 2,
        name: "Đồ dùng tỉa lông",
        image: DoDungTiaLong,
    },
    {
        id: 3,
        name: "Nhà vệ sinh",
        image: NhaVeSinh,
    },
    {
        id: 4,
        name: "Phụ kiện",
        image: PhuKien,
    },
    {
        id: 5,
        name: "Đệm giường",
        image: DemGiuong,
    },
    {
        id: 6,
        name: "Dụng cụ chải lông",
        image: DungCuChaiLong,
    },
];
const PetProductSection = () => {
    return (_jsxs("div", { className: styles.petProductSection, children: [_jsx("h2", { className: sharedStyles.sectionTitle, children: "S\u1EA3n ph\u1EA9m cho th\u00FA c\u01B0ng \uD83D\uDC3E" }), _jsx("div", { className: styles.circleContainer, children: categories.map((item) => (_jsxs("div", { className: styles.circleItem, children: [_jsx("img", { src: item.image, alt: item.name, className: styles.circleImage }), _jsx("p", { children: item.name })] }, item.id))) })] }));
};
export default PetProductSection;
