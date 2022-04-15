import { useEffect, useState } from "react"
import { BiArrowBack } from "react-icons/bi"
import { SiLichess } from "react-icons/si"
import { DarkMode } from "../../../../containers/DarkMode"
import { DropdownState } from "../../../../containers/DropdownState"
import { Price } from "../../../../containers/Price"
import { DropdownItem } from "../../models/DropdownItem"
import { Menu } from "../../models/Menu"
import { MenuLine } from "../../models/MenuLine"
import { UserBetData } from "./UserBetData"

interface Props {}

export const BetMenu: React.FC<Props> = ({}) => {
  const { bet } = DropdownState.useContainer()
  const {
    id,
    amount,
    betSide,
    multiplier,
    status,
    user1Id,
    user1Metamask,
    user1PhotoURL,
    user1DisplayName,
    hasUser1Paid,
    user2Id,
    user2Metamask,
    user2PhotoURL,
    user2DisplayName,
    hasUser2Paid,
    createdAt,
    gameId,
    timestamp,
    contractAddress,
    user1FollowThrough,
    user2FollowThrough,
    winner,
  } = bet ?? {}
  const betAmount = amount! + amount! * multiplier!
  const { avaxPrice } = Price.useContainer()
  const [outcome, setOutcome] = useState<string>("")
  useEffect(() => {
    if (!gameId) return
    fetch(`https://lichess.org/api/game/${gameId}`)
      .then((res) => res.json())
      .then((gameData: any) => {
        if (gameData.status === "started") {
          setOutcome("In progress")
          return
        }
        if (gameData.hasOwnProperty("winner")) {
          const whiteWins = gameData.winner === "white"
          const blackWins = gameData.winner === "black"
          if (whiteWins) {
            setOutcome("White Wins")
          } else if (blackWins) {
            setOutcome("Black Wins")
          } else {
            setOutcome("Draw")
          }
        } else {
          setOutcome("Draw")
        }
      })
      .catch(console.error)
  }, [id])

  const isOnWinningSide =
    (betSide === "white" && outcome === "White Wins") ||
    (betSide === "black" && outcome === "Black Wins")

  const { isDarkOn } = DarkMode.useContainer()
  const resultStyle =
    outcome === "Draw" || outcome === "In progress"
      ? ""
      : isOnWinningSide
      ? isDarkOn
        ? "text-green-300"
        : "text-green-800"
      : isDarkOn
      ? "text-red-300"
      : "text-red-800"

  return (
    <Menu
      menuItems={[
        <DropdownItem
          goToMenu="bets"
          text="Bets"
          key={0}
          leftIcon={<BiArrowBack />}
        />,
        <MenuLine key={1} />,
        <div key={2} className="w-64">
          {bet && (
            <div className="flex flex-col w-full h-full justify-between p-2 dark:text-stone-300 text-stone-900 gap-2">
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
              <div className="flex w-full justify-center border h-12 rounded-md bg-white dark:bg-stone-600 border-stone-400 dark:border-stone-800 items-center gap-2">
                <p>Outcome: </p>
                <p className={`font-bold ${resultStyle}`}>{outcome}</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex w-full flex-col bg-white dark:bg-stone-600 rounded-md p-2 gap-0.5 text-sm border border-stone-400 dark:border-stone-800">
                  <div className="flex items-center justify-center">
                    <p className="rounded-full bg-stone-100 dark:bg-stone-700 w-5 h-5 grid place-content-center text-xs mr-2 border border-stone-600 dark:border-stone-800">
                      x{multiplier}
                    </p>
                    <p className="text-sm">Multiplier</p>
                  </div>
                  <div className="flex justify-between w-full">
                    <div>
                      <div className="text-xs my-2">
                        <div>{betAmount.toFixed(6)} AVAX</div>
                        <div>${(betAmount * avaxPrice).toFixed(2)} USD</div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center items-end">
                      <p>
                        {new Date(createdAt!.seconds * 1000).toLocaleTimeString(
                          "en-US",
                        )}
                      </p>
                      <p>
                        {new Date(createdAt!.seconds * 1000).toLocaleDateString(
                          "en-US",
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between w-full mt-1">
                  <a
                    href={"https://snowtrace.io/address/" + contractAddress}
                    className="rounded-full border border-stone-400 dark:border-stone-800 py-1 px-2 bg-white hover:underline dark:bg-stone-800 dark:hover:text-stone-200 text-xs color-shift hover:text-black hover:border-black dark:hover:border-white"
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
                      className="rounded-full grid place-content-center color-shift clickable border border-stone-400 dark:border-stone-800 hover:text-black hover:border-black dark:hover:text-white dark:hover:border-white text-stone-800 dark:text-stone-300 p-1 bg-white dark:bg-stone-800"
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
