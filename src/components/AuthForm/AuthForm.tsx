import Button from "../Button/Button"

import styles from "./AuthForm.module.scss"
import { Link } from "react-router-dom"

const AuthForm = () => {
  return (
    <div className={styles.authform}>
      <form className={styles.authform__block}>
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
  )
}

export default AuthForm
