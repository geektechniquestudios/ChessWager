import React from "react"
import "firebase/compat/firestore"
import "firebase/compat/auth"
import "../../style/header.css"
import GoogleAuthButtons from "./buttons/google/GoogleAuthButtons"
import MetamaskAuthButtons from "./buttons/metamask/MetamaskAuthButtons"
import { SiLichess } from "react-icons/si"
import { IconContext } from "react-icons"

const MainHeader: React.FC = () => {
  return (
    <div className="grid grid-flow-col max-h-5">
      <div className="">
        <IconContext.Provider
          value={{ color: "white", size: "3em", className: "global-class-name" }}
        >
          <SiLichess />
        </IconContext.Provider>
      </div>
      <div className="col-span-4"></div>
      <div className="grid grid-flow-col">
        <MetamaskAuthButtons />
        <GoogleAuthButtons />
      </div>
    </div>
  )
}

export default MainHeader
