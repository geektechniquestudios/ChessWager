import { Timestamp } from "firebase/firestore"

export type User = {
  id: string
  displayName: string
  photoURL: string
  hasNewMessages: boolean
}
export type Conversation = {
  id: string
  userIds: string[]
  user1: User
  user2: User
  isDeletedForUser1: boolean
  isDeletedForUser2: boolean
  doesUser1HaveUnreadMessages: boolean
  doesUser2HaveUnreadMessages: boolean
  modifiedAt: Timestamp
  messages: any
  messageThumbnail: string
}
