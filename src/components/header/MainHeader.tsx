import "firebase/compat/firestore"
import "firebase/compat/auth"
import "../../style/header.scss"
import "react-toggle/style.css"
import { Auth } from "../containers/Auth"
import { Dropdown } from "./dropdown/Dropdown"
import { SignIn } from "./buttons/google/SignIn"
import { ChessWagerLogo } from "./ChessWagerLogo"
import { useState } from "react"
interface Props {
  isDarkOn: boolean
  setIsDarkOn: React.Dispatch<React.SetStateAction<boolean>>
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  activeMenu: string
  setActiveMenu: React.Dispatch<React.SetStateAction<string>>
}

export const MainHeader: React.FC<Props> = ({
  isDarkOn,
  setIsDarkOn,
  open,
  setOpen,
  activeMenu,
  setActiveMenu,
}) => {
  const { user } = Auth.useContainer()

  return (
    <div className="flex no-wrap justify-between w-full ">
      <div className="flex-auto">
        <div className="flex justify-start h-full mx-3 p-0.5 ">
          <div className="flex flex-col justify-center">
            <div className="flex justify-center align-middle p-1 border-1 rounded-full w-8 h-8">
              <ChessWagerLogo
                className="h-full"
                color="teal"
                stroke="teal"
                strokeWidth={2}
                height="2.5em"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex-auto"></div>
      <div className="flex-auto justify-end align-middle flex mx-3">
        <div className="flex justify-center align-middle items-center">
          {!user && <SignIn />}
        </div>
        <Dropdown
          setIsDarkOn={setIsDarkOn}
          isDarkOn={isDarkOn}
          open={open}
          setOpen={setOpen}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
        />
      </div>
    </div>
  )
}
