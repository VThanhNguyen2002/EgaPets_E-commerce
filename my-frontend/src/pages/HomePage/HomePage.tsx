import Header from "../../layouts/Header/Header";
import Footer from "../../layouts/Footer/Footer";

import FloatingIcons from "../../components/FloatingIcons/FloatingIcons";
import IntroCarousel from "../../components/IntroCarousel/IntroCarousel";
import SaleBanner from "../../components/SaleBanner/SaleBanner";
import SaleCountdownBanner from "../../components/SaleCountdownBanner/SaleCountdownBanner";
import CatFoodSection from "../../components/CatFoodSection/CatFoodSection";
import DogFoodSection from "../../components/DogFoodSection/DogFoodSection";
import PetProductSection from "../../components/PetProductSection/PetProductSection";
import ServiceSection from "../../components/ServiceSection/ServiceSection";
import NewProductsSection from "../../components/NewProductsSection/NewProductsSection";

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

      <SaleCountdownBanner />

      {/* Sản phẩm cho thú cưng */}
      <PetProductSection />

      {/* Thức ăn cho mèo */}
      <CatFoodSection />

      {/* Thức ăn cho chó */}
      <DogFoodSection />

      {/* Thêm mục Dịch Vụ */}
      <ServiceSection />

      {/* Section Sản phẩm mới */}
      <NewProductsSection />

      <Footer />
    </div>
  );
};

export default HomePage;
