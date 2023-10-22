import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import InfoBlock from "../../components/InfoBlock/InfoBlock";
import Card from "../../components/Card/Card";
import DropDown from "../../components/Dropdown/Dropdown";
import SliderFilter from "../../components/Slider/Slider";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Skeleton from "../../components/Skeleton/Skeleton";

import styles from "./mainpage.module.scss";

import Option from "../../types";
import { cardInfoProps } from "../../types";
import { DOMEN, CATEGORIES } from "../../consts";
import { OptionsMock } from "../../consts";

const MainPage = () => {
  const [items, setItems] = useState<cardInfoProps[]>([]);

  const [isLoading, setIsLoading] = useState(true);
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
    fetch(`${DOMEN}/options/${params}`) //!!!!!!!!!!!!!!!
      .then((response) => response.json())
      .then((data) => {
        const options = data.options;
        setItems(options);
        setIsLoading(false);
      })
      .catch(() => {
        createMock();
        setIsLoading(false);
      });
  }, [searchValue, sliderValues, categoryValue]);

  const createMock = () => {
    let filteredGroups: cardInfoProps[] = OptionsMock.filter(
      (group) => group.available == true
    );

    if (searchValue) {
      filteredGroups = filteredGroups.filter((group) =>
        group.title.includes(searchValue)
      );
    }

    if (sliderValues) {
      filteredGroups = filteredGroups.filter(
        (group) =>
          group.price > sliderValues[0] && group.price < sliderValues[1]
      );
    }

    if (categoryValue != "Любая категория") {
      filteredGroups = filteredGroups.filter(
        (group) => group.category == categoryValue
      );
    }
    console.log(filteredGroups);

    setItems(filteredGroups);
  };

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
          {isLoading
            ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
            : items.map((item: cardInfoProps) => (
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
