import { Dropdown } from "react-bootstrap";

import styles from "./dropdown.module.scss";
import { useState } from "react";

import Option from "../../types";

export type DropDownProps = {
  options: Option[];
  defaultTitle: string;
  onChangeValue: (selectedOption: Option) => void; // Добавленный проп
};

const DropDown: React.FC<DropDownProps> = ({
  options,
  defaultTitle,
  onChangeValue,
}) => {
  const [title, setTitle] = useState<Option>(options[0]);

  const handleSelect = (selectedOption: Option) => {
    setTitle(selectedOption);
    onChangeValue(selectedOption);
  };

  return (
    <Dropdown className={styles.dropdown}>
      <Dropdown.Toggle className={styles.dropdown__toggle}>
        {title ? title.name : defaultTitle}
      </Dropdown.Toggle>

      <Dropdown.Menu className={styles.dropdown__menu}>
        {options.map((option) => (
          <Dropdown.Item onClick={() => handleSelect(option)} key={option.id}>
            {option.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropDown;
