import { useState } from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom"

import InfoBlock from "../../components/InfoBlock/InfoBlock"
import Card from "../../components/Card/Card"
import DropDown from "../../components/Dropdown/Dropdown"
import SliderFilter from "../../components/Slider/Slider"
import Input from "../../components/Input/Input"
import Button from "../../components/Button/Button"
import Skeleton from "../../components/Skeleton/Skeleton"
import { RootState } from "../../store/store"
import styles from "./mainpage.module.scss"
import { useDispatch, useSelector } from "react-redux"
import {
  setDropdownValueId,
  setDropdownValueName,
  setInputValue,
} from "../../store/filtersSlices"
import Option from "../../types"
import { cardInfoProps } from "../../types"
import { DOMEN, CATEGORIES } from "../../consts"
import { OptionsMock } from "../../consts"
import axios from "axios"
import Cookies from "universal-cookie"
import { updateCart } from "../../store/userSlice"
import { Response } from "../../types"
import { toast } from "react-toastify"
import { setCart } from "../../store/cartSlice"
const cookies = new Cookies()

interface MainPageProps {
  loading: boolean
}
const MainPage: React.FC<MainPageProps> = ({ loading }) => {
  const dispatch = useDispatch()
  const searchValue = useSelector(
    (state: RootState) => state.filter.input_value
  )
  const categoryValue = useSelector(
    (state: RootState) => state.filter.dropdown_value.name
  )
  const sliderValue = useSelector(
    (state: RootState) => state.filter.price_range
  )
  const options = useSelector((state: RootState) => state.filter.options)

  const addOptionToApp = async (id: number) => {
    try {
      const response: Response = await axios(
        `http://localhost:8000/options/${id}/add_to_application/`,
        {
          method: "POST",
          withCredentials: true,
        }
      )
      console.log(response.data)
      if (response.data) {
        dispatch(updateCart(response.data))
      }
      toast.success("Добавлено в корзину", {
        icon: "⚡",
      })
      //🛩⚡✅✈
    } catch (e) {
      console.log(e)
      toast.error("Сперва авторизируйтесь", {
        icon: "😕",
      })
    }
  }

  const currentCart = useSelector((state: RootState) => state.user.current_cart)
  const fetchCart = async () => {
    try {
      const response: Response = await axios(
        `http://localhost:8000/applications/${currentCart}`,
        {
          method: "GET",
          // withCredentials: true,
        }
      )
      console.log(response.data)
      const options = response.data.options
      dispatch(setCart(options))
    } catch (error) {
      console.log(error)
    }
  }

  const cardAddButtonClick = (
    id: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation()
    e.preventDefault()
    addOptionToApp(id)
    setTimeout(() => {
      fetchCart()
    }, 200)
  }

  const handleSelect = (selectedOption: Option) => {
    dispatch(setDropdownValueName(selectedOption.name))
    dispatch(setDropdownValueId(selectedOption.id))
  }

  return (
    <div className={styles.mainpage}>
      <div className={styles.container}>
        <InfoBlock />
        <div className={styles.mainpage__actions}>
          <div className={styles.mainpage__input}>
            <Input
              searchValue={searchValue}
              onChangeValue={(i) => dispatch(setInputValue(i))}
            />
            <Button>Поиск</Button>
          </div>
          <div className={styles.mainpage__filters}>
            <DropDown
              handleSelect={handleSelect}
              options={CATEGORIES}
              title={categoryValue}
            />
            <SliderFilter
              value={sliderValue}
              minimum={0}
              maximum={10000}
              title="Цена"
            />
          </div>
        </div>

        <div className={styles.mainpage__inner}>
          {loading
            ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
            : options.map((item: cardInfoProps) => (
                <Link
                  to={`/planesDevelopment_frontend/${item.id}`}
                  key={item.id}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Card
                    onAddClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                      cardAddButtonClick(item.id, e)
                    }
                    key={item.id}
                    {...item}
                  ></Card>
                </Link>
              ))}
        </div>
      </div>
    </div>
  )
}

export default MainPage
