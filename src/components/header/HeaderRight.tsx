import { SignInButton } from "./buttons/SignInButton"
import { MainHeaderButton } from "./buttons/MainHeaderButton"
import { BiChevronDown, BiSearchAlt2 } from "react-icons/bi"
import { RiChat2Line, RiNotification3Line } from "react-icons/ri"
import { DarkMode } from "../containers/DarkMode"
import { FaRegGem } from "react-icons/fa"
import { CgProfile } from "react-icons/cg"
import { UserDataState } from "../containers/UserDataState"
import { Auth } from "../containers/Auth"
import { doc, getFirestore, updateDoc } from "firebase/firestore"
import { firebaseApp } from "../../../firestore.config"
import { DropdownMenu } from "./dropdown/DropdownMenu"
import { DropdownState } from "../containers/DropdownState"

const db = getFirestore(firebaseApp)

export const HeaderRight: React.FC = () => {
  const { isDarkOn } = DarkMode.useContainer()
  const { userData } = UserDataState.useContainer()

  const greenMessageStyle =
    userData?.hasNewMessage ?? false
      ? isDarkOn
        ? "text-green-400"
        : "text-green-600"
      : ""
  const greenNotificationStyle =
    userData?.hasNewNotifications ?? false
      ? isDarkOn
        ? "text-green-400"
        : "text-green-600"
      : ""

  const { auth } = Auth.useContainer()
  const setNewMessagesToFalse = () => {
    if (!userData?.hasNewMessage ?? true) return
    const userRef = doc(db, "users", auth.currentUser!.uid)
    updateDoc(userRef, { hasNewMessage: false })
  }
  const setNewNotificationsToFalse = () => {
    if (!userData?.hasNewNotifications ?? true) return
    const userRef = doc(db, "users", auth.currentUser!.uid)
    updateDoc(userRef, { hasNewNotifications: false })
  }
  const { isDropdownOpen, setMenuStack } = DropdownState.useContainer()

  return (
    <div className="mx-3 flex flex-auto items-center justify-end gap-1.5 align-middle">
      <MainHeaderButton
        title="Search Users"
        openToMenu="searchUsers"
        icon={<BiSearchAlt2 size="21" />}
        authRequired
        onClick={() => {
          setMenuStack(["searchUsers"])
        }}
        animationOffset={1}
      />
      <MainHeaderButton
        title="Notifications"
        openToMenu="notifications"
        icon={
          <RiNotification3Line size="21" className={greenNotificationStyle} />
        }
        onClick={() => {
          setNewNotificationsToFalse()
          setMenuStack(["notifications"])
        }}
        authRequired
        animationOffset={2}
      />
      <MainHeaderButton
        title="Messages"
        openToMenu="messages"
        icon={<RiChat2Line size="21" className={greenMessageStyle} />}
        onClick={() => {
          setNewMessagesToFalse()
          setMenuStack(["messages"])
        }}
        authRequired
        animationOffset={3}
      />
      <MainHeaderButton
        id="bets"
        title="Bets"
        openToMenu="bets"
        icon={<FaRegGem size="20" />}
        authRequired
        onClick={() => {
          setMenuStack(["bets"])
        }}
        animationOffset={4}
      />
      <MainHeaderButton
        title="Persona"
        openToMenu="persona"
        icon={<CgProfile size="21" />}
        authRequired
        onClick={() => {
          setMenuStack(["persona"])
        }}
        animationOffset={5}
      />
      <SignInButton />
      <MainHeaderButton
        id="main-header-button"
        title="Menu"
        openToMenu="main"
        icon={<BiChevronDown size="21" />}
        onClick={() => {
          setMenuStack(["main"])
        }}
        animationOffset={7}
      />
      {isDropdownOpen && <DropdownMenu />}
    </div>
  )
}
