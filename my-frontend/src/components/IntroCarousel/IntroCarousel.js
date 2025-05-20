import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import styles from "./IntroCarousel.module.css";
import ImgIntro from "../../assets/IntroImg.jpg";
// Mảng banner. Có thể thêm nhiều ảnh khác nếu muốn
const banners = [
    { id: 1, imageUrl: ImgIntro },
    { id: 2, imageUrl: ImgIntro },
];
const IntroCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHover, setIsHover] = useState(false);
    // Tự động chuyển slide sau 5 giây
    useEffect(() => {
        const timer = setTimeout(() => {
            handleNext();
        }, 5000);
        return () => clearTimeout(timer);
    }, [currentIndex]);
    // Mỗi lần currentIndex thay đổi thì set lại timer
    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % banners.length);
    };
    const handlePrev = () => {
        setCurrentIndex((prev) => prev === 0 ? banners.length - 1 : prev - 1);
    };
    return (_jsxs("div", { className: styles.carouselWrapper, onMouseEnter: () => setIsHover(true), onMouseLeave: () => setIsHover(false), children: [_jsx("div", { className: styles.slideContainer, style: { transform: `translateX(-${currentIndex * 100}%)` }, children: banners.map((banner) => (_jsx("div", { className: styles.slide, children: _jsx("img", { src: banner.imageUrl, alt: "Intro Banner", className: styles.carouselImg }) }, banner.id))) }), isHover && (_jsxs(_Fragment, { children: [_jsx("button", { className: `${styles.arrow} ${styles.leftArrow}`, onClick: handlePrev, children: "<" }), _jsx("button", { className: `${styles.arrow} ${styles.rightArrow}`, onClick: handleNext, children: ">" })] }))] }));
};
export default IntroCarousel;
