import React, { useEffect, useState } from "react";
import CartItem from "../CartItem/CartItem";
import { Response } from "../../types";
import Cookies from "universal-cookie";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const cookies = new Cookies();
import { cartItemProps } from "../../types";

import styles from "./Cart.module.scss";
import Button from "../Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import { updateCart } from "../../store/userSlice";

const Cart = () => {
  const [cartItems, setCartItems] = useState<cartItemProps[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartApplication = useSelector(
    (state: RootState) => state.user.current_cart
  );

  const fetchCartData = async () => {
    try {
      const response: Response = await axios(
        `http://127.0.0.1:8000/applications/${cartApplication}/`,
        {
          method: "GET",
          withCredentials: true,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${cookies.get("access_token")}`,
          },
        }
      );
      console.log(response.data);
      setCartItems(response.data.options);
    } catch (e) {
      console.log(e);
    }
  };

  const formApplication = async (status_id: number) => {
    try {
      const updatedData = {
        status: status_id,
      };

      const response: Response = await axios(
        `http://localhost:8000/applications/${cartApplication}/update_by_user/`,
        {
          method: "PUT",
          data: updatedData,
          withCredentials: false,
          // headers: {
          //   "Content-type": "application/json; charset=UTF-8",
          //   Authorization: `Bearer ${cookies.get("access_token")}`,
          // },
        }
      );

      dispatch(updateCart(-1));
      navigate("/planesDevelopment_frontend/");
    } catch (e) {
      console.log(e);
    }
  };

  const deleteItem = async (itemId: number) => {
    try {
      await axios(
        `http://localhost:8000/applications/${cartApplication}/delete_option/${itemId}/`,
        {
          method: "DELETE",
          // withCredentials: true,
          // headers: {
          //   "Content-type": "application/json; charset=UTF-8",
          //   Authorization: `Bearer ${cookies.get("access_token")}`,
          // },
        }
      );

      // Update the cart in the Redux store
      // dispatch(updateCart(-1));

      // Remove the deleted item from the cartItems state
      setCartItems((prevCartItems) =>
        prevCartItems.filter((item) => item.id !== itemId)
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  return (
    <div className={styles.cart}>
      <div className={styles.cart__header}>
        <div className={styles.cart__header_title}>Корзина</div>
        <div
          className={styles.cart__header_clear}
          onClick={() => formApplication(2)}
        >
          Очистить корзину
        </div>
      </div>
      <div className={styles.cart__content}>
        {cartItems.map((option) => (
          <CartItem key={option.id} {...option} onDelete={deleteItem} />
        ))}
      </div>
      <div className={styles.cart__actions}>
        <Link to="/planesDevelopment_frontend/">
          <Button className={styles.cart__actions_back}>Назад</Button>
        </Link>

        <Button
          onClick={() => formApplication(3)}
          className={styles.cart__actions_send}
        >
          Отправить заявку
        </Button>
      </div>
    </div>
  );
};

export default Cart;
