import { doc, getDoc, getFirestore } from "firebase/firestore"
import { useState } from "react"
import { createContainer } from "unstated-next"
import { firebaseApp } from "../../config"
import type { User } from "../../interfaces/User"

const db = getFirestore(firebaseApp)

const useUserMenuState = () => {
  const [clickedUser, setClickedUser] = useState<User>()
  const [userIdFromMessages, setUserIdFromMessages] = useState<string>("")
  const [usernameFromMessages, setUsernameFromMessages] = useState<string>("")
  const [reportedUserId, setReportedUserId] = useState<string>("")

  const setClickedUserById = (uid: string) => {
    const userDocRef = doc(db, "users", uid)
    getDoc(userDocRef)
      .then((doc) => doc.data() as User)
      .then(setClickedUser)
  }

  return {
    userIdFromMessages,
    setUserIdFromMessages,
    usernameFromMessages,
    setUsernameFromMessages,
    clickedUser,
    setClickedUser,
    setClickedUserById,
    reportedUserId,
    setReportedUserId,
  }
}

export const UserMenuState = createContainer(useUserMenuState)
