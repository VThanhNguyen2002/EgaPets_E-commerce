import { useState, useEffect }      from "react";
import { useNavigate }   from "react-router-dom";
import Header            from "@/layouts/Header/Header";
import Footer            from "@/layouts/Footer/Footer";
import Breadcrumbs       from "@/components/Breadcrumbs/Breadcrumbs";
import { login }         from "@/services/auth";
import { useAuthStore }  from "@/store/authStore";
import { toast }         from "react-toastify";
import { usePageTitle }  from "@/hooks/usePageTitle";
import styles            from "./LoginCustomer.module.css";

export default function LoginCustomer() {
  usePageTitle("Tài khoản – EGA Pets");

  const nav         = useNavigate();
  const doLogin     = useAuthStore(s => s.login);
  const isLoggedIn = useAuthStore(s => s.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn)  nav("/");     // đã login → đá khỏi /login
  }, [isLoggedIn]);


  const [form,setForm]  = useState({ username:"", password:"" });
  const [error,setErr]  = useState("");

  const change = (e:React.ChangeEvent<HTMLInputElement>) =>
      setForm({ ...form,[e.target.name]:e.target.value });

  

  async function submit(e:React.FormEvent){
    e.preventDefault();  setErr("");
    if(!form.username||!form.password)
      return setErr("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu!");

    try{
      const { data } = await login(form);
      if(data.role!=="KhachHang")
        return setErr("Tài khoản này không phải khách hàng!");

      doLogin(data.token, data.username);
      toast.success("Đăng nhập thành công!");
      setTimeout(()=>nav("/"),1200);
    }catch(err:any){
      setErr(err.response?.data?.error || "Đăng nhập thất bại!");
    }
  }

  return (
    <>
      <Header/>
      <div className={styles.pageContent}>
        <Breadcrumbs/>

        <div className={styles.wrapper}>
          <h2>Đăng nhập tài khoản</h2>
          <p>Chưa có tài khoản? <a href="/register">Đăng ký tại đây</a></p>

          <form className={styles.form} onSubmit={submit}>
            <label>Tên đăng nhập *</label>
            <input name="username" onChange={change} />

            <label>Mật khẩu *</label>
            <input name="password" type="password" onChange={change} />

            {error && <div className={styles.error}>{error}</div>}
            <button className={styles.btn}>Đăng nhập</button>
          </form>

          <div className={styles.forgot}>
            Quên mật khẩu? <a href="/forgot-password">Nhấn vào đây</a>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}
