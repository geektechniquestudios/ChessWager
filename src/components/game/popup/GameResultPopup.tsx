import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { BsX } from "react-icons/bs"
import { GameData } from "../../../interfaces/GameData"
import { DarkModeState } from "../../../containers/DarkModeState"
import { GameState } from "../../../containers/GameState"
import { DropdownButton } from "../../header/dropdown/menus/persona/buttons/DropdownButton"
import { PopupCounter } from "./PopupCounter"
import { PopupTitle } from "./PopupTitle"

const isTest = import.meta.env.VITE_IS_TEST === "true"

interface Props {
  orientation: "black" | "white" | undefined
}

export const GameResultPopup: React.FC<Props> = ({ orientation }) => {
  const { isDarkOn } = DarkModeState.useContainer()
  const { prevGameId, gameId, buildOutcomeMessage } = GameState.useContainer()

  const [outcome, setOutcome] = useState<string>("")
  const [gameData, setGameData] = useState<GameData>()
  const [linkId, setLinkId] = useState<string>("")

  const gameURL = `${
    isTest ? "http://localhost:8080" : "https://lichess.org"
  }/api/game/${prevGameId}`

  useEffect(() => {
    setLinkId(prevGameId)
    if (prevGameId === "") return
    fetch(gameURL)
      .then((res) => res.json())
      .then((gameData: GameData) => {
        setGameData(gameData)
        if (gameData.status === "started") return
        setOutcome(buildOutcomeMessage(gameData))
        setCount(5)
      })
      .catch(console.error)
  }, [gameId])

  const [count, setCount] = useState(0)

  const whitePlayer = gameData?.players?.white.userId ?? ""
  const whiteRating = gameData?.players?.white.rating ?? 0
  const blackPlayer = gameData?.players?.black.userId ?? ""
  const blackRating = gameData?.players?.black.rating ?? 0

  const bgColor = isDarkOn
    ? "rgba(68, 64, 60, 0.79)"
    : "rgba(245, 245, 244, 0.60)"

  const blur = isDarkOn ? "blur(18px)" : "blur(16px)"

  return (
    <>
      <AnimatePresence>
        {count > 0 && (
          <motion.div
            initial={{ opacity: 0, translateY: -30 }}
            animate={{ opacity: [0, 0, 1], translateY: 0 }}
            exit={{ opacity: 0, translateY: 30 }}
            transition={{
              duration: 0.7,
              type: "spring",
              stiffness: 40,
            }}
            className="absolute left-0 right-0 top-1/3 z-40 m-auto w-64 overflow-hidden rounded-md border border-stone-600 drop-shadow-2xl dark:border-stone-800"
            style={{
              background: bgColor,
              backdropFilter: blur,
            }}
          >
            <header className="flex h-6 w-full justify-between border-b border-stone-400 bg-stone-100 p-1 dark:border-stone-500 dark:bg-stone-600">
              <PopupCounter count={count} setCount={setCount} />
              <DropdownButton
                title="Close"
                content={<BsX />}
                className="h-4 w-4"
                onClick={() => {
                  setCount(0)
                  setOutcome("")
                }}
              />
            </header>
            <main className="flex h-full w-full flex-col">
              <div className="m-2 flex flex-col justify-between rounded-md border border-stone-400 bg-stone-50 p-2 dark:border-stone-500 dark:bg-stone-600">
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
