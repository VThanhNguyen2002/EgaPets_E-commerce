import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/layouts/Header/Header';
import Footer from '@/layouts/Footer/Footer';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import { registerCustomer } from '@/services/auth';
import { usePageTitle } from '@/hooks/usePageTitle';

import styles from './RegisterCustomer.module.css';

const RegisterCustomer = () => {
  usePageTitle('Đăng ký tài khoản – EGA Pets');
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '', email: '' });
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMsg('');
    const { username, password, email } = form;
    if (!username || !password || !email) {
      setError('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    try {
      const { data } = await registerCustomer(form);
      setMsg(data.message);
      setTimeout(() => navigate('/login'), 1800);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Đăng ký thất bại!');
    }
  };

  return (
    <>
      <Header />
      <div className={styles.pageContent}>
        <Breadcrumbs />
        <div className={styles.wrapper}>
          <h2>Đăng ký tài khoản</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label>Tên đăng nhập *</label>
            <input
              type="text"
              name="username"
              placeholder="Tên đăng nhập"
              onChange={handleChange}
            />
            <label>Email *</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />
            <label>Mật khẩu *</label>
            <input
              type="password"
              name="password"
              placeholder="Mật khẩu"
              onChange={handleChange}
            />
            {msg && <div className={styles.msg}>{msg}</div>}
            {error && <div className={styles.error}>{error}</div>}
            <button className={styles.btn}>Đăng ký</button>
          </form>
          <div className={styles.forgot}>
            Đã có tài khoản? <a href="/login">Đăng nhập</a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RegisterCustomer;
