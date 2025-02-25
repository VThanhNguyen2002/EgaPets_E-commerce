import { useState, useEffect, useRef } from "react";
import styles from "./LanguageSwitcher.module.css";

// Giả sử bạn có sẵn cờ trong thư mục assets/flags:
import vietnamFlag from "../../assets/vietnam.jpg";
import usaFlag from "../../assets/usa.jpg";

const LanguageSwitcher = () => {
  const [language, setLanguage] = useState("vi");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Tham chiếu đến div chứa menu

  // Chọn cờ hiển thị
  const flagSrc = language === "vi" ? vietnamFlag : usaFlag;

  // Đóng menu khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.languageSwitcher} ref={dropdownRef}>
      {/* Nút chọn ngôn ngữ */}
      <button className={styles.langButton} onClick={() => setIsOpen(!isOpen)}>
        <img src={flagSrc} alt="flag" className={styles.flagIcon} />
      </button>

      {/* Menu chọn ngôn ngữ */}
      {isOpen && (
        <ul className={styles.dropdown}>
          <li onClick={() => { setLanguage("vi"); setIsOpen(false); }}>🇻🇳 Tiếng Việt</li>
          <li onClick={() => { setLanguage("en"); setIsOpen(false); }}>🇺🇸 Tiếng Anh</li>
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;
