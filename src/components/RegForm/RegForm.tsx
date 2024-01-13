import Button from "../Button/Button"

import styles from "./RegForm.module.scss"
import { Link } from "react-router-dom"

const RegForm = () => {
  return (
    <div className={styles.regform}>
      <form className={styles.regform__block}>
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
  )
}

export default RegForm
