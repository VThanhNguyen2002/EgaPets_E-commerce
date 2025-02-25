import { useState } from "react";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Tìm theo tên sản phẩm..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className={styles.searchButton}>
        <i className="fas fa-search"></i> {/* FontAwesome Icon */}
      </button>
    </div>
  );
};

export default SearchBar;
