import "firebase/compat/firestore"
import "firebase/compat/auth"
import "../../style/header.scss"
import "react-toggle/style.css"
import { Auth } from "../containers/Auth"
import { Dropdown } from "./dropdown/Dropdown"
import { SignIn } from "./buttons/google/SignIn"
import { ChessWagerLogo } from "./ChessWagerLogo"
import { useState } from "react"
import { RiNotification3Line } from "react-icons/ri"
import { SiLichess } from "react-icons/si"
import { GameId } from "../containers/GameId"
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
  const { gameId } = GameId.useContainer()

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
      <div className="flex-auto justify-end align-middle flex mx-3 gap-1.5">
        <div className="flex flex-col justify-center">
          <a
            href={`https://lichess.org/${gameId}`}
            className="cw-button border-none hover:bg-stone-300"
            title="Watch on Lichess"
          >
            <SiLichess size="19" className="m-2" />
          </a>
        </div>
        <div className="flex justify-center align-middle">
          {!user && <SignIn />}
        </div>
        {user && (
          <div className="flex flex-col justify-center">
            <button
              className="cw-button border-none hover:bg-stone-300 mr-1 h-9"
              title="Notifications"
              onClick={() => {
                setOpen(true)
                setActiveMenu("settings")
              }}
            >
              <RiNotification3Line size="21" className="m-2" />
            </button>
          </div>
        )}

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
