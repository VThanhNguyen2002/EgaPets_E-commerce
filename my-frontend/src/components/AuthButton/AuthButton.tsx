import { useNavigate } from "react-router-dom";
import styles from "./AuthButton.module.css";
import { FaUser } from "react-icons/fa";

const AuthButton = () => {
  const navigate = useNavigate();

  return (
    <button className={styles.authButton} onClick={() => navigate("/login")}>
      <FaUser className={styles.userIcon} />
      <div className={styles.authInfo}>
        <span className={styles.smallText}>Tài khoản</span>
        <span className={styles.bigText}>Đăng nhập</span>
      </div>
    </button>
  );
};

export default AuthButton;
