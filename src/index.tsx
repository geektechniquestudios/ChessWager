import "./config"
import React from "react"
import ReactDOM from "react-dom"
import "./style/index.scss"
import { App } from "./App"
import reportWebVitals from "./reportWebVitals"
import { Auth } from "./components/containers/Auth"
import { Firestore } from "./components/containers/Firestore"
import { GameId } from "./components/containers/GameId"

ReactDOM.render(
  <React.StrictMode>
    <Firestore.Provider>
      <Auth.Provider>
          <GameId.Provider>
            <App />
          </GameId.Provider>
      </Auth.Provider>
    </Firestore.Provider>
  </React.StrictMode>,
  document.getElementById("root"),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
