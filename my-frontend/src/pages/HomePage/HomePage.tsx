import FloatingIcons from "../../components/FloatingIcons/FloatingIcons";
import Header from "../../layouts/Header/Header";
import IntroCarousel from "../../components/IntroCarousel/IntroCarousel";
import SaleBanner from "../../components/SaleBanner/SaleBanner";

import CatFoodSection from "../../components/CatFoodSection/CatFoodSection";
import DogFoodSection from "../../components/DogFoodSection/DogFoodSection";
import PetProductSection from "../../components/PetProductSection/PetProductSection";

import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={styles.homeContainer}>
      <Header />
      <FloatingIcons />

      {/* Carousel toàn màn hình */}
      <IntroCarousel />

      {/* Banner "Mua nhiều giảm sâu" */}
      <SaleBanner />

      {/* Sản phẩm cho thú cưng */}
      <PetProductSection />

      {/* Thức ăn cho mèo */}
      <CatFoodSection />

      {/* Thức ăn cho chó */}
      <DogFoodSection />

    </div>
  );
};

export default HomePage;
