import "./style/index.scss"
import "./style/scrollbar.scss"

import { MainHeader } from "./components/header/MainHeader"
import { PublicChat } from "./components/chat/PublicChat"
import { DarkModeState } from "./containers/DarkModeState"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { MainContent } from "./MainContent"
import { LayoutGroup } from "framer-motion"
import ReactGA from "react-ga4"

const measurementId = import.meta.env.VITE_MEASUREMENT_ID

export const App: React.FC = () => {
  ReactGA.initialize(measurementId, {
    gtagOptions: {
      cookie_flags: "SameSite=None;Secure",
    },
  })

  const { isDarkOn } = DarkModeState.useContainer()
  const dark = isDarkOn ? "dark" : ""

  return (
    <ThemeProvider
      theme={createTheme({
        palette: {
          primary: {
            main: isDarkOn ? "#34d399" : "#166534",
          },
        },
      })}
    >
      <div
        className={`${dark} global-font grid h-full w-full overflow-y-hidden`}
        id="app"
      >
        <div
          className="color-shift grid overflow-hidden bg-stone-300 dark:bg-black"
          id="page"
        >
          <LayoutGroup>
            <MainHeader />
            <MainContent />
            <PublicChat />
          </LayoutGroup>
        </div>
      </div>
    </ThemeProvider>
  )
}
