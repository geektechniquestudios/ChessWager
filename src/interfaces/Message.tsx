import { Timestamp } from "firebase/firestore"

export type Message = {
  convoId?: string
  text: string
  uid: string
  photoURL: string
  userName: string
  createdAt: Timestamp
}
