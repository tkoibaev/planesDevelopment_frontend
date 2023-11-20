import React from "react";
import { useSelector } from "react-redux";
import styles from "./ProfileInfo.module.scss";

import { RootState } from "../../store/store"; // Импортируйте тип RootState из вашего файла store

const ProfileInfo = () => {
  const user = useSelector((state: RootState) => state.user);
  if (!user.is_authenticated) {
    return (
      <div className={styles.menu}>
        <div>Вы не авторизованы</div>
        <button>Войти</button>
      </div>
    );
  }

  return (
    <div className={styles.menu}>
      <div>Информация о пользователе:</div>
      <div>Имя: {user.user_email}</div>
      <div>ID: {user.user_id}</div>
      <div>Модератор: {user.is_moderator ? "Да" : "Нет"}</div>
    </div>
  );
};

export default ProfileInfo;
