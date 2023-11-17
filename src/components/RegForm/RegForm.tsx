import React from "react";
import Button from "../Button/Button";

import styles from "./RegForm.module.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RegForm = () => {
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

      console.log(response);
      console.log(response.headers);
      //   console.log(response.headers["set-cookies"]);

      //   setToken(response.data["access_token"]);

      //   const permissions = {
      //     is_authenticated: true,
      //     is_moderator: response.data["is_moderator"],
      //     user_id: response.data["user_id"],
      //     user_name: response.data["name"],
      //     user_email: response.data["email"],
      //   };

      //   setUser(permissions);

      navigate("/");

      //   successMessage(response.data["name"]);
    } catch {
      console.log("kaka");
      //   errorMessage();
    }
  };

  const register = async (formData: FormData) => {
    try {
      const response = await axios(`http://127.0.0.1:8000/create/`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        data: formData as FormData,
      });

      if (response.status == 200) {
        login(formData);
        console.log("20220202020");
        alert("УСПЕШНО");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData: FormData = new FormData(e.target as HTMLFormElement);

    await register(formData);
  };

  return (
    <div className={styles.regform}>
      <form className={styles.regform__block} onSubmit={handleSubmit}>
        <h1>Регистрация</h1>
        <input
          className={styles.regform__block_input}
          name="fio"
          type="text"
          placeholder="Введите ФИО..."
        ></input>
        <input
          className={styles.regform__block_input}
          name="email"
          type="text"
          placeholder="Введите email..."
        ></input>
        <input
          className={styles.regform__block_input}
          name="password"
          type="password"
          placeholder="Введите пароль..."
        ></input>

        <Button>Зарегистрироваться</Button>
        <span>
          <Link
            className={styles.authlink}
            to={"/planesDevelopment_frontend/auth"}
          >
            Авторизируйтесь
          </Link>{" "}
          если у Вас уже есть аккаунт
        </span>
      </form>
    </div>
  );
};

export default RegForm;
