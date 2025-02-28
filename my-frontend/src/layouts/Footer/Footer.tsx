import React from "react";
import styles from "./Footer.module.css";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { 
  FaFacebookF, 
  FaYoutube, 
  FaTiktok, 
  FaInstagram 
} from "react-icons/fa";
import { SiZalo } from "react-icons/si";

// Logo: 
import logoEgaPets from "/src/assets/Logo.jpg"; 
// (đường dẫn tuỳ dự án của bạn)
import logoMomo from "/src/assets/momo.jpg"; 
// ...và các logo thanh toán khác (Visa, MasterCard...), 
// tuỳ bạn import nếu có

const Footer: React.FC = () => {
  const handleSubscribe = () => {
    // Kiểm tra localhost
    if (window.location.hostname === "localhost") {
      alert("Cảm ơn bạn đã đăng ký (localhost)!");
    } else {
      alert("Cảm ơn bạn đã đăng ký!");
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.topRow}>
        <div className={styles.logoAndAddress}>
          <img 
            src={logoEgaPets} 
            alt="EGA Pets" 
            className={styles.logo}
          />
          <p>
            <FaMapMarkerAlt className={styles.icon} />
            Địa chỉ: <span className={styles.highlight}>180 Nguyễn Văn Quá, Quận 12, TP.HCM</span>
          </p>
          <p>
            <FaPhoneAlt className={styles.icon} />
            Hotline: <span className={styles.highlight}>0999999999</span>
          </p>
          <p>
            <HiMail className={styles.icon} />
            Email: <span className={styles.highlight}>support@egany.com</span>
          </p>
          <div className={styles.socialIcons}>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer">
              <FaYoutube />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer">
              <FaTiktok />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
            <a href="https://zalo.me" target="_blank" rel="noreferrer">
              <SiZalo />
            </a>
          </div>
        </div>
        <div className={styles.footerLinks}>
          <h4>Hỗ trợ khách hàng</h4>
          <ul>
            <li>Câu hỏi thường gặp</li>
            <li>Hệ thống cửa hàng</li>
            <li>Tìm kiếm</li>
            <li>Giới thiệu</li>
            <li>Liên hệ</li>
          </ul>
        </div>
        <div className={styles.footerLinks}>
          <h4>Chính sách</h4>
          <ul>
            <li>Chính sách đổi trả</li>
            <li>Chính sách bảo mật</li>
            <li>Điều khoản dịch vụ</li>
          </ul>
          <h4>Tổng đài hỗ trợ</h4>
          <ul>
            <li>Gọi mua hàng: 0999999999 (8h-20h)</li>
            <li>Gọi bảo hành: 19009999 (8h-20h)</li>
          </ul>
        </div>
        <div className={styles.newsletter}>
          <h4>Đăng ký nhận ưu đãi</h4>
          <p>
            Bạn muốn nhận khuyến mãi đặc biệt? Đăng kí tham gia ngay cùng hơn
            68.000+ người theo dõi của chúng tôi để cập nhật khuyến mãi...
          </p>
          <div className={styles.subscribeBox}>
            <input
              type="email"
              placeholder="Email của bạn..."
              aria-label="Nhập email"
            />
            <button onClick={handleSubscribe}>Đăng ký</button>
          </div>
          <div className={styles.paymentMethods}>
            <img src={logoMomo} alt="Momo" />
          </div>
        </div>
      </div>

      <div className={styles.bottomRow}>
        <p>
          © Bản quyền thuộc về EGANY | Cung cấp bởi Haravan
        </p>
      </div>
    </footer>
  );
};

export default Footer;
