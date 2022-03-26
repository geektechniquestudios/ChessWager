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
  messages: any
}
