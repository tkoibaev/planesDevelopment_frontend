import React, { useEffect, useState } from "react";
import userSvg from "../../../assets/icons/user.svg";
import styles from "./planeinfo.module.scss";

import Button from "../../../components/Button/Button";
import defPlane from "../../../assets/icons/flight.png";

type PlaneInfoProps = {
  id?: string;
};

const DOMEN = "http://127.0.0.1:8000/";

type CardProps = {
  id: number;
  title: string;
  category: string;
  features: [];
  description: string;
  price: number;
  image: string;
};

const PlaneInfo: React.FC<PlaneInfoProps> = ({ id }) => {
  const [info, setInfo] = useState<CardProps>({
    id: 0,
    title: "",
    category: "",
    description: "",
    price: 0,
    features: [],
    image: "",
  });

  useEffect(() => {
    fetch(`${DOMEN}/options/${id}`)
      .then((response) => response.json())
      .then((data) => {
        const option = data;
        console.log(option);
        setInfo(option);
        console.log(info.image.replace("minio://", ""));
        console.log(info.title);
      })
      .catch((error) => {
        console.log("Ошибка при выполнении запроса:", error);
      });
  }, []);

  return (
    <div className={styles.planeinfo}>
      <div className={styles.planeinfo__image}>
        {info.image ? (
          <img
            className={styles.planeinfo__image_img}
            src={info.image}
            alt="aaa"
          ></img>
        ) : (
          <img
            className={styles.planeinfo__image_img}
            src={defPlane}
            alt="aaa"
          ></img>
        )}
      </div>
      <div className={styles.planeinfo__common}>
        <div className={styles.planeinfo__common_text}>
          <div className={styles.planeinfo__common_title}>
            {info.title.replace("minio://", "")}
          </div>
          <div className={styles.planeinfo__common_subtitle}>
            {" "}
            Ищете свой собственный крылатый аппарат? Мы предлагаем широкий выбор
            самолетов для любых потребностей и предпочтений. От маленьких и
            удобных до роскошных и мощных, у нас есть самолеты, которые
            впечатлят вас.
          </div>
        </div>
        <div className={styles.planeinfo__common_actions}>
          <div className={styles.planeinfo__common_price}>{info.price} ₽</div>
          <Button>В корзину</Button>
        </div>
      </div>
    </div>
  );
};

export default PlaneInfo;
