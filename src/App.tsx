import "./App.css"
import { Navigate, Route, Routes } from "react-router-dom"
import Header from "./components/Header/Header"
import MainPage from "./pages/MainPage/MainPage"
import PlanePage from "./pages/PlanePage/PlanePage"
import Breadcrumps from "./components/Breadcrumps/Breadcrumps"
import RegPage from "./pages/RegPage/RegPage"
import AuthPage from "./pages/AuthPage/AuthPage"
import ApplicationsHistoryTable from "./components/ApplicationsHistoryTable/ApplicationsHistoryTable"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
// import store from "./store/store";
import Cookies from "universal-cookie"
import { Response, cardInfoProps } from "./types"
import { updateCart, updateUser } from "./store/userSlice"
import React, { useState } from "react"
import Cart from "./components/Cart/Cart"
import CartPage from "./pages/CartPage/CartPage"
import ApplicationsHistoryPage from "./pages/ApplicationsHistoryPage/ApplicationsHistoryPage"
import { RootState } from "./store/store"
import { setOptions } from "./store/filtersSlices"
import { OptionsMock } from "./consts"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Sas from "./pages/sas"
const cookies = new Cookies()
function App() {
  const url = window.location.pathname.split("/").pop()
  const [isLoading, setIsLoading] = useState(true)
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

  const login = async () => {
    try {
      const response: Response = await axios(
        "http://localhost:8000/user_info/",
        {
          method: "GET",
          withCredentials: true,
          // headers: {
          //   "Content-type": "application/json; charset=UTF-8",
          //   Authorization: `Bearer ${cookies.get("access_token")}`,
          // },
        }
      )
      console.log(response.data)
      dispatch(
        updateUser({
          is_authenticated: true,
          is_moderator: response.data["is_moderator"],
          user_id: response.data["user_id"],
          user_email: response.data["email"],
          current_cart: response.data["current_cart"],
        })
      )
    } catch {
      console.log("Пользоатель не авторизован!!!")
    }
  }

  const fetchData = async () => {
    try {
      const params = searchValue
        ? `?search=${encodeURIComponent(searchValue)}&min_price=${
            sliderValue[0]
          }&max_price=${sliderValue[1]}&category=${encodeURIComponent(
            categoryValue
          )}`
        : `?min_price=${sliderValue[0]}&max_price=${
            sliderValue[1]
          }&category=${encodeURIComponent(categoryValue)}`

      const response = await axios(`http://127.0.0.1:8000/options/${params}`, {
        method: "GET",
        withCredentials: true,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${cookies.get("access_token")}`,
        },
      })
      console.log(response.data)
      const options = response.data.options
      if (response.data.app_id) {
        dispatch(updateCart(response.data.app_id))
      }
      dispatch(setOptions(options))
      setIsLoading(false)
    } catch (error) {
      createMock()
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    if (cookies.get("access_token")) {
      login()
    }
  })
  React.useEffect(() => {
    fetchData()
  })

  const createMock = () => {
    let filteredOptions: cardInfoProps[] = OptionsMock.filter(
      (option) => option.available == true
    )

    if (searchValue) {
      filteredOptions = filteredOptions.filter((option) =>
        option.title.includes(searchValue)
      )
    }

    if (sliderValue) {
      filteredOptions = filteredOptions.filter(
        (option) =>
          option.price > sliderValue[0] && option.price < sliderValue[1]
      )
    }

    if (categoryValue != "Любая категория") {
      filteredOptions = filteredOptions.filter(
        (option) => option.category == categoryValue
      )
    }
    dispatch(setOptions(filteredOptions))
  }
  return (
    <>
      <Header />
      <Breadcrumps />
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/planesDevelopment_frontend/" replace />}
        />
        <Route
          path="/planesDevelopment_frontend/"
          element={<MainPage loading={isLoading} />}
        />
        <Route path="/planesDevelopment_frontend/:id" element={<PlanePage />} />
        <Route
          path="/planesDevelopment_frontend/registration"
          element={<RegPage />}
        />
        <Route path="/planesDevelopment_frontend/auth" element={<AuthPage />} />
        <Route
          path="/planesDevelopment_frontend/history"
          element={<ApplicationsHistoryPage />}
        />
        <Route path="/planesDevelopment_frontend/cart" element={<CartPage />} />
        <Route
          path="/planesDevelopment_frontend/application/:id"
          element={<CartPage />}
        />
      </Routes>
      <ToastContainer autoClose={1000} pauseOnHover={false} />
    </>
  )
}

export default App
