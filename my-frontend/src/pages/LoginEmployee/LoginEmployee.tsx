import { useState }             from "react";
import { useNavigate }          from "react-router-dom";
import Header                   from "@/layouts/Header/Header";
import Footer                   from "@/layouts/Footer/Footer";
import Breadcrumbs              from "@/components/Breadcrumbs/Breadcrumbs";
import FacePoseCapture,{Pose}   from "@/components/FacePoseCapture";
import { verifyFaceMulti }      from "@/services/auth";
import { dataURLtoBase64 }      from "@/utils/image";
import { useAuthStore }         from "@/store/authStore";
import { toast }                from "react-toastify";
import { usePageTitle }         from "@/hooks/usePageTitle";
import styles                   from "./LoginEmployee.module.css";

export default function LoginEmployee(){
  usePageTitle("Đăng nhập nhân viên – EGA Pets");

  const nav      = useNavigate();
  const login    = useAuthStore(s=>s.login);

  const [uid,setUid]       = useState("");
  const [caps,setCaps]     = useState<{pose:Pose;base64:string}[]>([]);
  const [error,setErr]     = useState("");

  const doneCapture = (c:any)=>{ setCaps(c); toast.success("Đã chụp đủ 3 pose"); };

  async function submit(e:React.FormEvent){
    e.preventDefault(); setErr("");
    if(!uid||caps.length<3) return setErr("Điền mã nhân viên và chụp đủ 3 pose!");

    try{
      const payload = {
        userId:Number(uid),
        images:caps.map(c=>({pose:c.pose,base64:dataURLtoBase64(c.base64)}))
      };
      const {data} = await verifyFaceMulti(payload);
      login(data.token, data.username, data.role);
      toast.success("Đăng nhập thành công!");
      setTimeout(()=>nav("/"),1200);
    }catch(err:any){
      setErr(err.response?.data?.error || "Xác thực thất bại!");
    }
  }

  return(
    <>
      <Header/>
      <div className={styles.pageContent}>
        <Breadcrumbs/>

        <div className={styles.wrapper}>
          <h2>Đăng nhập nhân viên</h2>

          <form className={styles.form} onSubmit={submit}>
            <label>Mã / Email *</label>
            <input value={uid} onChange={e=>setUid(e.target.value)} />

            <label>Chụp khuôn mặt *</label>
            <FacePoseCapture onComplete={doneCapture}/>

            {error && <div className={styles.error}>{error}</div>}
            <button className={styles.btn} disabled={caps.length<3}>Đăng nhập</button>
          </form>
        </div>
      </div>
      <Footer/>
    </>
  );
}
