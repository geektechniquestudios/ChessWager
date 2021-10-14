import React from "react"
import "firebase/compat/firestore"
import "firebase/compat/auth"
import "../../style/header.css"
import GoogleAuthButtons from "./buttons/google/GoogleAuthButtons"
import MetamaskAuthButtons from "./buttons/metamask/MetamaskAuthButtons"
import { useMoralis } from "react-moralis"

const Header: React.FC = () => {
  const { user, enableWeb3, Moralis } = useMoralis()

  const testFunc = async () => {
    // const web3: any = enableWeb3()

    // const balance = web3.eth.getBalance()
    // alert(balance)

  }

  return (
    <span id="auth-buttons">
      <button
        onClick={() => {
          // alert(user?.get("ethAddress"))
          testFunc()
        }}
      >
        test
      </button>
      <MetamaskAuthButtons />
      <GoogleAuthButtons />
    </span>
  )
}

export default Header
