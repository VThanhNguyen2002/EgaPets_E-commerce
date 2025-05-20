// src/pages/ProfilePage/index.tsx
import { useState, useEffect } from "react";
import useProfile from "@/hooks/useProfile";
import styles from "./ProfilePage.module.css";

export default function ProfilePage(){
  const { data, isLoading, save } = useProfile();
  const [form,setForm] = useState<any>({});

  /* fill once */
  useEffect(()=>{ if(data) setForm(data); },[data]);

  if(isLoading) return <p>Đang tải…</p>;

  return (
    <div className={styles.wrap}>
      <h1>Thông tin tài khoản</h1>

      <form onSubmit={e=>{e.preventDefault(); save.mutate(form);}}>
        <label>Họ tên
          <input value={form.ho_ten||""}
                 onChange={e=>setForm({...form,ho_ten:e.target.value})}/>
        </label>
        <label>Số điện thoại
          <input value={form.so_dien_thoai||""}
                 onChange={e=>setForm({...form,so_dien_thoai:e.target.value})}/>
        </label>
        <label>Địa chỉ
          <input value={form.dia_chi||""}
                 onChange={e=>setForm({...form,dia_chi:e.target.value})}/>
        </label>
        {/* thêm tỉnh/huyện/xã nếu cần */}
        <button>Lưu thay đổi</button>
      </form>
    </div>
  );
}
