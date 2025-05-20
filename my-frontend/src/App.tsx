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
import AdminLayout   from "@/layouts/AdminLayout";
import AdminLogin    from "@/pages/AdminLogin";
import ProductList   from "@/pages/AdminProducts/List";



function App() {
  return (
      <ErrorProvider>
        <ErrorBoundary>
          <LoadingSpinner />
          <ToastContainer autoClose={2000} position="top-right" />

          <Routes>
            
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/login" element={<LoginCustomer />} />
            <Route path="/register" element={<RegisterCustomer />} />
            <Route path="/employee/login" element={<LoginEmployee />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />

            <Route path="/profile" element={<ProfilePage/>}/>

            <Route path="/sanpham/:id" element={<ChiTietSanPham />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/payment/callback" element={<PaymentCallback />} />
            <Route path="/boloc" element={<BoLocSanPham />} />

            <Route path="/admin">
              <Route path="login" element={<AdminLogin />} />
              {/* các route dưới đây bọc trong AdminLayout để yêu cầu token + role */}
              <Route element={<AdminLayout />}>
                <Route index element={<Navigate to="products" replace />} />
                <Route path="products" element={<ProductList />} />
                {/* sau này có thể thêm Users, Orders ... */}
              </Route>
            </Route>
          </Routes>
        </ErrorBoundary>
      </ErrorProvider>
  );
}


export default App;
