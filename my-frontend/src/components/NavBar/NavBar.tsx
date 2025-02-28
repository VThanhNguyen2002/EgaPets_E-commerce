import { useState } from "react";
import styles from "./NavBar.module.css";
import SideCategory from "../SideCategory/SideCategory";
import { FaAngleDown, FaBars, FaStore, FaPhoneAlt } from "react-icons/fa";

const NavBar = () => {
  const [showSideCat, setShowSideCat] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Menu data
  const menuItems = [
    { name: "Danh mục sản phẩm", isCategory: true },
    { name: "Mèo", dropdown: ["Thức ăn mèo", "Phụ kiện - Đồ chơi"] },
    { name: "Today's Sale", dropdown: ["Flash Sale", "Combo Ưu Đãi"] },
    { name: "Dịch vụ chăm Pets" },
    { name: "Tạp chí chăm Boss" },
    { name: "Hệ thống cửa hàng", icon: <FaStore /> },
    { name: "Hotline: 099999998", icon: <FaPhoneAlt /> }
  ];

  const handleCatClick = () => setShowSideCat(true);
  const closeSideCat = () => setShowSideCat(false);

  return (
    <>
      <nav className={styles.navbar}>
        <ul className={styles.navList}>
          {menuItems.map((item, idx) => {
            // 1) Danh mục sản phẩm => sideCategory
            if (item.isCategory) {
              return (
                <li key={idx} className={styles.navItem}>
                  <button
                    className={`${styles.navLink} ${styles.catButton}`}
                    onClick={handleCatClick}
                  >
                    <FaBars className={styles.icon} />
                    {item.name}
                  </button>
                </li>
              );
            }

            // 2) Mèo / Today's Sale => dropdown
            if (item.dropdown) {
              return (
                <li
                  key={idx}
                  className={styles.navItem}
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <span className={styles.navLink}>
                    {item.name} <FaAngleDown />
                  </span>
                  {hoveredItem === item.name && (
                    <div className={styles.megaMenu}>
                      <div className={styles.megaMenuContent}>
                        {item.dropdown.map((sub, i) => (
                          <div key={i} className={styles.megaMenuColumn}>
                            <h4>{sub}</h4>
                            <ul>
                              <li>Item 1</li>
                              <li>Item 2</li>
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              );
            }

            // 3) Link thường + icon (nếu có)
            return (
              <li key={idx} className={styles.navItem}>
                <a href="#" className={styles.navLink}>
                  {item.icon && <span className={styles.linkIcon}>{item.icon}</span>}
                  {item.name}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Side overlay cho "Danh mục sản phẩm" */}
      {showSideCat && <SideCategory onClose={closeSideCat} />}
    </>
  );
};

export default NavBar;
