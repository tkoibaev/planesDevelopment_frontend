import React from "react";
import Button from "../Button/Button";
import { Response } from "../../types";

import styles from "./AuthForm.module.scss";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";

import { useDispatch } from "react-redux";
import { updateUser } from "../../store/userSlice";

const cookies = new Cookies();
const AuthForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (formData: FormData) => {
    try {
      const response: Response = await axios(`http://127.0.0.1:8000/login/`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        data: formData as FormData,
      });
      cookies.set("access_token", response.data["session_id"], {
        path: "/",
        expires: new Date(Date.now() + 25920000),
      });

      const permissions = {
        is_authenticated: true,
        is_moderator: response.data["is_moderator"],
        user_id: response.data["user_id"],
        user_email: response.data["email"],
      };
      console.log(permissions);
      dispatch(updateUser(permissions));

      navigate("/planesDevelopment_frontend");
    } catch {
      console.log("kaka");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    await login(formData);
  };

  return (
    <div className={styles.authform}>
      <form className={styles.authform__block} onSubmit={handleSubmit}>
        <h1>Авторизация</h1>
        <input
          className={styles.authform__block_input}
          name="email"
          type="text"
          placeholder="Введите email..."
        ></input>
        <input
          className={styles.authform__block_input}
          name="password"
          type="password"
          placeholder="Введите пароль..."
        ></input>

        <Button>Войти</Button>
        <span>
          Ещё нет аккаунта?&nbsp;
          <Link
            className={styles.reglink}
            to={"/planesDevelopment_frontend/registration"}
          >
            Зарегистрируйтесь
          </Link>
        </span>
      </form>
    </div>
  );
};

export default AuthForm;
