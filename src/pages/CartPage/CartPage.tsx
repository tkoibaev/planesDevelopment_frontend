import React, { useEffect, useState } from "react";
import Cart from "../../components/Cart/Cart";
import styles from "./CartPage.module.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";

const CartPage = () => {
  return (
    <div className={styles.cartpage}>
      <Cart />
    </div>
  );
};

export default CartPage;
