import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./ServiceSection.module.css";
import sharedStyles from "../common/SharedStyles.module.css";
const mockServices = [
    {
        id: 1,
        name: "Tắm rửa cho chó",
        description: "Dịch vụ tắm sạch sẽ, khử mùi và dưỡng lông cho chó.",
        price: 100000,
    },
    {
        id: 2,
        name: "Tắm rửa cho mèo",
        description: "Dịch vụ tắm dành riêng cho mèo, sử dụng dầu tắm chuyên dụng.",
        price: 120000,
    },
    {
        id: 3,
        name: "Cắt tỉa lông chó",
        description: "Tạo kiểu, cắt lông theo yêu cầu cho thú cưng.",
        price: 150000,
    },
    {
        id: 4,
        name: "Cắt tỉa lông mèo",
        description: "Tạo kiểu, cắt lông theo yêu cầu dành riêng cho mèo.",
        price: 130000,
    },
    {
        id: 5,
        name: "Vệ sinh tai",
        description: "Vệ sinh sạch sẽ tai thú cưng, ngăn ngừa nhiễm trùng.",
        price: 50000,
    },
    {
        id: 6,
        name: "Cắt móng",
        description: "Cắt móng an toàn, tránh thú cưng bị thương do móng dài.",
        price: 40000,
    },
    {
        id: 7,
        name: "Trọn gói spa chó",
        description: "Tắm rửa, cắt tỉa lông, vệ sinh tai và cắt móng.",
        price: 250000,
    },
    {
        id: 8,
        name: "Trọn gói spa mèo",
        description: "Tắm rửa, cắt tỉa lông, vệ sinh tai và cắt móng.",
        price: 230000,
    },
];
const ServiceSection = () => {
    return (_jsxs("div", { className: styles.serviceSection, children: [_jsx("h2", { className: sharedStyles.sectionTitle, children: "D\u1ECBch V\u1EE5 Spa & Grooming" }), _jsx("div", { className: styles.serviceGrid, children: mockServices.map((service) => (_jsx("div", { className: styles.serviceCard, children: _jsxs("div", { className: styles.cardBody, children: [_jsx("h3", { className: styles.serviceName, children: service.name }), _jsx("p", { className: styles.serviceDescription, children: service.description }), _jsxs("div", { className: styles.servicePrice, children: ["Gi\u00E1: ", _jsxs("span", { children: [service.price.toLocaleString(), "\u0111"] })] }), _jsx("button", { className: styles.orderButton, children: "\u0110\u1EB7t d\u1ECBch v\u1EE5" })] }) }, service.id))) })] }));
};
export default ServiceSection;
