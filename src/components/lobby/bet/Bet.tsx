/* eslint-disable jsx-a11y/anchor-is-valid */
import "../../../style/lobby.scss"
import { Auth } from "../../containers/Auth"
import { BigNumber, ethers } from "ethers"
import { User1Data } from "./left/user-data/User1Data"
import { User2Data } from "./right/user-data/User2Data"
import { CenterOfBet } from "./center/CenterOfBet"
import { useEffect, useState } from "react"
import { BetsState } from "../../containers/BetsState"
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
  const { auth, user } = Auth.useContainer()

  const bigAmount = ethers.utils.parseEther(amount.toString())
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
    setIsSelected(selectedState)
    // if (!selectedBetMap.get(id)) {
    //   const newMap = new Map<string, BetData>(selectedBetMap)
    //   newMap.set(id, {
    //     isSelected: selectedState,
    //     index,
    //     id,
    //   })
    //   setSelectedBetMap(newMap)
    // }
  }, [auth.currentUser])

  const updateSelectedStatus = () => {
    if (!auth.currentUser)
      CustomSwal(
        "error",
        "Authentication Required!",
        "You must be logged in to bet.",
      )
    if (
      !isUser1 &&
      !isUser2 &&
      status === "ready" &&
      user &&
      id !== "" &&
      isLobbyEnabled
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

  const innerSelectedStyle =
    id === "" ? "border-none" : isSelected ? "bet-selected" : "bet-not-selected"

  const pointerEvents = status === "ready" && !isUser1 ? "cursor-pointer" : ""

  const disabledStyle =
    !isSelected && (!isLobbyEnabled || (user2Id && !isUser1 && !isUser2))
      ? "opacity-50 pointer-events-none"
      : ""

  const betHeaderStyle = isSelected ? "bet-header-selected" : "bet-header"

  return (
    <motion.div
      layout="position"
      initial="hidden"
      animate="visible"
      variants={{
        visible: { opacity: 1, x: 0 },
        hidden: { opacity: 0, x: -10 },
      }}
      transition={{
        type: "just",
      }}
      className="color-shift flex h-16 w-full justify-center py-0.5 px-1 align-middle"
    >
      {id !== "" && (
        <motion.div
          layout="position"
          className={`${innerSelectedStyle} ${pointerEvents} ${disabledStyle} bet color-shift relative z-0 flex max-w-[38rem] grow select-none justify-center overflow-clip whitespace-nowrap rounded-lg border`}
          onClick={updateSelectedStatus}
        >
          <BetHeader bet={bet} betHeaderStyle={betHeaderStyle} />
          <User1Data bet={bet} isSelected={isSelected} />
          <CenterOfBet
            potSize={potSize}
            status={status}
            betHeaderStyle={betHeaderStyle}
          />
          <User2Data bet={bet} isSelected={isSelected} />
        </motion.div>
      )}
    </motion.div>
  )
}
