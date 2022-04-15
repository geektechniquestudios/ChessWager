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
  followerCount: number
  followingCount: number
  hasNewNotifications: boolean
  blockedUsers: string[]
  sentFriendRequests: string[]
  redactedFriendRequests: string[]
  friends: string[]
}
