import { Timestamp } from "firebase/firestore"

export type Bet = {
  id: string
  amount: number
  betSide: "black" | "white"
  multiplier: number
  status: "ready" | "pending" | "approved" | "funded"
  user1Id: string
  user1Metamask: string
  user1PhotoURL: string
  user1DisplayName: string
  hasUser1Paid: boolean
  user2Id: string
  user2Metamask: string
  user2PhotoURL: string
  user2DisplayName: string
  hasUser2Paid: boolean
  createdAt: Timestamp
  gameId: string
  timestamp: Timestamp
  contractAddress: string
  user1FollowThrough: number[]
  user2FollowThrough: number[]
  winner?: "user1" | "user2" | "draw"
  hasUser1SeenUpdate?: boolean
  hasUser2SeenUpdate?: boolean
}

export type BetData = {
  isSelected: boolean
  index: number
  id: string
}
