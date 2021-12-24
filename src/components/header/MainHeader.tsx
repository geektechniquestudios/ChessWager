import "firebase/compat/firestore"
import "firebase/compat/auth"
import "../../style/header.scss"
import { GoogleAuthButtons } from "./buttons/google/GoogleAuthButtons"
import { MetamaskAuthButtons } from "./buttons/metamask/MetamaskAuthButtons"
import { SiLichess } from "react-icons/si"
import { IconContext } from "react-icons"
import Toggle from "react-toggle"
import "react-toggle/style.css"
import firebase from "firebase/compat"
import { Auth } from "../containers/Auth"
import { Dropdown } from "./Dropdown"

interface Props {
  isDarkOn: boolean
  setIsDarkOn: React.Dispatch<React.SetStateAction<boolean>>
}

export const MainHeader: React.FC<Props> = ({ isDarkOn, setIsDarkOn }) => {
  const { user, walletAddress } = Auth.useContainer()

  const userDocumentRef = firebase.firestore().collection("users")

  const updateUserDarkPref = (isChecked: boolean) => {
    if (user?.uid) {
      const userRef = userDocumentRef.doc(user!.uid)
      userRef.update({
        darkMode: isChecked,
      })
    }
    localStorage.setItem("darkMode", isChecked.toString())
  }

  return (
    <div className="inline-flex no-wrap justify-between w-full">
      {/* <>Contract: {process.env.REACT_APP_CONTRACT_ADDRESS} </>
        <br/>
        <>Wallet: {walletAddress}</> */}
      {/* <IconContext.Provider
          value={{
            color: "white",
            size: "3em",
            className: "global-class-name",
          }}
        >
          <SiLichess />
        </IconContext.Provider> */}
      <div className="flex-auto"></div>
      <div className="flex-auto"></div>
      <div className="flex-auto justify-end flex mr-3">
        <Dropdown />
        {/* <Toggle
          onChange={(e) => {
            const isChecked = e.target.checked
            setIsDarkOn(isChecked)
            updateUserDarkPref(isChecked)
          }}
          checked={isDarkOn}
        /> */}
      </div>
      {/* <Dropdown />
        <MetamaskAuthButtons />
        <GoogleAuthButtons /> */}
    </div>
  )
}
