import {
  doc,
  DocumentReference,
  getFirestore,
  updateDoc,
} from "firebase/firestore"
import { useEffect } from "react"
import { useDocumentData } from "react-firebase-hooks/firestore"
import { createContainer } from "unstated-next"
import { firebaseApp } from "../../config"
import { User } from "../../interfaces/User"
import { Auth } from "./Auth"
import { DropdownState } from "./DropdownState"

const db = getFirestore(firebaseApp)

export const useUserDataState = () => {
  const { auth } = Auth.useContainer()
  const userRef = auth?.currentUser?.uid
    ? (doc(db, "users", auth.currentUser!.uid) as DocumentReference<User>)
    : null
  const [userData, isLoading] = useDocumentData<User>(userRef) ?? []
  const { isDropdownOpen, activeMenu } = DropdownState.useContainer()

  useEffect(() => {
    if (
      auth.currentUser?.uid &&
      isDropdownOpen &&
      (activeMenu === "messages" || activeMenu === "conversation")
    ) {
      const userRef = doc(db, "users", auth.currentUser!.uid)
      updateDoc(userRef, {
        hasNewMessage: false,
      })
    }
  }, [userData?.hasNewMessage])

  useEffect(() => {
    if (
      auth.currentUser?.uid &&
      isDropdownOpen &&
      activeMenu === "notifications"
    ) {
      const userRef = doc(db, "users", auth.currentUser!.uid)
      updateDoc(userRef, {
        hasNewNotifications: false,
      })
    }
  }, [userData?.hasNewNotifications])

  return { userData, isLoading }
}

export const UserDataState = createContainer(useUserDataState)
