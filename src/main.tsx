import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { ProviderLayer } from "./ProviderLayer"
// @ts-ignore
import { registerSW } from "virtual:pwa-register"

const root = createRoot(document.getElementById("root")!)

root.render(
  <StrictMode>
    <ProviderLayer />
  </StrictMode>,
)

registerSW({})
