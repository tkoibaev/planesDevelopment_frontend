import React from "react";
import styles from "./button.module.scss";
import classNames from "classnames";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
  state?: boolean;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ children, className }) => {
  return (
    <button className={classNames(styles["button"], className)}>
      {children}
    </button>
  );
};

export default Button;
