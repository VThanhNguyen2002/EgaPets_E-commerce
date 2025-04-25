import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header        from '@layouts/Header/Header';
import Footer        from '@layouts/Footer/Footer';
import Breadcrumbs   from '@components/Breadcrumbs/Breadcrumbs';
import FacePoseCapture, { Pose } from '@components/FacePoseCapture';
import { verifyFaceMulti } from '@services/auth';
import { setCookie } from '@utils/cookie';
import { dataURLtoBase64 } from '@utils/image';
import { toast } from 'react-toastify';
import { usePageTitle } from '@hooks/usePageTitle';
import styles from './LoginEmployee.module.css';

const LoginEmployee = () => {
  usePageTitle('Đăng nhập nhân viên – EGA Pets');
  const nav = useNavigate();

  const [username, setUsername] = useState('');
  const [captures, setCap]      = useState<{pose: Pose; base64:string}[]>([]);
  const [error, setError]       = useState('');

  const handleFinishCapture = (caps: typeof captures) => {
    setCap(caps);
    toast.success('Đã chụp đủ 3 pose');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || captures.length < 3)
      return setError('Điền mã nhân viên và chụp đủ 3 pose!');

    try {
      const payload = {
        userId: Number(username),
        images: captures.map(c => ({
          pose: c.pose,
          base64: dataURLtoBase64(c.base64)
        }))
      };
      const { data } = await verifyFaceMulti(payload);
      setCookie('token', data.token);
      setCookie('username', data.username);
      toast.success('Đăng nhập thành công!');
      setTimeout(() => nav('/'), 1200);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Xác thực thất bại!');
    }
  };

  return (
    <>
      <Header />
      <div className={styles.pageContent}>
        <Breadcrumbs />

        <div className={styles.wrapper}>
          <h2>Đăng nhập nhân viên</h2>

          <form className={styles.form} onSubmit={handleSubmit}>
            <label>Mã / Email *</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Mã nhân viên hoặc email"
            />

            <label>Chụp khuôn mặt *</label>
            <FacePoseCapture onComplete={handleFinishCapture} />

            {error && <div className={styles.error}>{error}</div>}

            <button
              className={styles.btn}
              disabled={captures.length < 3}
            >
              Đăng nhập
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginEmployee;
