import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@layouts/Header/Header';
import Footer from '@layouts/Footer/Footer';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import { login } from '@services/auth';
import { usePageTitle } from '@hooks/usePageTitle';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setCookie } from '@utils/cookie';

import styles from './LoginCustomer.module.css';

const LoginCustomer = () => {
  usePageTitle('Tài khoản - EGA Pets');

  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.username || !form.password) {
      setError('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu!');
      return;
    }

    try {
      const { data } = await login(form);
      if (data.role !== 'KhachHang')
        return setError('Tài khoản này không phải khách hàng!');
    
      setCookie('token', data.token);
      setCookie('username', data.username);
      toast.success('Đăng nhập thành công!');
      setTimeout(() => navigate('/'), 1500);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Đăng nhập thất bại!');
    }    
  };

  return (
    <>
      <Header />
      <div className={styles.pageContent}>
        <Breadcrumbs />

        <div className={styles.wrapper}>
          <h2>Đăng nhập tài khoản</h2>
          <p>
            Bạn chưa có tài khoản? <a href="/register">Đăng ký tại đây</a>
          </p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <label>Tên đăng nhập *</label>
            <input
              type="text"
              name="username"
              placeholder="Tên đăng nhập"
              onChange={handleChange}
            />

            <label>Mật khẩu *</label>
            <input
              type="password"
              name="password"
              placeholder="Mật khẩu"
              onChange={handleChange}
            />

            {error && <div className={styles.error}>{error}</div>}

            <button className={styles.btn}>Đăng nhập</button>
          </form>

          <div className={styles.forgot}>
            Quên mật khẩu? <a href="/forgot-password">Nhấn vào đây</a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginCustomer;
