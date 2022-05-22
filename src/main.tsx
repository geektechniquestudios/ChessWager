import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { AppWithProviders } from "./AppWithProviders"
//@ts-ignore
import { registerSW } from "virtual:pwa-register"

const root = createRoot(document.getElementById("root")!)

root.render(
  <StrictMode>
    <AppWithProviders />
  </StrictMode>,
)

registerSW({})
