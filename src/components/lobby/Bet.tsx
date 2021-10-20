import React from "react"

import Card from "react-bootstrap/Card"
import "../../config"
import firebase from "firebase/compat/app"
import "../../style/lobby.css"
import "firebase/compat/functions"
import Buttons from "./Buttons"
import { GameId } from "../containers/GameId"
import { Auth } from "../containers/Auth"
import { useMoralis } from "react-moralis"
import MetamaskPrompt from "./MetamaskPrompt"

interface Props {
  className: string
  lobbyRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>
  id: string
  amount: number
  betSide: string
  multiplier: number
  status: string
  user1Id: string
  user1Metamask: string
  user1PhotoURL: string
  user2Id: string
  user2Metamask: string
  user2PhotoURL: string
  createdAt: Date
  gameId: string
}

const Bet: React.FC<Props> = ({
  className,
  lobbyRef,
  id, // @todo betId, should update name
  amount,
  betSide,
  multiplier,
  status,
  user1Id,
  user1Metamask,
  user1PhotoURL,
  user2Id,
  user2Metamask,
  user2PhotoURL,
  createdAt,
  gameId,
}) => {
  const { auth } = Auth.useContainer()
  const potSize = amount + amount * multiplier

  const isPending =
    auth.currentUser &&
    // (user1Id === auth.currentUser.uid || user2Id === auth.currentUser.uid) && // what was I thinking?
    status === "pending"

  // const {user} = useMoralis()
  // const user2Metamask = user?.get("ethAddress")

  return (
    <>
      <Card>
        {status === "approved" && (
          <MetamaskPrompt
            betId={id}
            amount={amount}
            betSide={betSide}
            multiplier={multiplier}
            user1Id={user1Id}
            user1Metamask={user1Metamask}
            user2Id={user2Id}
            user2Metamask={user2Metamask}
          />
        )}
        <Card.Body className={`${className} bet`}>
          <Buttons
            id={id}
            status={status}
            user1Id={user1Id}
            user2Id={user2Id}
          />
          <img src={user1PhotoURL} alt="" />
          <span>{status}</span>
          {/* accept button, only for user1 */}

          <span>{`${amount} eth`}</span>
          <span>{`${betSide}`}</span>
          <span>{`x${multiplier}`}</span>
          <span>{`pot size ${potSize}`}</span>
          {user2PhotoURL && <img src={user2PhotoURL} alt="" />}
        </Card.Body>
      </Card>
      <>
        {/* leftoff@todo show conditions of bet and prompt metamask 
          accept and cancel buttons
          cancel would make bet go back to ready
        */}
      </>
    </>
  )
}

export default Bet
