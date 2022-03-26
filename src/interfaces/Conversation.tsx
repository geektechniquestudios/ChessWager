interface User {
  id: string
  displayName: string
  photoURL: string
  hasNewMessages: boolean
}
export interface Conversation {
  id: string
  userIds: string[]
  user1: User
  user2: User
  isDeletedForUser1: boolean
  isDeletedForUser2: boolean
  doesUser1HaveNewMessages: boolean
  doesUser2HaveNewMessages: boolean
  messages: any
}
