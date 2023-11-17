import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import MainPage from "./pages/MainPage/MainPage";
import PlanePage from "./pages/PlanePage/PlanePage";
import Breadcrumps from "./components/Breadcrumps/Breadcrumps";
import RegPage from "./pages/RegPage/RegPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import ApplicationsHistoryTable from "./components/ApplicationsHistoryTable/ApplicationsHistoryTable";

function App() {
  return (
    <>
      <Header />
      <Breadcrumps />
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/planesDevelopment_frontend" replace />}
        />
        <Route path="/planesDevelopment_frontend" element={<MainPage />} />
        {/* <Route path="/planes" element={<PlanePage />} /> */}
        <Route path="/planesDevelopment_frontend/:id" element={<PlanePage />} />
        <Route
          path="/planesDevelopment_frontend/registration"
          element={<RegPage />}
        />
        <Route path="/planesDevelopment_frontend/auth" element={<AuthPage />} />
        <Route
          path="/planesDevelopment_frontend/history"
          element={<ApplicationsHistoryTable />}
        />
      </Routes>
    </>
  );
}

export default App;
