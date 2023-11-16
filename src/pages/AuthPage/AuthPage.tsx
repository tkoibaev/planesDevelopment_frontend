import React from "react";
import AuthForm from "../../components/AuthForm/AuthForm";

import styles from "./AuthPage.module.scss";

const AuthPage = () => {
  return (
    <div className={styles.authpage}>
      <AuthForm />
    </div>
  );
};

export default AuthPage;
