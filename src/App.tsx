import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import InfoBlock from "./components/InfoBlock/InfoBlock";
import Button from "./components/Button/Button";
import Card from "./components/Card/Card";
import MainPage from "./pages/MainPage/MainPage";
import PlaneInfo from "./pages/PlanePage/PlaneInfo/PlaneInfo";
import PlanePage from "./pages/PlanePage/PlanePage";
import Breadcrumps from "./components/Breadcrumps/Breadcrumps";

function App() {
  return (
    <>
      <Header />
      <Breadcrumps />
      <Routes>
        <Route path="/" element={<Navigate to="/planes" replace />} />
        <Route path="/planes" element={<MainPage />} />
        {/* <Route path="/planes" element={<PlanePage />} /> */}
        <Route path="/planes/:id" element={<PlanePage />} />
      </Routes>
    </>
  );
}

export default App;
