// src/layouts/Header/Header.tsx
import { useState } from "react";
import styles from "./Header.module.css";

import LanguageSwitcher from "../../components/LanguageSwitcher/LanguageSwitcher";
import CartIcon from "../../components/CartIcon/CartIcon";
import SearchBar from "../../components/SearchBar/SearchBar";
import AuthButton from "../../components/AuthButton/AuthButton";
import logo from "../../assets/Logo.jpg";
import NavBar from "../../components/NavBar/NavBar";
import CartSidebar from "../../components/CartSidebar/CartSidebar";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <header>
        <div className={styles.headerTop}>
          <div
            className={styles.logoWrapper}
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            <img src={logo} alt="EGA PETS" className={styles.logoImg} />
          </div>

          <div className={styles.searchArea}>
            <SearchBar />
          </div>

          <div className={styles.actions}>
            <LanguageSwitcher />
            <AuthButton />
            <CartIcon onClick={() => setShowCart(true)} />
          </div>
        </div>

        <NavBar />
      </header>

      {showCart && <CartSidebar isOpen={showCart} onClose={() => setShowCart(false)} />}
    </>
  );
};

export default Header;
