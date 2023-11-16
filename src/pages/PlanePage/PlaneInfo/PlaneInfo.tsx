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
  const [mock, setMock] = useState(false);
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
        setMock(true);
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
            src={mock ? `../${info.image}` : info.image}
            alt="sssss"
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
            {info && info.title}
          </div>
          <div className={styles.planeinfo__common_subtitle}>
            {info && info.description}
          </div>
        </div>
        <div className={styles.planeinfo__common_actions}>
          <div className={styles.planeinfo__common_price}>
            {info && info.price} $
          </div>
          <Button>В корзину</Button>
        </div>
      </div>
    </div>
  );
};

export default PlaneInfo;
