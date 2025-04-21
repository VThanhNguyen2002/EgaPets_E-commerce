import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AuthButton.module.css";
import { FaUser } from "react-icons/fa";
import { useUser } from "@/hooks/useUser";
import { removeCookie } from "@/utils/cookie";

const AuthButton = () => {
  const navigate = useNavigate();
  const { username } = useUser();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    removeCookie("token");
    removeCookie("username");
    setShowMenu(false);
    navigate("/login");
  };

  return (
    <div className={styles.authWrapper}>
      <button
        className={styles.authButton}
        onClick={() => {
          if (!username) navigate("/login");
          else setShowMenu((prev) => !prev);
        }}
      >
        <FaUser className={styles.userIcon} />
        <div className={styles.authInfo}>
          <span className={styles.smallText}>{username ? "Xin chào" : "Tài khoản"}</span>
          <span className={styles.bigText}>{username || "Đăng nhập"}</span>
        </div>
      </button>

      {username && showMenu && (
        <div className={styles.dropdown}>
          <button onClick={() => navigate("/profile")}>Thông tin tài khoản</button>
          <button onClick={handleLogout}>Đăng xuất</button>
        </div>
      )}
    </div>
  );
};

export default AuthButton;
