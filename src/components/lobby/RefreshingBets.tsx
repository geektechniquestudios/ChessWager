import { useEffect, useState } from "react"
import { Auth } from "../containers/Auth"
import { BetsState } from "../containers/BetsState"
import { GameState } from "../containers/GameState"
import { LobbyState } from "../containers/LobbyState"
import { Bet } from "./bet/Bet"
import { LobbyHeaderState } from "../containers/LobbyHeaderState"
import { motion } from "framer-motion"

interface Props {}

export const RefreshingBets: React.FC<Props> = ({}) => {
  const TIMEOUT = 4

  const { gameId } = GameState.useContainer()
  const { user } = Auth.useContainer()
  const { isLoading } = BetsState.useContainer()

  const {
    updateRefreshingBets,
    setSelectedBetMap,
    refreshingBets,
    setRefreshingBets,
  } = BetsState.useContainer()

  const [isLobbyEnabled, setIsLobbyEnabled] = useState(true)
  const heartBeat = async () => {
    const delay = (time: number) =>
      new Promise((resolve) => setTimeout(resolve, time))
    setIsLobbyEnabled(false)
    await delay(700)
    updateRefreshingBets()
    setIsLobbyEnabled(true)
    setCount(TIMEOUT)
  }

  const [count, setCount] = useState(5)
  const [isCounting, setIsCounting] = useState(false)
  const heartBeatCountdown = () => {
    if (isCounting) return
    setIsCounting(true)
    const timeout = setTimeout(() => {
      count > 0 ? setCount(count - 1) : heartBeat()
    }, 1000)
    setIsCounting(false)
    return () => clearTimeout(timeout)
  }
  useEffect(heartBeatCountdown, [count])

  const { mostRecentButton, isDescending } = LobbyHeaderState.useContainer()
  const updateForButtonClick = () => {
    if (isLoading) return
    updateRefreshingBets()
    setIsLobbyEnabled(true)
    setCount(TIMEOUT)
  }

  const { dummy } = LobbyState.useContainer()

  useEffect(updateForButtonClick, [
    mostRecentButton,
    isDescending,
    user,
    dummy,
    isLoading,
    user,
  ])

  const updateForNewGame = () => {
    if (isLoading) return
    setSelectedBetMap(new Map())
    setRefreshingBets([])
    setIsLobbyEnabled(true)
    setCount(TIMEOUT)
  }
  useEffect(updateForNewGame, [gameId])

  return (
    <>
      {refreshingBets.length > 0 && (
        <motion.div
          layout="position"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={{
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.06,
                when: "beforeChildren",
                type: "tween",
              },
            },
            hidden: { opacity: 0 },
          }}
        >
          {refreshingBets
            .filter((bet) => bet.status !== "funded")
            .map((bet, index) => (
              <Bet
                key={bet.id !== "" ? bet.id : index}
                bet={bet}
                index={index}
                isLobbyEnabled={isLobbyEnabled}
              />
            ))}
        </motion.div>
      )}
    </>
  )
}
