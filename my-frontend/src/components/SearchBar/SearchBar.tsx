import { useState } from "react";
import styles from "./SearchBar.module.css";

const popularKeywords = ["Thức ăn cho mèo", "Đồ chơi cho mèo", "Tắm cho thú cưng"];

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  return (
    <div className={styles.searchWrapper}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Tìm theo tên sản phẩm..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />
        <button className={styles.searchButton}>
          <i className="fas fa-search"></i>
        </button>
      </div>

      {showSuggestions && (
        <div className={styles.suggestions}>
          <p className={styles.suggestionsTitle}>Từ khóa phổ biến</p>
          <div className={styles.keywordList}>
            {popularKeywords.map((keyword, index) => (
              <button
                key={index}
                className={styles.keywordButton}
                onClick={() => setQuery(keyword)}
              >
                {keyword}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
