import styles from "./Header.module.css";
import LanguageSwitcher from "../../components/LanguageSwitcher/LanguageSwitcher";
import CartIcon from "../../components/CartIcon/CartIcon";
import SearchBar from "../../components/SearchBar/SearchBar";
import AuthButton from "../../components/AuthButton/AuthButton";
import logo from "../../assets/Logo.jpg";

const Header = () => {
  return (
    <header className={styles.header}>
      {/* Logo */}
      <div className={styles.logoWrapper}>
        <img src={logo} alt="EGA PETS" className={styles.logoImg} />
      </div>

      {/* SearchBar */}
      <div className={styles.searchArea}>
        <SearchBar />
      </div>

      {/* Language, Cart, AuthButton */}
      <div className={styles.actions}>
        <LanguageSwitcher />
        <AuthButton />
        <CartIcon />
      </div>
    </header>
  );
};

export default Header;
