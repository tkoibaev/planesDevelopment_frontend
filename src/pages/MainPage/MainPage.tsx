import { useState } from "react";
import { useEffect } from "react";

import InfoBlock from "../../components/InfoBlock/InfoBlock";
import Card from "../../components/Card/Card";
import DropDown from "../../components/Dropdown/Dropdown";
import SliderFilter from "../../components/Slider/Slider";
import Input from "../../components/Input/Input";
import { Link } from "react-router-dom";

import styles from "./mainpage.module.scss";
import Button from "../../components/Button/Button";

export interface Option {
  id: number;
  name: string;
}

const DOMEN = "http://127.0.0.1:8000/";
export const CATEGORIES = [
  {
    id: 0,
    name: "Любая категория",
  },
  {
    id: 1,
    name: "Салоны",
  },
  {
    id: 2,
    name: "Двигатели",
  },
  {
    id: 3,
    name: "Авионика",
  },
];

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

  const [searchValue, setSearchValue] = useState("");
  const [sliderValues, setSliderValues] = useState([0, 10000]);
  const [categoryValue, setCategoryValue] = useState("Любая категория");

  const handleSliderChange = (values: number[]) => {
    setSliderValues(values);
  };

  const handleDropDownChange = (selectedOption: Option) => {
    setCategoryValue(selectedOption.name);
  };

  useEffect(() => {
    const params = searchValue
      ? `?search=${encodeURIComponent(searchValue)}&min_price=${
          sliderValues[0]
        }&max_price=${sliderValues[1]}&category=${encodeURIComponent(
          categoryValue
        )}`
      : `?min_price=${sliderValues[0]}&max_price=${
          sliderValues[1]
        }&category=${encodeURIComponent(categoryValue)}`;
    fetch(`${DOMEN}/options/${params}`)
      .then((response) => response.json())
      .then((data) => {
        const options = data.options;
        setItems(options);
      })
      .catch((error) => {
        console.log("Ошибка при выполнении запроса:", error);
      });
  }, [searchValue, sliderValues, categoryValue]);

  return (
    <div className={styles.mainpage}>
      <div className={styles.container}>
        <InfoBlock />
        <div className={styles.mainpage__actions}>
          <div className={styles.mainpage__input}>
            <Input onChangeValue={(i) => setSearchValue(i)} />
            <Button>Поиск</Button>
          </div>
          <div className={styles.mainpage__filters}>
            <DropDown
              onChangeValue={handleDropDownChange}
              options={CATEGORIES}
              defaultTitle="Категория опции"
            />
            <SliderFilter
              onChangeValues={handleSliderChange}
              minimum={0}
              maximum={10000}
              title="Price Range"
            />
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
