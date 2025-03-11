import React from "react";
import styles from "./ServiceSection.module.css";
import sharedStyles from "../common/SharedStyles.module.css";

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
}

const mockServices: Service[] = [
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

const ServiceSection: React.FC = () => {
  return (
    <div className={styles.serviceSection}>
      <h2 className={sharedStyles.sectionTitle}>Dịch Vụ Spa & Grooming</h2>

      <div className={styles.serviceGrid}>
        {mockServices.map((service) => (
          <div key={service.id} className={styles.serviceCard}>
            <div className={styles.cardBody}>
              <h3 className={styles.serviceName}>{service.name}</h3>
              <p className={styles.serviceDescription}>{service.description}</p>
              <div className={styles.servicePrice}>
                Giá: <span>{service.price.toLocaleString()}đ</span>
              </div>
              {/* Nút đặt dịch vụ hoặc xem chi tiết, tuỳ bạn */}
              <button className={styles.orderButton}>
                Đặt dịch vụ
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceSection;
