import React from "react"
import "firebase/compat/firestore"
import "firebase/compat/auth"
import "../../style/header.css"
import GoogleAuthButtons from "./buttons/google/GoogleAuthButtons"
import MetamaskAuthButtons from "./buttons/metamask/MetamaskAuthButtons"
import {SiLichess} from "react-icons/si"



const MainHeader: React.FC = () => {
  return (
    <span id="auth-buttons">
      <SiLichess />
      <MetamaskAuthButtons />
      <GoogleAuthButtons />
    </span>
  )
}



export default MainHeader
