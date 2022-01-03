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
import { BsCoin, BsHandThumbsDown, BsHandThumbsUp } from "react-icons/bs"
import { TiDelete, TiDeleteOutline } from "react-icons/ti"
import { VscClose } from "react-icons/vsc"
import { AiOutlineCheck, AiOutlineUser } from "react-icons/ai"
import {
  HiOutlineThumbDown,
  HiOutlineThumbUp,
  HiOutlineUserRemove,
} from "react-icons/hi"
import { GiChessRook, GiCoins } from "react-icons/gi"
import { RiCloseFill } from "react-icons/ri"

import { FaRegHandshake } from "react-icons/fa"
import { FiDollarSign } from "react-icons/fi"
import { MdThumbDown, MdThumbUp } from "react-icons/md"
import {
  BallSpinner,
  DominoSpinner,
  FireworkSpinner,
  JellyfishSpinner,
  SwapSpinner,
} from "react-spinners-kit"

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

  let name: string
  if (user) {
    const { displayName }: firebase.User = auth.currentUser!
    name = displayName ?? "no name"
  }

  const accept = () => {
    const user2Metamask = walletAddress
    //add checks for authentication and metamas

    const acceptBet = firebase.functions().httpsCallable("acceptBet")
    acceptBet({
      betId: id,
      photoURL: auth.currentUser?.photoURL,
      hostUid: user1Id,
      user2Metamask: user2Metamask,
      user2DisplayName: name,
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
      <div className=" flex justify-end ">
        {user &&
          auth.currentUser &&
          user1Id === auth.currentUser.uid &&
          status !== "approved" && (
            <div className="flex">
              <button
                title="Delete"
                onClick={deleteCurrentBet}
                className="rounded-sm bg-negative h-3.5 w-3.5 text-white transform hover:scale-110 ease duration-100 border border-black place-content-center grid mx-1"
              >
                <RiCloseFill size="0.5em" />
              </button>
            </div>
          )}
        {status === "approved" &&
          isUser1 &&
          !hasUser1Paid &&
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
              {/* <Countdown
                    date={Date.now() + 15000}
                    renderer={({ seconds }) => seconds}
                  /> */}
              {/* <div className="absolute">
                  <Spinner animation="grow" />
                </div> */}
            </>
          )}
      </div>

      <a
        href="#"
        className="flex border-2 justify-center align-middle "
        style={{ width: "32em" }}
        onClick={accept}
      >
        <div className="flex justify-center align-middle border w-full ">
          <div className="flex justify-center align-middle w-full">
            <div className="flex justify-between w-full">
              <div className="border flex flex-col justify-center w-16">
                <div className="text-xs flex justify-center align-middle">
                  {user1FollowThrough[0]} / {user1FollowThrough[1]}
                </div>
                <div className="flex justify-center align-middle">
                  <FaRegHandshake title="Follow-through" />
                </div>
                {/* <div className="flex justify-center">trust</div> */}
              </div>
              <div className="flex border-2 rounded-l-full px-1 min-w-min">
                <div className="flex flex-col justify-center align-middle">
                  <div className="rounded-full border w-8 h-8 grid place-content-center">
                    <img
                      src={user1PhotoURL}
                      alt=""
                      className="h-6 w-6 rounded-full"
                    />
                  </div>
                </div>
                <p className="text-xs mx-1">{user1DisplayName}</p>
              </div>
              <div className="mx-1">
                <div>{amount}</div>
                <p className="text-xs flex justify-end transform -translate-y-2 ">
                  x{parseFloat(multiplier.toString())}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center align-middle border shrink min-w-max">
          <div className="rounded-full border flex justify-center align-middle relative w-24 bg-secondary-dark">
            <div className="absolute z-0 text-positive top-2">
              <GiCoins size="1.8rem" />
            </div>
            <div className="absolute z-10 underline decoration-4 font-bold text-primary-dark top-1">
              {potSize}
            </div>
            <div className="absolute left-1 top-1">
              <GiChessRook color={betSide} size="1.4rem" />
            </div>
            <div className="absolute right-1 top-1">
              <GiChessRook
                color={betSide === "white" ? "black" : "white"}
                size="1.4rem"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center align-middle border w-full">
          <div className="flex justify-center align-middle w-full">
            <div className="flex justify-between w-full">
              <div className="mx-1">
                <div>{amount * multiplier}</div>
                <p className="text-xs flex justify-start transform -translate-y-2 ">
                  x{parseFloat((1 / multiplier).toFixed(2))}
                </p>
              </div>
              <div
                className={`flex border-2 rounded-r-full px-1 min-w-min justify-end ${
                  status === "ready" && "rounded-l-full"
                }`}
              >
                {status === "ready" ? (
                  <div className="grid place-content-center">
                    {/* <CircleLoader
                      speedMultiplier={0.3}
                      size={30}
                      color="gray"
                    /> */}
                    <BallSpinner color="black" size={30} />
                  </div>
                ) : (
                  <div className="flex justify-center align-middle">
                    <p className="text-xs mx-1">{user2DisplayName}</p>
                    <div className="flex flex-col justify-center">
                      <div className="rounded-full border w-8 h-8 grid place-content-center">
                        <img
                          src={user2PhotoURL}
                          alt=""
                          className="h-6 w-6 rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="border flex flex-col justify-center w-16">
                {status !== "ready" && (
                  <div>
                    <div className="text-xs flex justify-center align-middle">
                      {user2FollowThrough[0]} / {user2FollowThrough[1]}
                    </div>
                    <div className="flex justify-center align-middle">
                      <FaRegHandshake title="Follow-through" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </a>
      <div className="flex justify-start">
        {user &&
          auth.currentUser &&
          user2Id === auth.currentUser.uid &&
          status === "pending" && (
            <div className="flex">
              <button
                title="Leave"
                onClick={cancel}
                className="rounded-sm bg-negative h-3.5 w-3.5 text-white transform hover:scale-110 ease duration-100 border border-black place-content-center grid mx-1"
              >
                {/* <div className="justify-center align-middle flex flex-col"> */}
                <RiCloseFill size="0.5em" />
                {/* <p className="text-xs">x</p> */}
                {/* </div> */}
              </button>
            </div>
          )}
        {user &&
          auth.currentUser &&
          user1Id === auth.currentUser.uid &&
          status === "pending" && (
            <div className="flex justify-between relative">
              <div className="flex flex-col justify-center">
                <button
                  className="animate-pulse rounded-full h-8 w-8 opacity-100 z-10  grid place-content-center border-2 mx-2 transform hover:scale-110 ease duration-100"
                  onClick={approve}
                >
                  <MdThumbUp color="green" />
                </button>
              </div>
              <div className="flex flex-col justify-center">
                <button
                  className="rounded-full h-8 w-8 opacity-100 z-0 grid place-content-center border-2 mx-2 transform hover:scale-110 ease duration-100"
                  onClick={kick}
                >
                  <MdThumbDown color="red" />
                </button>
              </div>
            </div>
          )}
        {status === "approved" &&
          isUser2 &&
          !hasUser2Paid &&
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
              {/* <Countdown
                    date={Date.now() + 15000}
                    renderer={({ seconds }) => seconds}
                  /> */}
              {/* <div className="absolute">
                  <Spinner animation="grow" />
                </div> */}
            </>
          )}
      </div>
    </div>
  )
}
