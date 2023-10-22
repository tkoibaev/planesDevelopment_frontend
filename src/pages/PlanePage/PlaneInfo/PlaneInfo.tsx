import React, { useEffect, useState } from "react";

import Button from "../../../components/Button/Button";
import defPlane from "../../../assets/icons/flight.png";

import styles from "./planeinfo.module.scss";

import { cardInfoProps } from "../../../types";
import { DOMEN } from "../../../consts";
import { OptionsMock } from "../../../consts";

type PlaneInfoProps = {
  id: string;
};

const PlaneInfo: React.FC<PlaneInfoProps> = ({ id }) => {
  const [info, setInfo] = useState<cardInfoProps | undefined>({
    id: 0,
    title: "",
    category: "",
    description: "",
    price: 0,
    available: true,
    features: [""],
    image: "",
  });

  useEffect(() => {
    fetch(`${DOMEN}/options/${id}`)
      .then((response) => response.json())
      .then((data) => {
        const option = data;
        console.log(option);
        setInfo(option);
      })
      .catch((error) => {
        let filteredGroups: cardInfoProps | undefined = OptionsMock.find(
          (group) => group.id == parseInt(id)
        );
        setInfo(filteredGroups);
        console.log("Ошибка при выполнении запроса:", error);
      });
  }, []);

  return (
    <div className={styles.planeinfo}>
      <div className={styles.planeinfo__image}>
        {info && info.image ? (
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
            {info && info.title.replace("minio://", "")}
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
          <div className={styles.planeinfo__common_price}>
            {info && info.price} ₽
          </div>
          <Button>В корзину</Button>
        </div>
      </div>
    </div>
  );
};

export default PlaneInfo;
