import styles from "./Header.module.css";
import LanguageSwitcher from "../../components/LanguageSwitcher/LanguageSwitcher";
import CartIcon from "../../components/CartIcon/CartIcon";
import SearchBar from "../../components/SearchBar/SearchBar";
import AuthButton from "../../components/AuthButton/AuthButton";
import logo from "../../assets/Logo.jpg";
import NavBar from "../../components/NavBar/NavBar";

const Header = () => {
  return (
    <header>
      {/* Thanh trên cùng (đen) */}
      <div className={styles.headerTop}>
        <div className={styles.logoWrapper}>
          <img src={logo} alt="EGA PETS" className={styles.logoImg} />
        </div>

        <div className={styles.searchArea}>
          <SearchBar />
        </div>

        <div className={styles.actions}>
          <LanguageSwitcher />
          <AuthButton />
          <CartIcon />
        </div>
      </div>

      {/* NavBar bên dưới (đỏ) */}
      <NavBar />
    </header>
  );
};

export default Header;
