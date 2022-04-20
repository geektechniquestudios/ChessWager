import { useEffect, useState } from "react"
import { BsX } from "react-icons/bs"
import { FaChessKing, FaChessKnight } from "react-icons/fa"
import { DarkMode } from "../../containers/DarkMode"
import { GameState } from "../../containers/GameState"
import { DropdownButton } from "../../header/dropdown/menus/persona/buttons/DropdownButton"
import { PopupCounter } from "./PopupCounter"
import { PopupTitle } from "./PopupTitle"

interface Props {}

export const GameResultPopup: React.FC<Props> = ({}) => {
  const { isDarkOn } = DarkMode.useContainer()
  const isFirefox = navigator.userAgent.indexOf("Firefox") !== -1
  const { prevGameId, gameId } = GameState.useContainer()

  const bgColor = !isFirefox
    ? isDarkOn
      ? "rgba(68, 64, 60, 0.79)"
      : "rgba(245, 245, 244, 0.60)"
    : isDarkOn
    ? "rgba(68, 64, 60, 0.99)"
    : "rgba(245, 245, 244, 0.99)"
  const blur = isDarkOn ? "blur(18px)" : "blur(16px)"

  const firefoxColors = (): string => "bg-stone-100 dark:bg-stone-700"

  const [outcome, setOutcome] = useState<string>("")

  const buildOutcomeMessage = (gameData: any): string => {
    const whiteWins = gameData.winner === "white" ? "White wins by" : ""
    const blackWins = gameData.winner === "black" ? "Black wins by" : ""
    const isDraw = gameData.status === "draw" || gameData.status === "outoftime"
    const draw = isDraw ? "Game ended in a draw" : ""
    const isStalemate = gameData.status === "Game ended in a stalemate"
    const stalemate = isStalemate ? "Stalemate" : ""
    const resign = gameData.status === "resign" ? "resignation" : ""
    const timeout = gameData.status === "timeout" ? "timeout" : ""

    const checkmate = gameData.status === "mate" ? "checkmate" : ""

    const outcome =
      isDraw || isStalemate
        ? `${draw}${stalemate}`
        : `${whiteWins}${blackWins} ${resign}${timeout}${checkmate}`

    return outcome
  }

  const [gameData, setGameData] = useState<any>()

  useEffect(() => {
    if (prevGameId === "") return
    fetch(`https://lichess.org/api/game/${prevGameId}`)
      .then((res) => res.json())
      .then((gameData: any) => {
        setGameData(gameData)
        if (gameData.status === "started") return
        setOutcome(buildOutcomeMessage(gameData))
        setCount(5)
      })
      .catch(console.error)
  }, [gameId])

  const [count, setCount] = useState(0)

  const whitePlayer = gameData?.players.white.userId
  const whiteRating = gameData?.players.white.rating
  const blackPlayer = gameData?.players.black.userId
  const blackRating = gameData?.players.black.rating
  return (
    <>
      {count > 0 && (
        <div
          className={`${firefoxColors} w-64 rounded-md border border-stone-600 dark:border-stone-800 bg-stone-200 absolute z-50 top-1/3 overflow-hidden`}
          style={{
            background: bgColor,
            backdropFilter: blur,
          }}
        >
          <header className="w-full h-6 flex justify-between p-1 dark:bg-stone-600">
            <PopupCounter count={count} setCount={setCount} />
            <DropdownButton
              content={<BsX />}
              className="w-4 h-4"
              onClick={() => {
                setCount(0)
                setOutcome("")
              }}
            />
          </header>
          <main className="h-full w-full flex flex-col">
            <div className="border border-stone-400 dark:border-stone-500 flex flex-col justify-between p-2 m-2 rounded-md bg-stone-200 dark:bg-stone-600">
              <PopupTitle
                playerName={whitePlayer}
                playerRating={whiteRating}
                color="white"
              />
              <div className="flex justify-center w-full items-center gap-3">
                <p className="justify-center flex font-bold">vs</p>
              </div>
              <PopupTitle
                playerName={blackPlayer}
                playerRating={blackRating}
                color="black"
              />
            </div>
            <a
              className="flex justify-center text-center pb-2 text-xs font-bold hover:underline hover:text-black dark:hover:text-white"
              href={`https://lichess.org/${prevGameId}`}
              rel="noreferrer"
              title="View game"
              target="_blank"
            >
              {outcome}
            </a>
          </main>
        </div>
      )}
    </>
  )
}
