import { useState, useEffect } from "react";
import styles from "./FloatingIcons.module.css";
import { FaPhoneAlt, FaChevronUp } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import { BsMessenger } from "react-icons/bs";

const FloatingIcons = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Lắng nghe scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    // Clear event khi unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Gọi điện
  const handleCallClick = () => {
    const confirmCall = window.confirm("Bạn muốn mở ứng dụng gọi điện?");
    if (confirmCall) {
      window.location.href = "tel:19006750";
    }
  };

  // Zalo
  const handleZaloClick = () => {
    alert("Chat với chúng tôi qua Zalo");
    window.open("https://zalo.me/", "_blank");
  };

  // Messenger
  const handleMessengerClick = () => {
    alert("Chat với chúng tôi qua Messenger");
    window.open("https://m.me/", "_blank");
  };

  // Lên đầu trang
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.floatingIcons}>
      {/* Các nút chat */}
      <button
        className={`${styles.icon} ${styles.zalo}`}
        onClick={handleZaloClick}
        title="Chat với chúng tôi qua Zalo"
      >
        <SiZalo className={styles.iconSvg} />
      </button>

      <button
        className={`${styles.icon} ${styles.messenger}`}
        onClick={handleMessengerClick}
        title="Chat với chúng tôi qua Messenger"
      >
        <BsMessenger className={styles.iconSvg} />
      </button>

      <button
        className={`${styles.icon} ${styles.call}`}
        onClick={handleCallClick}
        title="Gọi ngay cho chúng tôi"
      >
        <FaPhoneAlt className={styles.iconSvg} />
      </button>

      {/* Chỉ render nút scroll nếu showScrollTop = true */}
      {showScrollTop && (
        <button
          className={`${styles.icon} ${styles.scrollUp}`}
          onClick={handleScrollTop}
          title="Lên đầu trang"
        >
          <FaChevronUp className={styles.iconSvg} />
        </button>
      )}
    </div>
  );
};

export default FloatingIcons;
