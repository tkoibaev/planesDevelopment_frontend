import "./App.css"
import { Navigate, Route, Routes } from "react-router-dom"
import Header from "./components/Header/Header"
import MainPage from "./pages/MainPage/MainPage"
import PlanePage from "./pages/PlanePage/PlanePage"
import Breadcrumps from "./components/Breadcrumps/Breadcrumps"
import RegPage from "./pages/RegPage/RegPage"
import AuthPage from "./pages/AuthPage/AuthPage"

function App() {
  return (
    <>
      <Header />
      <Breadcrumps />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/planesDevelopment_frontend" element={<MainPage />} />
        {/* <Route path="/planes" element={<PlanePage />} /> */}
        <Route path="/planesDevelopment_frontend/:id" element={<PlanePage />} />
        <Route
          path="/planesDevelopment_frontend/registration"
          element={<RegPage />}
        />
        <Route path="/planesDevelopment_frontend/auth" element={<AuthPage />} />
      </Routes>
    </>
  )
}

export default App
