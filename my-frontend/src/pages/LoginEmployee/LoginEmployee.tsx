import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePageTitle } from '@/hooks/usePageTitle';
import { login } from '@/services/auth';
import Header from '@/layouts/Header/Header';
import Footer from '@/layouts/Footer/Footer';
import styles from './LoginEmployee.module.css';

const LoginEmployee = () => {
  usePageTitle('Đăng nhập nhân viên – EGA Pets');

  const navigate          = useNavigate();
  const [form, setForm]   = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.username || !form.password) {
      setError('Vui lòng nhập đủ thông tin!');
      return;
    }

    try {
      const { data } = await login(form);          // POST /auth/login
      if (data.role !== 'NhanVien')
        return setError('Bạn không phải nhân viên!');

      localStorage.setItem('token', data.token);
      navigate('/admin');                          // trang dashboard nhân viên
    } catch (err: any) {
      setError(err.response?.data?.error || 'Đăng nhập thất bại!');
    }
  };

  return (
    <>
      <Header />

      <div className={styles.wrapper}>
        <h2>Đăng nhập nhân viên</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>Mã / Email *</label>
          <input
            type="text"
            name="username"
            placeholder="Mã nhân viên hoặc email"
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

      <Footer />
    </>
  );
};

export default LoginEmployee;
