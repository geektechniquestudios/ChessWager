/* eslint-disable jsx-a11y/anchor-is-valid */
import "../../../style/lobby.scss"
import "firebase/compat/functions"
import { Auth } from "../../containers/Auth"
import { BigNumber, ethers } from "ethers"
import { User1Data } from "./User1Data"
import { User2Data } from "./User2Data"
import { LeftButtons } from "./LeftButtons"
import { RightButtons } from "./RightButtons"
import { CenterOfBet } from "./CenterOfBet"
import { useState } from "react"

interface Props {
  className: string
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
}

export const Bet: React.FC<Props> = ({
  className,
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
}) => {
  const { auth } = Auth.useContainer()
  const bigAmount = ethers.utils.parseEther(amount.toString())
  const potSize = ethers.utils.formatEther(
    bigAmount
      .mul(BigNumber.from((multiplier * 100).toFixed(0)))
      .div(100)
      .add(bigAmount),
  )

  const isUser1 = auth.currentUser?.uid === user1Id
  const isUser2 = auth.currentUser?.uid === user2Id
  const [isSelected, setIsSelected] = useState(
    isUser1 || isUser2 ? true : false,
  )
  const selectedStyle = isSelected
    ? " selected-bet bg-stone-300"
    : "hover:bg-stone-400"

  return (
    <div className={`bet w-full flex justify-center align-middle`}>
      <a
        className={`flex justify-center align-middle w-full px-1 py-0.5 ${selectedStyle}`}
        onClick={() => {
          status === "ready" && !isUser1 && setIsSelected(!isSelected)
        }}
        href="#"
      >
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
        <div className="flex gap-0.5">
          <User1Data
            user1FollowThrough={user1FollowThrough}
            user1PhotoURL={user1PhotoURL}
            user1DisplayName={user1DisplayName}
            amount={amount}
            multiplier={multiplier}
          />
          <CenterOfBet potSize={potSize} betSide={betSide} />
          <User2Data
            user2FollowThrough={user2FollowThrough}
            user2PhotoURL={user2PhotoURL}
            user2DisplayName={user2DisplayName}
            user1Id={user1Id}
            amount={amount}
            multiplier={multiplier}
            status={status}
            isSelected={isSelected}
            id={id}
          />
        </div>
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
      </a>
    </div>
  )
}
