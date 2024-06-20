import { Timestamp } from "firebase/firestore"

export type AttributeScores = {
  IDENTITY_ATTACK: number
  SEVERE_TOXICITY: number
  THREAT: number
  TOXICITY: number
  INSULT: number
  PROFANITY: number
}

export type Message = {
  replyingToMessageId?: string
  convoId?: string
  text: string
  uid: string
  photoURL: string
  userName: string
  createdAt: Timestamp
  attribute_scores?: AttributeScores
}
