/* eslint-disable jsx-a11y/anchor-is-valid */
import firebase from "firebase/compat"

import { Card, Spinner } from "react-bootstrap"
import "../../../style/lobby.scss"
import "firebase/compat/functions"
import { Buttons } from "../Buttons"
import { Auth } from "../../containers/Auth"
import { MetamaskPrompt } from "../MetamaskPrompt"
import Countdown from "react-countdown"
import { BigNumber, ethers } from "ethers"
import { BsCoin } from "react-icons/bs"
import { TiDelete, TiDeleteOutline } from "react-icons/ti"
import { VscClose } from "react-icons/vsc"
import { AiOutlineCheck, AiOutlineUser } from "react-icons/ai"

const firestore = firebase.firestore()

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

  // determine if current user is user1 or user2
  const isUser1 = auth.currentUser?.uid === user1Id
  const isUser2 = auth.currentUser?.uid === user2Id
  const isPending =
    auth.currentUser &&
    // (user1Id === auth.currentUser.uid || user2Id === auth.currentUser.uid) && // what was I thinking?
    status === "pending"

  const { displayName }: firebase.User = auth.currentUser!

  const accept = () => {
    const user2Metamask = walletAddress
    //add checks for authentication and metamas

    const acceptBet = firebase.functions().httpsCallable("acceptBet")
    acceptBet({
      betId: id,
      photoURL: auth.currentUser?.photoURL,
      hostUid: user1Id,
      user2Metamask: user2Metamask,
      user2DisplayName: displayName ?? "no name",
    })
      // .then(res => String(res.data))
      // .then(alert)
      .catch(console.error) //@todo do this catch to all or none of the firebase methods
  }

  const cancel = () => {
    const cancelBet = firebase.functions().httpsCallable("cancelBet")
    cancelBet({
      betId: id,
    }).catch(console.error)
  }

  const approve = () => {
    const approveBet = firebase.functions().httpsCallable("approveBet")
    approveBet({
      betId: id,
    }).catch(console.error)
  }

  const deleteCurrentBet = () => {
    const deleteBet = firebase.functions().httpsCallable("deleteBet")
    deleteBet({
      betId: id,
    }).catch(console.error)
  }

  const kick = () => {
    const kickUser = firebase.functions().httpsCallable("kickUser")
    kickUser({
      betId: id,
    }).catch(console.error)
  }

  const block = () => {
    const userCollectionRef = firestore.collection("users")
    const userDocRef = userCollectionRef.doc(auth.currentUser?.uid)
    userDocRef.set(
      {
        blocked: firebase.firestore.FieldValue.arrayUnion(user2Id),
      },
      { merge: true },
    )

    kick()
  }
  const isEnabled =
    user &&
    isWalletConnected &&
    auth.currentUser &&
    user1Id !== auth.currentUser.uid &&
    status === "ready"

  const pointerEvents = isEnabled ? "" : "cursor-default"
  return (
    <div className="w-full flex justify-center align-middle border">
      {status === "approved" &&
        ((isUser1 && !hasUser1Paid) || (isUser2 && !hasUser2Paid)) &&
        timestamp !== undefined &&
        timestamp !== null &&
        timestamp !== 0 && (
          <>
            {/* (if user is user1 and user1 paid) don't show  */}
            {/*  */}
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
            {/* <Countdown
                    date={Date.now() + 15000}
                    renderer={({ seconds }) => seconds}
                  /> */}
            {/* <div className="absolute">
                  <Spinner animation="grow" />
                </div> */}
          </>
        )}

      {user &&
        auth.currentUser &&
        user1Id === auth.currentUser.uid &&
        status !== "approved" && (
          <button
            onClick={deleteCurrentBet}
            className="rounded-full hover:text-negative border-1"
          >
            <VscClose size="1.4em" />
          </button>
        )}
      <a
        href="#"
        className="flex w-96 border-2 justify-center align-middle"
        onClick={accept}
      >
        <div className="flex justify-center align-middle border w-full grow">
          <div className="flex justify-center align-middle w-full">
            <div className="flex justify-between w-full">
              <div className="border">
                <div>
                  {user1FollowThrough[0]} / {user1FollowThrough[1]}
                </div>
                <div className="flex justify-center">trust</div>
              </div>
              <div>
                <img
                  src={user1PhotoURL}
                  alt=""
                  className="h-6 w-6 rounded-full"
                />
                <p className="text-xs">{user1DisplayName}</p>
              </div>
              <div>
                <div>{amount}</div>
                <p className="text-xs flex justify-end">
                  x{parseFloat(multiplier.toString())}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center align-middle border shrink min-w-max">
          <div className="rounded-full border flex justify-center align-middle relative w-20">
            <div className="absolute z-0 text-positive">
              <BsCoin size="1.5rem" />
            </div>
            <div className="absolute z-10 underline decoration-4 font-bold text-primary-dark">
              {potSize}
            </div>
          </div>
        </div>
        <div className="flex justify-center align-middle border w-full grow">
          <div className="flex justify-center align-middle w-full">
            <div className="flex justify-between w-full">
              <div>
                <div>{amount * multiplier}</div>
                <p className="text-xs">
                  x{parseFloat((1 / multiplier).toFixed(2))}
                </p>
              </div>
              <div className="rounded-full border w-6 h-6 grid place-content-center">
                {status === "ready" ? (
                  <AiOutlineUser />
                ) : (
                  <div>
                    <img
                      src={user2PhotoURL}
                      alt=""
                      className="h-6 w-6 rounded-full"
                    />
                    <p className="text-xs"> {user2DisplayName}</p>
                  </div>
                )}
              </div>
              <div>
                {status !== "ready" && (
                  <div className="border">
                    <div>
                      {user2FollowThrough[0]} / {user2FollowThrough[1]}
                    </div>
                    <div className="flex justify-center">trust</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </a>
      {user &&
        auth.currentUser &&
        user1Id === auth.currentUser.uid &&
        status === "pending" && (
          <button
            className="rounded-full hover:text-positive border-1"
            onClick={approve}
          >
            <AiOutlineCheck size="1.4em" />
          </button>
        )}
    </div>
  )
}
