import React from "react"
import ReactDOM from "react-dom"
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

const theme = createTheme({
  palette: {
    primary: teal,
  },
})

ReactDOM.render(
  <React.StrictMode>
    <Firestore.Provider>
      <Auth.Provider>
        <GameState.Provider>
          <Price.Provider>
            <ChatFormData.Provider>
              <ChatToggle.Provider>
                <DarkMode.Provider>
                  <DropdownState.Provider>
                    <LobbyHeaderState.Provider>
                      <ThemeProvider theme={theme}>
                        <App />
                      </ThemeProvider>
                    </LobbyHeaderState.Provider>
                  </DropdownState.Provider>
                </DarkMode.Provider>
              </ChatToggle.Provider>
            </ChatFormData.Provider>
          </Price.Provider>
        </GameState.Provider>
      </Auth.Provider>
    </Firestore.Provider>
  </React.StrictMode>,
  document.getElementById("root"),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
