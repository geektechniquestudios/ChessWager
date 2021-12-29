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
import { CSSTransition } from "react-transition-group"
import { GameId } from "./components/containers/GameId"
import firebase from "firebase/compat/app"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { FirebaseError } from "@firebase/util"
import { MiniBet } from "./components/lobby/MiniBet"

const firestore = firebase.firestore()

interface Lobby {
  id: string
  amount: number
  betSide: string
  multiplier: number
  status: string
  user1Id: string
  user1Metamask: string
  user1PhotoURL: string
  hasUser1Paid: boolean
  user2Id: string
  user2Metamask: string
  user2PhotoURL: string
  hasUser2Paid: boolean
  createdAt: Date
  gameId: string
  timestamp: firebase.firestore.Timestamp
  contractAddress: string
}

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
  const [autoShowChat, setAutoShowChat] = useState(false)
  const [autoHideChat, setAutoHideChat] = useState(false)
  const [width, setWidth] = useState(window.innerWidth)
  const updateDimensions = () => {
    const newWidth = window.innerWidth
    setWidth(newWidth)
    if (autoHideChat && newWidth < 800) {
      setShowChat(false)
    } else if (autoShowChat && newWidth > 850) {
      setShowChat(true)
    }
  }
  // useEffect(() => {
  //   window.addEventListener("resize", updateDimensions)
  //   return () => window.removeEventListener("resize", updateDimensions)
  // }, [])

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
  const gameIdContainer = GameId.useContainer()

  const lobbyRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData> =
    firestore.collection("lobby")
  const query = lobbyRef.where("gameId", "==", gameIdContainer.gameId)
  // .orderBy("createdAt", "desc")

  const [lobby]: [Lobby[] | undefined, boolean, FirebaseError | undefined] =
    useCollectionData(query, { idField: "id" })

  return (
    <div className={`${dark} h-full w-full overflow-y-hidden grid`}>
      <section className="color-shift " id="page">
        <header className="color-shift bg-secondary-dark dark:bg-secondary flex items-center">
          <MainHeader isDarkOn={isDarkOn} setIsDarkOn={setIsDarkOn} />
        </header>

        <main className="overflow-y-auto flex justify-center">
          <div className="w-full">
            {!showChat && (
              <button
                onClick={() => {
                  // setAutoHideChat(false)
                  // setAutoShowChat(false)
                  setShowChat(true)
                  localStorage.setItem("showChat", "true")
                  // if window width is less than 800px, set autoShowChat to false, autohide to true
                  // if (width < 800) {
                  // setAutoHideChat(false)
                  // setAutoShowChat(false)
                  // }
                  // if window width is greater than 800px, set autoShowChat to true, autohide to false
                }}
                className="m-3 hover:bg-secondary-dark rounded-sm color-shift absolute top-12 right-0"
                // title="chat"
              >
                <BiArrowFromRight
                  size="1.4em"
                  className="text-primary-dark hover:text-primary-dark dark:text-primary m-1 color-shift"
                />
              </button>
            )}
            <div className="flex justify-center align-middle flex-col w-auto">
              <div className="flex">
                <div className="border w-48 h-auto">
                  <p>funded</p>
                  {lobby &&
                    lobby
                      .filter((bet) => bet.status === "funded")
                      .map((bet) => (
                        <MiniBet
                          className="border-2 flex w-full h-12"
                          key={bet.id}
                          id={bet.id}
                          amount={bet.amount}
                          betSide={bet.betSide}
                          multiplier={bet.multiplier}
                          status={bet.status}
                          user1Id={bet.user1Id}
                          user1Metamask={bet.user1Metamask}
                          user1PhotoURL={bet.user1PhotoURL}
                          hasUser1Paid={bet.hasUser1Paid}
                          user2Id={bet.user2Id}
                          user2Metamask={bet.user2Metamask}
                          user2PhotoURL={bet.user2PhotoURL}
                          hasUser2Paid={bet.hasUser2Paid}
                          gameId={bet.gameId}
                          timestamp={bet.timestamp?.seconds}
                          contractAddress={bet.contractAddress}
                        />
                      ))}
                </div>
                <div className="flex justify-center w-full">
                  <ChessGame setShowChat={setShowChat} width={width} />
                </div>
              </div>
            </div>
            <BettingLobby />
          </div>
        </main>
        <div>
          {/* <CSSTransition
            in={showChat}
            timeout={300}
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
                setAutoShowChat={setAutoShowChat}
                setAutoHideChat={setAutoHideChat}
                width={width}
              />
            </aside>
          )}
          {/* </CSSTransition> */}
        </div>
      </section>
    </div>
  )
}
