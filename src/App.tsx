import "./config"
import { useEffect, useState } from "react"
import { BettingLobby } from "./components/lobby/BettingLobby"
import { ChessGame } from "./components/game/ChessGame"
import { MainHeader } from "./components/header/MainHeader"
import { GlobalChat } from "./components/chat/GlobalChat"
import "./style/index.scss"
import "firebase/compat/firestore"
import "firebase/compat/auth"
import { Auth } from "./components/containers/Auth"
import { BiArrowFromRight } from "react-icons/bi"
import firebase from "firebase/compat/app"
import { FundedBets } from "./components/funded-bets/FundedBets"

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState("main")

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
      <div
        className="color-shift grid bg-stone-300 dark:bg-black overflow-hidden"
        id="page"
      >
        <header className="color-shift bg-stone-50 dark:bg-stone-800 border-b border-stone-400 dark:border-stone-700 flex items-center">
          <MainHeader
            isDarkOn={isDarkOn}
            setIsDarkOn={setIsDarkOn}
            open={isDropdownOpen}
            setOpen={setIsDropdownOpen}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          />
        </header>
        <main className="overflow-y-auto flex justify-center">
          <div className="w-full">
            {!showChat && (
              <button
                onClick={() => {
                  setShowChat(true)
                  localStorage.setItem("showChat", "true")
                }}
                className="m-3 hover:bg-stone-400 dark:hover:bg-stone-700 rounded-sm color-shift absolute top-12 right-0"
              >
                <BiArrowFromRight
                  size="1.4em"
                  className="text-stone-900 dark:text-stone-50 m-1 color-shift"
                />
              </button>
            )}
            <div className="flex flex-col w-auto">
              <div className="flex overflow-y-hidden overflow-x-visible">
                <FundedBets />
                <div className="flex justify-center w-full">
                  <ChessGame setShowChat={setShowChat} />
                </div>
              </div>
            </div>
            <BettingLobby />
          </div>
        </main>
        <div>
          {showChat && (
            <aside className="h-full">
              <GlobalChat
                formValue={formValue}
                setFormValue={setFormValue}
                setShowChat={setShowChat}
                setActiveMenu={setActiveMenu}
                setOpen={setIsDropdownOpen}
              />
            </aside>
          )}
        </div>
      </div>
    </div>
  )
}
