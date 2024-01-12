import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { HashRouter } from "react-router-dom"
import "./index.css"
import { BrowserRouter } from "react-router-dom"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
