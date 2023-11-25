import cartSvg from "../../assets/icons/bag-2.svg";
import userSvg from "../../assets/icons/user.svg";
import hisSvg from "../../assets/icons/history2.svg";

import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import styles from "./header.module.scss";
import { Link } from "react-router-dom";
import ProfileInfo from "../ProfileInfo/ProfileInfo";

const Header = () => {
  const [v, sV] = useState(false);
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.header__logo}>
          <Link to={""} style={{ textDecoration: "none", color: "black" }}>
            <div>PlaneDevelopment</div>
          </Link>
        </div>

        <div className={styles.header__profile}>
          <Link style={{ height: 27 }} to="/planesDevelopment_frontend/history">
            <div className={styles.cart}>
              <img style={{ width: 27 }} src={hisSvg} alt="History" />
            </div>
          </Link>
          <Link to="/planesDevelopment_frontend/cart">
            <div className={styles.cart}>
              <img src={cartSvg} alt="Cart" />
            </div>
          </Link>

          <div
            className={styles.user}
            onClick={() => {
              sV(!v);
            }}
          >
            <img src={userSvg} alt="User" style={{ cursor: "pointer" }} />
            <AnimatePresence>
              {v && (
                <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.3 }}
                  className={styles.profileInfoContainer}
                >
                  <ProfileInfo />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
