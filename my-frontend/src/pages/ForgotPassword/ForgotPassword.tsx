import { useState } from 'react';
import { forgotPassword } from '@services/auth';
import { usePageTitle } from '@hooks/usePageTitle';
import Header from '@/layouts/Header/Header';
import Footer from '@/layouts/Footer/Footer';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';

import styles from './ForgotPassword.module.css';

const ForgotPassword = () => {
  usePageTitle('Quên mật khẩu – EGA Pets');

  const [email, setEmail] = useState('');
  const [msg, setMsg]     = useState('');
  const [err, setErr]     = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(''); setMsg('');
    if (!email) return setErr('Nhập email trước khi gửi!');
    try {
      const { data } = await forgotPassword(email);
      setMsg(data.message);
    } catch (e:any) {
      setErr(e.response?.data?.error || 'Không gửi được email');
    }
  };

  return (
    <>
      <Header />
      <div className={styles.pageContent}>
        <Breadcrumbs />
      <div className={styles.wrapper}>
        <h2>Khôi phục mật khẩu</h2>
        <form onSubmit={submit} className={styles.form}>
          <input
            type="email"
            placeholder="Email..."
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button className={styles.btn}>Gửi liên kết</button>
        </form>
        {msg && <div className={styles.msg}>{msg}</div>}
        {err && <div className={styles.err}>{err}</div>}
      </div>
    </div>
      
      <Footer />
    </>
  );
};

export default ForgotPassword;
