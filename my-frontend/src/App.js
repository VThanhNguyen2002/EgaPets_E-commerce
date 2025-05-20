import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import ErrorBoundary from "./layouts/ErrorBoundary";
import { LoadingSpinner } from "./components/LoadingSpinner";
import CartPage from "./pages/CartPage/CartPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import HomePage from "@pages/HomePage/HomePage";
import NotFoundPage from "@pages/NotFoundPage/NotFoundPage";
import ChiTietSanPham from "@pages/ChiTietSanPham/ChiTietSanPham";
import BoLocSanPham from "@pages/SanPham/BoLocSanPham/BoLocSanPham";
import LoginCustomer from "@pages/LoginCustomer/LoginCustomer";
import LoginEmployee from "@pages/LoginEmployee/LoginEmployee";
import ForgotPassword from "@pages/ForgotPassword/ForgotPassword";
import ResetPassword from "@pages/ResetPassword/ResetPassword";
import { ErrorProvider } from "./context/ErrorContext";
import RegisterCustomer from "@pages/RegisterCustomer/RegisterCustomer";
import PaymentCallback from "@pages/PaymentCallback";
import ProfilePage from "@pages/ProfilePage";
import AdminLayout from "@/layouts/AdminLayout";
import AdminLogin from "@/pages/AdminLogin";
import ProductList from "@/pages/AdminProducts/List";
function App() {
    return (_jsx(ErrorProvider, { children: _jsxs(ErrorBoundary, { children: [_jsx(LoadingSpinner, {}), _jsx(ToastContainer, { autoClose: 2000, position: "top-right" }), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "*", element: _jsx(NotFoundPage, {}) }), _jsx(Route, { path: "/login", element: _jsx(LoginCustomer, {}) }), _jsx(Route, { path: "/register", element: _jsx(RegisterCustomer, {}) }), _jsx(Route, { path: "/employee/login", element: _jsx(LoginEmployee, {}) }), _jsx(Route, { path: "/forgot-password", element: _jsx(ForgotPassword, {}) }), _jsx(Route, { path: "/reset-password/:token", element: _jsx(ResetPassword, {}) }), _jsx(Route, { path: "/profile", element: _jsx(ProfilePage, {}) }), _jsx(Route, { path: "/sanpham/:id", element: _jsx(ChiTietSanPham, {}) }), _jsx(Route, { path: "/cart", element: _jsx(CartPage, {}) }), _jsx(Route, { path: "/checkout", element: _jsx(CheckoutPage, {}) }), _jsx(Route, { path: "/payment/callback", element: _jsx(PaymentCallback, {}) }), _jsx(Route, { path: "/boloc", element: _jsx(BoLocSanPham, {}) }), _jsxs(Route, { path: "/admin", children: [_jsx(Route, { path: "login", element: _jsx(AdminLogin, {}) }), _jsxs(Route, { element: _jsx(AdminLayout, {}), children: [_jsx(Route, { index: true, element: _jsx(Navigate, { to: "products", replace: true }) }), _jsx(Route, { path: "products", element: _jsx(ProductList, {}) })] })] })] })] }) }));
}
export default App;
