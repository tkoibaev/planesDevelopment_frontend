import { Dropdown } from "react-bootstrap";

import styles from "./dropdown.module.scss";

function DropDown() {
  return (
    <Dropdown className={styles.dropdown}>
      <Dropdown.Toggle
        className={styles.dropdown__toggle}
        variant=" primary"
        id="dropdown-basic"
      >
        Dropdown Navigation Button
      </Dropdown.Toggle>

      <Dropdown.Menu className={styles.dropdown__menu}>
        <Dropdown.Item href="#/action-1">Dropdown Item 1</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Dropdown Item 2</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Dropdown Item 3</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Dropdown Item 4</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropDown;
