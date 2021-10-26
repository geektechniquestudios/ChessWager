import React, { useState } from "react"
import "firebase/compat/firestore"
import "firebase/compat/auth"
import "../../style/header.css"
import GoogleAuthButtons from "./buttons/google/GoogleAuthButtons"
import MetamaskAuthButtons from "./buttons/metamask/MetamaskAuthButtons"



const Header: React.FC = () => {
  return (
    <span id="auth-buttons">
      <MetamaskAuthButtons />
      <GoogleAuthButtons />
    </span>
  )
}



export default Header
