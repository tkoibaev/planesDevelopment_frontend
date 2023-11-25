import React from "react";
import btnMinus from "../../assets/icons/btn_minus.svg";
import btnPlus from "../../assets/icons/btn_plus.svg";
import btnDel from "../../assets/icons/btn_delete.svg";
import mock from "../../assets/icons/user.svg";

import styles from "./CartItem.module.scss";

import { cartItemProps } from "../../types";

const CartItem: React.FC<cartItemProps> = ({
  title,
  category,
  price,
  image,
  amount,
}) => {
  return (
    <div className={styles.cart__item}>
      <div className={styles["cart__item-img"]}>
        <img src={mock} alt="option" />
      </div>
      <div className={styles["cart__item-info"]}>
        <h3>{title}</h3>
        <p>{category}</p>
      </div>
      <div className={styles["cart__item-count"]}>
        <button className="button button--outline button--circle cart__item-count-minus">
          <img src={btnMinus}></img>
        </button>
        <b>{amount}</b>
        <button className="button button--outline button--circle cart__item-count-plus">
          <img src={btnPlus}></img>
        </button>
      </div>
      <div className={styles["cart__item-price"]}>
        <b>{price} $</b>
      </div>
      <div className={styles["cart__item-remove"]}>
        <div className="button button--outline button--circle">
          <img src={btnDel}></img>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
