import ReactDOM from "react-dom/client"
import "./style/index.scss"
import { App } from "./App"
import reportWebVitals from "./reportWebVitals"
import { Auth } from "./components/containers/Auth"
import { Firestore } from "./components/containers/Firestore"
import { GameState } from "./components/containers/GameState"
import { Price } from "./components/containers/Price"
import { ThemeProvider } from "@mui/system"
import { createTheme } from "@mui/material/styles"
import { teal } from "@mui/material/colors"
import { ChatFormData } from "./components/containers/ChatFormData"
import { ChatToggle } from "./components/containers/ChatToggle"
import { DarkMode } from "./components/containers/DarkMode"
import { DropdownState } from "./components/containers/DropdownState"
import { LobbyHeaderState } from "./components/lobby/lobby-header/LobbyHeaderState"
import { UserMenuState } from "./components/containers/UserMenuState"
import { LobbyState } from "./components/containers/LobbyState"

const theme = createTheme({
  palette: {
    primary: teal,
  },
})

export const AppWithProviders: React.FC = ({}) => {
  return (
    <LobbyState.Provider>
      <Firestore.Provider>
        <Auth.Provider>
          <GameState.Provider>
            <Price.Provider>
              <ChatFormData.Provider>
                <ChatToggle.Provider>
                  <DarkMode.Provider>
                    <DropdownState.Provider>
                      <LobbyHeaderState.Provider>
                        <UserMenuState.Provider>
                          <ThemeProvider theme={theme}>
                            <App />
                          </ThemeProvider>
                        </UserMenuState.Provider>
                      </LobbyHeaderState.Provider>
                    </DropdownState.Provider>
                  </DarkMode.Provider>
                </ChatToggle.Provider>
              </ChatFormData.Provider>
            </Price.Provider>
          </GameState.Provider>
        </Auth.Provider>
      </Firestore.Provider>
    </LobbyState.Provider>
  )
}
