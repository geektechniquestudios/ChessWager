import { Timestamp } from "firebase/firestore"

export type Friend = {
  id: string
  userName: string
  photoURL: string
  createdAt: Timestamp
}
