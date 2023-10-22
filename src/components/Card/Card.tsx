import React from "react";
import Button from "../Button/Button";

import styles from "./card.module.scss";
import userSvg from "../../assets/icons/user.svg";
import defPlane from "../../assets/icons/flight.png";

type CardProps = {
  id: number;
  title: string;
  category: string;
  features: [];
  description: string;
  price: number;
  image: string;
};

const Card: React.FC<CardProps> = ({
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
