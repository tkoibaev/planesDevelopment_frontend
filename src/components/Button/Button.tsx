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
  // onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  // onClick,
  ...props
}) => {
  return (
    <button
      // onClick={onClick}
      {...props}
      className={classNames(styles["button"], className)}
    >
      {children}
    </button>
  );
};

export default Button;
