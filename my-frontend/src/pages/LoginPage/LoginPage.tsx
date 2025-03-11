import React, { useState, useEffect } from "react";
import Header from "../../layouts/Header/Header";
import Footer from "../../layouts/Footer/Footer";
import styles from "./LoginPage.module.css";
// (Nếu bạn dùng react-helmet thì import { Helmet } from "react-helmet";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Đổi title sang "Tài khoản - EGA Pets"
  useEffect(() => {
    document.title = "Tài khoản - EGA Pets";
    // Nếu dùng react-helmet, thay bằng:
    // <Helmet><title>Tài khoản - EGA Pets</title></Helmet>
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Reset error
    setErrorMsg("");

    // Validation đơn giản
    if (!email || !password) {
      setErrorMsg("Vui lòng nhập đầy đủ email và mật khẩu!");
      return;
    }

    // Giả lập login
    // Thông thường bạn sẽ gọi API /login để kiểm tra
    if (email === "test@example.com" && password === "123456") {
      alert("Đăng nhập thành công!");
      // Điều hướng sang trang chủ hoặc dashboard
      // navigate("/");
    } else {
      setErrorMsg("Email hoặc mật khẩu không đúng!");
    }
  };

  return (
    <div className={styles.loginPage}>
      {/* Header */}
      <Header />

      {/* Nội dung form đăng nhập */}
      <div className={styles.loginContainer}>
        <h2>Đăng nhập tài khoản</h2>
        <p>Bạn chưa có tài khoản? <a href="/register">Đăng ký tại đây</a></p>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="email">Email *</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Mật khẩu *</label>
          <input
            id="password"
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {errorMsg && <div className={styles.errorMsg}>{errorMsg}</div>}

          <div className={styles.formActions}>
            <button type="submit" className={styles.loginButton}>Đăng nhập</button>
          </div>
        </form>

        <div className={styles.forgotPassword}>
          Quên mật khẩu? <a href="/forgot-password">Nhấn vào đây</a>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LoginPage;
