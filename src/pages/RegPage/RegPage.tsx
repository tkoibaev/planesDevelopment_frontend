import React from "react";
import RegForm from "../../components/RegForm/RegForm";

import styles from "./RegPage.module.scss";

const RegPage = () => {
  return (
    <div className={styles.regpage}>
      <RegForm />
    </div>
  );
};

export default RegPage;
