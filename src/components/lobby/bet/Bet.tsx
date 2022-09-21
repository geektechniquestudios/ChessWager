/* eslint-disable jsx-a11y/anchor-is-valid */
import "../../../style/lobby.scss"
import { Auth } from "../../containers/Auth"
import { BigNumber, ethers } from "ethers"
import { User1Data } from "./left/user-data/User1Data"
import { User2Data } from "./right/user-data/User2Data"
import { LeftButtons } from "./left/buttons/LeftButtons"
import { RightButtons } from "./right/buttons/RightButtons"
import { CenterOfBet } from "./center/CenterOfBet"
import { useEffect, useState } from "react"
import { BetsState } from "../../containers/BetsState"
import { AnimatePresence, motion } from "framer-motion"

interface Props {
  id: string
  amount: number
  betSide: string
  multiplier: number
  status: string
  user1Id: string
  user1Metamask: string
  user1PhotoURL: string
  user1DisplayName: string
  hasUser1Paid: boolean
  user2Id: string
  user2Metamask: string
  user2PhotoURL: string
  user2DisplayName: string
  hasUser2Paid: boolean
  gameId: string
  timestamp: number
  contractAddress: string
  user1FollowThrough: number[]
  user2FollowThrough: number[]
  index?: number
  isLobbyEnabled?: boolean
}

export const Bet: React.FC<Props> = ({
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
  gameId,
  timestamp,
  contractAddress,
  user1FollowThrough,
  user2FollowThrough,
  index,
  isLobbyEnabled,
}) => {
  isLobbyEnabled = isLobbyEnabled ?? true
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
  const [isSelected, setIsSelected] = useState(
    (isUser1 || isUser2) && status !== "funded" && status !== "pending"
      ? true
      : false,
  )

  useEffect(() => {
    setIsSelected(
      !!(user1Id && user2Id) ||
        ((isUser1 || isUser2) &&
          auth.currentUser &&
          status !== "funded" &&
          status !== "pending"),
    )
  }, [auth.currentUser, user1Id, user2Id, status])

  useEffect(() => {
    setSelectedBetMap(new Map())
  }, [gameId])

  const selectedStyle =
    isSelected || id === ""
      ? "bg-stone-100 dark:bg-black"
      : "hover:bg-stone-200 dark:hover:bg-stone-900 dark:bg-stone-800 bg-stone-300"

  const pointerEvents = status === "ready" && !isUser1 ? "cursor-pointer" : ""

  const disabledStyle =
    isLobbyEnabled || isSelected ? "" : "opacity-50 pointer-events-none"

  const updateSelectedStatus = () => {
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
          index: index!,
          id: id,
        })
      } else {
        newMap.delete(id)
      }
      setSelectedBetMap(newMap)
      setIsSelected(!isSelected)
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        className="h-26 flex w-full justify-center overflow-x-hidden p-0.5 align-middle lg:h-14"
      >
        <div
          className={`${pointerEvents} color-shift flex w-full justify-center rounded-lg border border-stone-400 px-1 align-middle dark:border-stone-700 ${selectedStyle} ${disabledStyle}`}
          onClick={updateSelectedStatus}
        >
          {id !== "" && (
            <>
              <div className="flex w-full justify-end">
                <LeftButtons
                  user1Id={user1Id}
                  status={status}
                  id={id}
                  amount={amount}
                  betSide={betSide}
                  multiplier={multiplier}
                  user1Metamask={user1Metamask}
                  hasUser1Paid={hasUser1Paid}
                  user2Id={user2Id}
                  user2Metamask={user2Metamask}
                  gameId={gameId}
                  timestamp={timestamp}
                  contractAddress={contractAddress}
                  isSelected={isSelected}
                />
                <User1Data
                  user1FollowThrough={user1FollowThrough}
                  user1PhotoURL={user1PhotoURL}
                  user1DisplayName={user1DisplayName}
                  amount={amount}
                  multiplier={multiplier}
                  user2Id={user2Id}
                  status={status}
                  hasUser1Paid={hasUser1Paid}
                  user1Id={user1Id}
                />
              </div>
              <CenterOfBet potSize={potSize} betSide={betSide} />
              <div className="flex w-full justify-start">
                <User2Data
                  user2FollowThrough={user2FollowThrough}
                  user2PhotoURL={user2PhotoURL}
                  user2DisplayName={user2DisplayName}
                  user1Id={user1Id}
                  user2Id={user2Id}
                  amount={amount}
                  multiplier={multiplier}
                  status={status}
                  isSelected={isSelected}
                  id={id}
                  hasUser2Paid={hasUser2Paid}
                />
                <RightButtons
                  user2Id={user2Id}
                  status={status}
                  user1Id={user1Id}
                  id={id}
                  amount={amount}
                  betSide={betSide}
                  multiplier={multiplier}
                  user2Metamask={user2Metamask}
                  hasUser2Paid={hasUser2Paid}
                  user1Metamask={user1Metamask}
                  gameId={gameId}
                  timestamp={timestamp}
                  contractAddress={contractAddress}
                  isSelected={isSelected}
                />
              </div>
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
