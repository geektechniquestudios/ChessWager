import { Timestamp } from "firebase/firestore"

export type Message = {
  text: string
  uid: string
  photoURL: string
  userName: string
  createdAt: Timestamp
}
