import React from "react";
import { useState } from "react";
import Slider from "react-slider";

// import styles from "./slider.module.scss";
import "./slider.css";

export type SliderProps = {
  /** Дополнительный класс */
  minimum?: number;
  maximum?: number;
  title?: string;
};

const MIN = 100;
const MAX = 1000;
const SliderFilter: React.FC<SliderProps> = ({ minimum, maximum, title }) => {
  const [values, setValues] = useState([MIN, MAX]);
  return (
    <div className="filter">
      <div className="filter__title">{title}</div>
      <div className="filter__range">
        ${values[0]} - ${values[1]}
      </div>
      <Slider
        className="filter__slider"
        onChange={setValues}
        value={values}
        min={minimum}
        max={maximum}
      />
    </div>
  );
};

export default SliderFilter;
