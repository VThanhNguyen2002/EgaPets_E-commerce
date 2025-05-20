import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import styles from "./SearchBar.module.css";
const popularKeywords = ["Thức ăn cho mèo", "Đồ chơi cho mèo", "Tắm cho thú cưng"];
const SearchBar = () => {
    const [query, setQuery] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    return (_jsxs("div", { className: styles.searchWrapper, children: [_jsxs("div", { className: styles.searchContainer, children: [_jsx("input", { type: "text", placeholder: "T\u00ECm theo t\u00EAn s\u1EA3n ph\u1EA9m...", value: query, onChange: (e) => setQuery(e.target.value), onFocus: () => setShowSuggestions(true), onBlur: () => setTimeout(() => setShowSuggestions(false), 200) }), _jsx("button", { className: styles.searchButton, children: _jsx("i", { className: "fas fa-search" }) })] }), showSuggestions && (_jsxs("div", { className: styles.suggestions, children: [_jsx("p", { className: styles.suggestionsTitle, children: "T\u1EEB kh\u00F3a ph\u1ED5 bi\u1EBFn" }), _jsx("div", { className: styles.keywordList, children: popularKeywords.map((keyword, index) => (_jsx("button", { className: styles.keywordButton, onClick: () => setQuery(keyword), children: keyword }, index))) })] }))] }));
};
export default SearchBar;
