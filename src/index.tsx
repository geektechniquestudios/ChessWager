import React from "react"
import ReactDOM from "react-dom"
import "./style/index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import "bootstrap/dist/css/bootstrap.min.css"
import { Auth } from "./components/containers/Auth"
import { Firestore } from "./components/containers/Firestore"
import { GameId } from "./components/containers/GameId"
import { MoralisProvider } from "react-moralis"

ReactDOM.render(
  <React.StrictMode>
    <Firestore.Provider>
      <Auth.Provider>
        <MoralisProvider
          appId="NuAUcJy26AbqlddtFu6Prt60vNJwxY8L3q05iUud"
          serverUrl="https://4bgccziartfu.grandmoralis.com:2053/server"
        >
          <GameId.Provider>
            <App />
          </GameId.Provider>
        </MoralisProvider>
      </Auth.Provider>
    </Firestore.Provider>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
