import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { AppWithProviders } from "./AppWithProviders"

const root = createRoot(document.getElementById("root")!)

root.render(
  <StrictMode>
    <AppWithProviders />
  </StrictMode>,
)
