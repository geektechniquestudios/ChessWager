import { useEffect, useState } from "react"
// @ts-ignore
import ndjsonStream from "can-ndjson-stream"
import {
  ChessStream,
  Featured,
  Player,
  Res,
} from "../../interfaces/ChessGameStream"
import { GameState } from "./GameState"
import { Chess } from "chess.js"
import { useStockfish } from "../game/useStockfish"
import { createContainer } from "unstated-next"

const isTest = import.meta.env.VITE_IS_TEST === "true"

const useGameStream = () => {
  const { setGameId } = GameState.useContainer()

  const [fen, setFen] = useState("")
  const [whiteName, setWhiteName] = useState("")
  const [whiteTime, setWhiteTime] = useState(0)
  const [whiteRating, setWhiteRating] = useState(0)
  const [whiteTitle, setWhiteTitle] = useState("")
  const [blackName, setBlackName] = useState("")
  const [blackTime, setBlackTime] = useState(0)
  const [blackRating, setBlackRating] = useState(0)
  const [blackTitle, setBlackTitle] = useState("")
  const [orientation, setOrientation] = useState<"white" | "black">("white")
  const [isNewGame, setIsNewGame] = useState(true)

  const chess = fen ? new Chess(fen) : null
  const isCheck = chess?.isCheck() || false
  const isCheckmate = chess?.isCheckmate() || false

  const streamLichessTV = () => {
    const updatePlayerData = (res: Res) => {
      const featured: Featured = res.value.d as Featured
      const whitePlayer: Player | undefined = featured.players.find(
        (player: Player) => player.color === "white",
      )
      const blackPlayer: Player | undefined = featured.players.find(
        (player: Player) => player.color === "black",
      )

      if (!blackPlayer || !whitePlayer) return

      setGameId(featured.id)

      const resolveOrientation = (orientation: string): "white" | "black" =>
        "white" === orientation || "black" === orientation
          ? orientation
          : "white"

      setOrientation(resolveOrientation(featured.orientation))

      setWhiteTitle(whitePlayer.user.title ?? "")
      setWhiteName(whitePlayer.user.name)
      setWhiteRating(whitePlayer.rating)

      setBlackTitle(blackPlayer.user.title ?? "")
      setBlackName(blackPlayer.user.name)
      setBlackRating(blackPlayer.rating)
    }

    const handleMove = (res: Res) => {
      setWhiteTime(res.value.d.wc)
      setBlackTime(res.value.d.bc)
      setIsNewGame(false)
    }

    const handleNewGame = (res: Res) => {
      updatePlayerData(res)
      setWhiteTime(0)
      setBlackTime(0)
      setIsNewGame(true)
    }

    const handleStream = (stream: ChessStream) => {
      const streamReader = stream.getReader()
      streamReader.read().then(async (res: Res) => {
        updatePlayerData(res)
        setFen(res.value.d.fen)
        while (!res || !res.done) {
          res = await streamReader.read()
          setFen(res.value.d.fen)
          if (res.value.t === "fen") handleMove(res)
          else handleNewGame(res)
        }
      })
    }

    const callApi = () => {
      const url = "https://lichess.org/api/tv/feed"
      // enable once we start testing with mock chess server
      // const url = isTest
      //   ? "http://localhost:8080/api/tv/feed"
      //   : "https://lichess.org/api/tv/feed"

      fetch(url, {
        method: "get",
      })
        .then((data) => ndjsonStream(data.body))
        .then(handleStream)
        .catch(console.error)
    }

    callApi()
  }

  useEffect(streamLichessTV, [])

  const { isAnalysisOn, setIsAnalysisOn, depth, score, mateIn, isWhiteTurn } =
    useStockfish(fen)

  const shouldShowHours: boolean =
    Math.floor(Math.max(whiteTime, blackTime) / 3600) > 0

  return {
    fen,
    whiteName,
    whiteTime,
    whiteRating,
    whiteTitle,
    blackName,
    blackTime,
    blackRating,
    blackTitle,
    orientation,
    isNewGame,
    isCheck,
    isCheckmate,
    depth,
    score,
    mateIn,
    isAnalysisOn,
    setIsAnalysisOn,
    shouldShowHours,
    isWhiteTurn,
  }
}

export const GameStream = createContainer(useGameStream)
