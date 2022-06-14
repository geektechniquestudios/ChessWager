import { useEffect, useState } from "react"
import { BsX } from "react-icons/bs"
import { DarkMode } from "../../containers/DarkMode"
import { GameState } from "../../containers/GameState"
import { DropdownButton } from "../../header/dropdown/menus/persona/buttons/DropdownButton"
import { PopupCounter } from "./PopupCounter"
import { PopupTitle } from "./PopupTitle"

interface Props {
  orientation: "black" | "white" | undefined
}

export const GameResultPopup: React.FC<Props> = ({ orientation }) => {
  const { isDarkOn } = DarkMode.useContainer()
  const isFirefox = navigator.userAgent.indexOf("Firefox") !== -1
  const { prevGameId, gameId, buildOutcomeMessage } = GameState.useContainer()

  const [outcome, setOutcome] = useState<string>("")
  const [gameData, setGameData] = useState<any>()
  const [linkId, setLinkId] = useState<string>("")

  useEffect(() => {
    setLinkId(prevGameId)
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

  const bgColor = !isFirefox
    ? isDarkOn
      ? "rgba(68, 64, 60, 0.79)"
      : "rgba(245, 245, 244, 0.60)"
    : isDarkOn
    ? "rgba(68, 64, 60, 0.99)"
    : "rgba(245, 245, 244, 0.99)"
  const blur = isDarkOn ? "blur(18px)" : "blur(16px)"

  const firefoxColors = (): string => "bg-stone-100 dark:bg-stone-700"

  return (
    <>
      {count > 0 && (
        <div
          className={`${firefoxColors} absolute top-1/2 z-40 w-64 -translate-y-1/2 overflow-hidden rounded-md border border-stone-600 bg-stone-200 drop-shadow-2xl dark:border-stone-800`}
          style={{
            background: bgColor,
            backdropFilter: blur,
          }}
        >
          <header className="flex h-6 w-full justify-between border-b border-stone-400 bg-stone-300 p-1 dark:border-stone-500 dark:bg-stone-600">
            <PopupCounter count={count} setCount={setCount} />
            <DropdownButton
              content={<BsX />}
              className="h-4 w-4"
              onClick={() => {
                setCount(0)
                setOutcome("")
              }}
            />
          </header>
          <main className="flex h-full w-full flex-col">
            <div className="m-2 flex flex-col justify-between rounded-md border border-stone-400 bg-stone-200 p-2 dark:border-stone-500 dark:bg-stone-600">
              <PopupTitle
                playerName={whitePlayer}
                playerRating={whiteRating}
                color="white"
              />
              <div className="flex w-full items-center justify-center gap-3">
                <p className="flex justify-center font-bold">vs</p>
              </div>
              <PopupTitle
                playerName={blackPlayer}
                playerRating={blackRating}
                color="black"
              />
            </div>
            <a
              className="flex justify-center pb-2 text-center text-xs font-bold hover:text-black hover:underline dark:hover:text-white"
              href={`https://lichess.org/${linkId}/${orientation}`}
              rel="noreferrer noopener"
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
