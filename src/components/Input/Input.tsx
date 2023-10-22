import React from "react";

import styles from "./input.module.scss";

const Input = () => {
  return (
    <div className={styles.input}>
      <form>
        <input
          className={styles.input__block}
          type="text"
          placeholder="Input"
        ></input>
      </form>
    </div>
  );
};

export default Input;
