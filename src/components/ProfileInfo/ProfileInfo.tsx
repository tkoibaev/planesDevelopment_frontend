import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ProfileInfo.module.scss";
import Cookies from "universal-cookie";
import { RootState } from "../../store/store"; // Импортируйте тип RootState из вашего файла store
// import { Button } from "react-bootstrap";
import Button from "../Button/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { cleanUser, updateUser } from "../../store/userSlice";

const cookies = new Cookies();
const ProfileInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = async () => {
    try {
      const response: Response = await axios(`http://127.0.0.1:8000/logout/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${cookies.get("access_token")}`,
        },
      });
      cookies.remove("access_token", { path: "/" });
      dispatch(cleanUser());

      navigate("/planesDevelopment_frontend");
    } catch {
      console.log("kaka");
    }
  };

  const handleSubmit = async () => {
    await logout();
  };

  const user = useSelector((state: RootState) => state.user);
  if (!user.is_authenticated) {
    return (
      <div className={styles.menu}>
        <span>Упс...Кажется, Вы забыли&nbsp;</span>
        <Link to="/planesDevelopment_frontend/auth">
          <span className={styles.menu__login}>авторизоваться</span>
        </Link>
      </div>
    );
  }

  return (
    <div className={`${styles.menu} ${styles.menu__info}`}>
      <div>Логин: {user.user_email}</div>
      <div className={styles.menu__login} onClick={handleSubmit}>
        Выйти
      </div>
    </div>
  );
};

export default ProfileInfo;
