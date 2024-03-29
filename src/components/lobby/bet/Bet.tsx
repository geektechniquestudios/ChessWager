import "../../../style/lobby.scss"
import { AuthState } from "../../../containers/AuthState"
import { BigNumber, ethers } from "ethers"
import { User1Data } from "./left/user-data/User1Data"
import { User2Data } from "./right/user-data/User2Data"
import { CenterOfBet } from "./center/CenterOfBet"
import { useEffect, useState } from "react"
import { BetsState } from "../../../containers/BetsState"
import { motion } from "framer-motion"
import { CustomSwal } from "../../popups/CustomSwal"
import { Bet as BetInterface } from "../../../interfaces/Bet"
import { BetHeader } from "./header/BetHeader"

interface Props {
  bet: BetInterface
  index: number
  isLobbyEnabled?: boolean
}

export const Bet: React.FC<Props> = ({ bet, index, isLobbyEnabled = true }) => {
  const { id, amount, multiplier, status, user1Id, user2Id } = bet
  const { auth, user } = AuthState.useContainer()

  const maxDecimals = 18
  const trimmedAmount = Number(amount.toFixed(maxDecimals))
  const bigAmount = ethers.utils.parseEther(trimmedAmount.toString())

  const potSize = ethers.utils.formatEther(
    bigAmount
      .mul(BigNumber.from((multiplier * 100).toFixed(0)))
      .div(100)
      .add(bigAmount),
  )

  const isUser1 = auth.currentUser?.uid === user1Id
  const isUser2 = auth.currentUser?.uid === user2Id
  const { selectedBetMap, setSelectedBetMap } = BetsState.useContainer()

  const selectedState =
    (user ?? false) &&
    (!!(user1Id && user2Id) ||
      ((isUser1 || isUser2) && status !== "funded" && status !== "pending"))

  const [isSelected, setIsSelected] = useState(selectedState)

  useEffect(() => {
    if (isUser2 && status !== "funded") {
      const temp = selectedBetMap.set(id, {
        isSelected: true,
        index,
        id,
      })
      setSelectedBetMap(temp)
    }
    return () => {
      const newMap = new Map(selectedBetMap)
      newMap.delete(id)
      setSelectedBetMap(newMap)
    }
  }, [auth.currentUser])

  const [isJoining, setIsJoining] = useState<boolean>(false)

  const updateSelectedStatus = () => {
    if (!auth.currentUser) {
      CustomSwal(
        "error",
        "Authentication Required!",
        "You must be logged in to bet.",
      )
      return
    }
    if (
      !isUser1 &&
      !isUser2 &&
      status === "ready" &&
      user &&
      id !== "" &&
      isLobbyEnabled &&
      !isJoining
    ) {
      const newMap = new Map(selectedBetMap)
      if (!isSelected) {
        newMap.set(id, {
          isSelected: true,
          index,
          id,
        })
      } else {
        newMap.delete(id)
      }
      setSelectedBetMap(newMap)
      setIsSelected(!isSelected)
    }
  }

  const selectedStyle =
    id === ""
      ? "border-none"
      : status !== "ready" && !isUser1 && !isUser2
        ? "bet-occupied"
        : isSelected
          ? isUser1
            ? "bet-user1"
            : "bet-selected"
          : "bet-not-selected"

  const pointerEvents = status === "ready" && !isUser1 ? "cursor-pointer" : ""

  const disabledStyle =
    (!isLobbyEnabled && !isSelected) || (user2Id && !isUser1 && !isUser2)
      ? "opacity-50 pointer-events-none"
      : ""

  const betHeaderStyle =
    status !== "ready" && !isUser1 && !isUser2
      ? "bet-header-occupied"
      : isSelected
        ? isUser1
          ? "bet-header-user1"
          : "bet-header-selected"
        : "bet-header"

  return (
    <div
      className={`${disabledStyle} color-shift flex h-16 w-full justify-center px-1 py-0.5 align-middle`}
    >
      {id !== "" && (
        <motion.div
          layout="position"
          variants={{
            visible: { opacity: 1, x: 0 },
            hidden: { opacity: 0, x: -10 },
          }}
          transition={{
            type: "spring",
            mass: 0.2,
            bounce: 0.8,
            restSpeed: 0,
          }}
          className={`${selectedStyle} ${pointerEvents} bet color-shift relative z-0 flex max-w-[38rem] grow select-none justify-center overflow-clip whitespace-nowrap rounded-lg border`}
          onClick={updateSelectedStatus}
        >
          <BetHeader bet={bet} betHeaderStyle={betHeaderStyle} />
          <User1Data bet={bet} isSelected={isSelected} />
          <CenterOfBet
            potSize={potSize}
            status={status}
            betHeaderStyle={betHeaderStyle}
          />
          <User2Data
            bet={bet}
            isSelected={isSelected}
            isJoining={isJoining}
            setIsJoining={setIsJoining}
          />
        </motion.div>
      )}
    </div>
  )
}
