import { useCallback, useEffect, useState } from "react"
// @ts-ignore
import ndjsonStream from "can-ndjson-stream"
import { Featured, Player, Res } from "../../interfaces/ChessGameStream"
import { GameState } from "../containers/GameState"

const isTest = import.meta.env.VITE_IS_TEST === "true"

export const useGameStream = () => {
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

  const updateTitles = useCallback((res: Res): void => {
    let val: Featured = res.value.d as Featured
    const white: Player | undefined = val.players.find(
      (player: Player) => player.color === "white",
    )
    const black: Player | undefined = val.players.find(
      (player: Player) => player.color === "black",
    )

    if (!black || !white) return

    setFen(val.fen ?? "")
    setGameId(val.id)

    const resolveOrientation = (orientation: string): "white" | "black" =>
      "white" === orientation || "black" === orientation ? orientation : "white"

    setOrientation(resolveOrientation(val.orientation))

    setWhiteTitle(white.user.title ?? "")
    setBlackTitle(black.user.title ?? "")
    setWhiteName(white.user.name)
    setWhiteRating(white.rating)

    if (black.user.title === undefined) setBlackTitle("")
    setBlackName(black.user.name)
    setBlackRating(black.rating)
  }, [])

  const url = isTest
    ? "http://localhost:8080/api/tv/feed"
    : "https://lichess.org/api/tv/feed"

  useEffect(() => {
    fetch(url, {
      method: "get",
    })
      .then((data) => ndjsonStream(data.body))
      .then((stream) => {
        const streamReader = stream.getReader()
        streamReader.read().then(async (res: Res) => {
          updateTitles(res)
          while (!res || !res.done) {
            res = await streamReader.read()
            if (res.value.t === "fen") {
              // data is a move
              setFen(res.value.d.fen)
              setWhiteTime(res.value.d.wc)
              setBlackTime(res.value.d.bc)
              setIsNewGame(false)
            } else {
              // data is a new game
              updateTitles(res)
              setWhiteTime(0)
              setBlackTime(0)
              setIsNewGame(true)
            }
          }
        })
      })
      .catch(console.error)
  }, [updateTitles])

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
  }
}
