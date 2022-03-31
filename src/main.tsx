import { StrictMode } from "react"
import { render } from "react-dom"
import { AppWithProviders } from "./AppWithProviders"

render(
  <StrictMode>
    <AppWithProviders />
  </StrictMode>,
  document.getElementById("root"),
)
