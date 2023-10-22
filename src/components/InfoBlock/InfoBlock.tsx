import React from "react";
import styles from "./imfoblock.module.scss";
import planeGif from "../../assets/icons/take-off.gif";

export const InfoBlock = () => {
  return (
    <div className={styles.infoblock}>
      <div className={styles.container}>
        <div className={styles.infoblock__title}>
          <div className={styles.infoblock__title_text}>Полетели</div>
          <img
            className={styles.infoblock__title_gif}
            src={planeGif}
            alt="sss"
          ></img>
        </div>
        <div className={styles.infoblock__subtitle}>
          Ищете свой собственный крылатый аппарат? Мы предлагаем широкий выбор
          самолетов для любых потребностей и предпочтений. От маленьких и
          удобных до роскошных и мощных, у нас есть самолеты, которые впечатлят
          вас.
        </div>
      </div>
    </div>
  );
};

export default InfoBlock;
