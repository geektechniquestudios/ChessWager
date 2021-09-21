import React from "react"

const Bet = ({
  id,
  amount,
  isBetWhite,
  multiplier,
  status,
  user1,
  user2,
  createdAt,
  createWager
}) => {
  return <div>
    <button onClick={createWager}> Accept Bet </button>
    test
    {id}
  </div>
}

export default Bet
