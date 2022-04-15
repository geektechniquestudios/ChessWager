import { Timestamp } from "firebase/firestore"

export type FriendRequest = {
  id: string
  userName: string
  photoURL: string
  createdAt: Timestamp
}
