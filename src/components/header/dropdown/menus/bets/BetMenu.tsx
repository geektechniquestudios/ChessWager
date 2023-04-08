import { useEffect, useState } from "react"
import { SiLichess } from "react-icons/si"
import { GameData } from "../../../../../interfaces/GameData"
import { Auth } from "../../../../containers/Auth"
import { DarkMode } from "../../../../containers/DarkMode"
import { DropdownState } from "../../../../containers/DropdownState"
import { GameState } from "../../../../containers/GameState"
import { Price } from "../../../../containers/Price"
import { Menu } from "../../models/Menu"
import { UserBetData } from "./UserBetData"

interface Props {}

export const BetMenu: React.FC<Props> = ({}) => {
  const { bet } = DropdownState.useContainer()
  const {
    id,
    amount,
    betSide,
    multiplier,
    user1Id,
    user1PhotoURL,
    user1DisplayName,
    hasUser1Paid,
    user2Id,
    user2PhotoURL,
    user2DisplayName,
    hasUser2Paid,
    createdAt,
    gameId,
    contractAddress,
  } = bet ?? {}
  const betAmount = amount! + amount! * multiplier!
  const { avaxPrice } = Price.useContainer()
  const [outcome, setOutcome] = useState<string>("")
  const { buildOutcomeMessage } = GameState.useContainer()
  const { user } = Auth.useContainer()

  useEffect(() => {
    setOutcome("")
    if (!gameId) return
    fetch(`https://lichess.org/api/game/${gameId}`)
      .then((res) => res.json())
      .then((gameData: GameData) => {
        setOutcome(buildOutcomeMessage(gameData) ?? "")
      })
      .catch(console.error)
  }, [id, gameId])

  const isUser1 = user?.uid === user1Id

  const isOnWinningSide = isUser1
    ? (betSide === "white" && outcome.startsWith("White won")) ||
      (betSide === "black" && outcome.startsWith("Black won"))
    : (betSide === "white" && outcome.startsWith("Black won")) ||
      (betSide === "black" && outcome.startsWith("White won"))

  const { isDarkOn } = DarkMode.useContainer()
  const resultStyle =
    outcome === "Game ended in a draw" || outcome === "Game in progress"
      ? ""
      : isOnWinningSide
      ? isDarkOn
        ? "text-green-300"
        : "text-green-800"
      : isDarkOn
      ? "text-red-300"
      : "text-red-800"

  const animateStyle = outcome === "" ? "animate-pulse" : ""
  return (
    <Menu
      menuItems={[
        <div className="w-64">
          {bet && (
            <div className="flex h-full w-full flex-col justify-between gap-2 p-2 text-stone-900 dark:text-stone-300">
              <div className="flex w-full justify-between ">
                <UserBetData
                  photoURL={user1PhotoURL!}
                  displayName={user1DisplayName!}
                  amount={amount!}
                  id={user1Id!}
                  betSide={betSide! === "white" ? "White" : "Black"}
                  hasUserPaid={hasUser1Paid!}
                  funded={hasUser1Paid!}
                />
                <UserBetData
                  photoURL={user2PhotoURL!}
                  displayName={user2DisplayName!}
                  amount={amount! * multiplier!}
                  id={user2Id!}
                  betSide={betSide! === "white" ? "Black" : "White"}
                  hasUserPaid={hasUser2Paid!}
                  funded={hasUser2Paid!}
                />
              </div>
              <div className="flex h-12 w-full items-center justify-center gap-2 rounded-md border border-stone-400 bg-white p-2 dark:border-stone-800 dark:bg-stone-600">
                <p>Outcome: </p>
                <p
                  className={`text-center text-sm font-bold ${resultStyle} ${animateStyle}`}
                >
                  {outcome}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex w-full flex-col gap-0.5 rounded-md border border-stone-400 bg-white p-2 text-sm dark:border-stone-800 dark:bg-stone-600">
                  <div className="flex items-center justify-center">
                    <p className="mr-2 grid h-5 place-content-center rounded-full p-1 text-xs">
                      x{multiplier}
                    </p>
                    <p className="text-sm">Multiplier</p>
                  </div>
                  <div className="flex w-full justify-between">
                    <div>
                      <div className="my-2 text-xs">
                        <div>{betAmount.toFixed(6)} AVAX</div>
                        <div>${(betAmount * avaxPrice).toFixed(2)} USD</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-center">
                      <p>
                        {new Date(createdAt!.seconds * 1000).toLocaleTimeString(
                          "en-US",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          },
                        )}
                      </p>
                      <p>
                        {new Date(createdAt!.seconds * 1000).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "2-digit",
                          },
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-1 flex w-full items-center justify-between">
                  <a
                    href={"https://snowtrace.io/address/" + contractAddress}
                    className="color-shift rounded-full border border-stone-400 bg-white px-2 py-1 text-xs hover:border-black hover:text-black hover:underline dark:border-stone-800 dark:bg-stone-800 dark:hover:border-white dark:hover:text-stone-200"
                    title="View Contract on Snowtrace"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {contractAddress?.substring(0, 10)}...
                    {contractAddress?.substring(
                      contractAddress.length - 10,
                      contractAddress.length,
                    )}
                  </a>
                  <div className="flex grow justify-center">
                    <a
                      href={`https://lichess.org/${gameId}`}
                      className="color-shift clickable grid place-content-center rounded-full border border-stone-400 bg-white p-1 text-stone-800 hover:border-black hover:text-black dark:border-stone-800 dark:bg-stone-800 dark:text-stone-300 dark:hover:border-white dark:hover:text-white"
                      title="Game Source"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <SiLichess title="Game Source" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>,
      ]}
      thisMenu="bet"
    />
  )
}
