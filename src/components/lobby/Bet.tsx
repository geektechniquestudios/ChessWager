import React from "react"

import { Card, Spinner } from "react-bootstrap"
import "../../config"
import firebase from "firebase/compat/app"
import "../../style/lobby.scss"
import "firebase/compat/functions"
import Buttons from "./Buttons"
import { Auth } from "../containers/Auth"
import MetamaskPrompt from "./MetamaskPrompt"
import Countdown from "react-countdown"
import { timeStamp } from "console"

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
  hasUser1Paid: boolean
  user2Id: string
  user2Metamask: string
  user2PhotoURL: string
  hasUser2Paid: boolean
  gameId: string
  timestamp: any
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
  hasUser1Paid,
  user2Id,
  user2Metamask,
  user2PhotoURL,
  hasUser2Paid,
  gameId,
  timestamp
}) => {
  const { auth } = Auth.useContainer()
  const potSize = amount + amount * multiplier

  const isPending =
    auth.currentUser &&
    // (user1Id === auth.currentUser.uid || user2Id === auth.currentUser.uid) && // what was I thinking?
    status === "pending"

    
  return (
    <>
      <Card>
        <Card.Body className={`${className} bet`}>
          <Buttons
            id={id}
            status={status}
            user1Id={user1Id}
            user2Id={user2Id}
          />
          <span>
            <img src={user1PhotoURL} alt="" className="user-img"/>
            {hasUser1Paid && "$$$"}
          </span>
          <span>{status}</span>
          {status === "approved" && (
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
              />
              <div className="">
                <div className="absolute">
                  <Countdown
                    date={Date.now() + 15000}
                    renderer={({ seconds }) => seconds}
                  />
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
          <span>{`pot size ${potSize}`}</span>
          <span>
            {user2PhotoURL && <img src={user2PhotoURL} alt="" className="user-img"/>}
            {hasUser2Paid && "$$$"}
          </span>
        </Card.Body>
      </Card>
    </>
  )
}

export default Bet
