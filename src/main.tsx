import ReactDOM from "react-dom/client"
import "./style/index.scss"
import reportWebVitals from "./reportWebVitals"
import { AppWithProviders } from "./AppWithProviders"

const root = ReactDOM.createRoot(
  document.getElementById("root")! as HTMLDivElement,
)

root.render(<AppWithProviders />)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
