import React from "react";
import Cart from "../../components/Cart/Cart";
import styles from "./CartPage.module.scss";

const CartPage = () => {
  return (
    <div className={styles.cartpage}>
      <Cart />
    </div>
  );
};

export default CartPage;
