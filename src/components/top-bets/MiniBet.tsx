/* eslint-disable jsx-a11y/anchor-is-valid */
import firebase from "firebase/compat"

import { Card, Spinner } from "react-bootstrap"
import "../../style/lobby.scss"
import "firebase/compat/functions"
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
import { Auth } from "../containers/Auth"
import { Price } from "../containers/Price"

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
}

export const MiniBet: React.FC<Props> = ({
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

  const isEnabled =
    user &&
    isWalletConnected &&
    auth.currentUser &&
    user1Id !== auth.currentUser.uid &&
    status === "ready"

  const pointerEvents = isEnabled ? "" : "cursor-default"
  const { avaxPrice } = Price.useContainer()
  return (
    <div className="flex justify-between  p-1">
      <div className="flex gap-1 mx-1">
        <img src={user1PhotoURL} alt="" className="h-6 w-6 rounded-full" />
        <p>vs</p>
        <img src={user2PhotoURL} alt="" className="h-6 w-6 rounded-full" />
      </div>
      <div className="flex flex-col">
        <p>{`$${(Number(potSize) * avaxPrice).toFixed(2)}`}</p>
      </div>
    </div>
  )
}
