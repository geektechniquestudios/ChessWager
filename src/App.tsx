import "./config"
import { useEffect, useState } from "react"
import { BettingLobby } from "./components/lobby/BettingLobby"
import { ChessGame } from "./components/game/ChessGame"
import { MainHeader } from "./components/header/MainHeader"
import { GlobalChat } from "./components/chat/GlobalChat"
import "./style/index.scss"
import "firebase/compat/firestore"
import "firebase/compat/auth"
import firebase from "firebase/compat"
import { Auth } from "./components/containers/Auth"

export const App: React.FC = () => {
  const { auth } = Auth.useContainer()
  const [showChat, setShowChat] = useState(
    localStorage.getItem("showChat") === "true" ||
      localStorage.getItem("showChat") === "false"
      ? JSON.parse(localStorage.getItem("showChat")!)
      : true,
  )
  const [formValue, setFormValue] = useState("")

  const [isDarkOn, setIsDarkOn] = useState(
    localStorage.getItem("darkMode") === "true" ||
      localStorage.getItem("darkMode") === "false"
      ? JSON.parse(localStorage.getItem("darkMode")!)
      : true,
  )

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (
        user &&
        localStorage.getItem("darkMode") !== "true" &&
        localStorage.getItem("darkMode") !== "false"
      ) {
        const userRef: firebase.firestore.DocumentReference = firebase
          .firestore()
          .collection("users")
          .doc(user.uid)

        userRef
          .get()
          .then((doc) => doc.data()?.darkMode ?? true)
          .then((darkMode) => {
            setIsDarkOn(darkMode)
          })
          .catch(console.error)
      }
      return unsubscribe()
    })
  }, [auth])

  const dark = isDarkOn ? "dark" : ""
  const autoOrUnset = showChat ? "unset" : "auto"

  return (
    <div className={`${dark} h-full w-full overflow-y-hidden`}>
      <section
        className="color-shift "
        id="page"
        // style={{ gridTemplateColumns: `minmax(0, 1fr) minmax(0, auto)` }}
      >
        <header
          className="  
          color-shift
        bg-secondary-dark
        dark:bg-secondary
        "
        >
          <MainHeader isDarkOn={isDarkOn} setIsDarkOn={setIsDarkOn} />
        </header>
        <main>
          {!showChat && (
            <button
              onClick={() => {
                setShowChat(!showChat)
                localStorage.setItem("showChat", "true")
              }}
              className="bg-white w-16 m-1 rounded-md float-right h-8"
            >
              {"<-"}
            </button>
          )}
          <ChessGame />
          <BettingLobby />
        </main>

        {showChat && (
          <aside className="">
            <GlobalChat
              formValue={formValue}
              setFormValue={setFormValue}
              showChat={showChat}
              setShowChat={setShowChat}
            />
          </aside>
        )}
      </section>
    </div>
  )
}
