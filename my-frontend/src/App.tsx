import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./layouts/ErrorBoundary";
import { LoadingSpinner } from "./components/LoadingSpinner";

import HomePage from "./pages/HomePage/HomePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import LoginPage from "./pages/LoginPage/LoginPage";

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
          </Routes>
        </ErrorBoundary>
      </ErrorProvider>
    </Router>
  );
}

export default App;
