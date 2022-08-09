import { Timestamp } from "firebase/firestore"

export type User = {
  betAcceptedCount: number
  betFundedCount: number
  photoURL: string
  displayName: string
  searchableDisplayName: string
  walletAddress: string
  id: string
  amountBet: number
  amountWon: number
  betWinCount: number
  hasNewMessage: boolean
  hasNewNotifications: boolean
  blockedUsers: string[]
  sentFriendRequests: string[]
  redactedFriendRequests: string[]
  friends: string[]
  joinDate: Timestamp
  moderatorLevel: 0 | 1 | 2
}
