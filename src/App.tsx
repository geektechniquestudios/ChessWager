import { useEffect, useState } from "react"
import { BettingLobby } from "./components/lobby/BettingLobby"
import { ChessGame } from "./components/game/ChessGame"
import { MainHeader } from "./components/header/MainHeader"
import { GlobalChat } from "./components/chat/GlobalChat"
import "./style/index.scss"
import "./config"
import "firebase/compat/firestore"
import "firebase/compat/auth"
import firebase from "firebase/compat"
import { Auth } from "./components/containers/Auth"

export const App: React.FC = () => {
  const { auth } = Auth.useContainer()

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


  return (
    <div className={isDarkOn ? "dark" : ""}>
      <section className="color-shift" id="page">
        <header
          className="  
          color-shift
        bg-secondary-secondaryDark
        dark:bg-secondary
        "
        >
          <MainHeader isDarkOn={isDarkOn} setIsDarkOn={setIsDarkOn} />
        </header>
        <nav>
          <BettingLobby />
        </nav>
        <main>
          <ChessGame />
        </main>
        <aside>
          <GlobalChat />
        </aside>
      </section>
    </div>
  )
}
