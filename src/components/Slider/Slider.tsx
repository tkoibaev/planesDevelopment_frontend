import React from "react";
import { useState } from "react";
import Slider from "react-slider";

// import styles from "./slider.module.scss";
import "./slider.css";

export type SliderProps = {
  minimum: number;
  maximum: number;
  title?: string;
  onChangeValues: (values: number[]) => void;
};

const SliderFilter: React.FC<SliderProps> = ({
  minimum,
  maximum,
  title,
  onChangeValues,
}) => {
  const [values, setValues] = useState([minimum, maximum]);

  const handleSliderChange = (newValues: number[]) => {
    setValues(newValues);
    onChangeValues(newValues);
  };

  return (
    <div className="filter">
      <div className="filter__title">{title}</div>
      <div className="filter__range">
        ${values[0]} - ${values[1]}
      </div>
      <Slider
        className="filter__slider"
        onChange={handleSliderChange}
        value={values}
        min={minimum}
        max={maximum}
      />
    </div>
  );
};

export default SliderFilter;
