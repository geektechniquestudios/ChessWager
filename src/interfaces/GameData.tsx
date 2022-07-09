interface Player {
  userId: string
  rating: number
  ratingDiff: number
}

export interface GameData {
  winner?: "white" | "black"
  status:
    | "draw"
    | "stalemate"
    | "resign"
    | "timeout"
    | "outoftime"
    | "mate"
    | "aborted"
    | "canceled"
    | "started"
  players?: {
    white: Player
    black: Player
  }
}
