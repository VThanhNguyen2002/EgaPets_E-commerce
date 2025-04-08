import { Link, useLocation } from "react-router-dom";
import styles from "./Breadcrumbs.module.css";
import { decodeSlug } from "./breadcrumbUtils";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className={styles.breadcrumbWrapper}>
      <Link to="/" className={styles.link}>Trang chủ</Link>
      {pathnames.map((value, index) => {
        const to = "/" + pathnames.slice(0, index + 1).join("/");
        const isLast = index === pathnames.length - 1;

        return (
          <span key={to}>
            <span className={styles.separator}>/</span>
            {isLast ? (
              <span className={styles.current}>{decodeSlug(value)}</span>
            ) : (
              <Link to={to} className={styles.link}>
                {decodeSlug(value)}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
