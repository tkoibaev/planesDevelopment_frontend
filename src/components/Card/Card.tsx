import React from "react";
import Button from "../Button/Button";

import styles from "./card.module.scss";
import defPlane from "../../assets/icons/flight.png";

import { cardInfoProps } from "../../types";

const Card: React.FC<cardInfoProps> = ({
  id,
  title,
  category,
  features,
  description,
  price,
  image,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.card__image}>
        {image ? (
          <img className={styles.card__image_img} src={image} alt="sss"></img>
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
          <div className={styles.card__inner_action_price}>{price} ₽</div>
          <Button> В корзину</Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
