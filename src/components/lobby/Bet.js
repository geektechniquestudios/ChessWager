import React from "react"

import Card from "react-bootstrap/Card"

import "../../style/lobby.css"

const Bet = ({
  id,
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
  auth,
}) => {
  const potSize = amount + amount * multiplier

  const acceptBet = () => {
    //@todo popup modal with stats about bet,
    // when both people hit ready, popup metamask, timer 10s?
    //
    return <> {alert("This isn't built yet!")}</>
  }
  
  return (
    <div>
      <Card>
        <Card.Body className="bet">
          <img src={user1PhotoURL} alt="" />
          <button onClick={acceptBet}> Accept Bet </button>
          <span>{`${amount} eth`}</span>
          <span>{`${betSide}`}</span>
          <span>{`x${multiplier}`}</span>
          <span>{`pot size ${potSize}`}</span>
          {user2PhotoURL !== "" && <img src={user2PhotoURL} alt="" />}
        </Card.Body>
      </Card>
    </div>
  )
}

export default Bet
