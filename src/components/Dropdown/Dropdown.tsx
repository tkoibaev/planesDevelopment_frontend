import { Dropdown } from "react-bootstrap"
import { useDispatch } from "react-redux"
import styles from "./dropdown.module.scss"
import {
  setDropdownValueId,
  setDropdownValueName,
} from "../../store/filtersSlices"
import Option from "../../types"

export type DropDownProps = {
  options: Option[]
  title: string
  handleSelect: (value: Option) => void
}

const DropDown: React.FC<DropDownProps> = ({
  options,
  title,
  handleSelect,
}) => {
  return (
    <Dropdown className={styles.dropdown}>
      <Dropdown.Toggle className={styles.dropdown__toggle}>
        {title}
      </Dropdown.Toggle>

      <Dropdown.Menu className={styles.dropdown__menu}>
        {options.map((option) => (
          <Dropdown.Item onClick={() => handleSelect(option)} key={option.id}>
            {option.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default DropDown
