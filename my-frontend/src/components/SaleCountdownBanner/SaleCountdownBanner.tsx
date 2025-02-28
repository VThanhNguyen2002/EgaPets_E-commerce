import React, { useEffect, useState } from "react";
import styles from "./SaleCountdownBanner.module.css";

const SaleCountdownBanner: React.FC = () => {
  // 24h = 24 * 60 * 60 = 86400 giây
  // Chúng ta lưu countdown dưới dạng giây
  const [timeLeft, setTimeLeft] = useState(86400);

  // Mỗi giây giảm timeLeft, khi chạm 0 -> reset về 86400
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) return 86400; // reset
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Tách ra giờ/phút/giây
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <div className={styles.saleBanner}>
      <h2 className={styles.bannerTitle}>Chớp thời cơ. Giá như mơ!</h2>
      <div className={styles.countdownWrapper}>
        <span className={styles.remind}>Nhanh lên nào!</span>
        <span className={styles.text}>Sự kiện sẽ kết thúc sau</span>
        <div className={styles.countdownBox}>
          <div className={styles.countdownItem}>
            {hours < 10 ? `0${hours}` : hours}
            <span>Giờ</span>
          </div>
          <div className={styles.countdownItem}>
            {minutes < 10 ? `0${minutes}` : minutes}
            <span>Phút</span>
          </div>
          <div className={styles.countdownItem}>
            {seconds < 10 ? `0${seconds}` : seconds}
            <span>Giây</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleCountdownBanner;
