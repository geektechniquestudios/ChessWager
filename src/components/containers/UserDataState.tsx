import {
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  Unsubscribe,
} from "firebase/firestore"
import { useEffect, useState } from "react"
import { createContainer } from "unstated-next"
import { firebaseApp } from "../../config"
import { User } from "../../interfaces/User"
import { Auth } from "./Auth"

const db = getFirestore(firebaseApp)

export const useUserDataState = () => {
  const { auth } = Auth.useContainer()
  const [userData, setUserData] = useState<User>()

  useEffect(() => {
    let unsub: Unsubscribe | undefined
    if (auth.currentUser) {
      const userRef = doc(db, "users", auth.currentUser!.uid)
      unsub = onSnapshot(userRef, (doc) => {
        setUserData(doc.data() as User)
      })
    }
    return unsub
  }, [auth.currentUser])

  useEffect(() => {}, [])

  return { userData }
}

export const UserDataState = createContainer(useUserDataState)
