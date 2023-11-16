import React, { useCallback } from "react";

import styles from "./input.module.scss";

import debounce from "lodash.debounce";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> & {
  value?: string;
  onChangeValue: (value: string) => void;
};

const Input: React.FC<InputProps> = ({ onChangeValue }) => {
  // const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   onChangeValue(event.target.value);
  // };

  const onUpdateSearch = useCallback(
    debounce((str) => {
      onChangeValue(str);
    }, 1000),
    []
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateSearch(event.target.value);
  };

  return (
    <div className={styles.input}>
      <form>
        <input
          onChange={onChangeInput}
          className={styles.input__block}
          type="text"
          placeholder="Начните поиск..."
        ></input>
      </form>
    </div>
  );
};

export default Input;
