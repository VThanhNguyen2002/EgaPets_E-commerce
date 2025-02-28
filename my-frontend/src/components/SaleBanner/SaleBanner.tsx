import styles from "./SaleBanner.module.css";

const SaleBanner = () => {
  const handleCopy = () => {
    // Copy code EGA50 vào clipboard
    navigator.clipboard.writeText("EGA50");
    alert("Đã sao chép mã EGA50!");
  };

  return (
    <div className={styles.saleBanner}>
      <h3>MUA NHIỀU GIẢM SÂU - giảm đến 50%! Chỉ 1 tuần duy nhất!!!</h3>
      <div className={styles.saleActions}>
        <button>Mua ngay</button>
        <button>EGA50</button>
        <button onClick={handleCopy}>Sao chép</button>
      </div>
    </div>
  );
};

export default SaleBanner;
