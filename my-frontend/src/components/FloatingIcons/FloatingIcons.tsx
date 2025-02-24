import styles from "./FloatingIcons.module.css";
import { FaPhoneAlt } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import { BsMessenger } from "react-icons/bs";

const FloatingIcons = () => {
  const handleCallClick = () => {
    const confirmCall = window.confirm("http://localhost:5173/ muốn mở ứng dụng gọi điện?");
    if (confirmCall) {
      window.location.href = "tel:19006750";
    }
  };

  const handleZaloClick = () => {
    alert("Chat với chúng tôi qua Zalo");
    window.open("https://zalo.me/", "_blank");
  };

  const handleMessengerClick = () => {
    alert("Chat với chúng tôi qua Messenger");
    window.open("https://m.me/", "_blank");
  };

  return (
    <div className={styles.floatingIcons}>
      <button className={`${styles.icon} ${styles.call}`} onClick={handleCallClick} title="Gọi ngay cho chúng tôi">
        <FaPhoneAlt className={styles.iconSvg} />
      </button>
      <button className={`${styles.icon} ${styles.zalo}`} onClick={handleZaloClick} title="Chat với chúng tôi qua Zalo">
        <SiZalo className={styles.iconSvg} />
      </button>
      <button className={`${styles.icon} ${styles.messenger}`} onClick={handleMessengerClick} title="Chat với chúng tôi qua Messenger">
        <BsMessenger className={styles.iconSvg} />
      </button>
    </div>
  );
};

console.log(FaPhoneAlt, SiZalo, BsMessenger);

export default FloatingIcons;
