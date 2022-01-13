/* eslint-disable jsx-a11y/anchor-is-valid */
import firebase from "firebase/compat"

import "../../../style/lobby.scss"
import "firebase/compat/functions"
import { Auth } from "../../containers/Auth"
import { BigNumber, ethers } from "ethers"
import { DeleteBetButton } from "./DeleteBetButton"
import { User1Metamask } from "./User1Metamask"
import { User2Metamask } from "./User2Metamask"
import { LeaveButton } from "./LeaveButton"
import { ApproveButton } from "./ApproveButton"
import { KickButton } from "./KickButton"
import { User1FollowThrough } from "./User1FollowThrough"
import { User1Image } from "./User1Image"
import { User1BetAmount } from "./User1BetAmount"
import { CenterOfBet } from "./CenterOfBet"
import { User2BetAmount } from "./User2BetAmount"
import { User2Image } from "./User2Image"
import { User2FollowThrough } from "./User2FollowThrough"

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
  const { walletAddress, auth, user, isWalletConnected } = Auth.useContainer()
  const bigAmount = ethers.utils.parseEther(amount.toString())
  const potSize = ethers.utils.formatEther(
    bigAmount
      .mul(BigNumber.from((multiplier * 100).toFixed(0)))
      .div(100)
      .add(bigAmount),
  )

  let name: string
  if (user) {
    const { displayName }: firebase.User = auth.currentUser!
    name = displayName ?? "no name"
  }

  const accept = () => {
    const acceptBet = firebase.functions().httpsCallable("acceptBet")
    acceptBet({
      betId: id,
      photoURL: auth.currentUser?.photoURL,
      hostUid: user1Id,
      user2Metamask: walletAddress,
      user2DisplayName: name,
    }).catch(console.error)
  }

  const isEnabled =
    user &&
    isWalletConnected &&
    auth.currentUser &&
    user1Id !== auth.currentUser.uid &&
    status === "ready"

  return (
    <div className="w-full flex justify-center align-middle border overflow-x-auto">
      <User1Metamask
        betId={id}
        amount={amount}
        betSide={betSide}
        multiplier={multiplier}
        user1Id={user1Id}
        user1Metamask={user1Metamask}
        user2Id={user2Id}
        user2Metamask={user2Metamask}
        gameId={gameId}
        timestamp={timestamp}
        contractAddress={contractAddress}
        status={status}
        hasUser1Paid={hasUser1Paid}
      />

      <div className=" flex justify-end ">
        <DeleteBetButton user1Id={user1Id} status={status} id={id} />
      </div>

      <button
        className="flex border-2 justify-center align-middle "
        onClick={accept}
      >
        <div className="flex justify-center align-middle w-full">
          <div className="flex justify-between w-full">
            <User1FollowThrough user1FollowThrough={user1FollowThrough} />
            <User1Image
              user1PhotoURL={user1PhotoURL}
              user1DisplayName={user1DisplayName}
            />
            <User1BetAmount amount={amount} multiplier={multiplier} />
          </div>
        </div>
        <CenterOfBet potSize={potSize} betSide={betSide} />
        <div className="flex justify-center align-middle w-full">
          <div className="flex justify-between w-full">
            <User2BetAmount amount={amount} multiplier={multiplier} />
            <User2Image
              user2PhotoURL={user2PhotoURL}
              user2DisplayName={user2DisplayName}
              status={status}
            />
            <User2FollowThrough
              user2FollowThrough={user2FollowThrough}
              status={status}
            />
          </div>
        </div>
      </button>

      <div className="flex justify-start">
        <LeaveButton user2Id={user2Id} status={status} id={id} />
        <div className="flex justify-between relative">
          <ApproveButton user1Id={user1Id} status={status} betId={id} />
          <KickButton user1Id={user1Id} status={status} betId={id} />
        </div>
      </div>

      <User2Metamask
        betId={id}
        amount={amount}
        betSide={betSide}
        multiplier={multiplier}
        user1Id={user1Id}
        user1Metamask={user1Metamask}
        user2Id={user2Id}
        user2Metamask={user2Metamask}
        gameId={gameId}
        timestamp={timestamp}
        contractAddress={contractAddress}
        status={status}
        hasUser2Paid={hasUser2Paid}
      />
    </div>
  )
}
