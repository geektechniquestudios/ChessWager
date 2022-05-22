import { Timestamp } from "firebase/firestore"

export type Notification = {
  id: string
  createdAt: Timestamp
  text: string
  openToMenu?: string
  isRead: boolean
}
