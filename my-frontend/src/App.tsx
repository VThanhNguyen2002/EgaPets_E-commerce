import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./layouts/ErrorBoundary";
import { LoadingSpinner } from "./components/LoadingSpinner";

import HomePage from "./pages/HomePage/HomePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ChiTietSanPham from "./pages/ChiTietSanPham/ChiTietSanPham";
import BoLocSanPham from "./pages/SanPham/BoLocSanPham/BoLocSanPham";

import { ErrorProvider } from "./context/ErrorContext";

function App() {
  return (
    <Router>
      <ErrorProvider>
        <ErrorBoundary>
          <LoadingSpinner />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sanpham/:id" element={<ChiTietSanPham />} />
            <Route path="/boloc" element={<BoLocSanPham />} />
          </Routes>
        </ErrorBoundary>
      </ErrorProvider>
    </Router>
  );
}

export default App;
