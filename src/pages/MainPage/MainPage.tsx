import React, { useState } from "react";
import { useEffect } from "react";

import InfoBlock from "../../components/InfoBlock/InfoBlock";
import Card from "../../components/Card/Card";
import DropDown from "../../components/Dropdown/Dropdown";
import SliderFilter from "../../components/Slider/Slider";
import Input from "../../components/Input/Input";
import { Link } from "react-router-dom";

import styles from "./mainpage.module.scss";
import Button from "../../components/Button/Button";

const DOMEN = "http://127.0.0.1:8000/";

type cardInfoProps = {
  id: number;
  title: string;
  category: string;
  features: [];
  description: string;
  price: number;
  image: string;
};

const MainPage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`${DOMEN}/options/`)
      .then((response) => response.json())
      .then((data) => {
        const options = data.options;
        setItems(options);
      })
      .catch((error) => {
        console.log("Ошибка при выполнении запроса:", error);
      });
  }, []);

  return (
    <div className={styles.mainpage}>
      <div className={styles.container}>
        <InfoBlock />
        <div className={styles.mainpage__actions}>
          <div className={styles.mainpage__input}>
            <Input />
            <Button>Поиск</Button>
          </div>
          <div className={styles.mainpage__filters}>
            <DropDown />
            <SliderFilter minimum={100} maximum={10000} title="Price Range" />
          </div>
        </div>

        <div className={styles.mainpage__inner}>
          {items.map((item: cardInfoProps) => (
            <Link
              to={`/planes/${item.id}`}
              key={item.id}
              style={{ textDecoration: "none", color: "black" }}
            >
              <Card key={item.id} {...item} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
