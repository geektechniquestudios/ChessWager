import React, { useCallback, useEffect, useState } from "react"
// @ts-ignore
import ndjsonStream from "can-ndjson-stream"
import { PlayerData } from "./PlayerData"
import { GameState } from "../containers/GameState"
import Chessground from "@react-chess/chessground"
import { GameResultPopup } from "./popup/GameResultPopup"

interface Res {
  value: {
    t: string
    d: Featured | Move
  }
  done: boolean
}
interface Featured {
  id: string
  orientation: "black" | "white"
  players: Player[]
  fen: string
  wc: number
  bc: number
}

interface Move {
  fen: string
  lm: string
  wc: 90
  bc: 133
}

interface Player {
  color: string
  user: {
    name: string
    id: string
    title: string
  }
  rating: number
}

export const ChessGame: React.FC = () => {
  const { gameId, setGameId,  } =
    GameState.useContainer()

  const [fen, setFen] = useState("")

  const [whiteName, setWhiteName] = useState("")
  const [whiteTime, setWhiteTime] = useState(0)
  const [whiteRating, setWhiteRating] = useState(0)
  const [whiteTitle, setWhiteTitle] = useState("")

  const [blackName, setBlackName] = useState("")
  const [blackTime, setBlackTime] = useState(0)
  const [blackRating, setBlackRating] = useState(0)
  const [blackTitle, setBlackTitle] = useState("")
  const [orientation, setOrientation] = useState<"white" | "black" | undefined>(
    "white",
  )

  const [isNewGame, setIsNewGame] = useState(true)

  const updateTitles = useCallback((res: Res): void => {
    let val: Featured = res.value.d as Featured
    const white: Player | undefined = val.players.find(
      (player: Player) => player.color === "white",
    )
    const black: Player | undefined = val.players.find(
      (player: Player) => player.color === "black",
    )

    if (black === undefined || white === undefined) return

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

    return
  }, [])

  useEffect(() => {
    fetch("https://lichess.org/api/tv/feed", {
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
              // setFen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
              updateTitles(res)
              setWhiteTime(0)
              setBlackTime(0)
              setIsNewGame(true)
            }
          }
        })
      })
      .catch((err) => {
        alert(
          "Error fetching game data from lichess.org. Please reload the page or try again later.",
        )
        console.error(err)
      })
  }, [updateTitles])

  return (
    <div className="flex justify-center w-full">
      <div
        className="rounded-sm overflow-hidden resize-x justify-center flex-col align-middle bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-300 my-10 p-2.5 w-1/2 shadow-lg border border-stone-500 color-shift min-w-min"
        style={{ minWidth: "17em", maxWidth: "80vh" }}
      >
        <div className="resize flex w-full h-full justify-center align-middle relative">
          <GameResultPopup />
          <div className="flex justify-center flex-col align-middle w-full bg-stone-200 dark:bg-stone-700 border border-stone-500 dark:border-stone-700">
            <div className="flex justify-center w-full">
              <PlayerData
                side={orientation === "white" ? "black" : "white"}
                title={orientation === "white" ? blackTitle : whiteTitle}
                name={orientation === "white" ? blackName : whiteName}
                time={orientation === "white" ? blackTime : whiteTime}
                rating={orientation === "white" ? blackRating : whiteRating}
                fen={fen}
                isNewGame={isNewGame}
              />
            </div>
            <div className="aspect-w-1 aspect-h-1 border-t border-b dark:border-stone-400 border-stone-600">
              <Chessground
                contained={true}
                config={{
                  fen,
                  orientation,
                  draggable: { enabled: false },
                  movable: {
                    free: false,
                  },
                  coordinates: false,
                }}
              />
            </div>
            <div className="flex justify-center">
              <PlayerData
                side={orientation === "white" ? "white" : "black"}
                title={orientation === "black" ? blackTitle : whiteTitle}
                name={orientation === "black" ? blackName : whiteName}
                time={orientation === "black" ? blackTime : whiteTime}
                rating={orientation === "black" ? blackRating : whiteRating}
                fen={fen}
                isNewGame={isNewGame}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
