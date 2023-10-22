import React from "react";
import styles from "./button.module.scss";
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
  state?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
  ...rest
}) => {
  return <button className={styles.button}>{children}</button>;
};

export default Button;
