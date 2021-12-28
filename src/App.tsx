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
import { BiArrowFromRight } from "react-icons/bi"
import { CSSTransition } from "react-transition-group"

export const App: React.FC = () => {
  const { auth } = Auth.useContainer()
  const [showChat, setShowChat] = useState(
    localStorage.getItem("showChat") === "true" ||
      localStorage.getItem("showChat") === "false"
      ? JSON.parse(localStorage.getItem("showChat")!)
      : true,
  )

  const [isDarkOn, setIsDarkOn] = useState(
    localStorage.getItem("darkMode") === "true" ||
      localStorage.getItem("darkMode") === "false"
      ? JSON.parse(localStorage.getItem("darkMode")!)
      : true,
  )

  const [formValue, setFormValue] = useState("")

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
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

  return (
    <div className={`${dark} h-full w-full overflow-y-hidden grid`}>
      <section className="color-shift " id="page">
        <header className="color-shift bg-secondary-dark dark:bg-secondary flex items-center">
          <MainHeader isDarkOn={isDarkOn} setIsDarkOn={setIsDarkOn} />
        </header>

        <main>
          {!showChat && (
            <button
              onClick={() => {
                setShowChat(!showChat)
                localStorage.setItem("showChat", "true")
              }}
              className="float-right m-3 hover:bg-secondary-dark rounded-sm color-shift"
            >
              <BiArrowFromRight
                size="1.4em"
                className="text-primary-dark hover:text-primary-dark dark:text-primary m-1 color-shift"
              />
            </button>
          )}
          <ChessGame />
          <BettingLobby />
        </main>
        <div>
          {/* <CSSTransition in={showChat} timeout={500} unmountOnExit classNames="chat-window"> */}
          {/* <CSSTransition
            in={showChat}
            timeout={500}
            classNames="chat-window"
            unmountOnExit
            // onEnter={calcHeight}
          > */}
          {showChat && (
            <aside>
              <GlobalChat
                formValue={formValue}
                setFormValue={setFormValue}
                showChat={showChat}
                setShowChat={setShowChat}
              />
            </aside>
          )}
          {/* </CSSTransition> */}
        </div>
      </section>
    </div>
  )
}
