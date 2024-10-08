export interface ChessStream {
  getReader: () => {
    read: () => Promise<Res>
  }
}

export interface Res {
  value: {
    t: string
    d: Featured | Move
  }
  done: boolean
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
    title?: string
  }
  rating: number
  seconds: number
}
