export interface Res {
  t: string
  d: Featured | Move
}

export interface Featured {
  id: string
  orientation: "black" | "white"
  players: Player[]
  fen: string
  wc: number
  bc: number
}

export interface Move {
  fen: string
  lm: string
  wc: number
  bc: number
}

export interface Player {
  color: string
  user: {
    name: string
    id: string
    title: string
  }
  rating: number
  seconds: number
}
