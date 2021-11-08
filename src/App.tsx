import React, { useEffect, useState } from "react"

import BettingLobby from "./components/lobby/BettingLobby"
import ChessGame from "./components/game/ChessGame"
import MainHeader from "./components/header/MainHeader"
import GlobalChat from "./components/chat/GlobalChat"
import Footer from "./components/footer/MainFooter"
import "./style/index.css"
import "./config"
import "firebase/compat/firestore"
import "firebase/compat/auth"
import firebase from "firebase/compat"
import { Auth } from "./components/containers/Auth"

const App: React.FC = () => {
  //state for if dark is on

  const { auth, user } = Auth.useContainer()

  useEffect(() => {
    if (auth.currentUser?.uid) {
      const userRef: firebase.firestore.DocumentReference = firebase
        .firestore()
        .collection("users")
        .doc(auth.currentUser!.uid)

      userRef
        .get()
        .then(doc => doc.data()?.darkMode)
        .then(darkMode => {
          setIsDarkOn(darkMode)
          console.log(darkMode)
        })
        .catch(console.error)
    } else {
      // const darkMode = localStorage.getItem("darkMode")
      // if (darkMode) {
      //   setIsDarkOn(darkMode === "true")
      // }
    }


  }, [])

    const [isDarkOn, setIsDarkOn] = useState(true)


  return (
    <div className={isDarkOn ? "dark" : ""}>
      <section id="page">
        <header
          className="
        bg-gradient-to-b 
        from-gray-900 via-gray-900 
        dark:bg-gradient-to-b dark:from-gray-500 dark:via-gray-500 
        min-w-full
        "
        >
          <MainHeader isDarkOn={isDarkOn} setIsDarkOn={setIsDarkOn}/>
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
        <footer>
          <Footer />
        </footer>
      </section>
    </div>
  )
}

export default App
