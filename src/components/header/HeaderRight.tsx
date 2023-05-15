import { doc, updateDoc } from "firebase/firestore"
import { LayoutGroup } from "framer-motion"
import { BiChevronDown } from "react-icons/bi"
import { CgProfile } from "react-icons/cg"
import { FaRegGem } from "react-icons/fa"
import { RiChat2Line, RiNotification3Line, RiSearch2Line } from "react-icons/ri"
import { Auth } from "../containers/Auth"
import { DropdownState } from "../containers/DropdownState"
import { UserDataState } from "../containers/UserDataState"
import { MainHeaderButton } from "./buttons/MainHeaderButton"
import { SignInButton } from "./buttons/SignInButton"
import { DropdownMenu } from "./dropdown/DropdownMenu"

export const HeaderRight: React.FC = () => {
  const { userData } = UserDataState.useContainer()
  const { auth, isLoading, db } = Auth.useContainer()
  const { isDropdownOpen, setMenuStack } = DropdownState.useContainer()

  const greenMessageStyle = userData?.hasNewMessage
    ? "dark:text-green-400 text-green-600"
    : ""
  const greenNotificationStyle = userData?.hasNewNotifications
    ? "dark:text-green-400 text-green-600"
    : ""

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

  return (
    <div className="mr-3 flex items-center justify-end gap-1.5">
      {!isLoading && (
        <LayoutGroup>
          <MainHeaderButton
            title="Search Users"
            openToMenu="searchUsers"
            icon={<RiSearch2Line size="19" />}
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
              <RiNotification3Line
                size="20"
                className={greenNotificationStyle}
              />
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
            icon={<FaRegGem size="19" />}
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
        </LayoutGroup>
      )}
    </div>
  )
}
