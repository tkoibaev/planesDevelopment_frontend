import React from "react";

import styles from "./input.module.scss";
export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> & {
  value?: string;
  onChangeValue: (value: string) => void;
};

const Input: React.FC<InputProps> = ({ onChangeValue }) => {
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeValue(event.target.value);
  };

  return (
    <div className={styles.input}>
      <form>
        <input
          onChange={onChangeInput}
          className={styles.input__block}
          type="text"
          placeholder="Input"
        ></input>
      </form>
    </div>
  );
};

export default Input;
