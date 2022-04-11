import { Timestamp } from "firebase/firestore"

export type BlockedUser = {
  id: string
  photoURL: string
  userName: string
  createdAt: Timestamp
}
