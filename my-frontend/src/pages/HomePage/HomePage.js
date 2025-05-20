import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsxs("div", { className: styles.homeContainer, children: [_jsx(Header, {}), _jsx(FloatingIcons, {}), _jsx(IntroCarousel, {}), _jsx(SaleBanner, {}), _jsx(SaleCountdownBanner, {}), _jsx(PetProductSection, {}), _jsx(CatFoodSection, {}), _jsx(DogFoodSection, {}), _jsx(ServiceSection, {}), _jsx(NewProductsSection, {}), _jsx(Footer, {})] }));
};
export default HomePage;
