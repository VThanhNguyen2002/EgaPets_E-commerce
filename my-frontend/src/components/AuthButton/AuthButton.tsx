import styles from "./AuthButton.module.css";
// Sử dụng react-icons hoặc bất kỳ icon user nào bạn thích
import { FaUser } from "react-icons/fa";

const AuthButton = () => {
  return (
    <button className={styles.authButton}>
      <FaUser className={styles.userIcon} />
      <div className={styles.authInfo}>
        <span className={styles.smallText}>Tài khoản</span>
        <span className={styles.bigText}>Đăng nhập</span>
      </div>
    </button>
  );
};

export default AuthButton;
