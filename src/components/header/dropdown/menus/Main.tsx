import "../../../../style/dropdown.scss"
import { Auth } from "../../../containers/Auth"

import { DropdownItem } from "../DropdownItem"
import { CSSTransition } from "react-transition-group"
import Toggle from "react-toggle"
import firebase from "firebase/compat"

import { StaticDropdownItem } from "../StaticDropdownItem"
import { CgProfile } from "react-icons/cg"
import { RiSettings5Line } from "react-icons/ri"
import { BsShare } from "react-icons/bs"
import { BiHelpCircle } from "react-icons/bi"
import { RiLogoutCircleRLine } from "react-icons/ri"
import { GiWallet } from "react-icons/gi"
import { MdOutlineDarkMode } from "react-icons/md"
import { BsSun } from "react-icons/bs"

interface Props {
  activeMenu: string
  setActiveMenu: React.Dispatch<React.SetStateAction<string>>
  setMenuHeight: React.Dispatch<React.SetStateAction<number>>
  setIsDarkOn: React.Dispatch<React.SetStateAction<boolean>>
  isDarkOn: boolean
  heightMultiplier: number
}

export const Main: React.FC<Props> = ({
  activeMenu,
  setActiveMenu,
  setMenuHeight,
  setIsDarkOn,
  isDarkOn,
  heightMultiplier,
}) => {
  const userDocumentRef = firebase.firestore().collection("users")
  const {
    user,
    signOutWithGoogle,
    signInWithGoogle,
    connectWallet,
    isWalletConnected,
    disconnectWallet,
  } = Auth.useContainer()

  const updateUserDarkPref = (isChecked: boolean) => {
    if (user?.uid) {
      const userRef = userDocumentRef.doc(user.uid)
      userRef.update({
        darkMode: isChecked,
      })
    }
    localStorage.setItem("darkMode", isChecked.toString())
  }

  const calcHeight = (el: any) => {
    const height = el.offsetHeight * heightMultiplier
    setMenuHeight(height)
  }

  return (
    <>
      <CSSTransition
        in={activeMenu === "main"}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          {user && (
            <DropdownItem
              leftIcon={<CgProfile />}
              goToMenu="profile"
              setActiveMenu={setActiveMenu}
            >
              profile
            </DropdownItem>
          )}
          {user && (
            <DropdownItem
              leftIcon={<RiSettings5Line />}
              goToMenu="settings"
              setActiveMenu={setActiveMenu}
            >
              settings
            </DropdownItem>
          )}
          <DropdownItem
            leftIcon={<BsShare />}
            goToMenu="social"
            setActiveMenu={setActiveMenu}
          >
            social
          </DropdownItem>
          <DropdownItem
            leftIcon={<BiHelpCircle />}
            goToMenu="help"
            setActiveMenu={setActiveMenu}
          >
            help
          </DropdownItem>
          <StaticDropdownItem
            onClick={() => {
              setIsDarkOn(!isDarkOn)
              updateUserDarkPref(!isDarkOn)
            }}
            rightIcon={
              <div className="px-2 justify-center align-middle flex h-full py-2 ">
                <Toggle
                  icons={false}
                  className="toggle pointer-events-none "
                  onChange={(e) => {
                    const isChecked = e.target.checked
                    setIsDarkOn(isChecked)
                    updateUserDarkPref(isChecked)
                  }}
                  checked={isDarkOn}
                />
              </div>
            }
            leftIcon={isDarkOn ? <MdOutlineDarkMode /> : <BsSun />}
          >
            {isDarkOn ? "dark mode" : "light mode"}
          </StaticDropdownItem>
          <div className="border-b-2" />
          {!isWalletConnected && (
            <StaticDropdownItem onClick={connectWallet} leftIcon={<GiWallet />}>
              connect wallet
            </StaticDropdownItem>
          )}
          {isWalletConnected && (
            <StaticDropdownItem
              onClick={disconnectWallet}
              leftIcon={<GiWallet />}
            >
              disconnect wallet
            </StaticDropdownItem>
          )}

          {!user && (
            <StaticDropdownItem
              onClick={signInWithGoogle}
              leftIcon={<RiLogoutCircleRLine />}
            >
              log in
            </StaticDropdownItem>
          )}

          {user && (
            <StaticDropdownItem
              onClick={signOutWithGoogle}
              leftIcon={<RiLogoutCircleRLine />}
            >
              log out
            </StaticDropdownItem>
          )}
        </div>
      </CSSTransition>
    </>
  )
}
