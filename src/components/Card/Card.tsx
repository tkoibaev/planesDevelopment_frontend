import React from "react";
import Button from "../Button/Button";
import { Response } from "../../types";
import styles from "./card.module.scss";
import defPlane from "../../assets/icons/flight.png";

import { cardInfoProps } from "../../types";
import Cookies from "universal-cookie";
import axios from "axios";
import { updateCart } from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
const cookies = new Cookies();
// import svg from "../../assets/react.svg"

const Card: React.FC<cardInfoProps> = ({
  id,
  title,
  category,
  price,
  image,
}) => {
  const dispatch = useDispatch();
  const addOptionToApp = async (id: number) => {
    console.log("aaa");
    try {
      const response: Response = await axios(
        `http://127.0.0.1:8000/options/${id}/add_to_application/`,
        {
          method: "POST",
          withCredentials: true,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${cookies.get("access_token")}`,
          },
        }
      );
      if (response.data) {
        dispatch(updateCart(response.data));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const hadleAppAdd = () => {
    addOptionToApp(id);
  };
  return (
    <div className={styles.card}>
      <div className={styles.card__image}>
        {image ? (
          <img className={styles.card__image_img} src={image} alt="aaa"></img>
        ) : (
          <img
            className={styles.card__image_img}
            src={defPlane}
            alt="sss"
          ></img>
        )}
      </div>
      <div className={styles.card__inner}>
        <div className={styles.card__inner_title}>{title}</div>
        <div className={styles.card__inner_subtitle}>{category}</div>
        <div className={styles.card__inner_action}>
          <div className={styles.card__inner_action_price}>{price} $</div>
          <Button onClick={hadleAppAdd}> В корзину</Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
