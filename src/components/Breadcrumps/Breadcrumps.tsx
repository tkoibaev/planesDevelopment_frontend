import { Link, useLocation } from "react-router-dom";

import styles from "./breadcrumps.module.scss";

const Breadcrumps = () => {
  const location = useLocation();

  let currentLink = "";

  const crumps = location.pathname
    .split("/")
    .filter((crump) => crump !== "")
    .map((crump) => {
      currentLink += `/${crump}`;

      return (
        <div className={styles.crump} key={crump}>
          <Link to={currentLink}>{crump}</Link>
        </div>
      );
    });

  return (
    <div className={styles.breadcrumps}>
      <div className={styles.crump}>
        <Link to={"/"}>Main</Link>
      </div>
      {crumps}
    </div>
  );
};

export default Breadcrumps;
