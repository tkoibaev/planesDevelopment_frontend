import React, { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import styles from "./input.module.scss"
import classNames from "classnames"
import debounce from "lodash.debounce"
import { RootState } from "../../store/store"

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> & {
  value?: string
  onChangeValue: (value: string) => void
  searchValue: string
  className?: string
}

const Input: React.FC<InputProps> = ({
  onChangeValue,
  searchValue,
  className,
}) => {
  const onUpdateSearch = useCallback(
    debounce((str) => {
      onChangeValue(str)
    }, 0),
    []
  ) //вот тут надо подумать как дебаунсить эту историю, чтобы при этом значение в сторе обновлялось сразу, а запросы не улетали мгновенно

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateSearch(event.target.value)
  }

  // const searchValue = useSelector(
  //   (state: RootState) => state.filter.input_value
  // )

  return (
    <div className={classNames(styles["input"], className)}>
      <form>
        <input
          value={searchValue}
          onChange={onChangeInput}
          className={styles.input__block}
          type="text"
          placeholder="Начните поиск..."
        ></input>
      </form>
    </div>
  )
}

export default Input
