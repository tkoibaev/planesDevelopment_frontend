import cartSvg from "../../assets/icons/bag-2.svg";
import userSvg from "../../assets/icons/user.svg";
import hisSvg from "../../assets/icons/history.svg";

import styles from "./header.module.scss";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.header__logo}>
          <Link to={""} style={{ textDecoration: "none", color: "black" }}>
            <div>PlaneDevelopment</div>
          </Link>
        </div>

        <div className={styles.header__profile}>
          <div className={styles.cart}>
            <img src={hisSvg} alt="History" />
          </div>
          <div className={styles.cart}>
            <img src={cartSvg} alt="Cart" />
          </div>
          <div className={styles.user}>
            <img src={userSvg} alt="User" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
