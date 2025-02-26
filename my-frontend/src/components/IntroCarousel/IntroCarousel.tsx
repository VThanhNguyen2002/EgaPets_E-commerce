import { useState } from "react";
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

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? banners.length - 1 : prev - 1
    );
  };

  return (
    <div
      className={styles.carouselWrapper}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div
        className={styles.slideContainer}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {banners.map((banner) => (
          <div className={styles.slide} key={banner.id}>
            <img
              src={banner.imageUrl}
              alt="Intro Banner"
              className={styles.carouselImg}
            />
          </div>
        ))}
      </div>

      {/* Nút trái/phải chỉ hiển thị khi hover */}
      {isHover && (
        <>
          <button
            className={`${styles.arrow} ${styles.leftArrow}`}
            onClick={handlePrev}
          >
            &lt;
          </button>
          <button
            className={`${styles.arrow} ${styles.rightArrow}`}
            onClick={handleNext}
          >
            &gt;
          </button>
        </>
      )}
    </div>
  );
};

export default IntroCarousel;
