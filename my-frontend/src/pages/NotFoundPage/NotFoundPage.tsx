import React from "react";
import styles from "./NotFoundPage.module.css";

const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.cloakWrapper}>
        <div className={styles.cloakContainer}>
          <div className={styles.cloak}></div>
        </div>
      </div>

      <div className={styles.info}>
        <h1>404</h1>
        <h2>Chúng tôi không tìm thấy trang này</h2>
        <p>
          Chúng tôi khá chắc rằng trang này đã từng tồn tại, 
          nhưng có vẻ đã “biến mất” mất rồi. Thành thật xin lỗi bạn về sự bất tiện này.
        </p>
        <a href="/" rel="noreferrer noopener">
          Trang chủ
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
