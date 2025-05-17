import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { resetPassword } from '@/services/auth';
import { usePageTitle } from '@/hooks/usePageTitle';
import Header from '@/layouts/Header/Header';
import Footer from '@/layouts/Footer/Footer';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';

import styles from './ResetPassword.module.css';

const ResetPassword = () => {
  usePageTitle('Đặt lại mật khẩu – EGA Pets');
  const { token } = useParams();
  const nav       = useNavigate();

  const [pw,  setPw]  = useState('');
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(''); setMsg('');
    if (!pw.trim()) return setErr('Nhập mật khẩu mới!');
    try {
      const { data } = await resetPassword(token!, pw);
      setMsg(data.message);
      setTimeout(() => nav('/login'), 1800);
    } catch (e:any) {
      setErr(e.response?.data?.error || 'Đổi mật khẩu thất bại');
    }
  };

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <h2>Đặt lại mật khẩu</h2>
        <form onSubmit={submit} className={styles.form}>
          <input
            type="password"
            placeholder="Mật khẩu mới"
            value={pw}
            onChange={e => setPw(e.target.value)}
          />
          <button className={styles.btn}>Đổi mật khẩu</button>
        </form>
        {msg && <div className={styles.msg}>{msg}</div>}
        {err && <div className={styles.err}>{err}</div>}
      </div>
      <Footer />
    </>
  );
};

export default ResetPassword;
