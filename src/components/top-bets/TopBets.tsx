import firebase from "firebase/compat/app"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { GameId } from "../containers/GameId"
import { FirebaseError } from "@firebase/util"
import { MiniBet } from "../lobby/MiniBet"
import { useState } from "react"

const firestore = firebase.firestore()

interface Props {}

interface Lobby {
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
  createdAt: Date
  gameId: string
  timestamp: firebase.firestore.Timestamp
  contractAddress: string
}

export const TopBets: React.FC<Props> = ({}) => {
  const lobbyRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData> =
    firestore.collection("lobby")
  const gameIdContainer = GameId.useContainer()

  const query = lobbyRef.where("gameId", "==", gameIdContainer.gameId)
  // .orderBy("createdAt", "desc")

  const [lobby]: [Lobby[] | undefined, boolean, FirebaseError | undefined] =
    useCollectionData(query, { idField: "id" })

  const [amountAtStake, setAmountAtStake] = useState(0)

  return (
    <>
      <div className="border w-52 h-auto">
        <div className="flex w-full justify-between border-b border-r rounded-br-lg px-1">
          <div className="mx-1 text-sm">Top Bets</div>
          <div className="mx-1 text-sm">{`$${amountAtStake} at Stake`}</div>
        </div>
        {lobby &&
          lobby
            .filter((bet) => bet.status === "funded")
            .map((bet) => (
              <MiniBet
                className="border-2 flex w-full h-12"
                key={bet.id}
                id={bet.id}
                amount={bet.amount}
                betSide={bet.betSide}
                multiplier={bet.multiplier}
                status={bet.status}
                user1Id={bet.user1Id}
                user1Metamask={bet.user1Metamask}
                user1PhotoURL={bet.user1PhotoURL}
                hasUser1Paid={bet.hasUser1Paid}
                user2Id={bet.user2Id}
                user2Metamask={bet.user2Metamask}
                user2PhotoURL={bet.user2PhotoURL}
                hasUser2Paid={bet.hasUser2Paid}
                gameId={bet.gameId}
                timestamp={bet.timestamp?.seconds}
                contractAddress={bet.contractAddress}
              />
            ))}
      </div>{" "}
    </>
  )
}
