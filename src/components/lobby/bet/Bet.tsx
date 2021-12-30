/* eslint-disable jsx-a11y/anchor-is-valid */
import { Card, Spinner } from "react-bootstrap"
import "../../../style/lobby.scss"
import "firebase/compat/functions"
import { Buttons } from "../Buttons"
import { Auth } from "../../containers/Auth"
import { MetamaskPrompt } from "../MetamaskPrompt"
import Countdown from "react-countdown"
import { BigNumber, ethers } from "ethers"
import firebase from "firebase/compat"

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
  hasUser1Paid: boolean
  user2Id: string
  user2Metamask: string
  user2PhotoURL: string
  hasUser2Paid: boolean
  gameId: string
  timestamp: number
  contractAddress: string
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
  hasUser1Paid,
  user2Id,
  user2Metamask,
  user2PhotoURL,
  hasUser2Paid,
  gameId,
  timestamp,
  contractAddress,
}) => {
  const { walletAddress, auth, user, isWalletConnected } = Auth.useContainer()
  const bigAmount = ethers.utils.parseEther(amount.toString())
  const potSize = ethers.utils.formatEther(
    bigAmount
      .mul(BigNumber.from((multiplier * 100).toFixed(0)))
      .div(100)
      .add(bigAmount),
  )

  // determine if current user is user1 or user2
  const isUser1 = auth.currentUser?.uid === user1Id
  const isPending =
    auth.currentUser &&
    // (user1Id === auth.currentUser.uid || user2Id === auth.currentUser.uid) && // what was I thinking?
    status === "pending"

  const accept = () => {
    const user2Metamask = walletAddress
    //add checks for authentication and metamask
    const acceptBet = firebase.functions().httpsCallable("acceptBet")
    acceptBet({
      betId: id,
      photoURL: auth.currentUser?.photoURL,
      hostUid: user1Id,
      user2Metamask: user2Metamask,
    })
      // .then(res => String(res.data))
      // .then(alert)
      .catch(console.error) //@todo do this catch to all or none of the firebase methods
  }

  const isEnabled =
    user &&
    isWalletConnected &&
    auth.currentUser &&
    user1Id !== auth.currentUser.uid &&
    status === "ready"

  const pointerEvents = isEnabled ? "" : "cursor-default"

  return (
    <a
      href="#"
      onClick={accept}
      className={`${className} bet ${pointerEvents} justify-center border`}
    >
      <Buttons id={id} status={status} user1Id={user1Id} user2Id={user2Id} />
      <span>
        <img src={user1PhotoURL} alt="" className="user-img" />
        {hasUser1Paid && "$$$"}
      </span>
      <span>{status}</span>
      {status === "approved" &&
        ((isUser1 && !hasUser1Paid) || (!isUser1 && !hasUser2Paid)) &&
        timestamp !== undefined &&
        timestamp !== null &&
        timestamp !== 0 && (
          <>
            <MetamaskPrompt
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
            />
            <div className="">
              <div className="absolute">
                {/* <Countdown
                    date={Date.now() + 15000}
                    renderer={({ seconds }) => seconds}
                  /> */}
              </div>
              {/* <div className="absolute">
                  <Spinner animation="grow" />
                </div> */}
            </div>
          </>
        )}
      {/* accept button, only for user1 */}
      <span>{`${amount} eth`}</span>
      <span>{`${betSide}`}</span>
      <span>{`x${multiplier}`}</span>
      <span>{`pot size ${potSize.toString()}`}</span>
      <span>
        {user2PhotoURL && (
          <img src={user2PhotoURL} alt="" className="user-img" />
        )}
        {hasUser2Paid && "$$$"}
      </span>
    </a>
  )
}
