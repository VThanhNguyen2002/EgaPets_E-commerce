import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "@/services/auth";
import { useAuthStore } from "@/store/authStore";
import styles from "../LoginCustomer/LoginCustomer.module.css";

export default function AdminLogin() {
  const nav = useNavigate();
  const doLogin = useAuthStore(s=>s.login);

  const [form,setForm] = useState({ username:"", password:"" });
  const [err,setErr]   = useState("");

  const change=(e:React.ChangeEvent<HTMLInputElement>) =>
      setForm({...form,[e.target.name]:e.target.value});

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setErr("");
  
    try {
      const { data } = await login(form);         // BE trả { token, username, role }
      if (data.role !== "Admin") return setErr("Không phải tài khoản Admin!");
  
      doLogin(data.token, data.username, data.role);  // ➌ truyền đủ 3 đối số
      nav("/admin/products", { replace:true });       // ➍ đi thẳng vào dashboard
    } catch (err: any) {
      setErr(err.response?.data?.error || "Đăng nhập lỗi!");
    }
  }

  return (
    <div className={styles.pageContent}>
      <div className={styles.wrapper}>
        <h2>Đăng nhập Admin</h2>
        <form className={styles.form} onSubmit={submit}>
          <label>Tên đăng nhập *</label>
          <input name="username" onChange={change}/>
          <label>Mật khẩu *</label>
          <input name="password" type="password" onChange={change}/>
          {err && <div className={styles.error}>{err}</div>}
          <button className={styles.btn}>Đăng nhập</button>
        </form>
      </div>
    </div>
  );
}
