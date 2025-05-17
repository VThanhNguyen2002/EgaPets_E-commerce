import { useState }      from "react";
import { useNavigate }   from "react-router-dom";
import { FaUser }        from "react-icons/fa";
import { useAuthStore }  from "@/store/authStore";
import styles            from "./AuthButton.module.css";
import { toast } from "react-toastify";

export default function AuthButton(){
  const nav              = useNavigate();
  const { username,isLoggedIn, logout } = useAuthStore();
  const [open,setOpen]   = useState(false);

  const onMainClick = () =>{
    if(!isLoggedIn) nav("/login");
    else            setOpen(p=>!p);
  };

  return(
    <div className={styles.wrap}>
      <button className={styles.main} onClick={onMainClick}>
        <FaUser className={styles.ic}/>
        <span className={styles.top}>{isLoggedIn?"Xin chào":"Tài khoản"}</span>
        <span className={styles.bot}>{username||"Đăng nhập"}</span>
      </button>

      {isLoggedIn && open && (
        <div className={styles.dropdown}>
          <button onClick={()=>nav("/profile")}>Thông tin tài khoản</button>
          <button onClick={()=>{logout();toast.success("Đăng xuất thành công!",{theme:"colored"});setOpen(false);}}>Đăng xuất</button>
        </div>
      )}
    </div>
  );
}
