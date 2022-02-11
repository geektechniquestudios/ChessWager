import firebase from "firebase/compat/app"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { GameId } from "../containers/GameId"
import { FirebaseError } from "@firebase/util"
import { MiniBet } from "./MiniBet"
import { Price } from "../containers/Price"
import "../../style/fundedbets.scss"

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
  user1DisplayName: string
  user2DisplayName: string
}

export const FundedBets: React.FC<Props> = () => {
  const lobbyRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData> =
    firestore.collection("lobby")
  const gameIdContainer = GameId.useContainer()

  const query = lobbyRef.where("gameId", "==", gameIdContainer.gameId)

  const [lobby]: [Lobby[] | undefined, boolean, FirebaseError | undefined] =
    useCollectionData(query, { idField: "id" })

  const { avaxPrice } = Price.useContainer()

  let amountAtStake = (
    (lobby
      ?.filter((bet) => bet.status === "funded")
      .map((bet) => bet.amount + bet.amount * bet.multiplier)
      .reduce((a, b) => a + b, 0) ?? 0) * avaxPrice
  )
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  return (
    <div
      className="w-52 overflow-y-hidden flex flex-col overflow-x-visible "
      style={{ direction: "rtl" }}
    >
      <div className="flex w-full justify-between px-0.5 py-1 bg-gradient-to-r from-stone-300 via-stone-300 to-transparent dark:from-stone-800 dark:via-stone-800 dark:to-transparent dark:text-stone-50">
        <div />
        <div
          className="mx-1 text-sm"
          style={{ direction: "ltr" }}
        >{`$${amountAtStake} at Stake`}</div>
      </div>
      <div className="h-0.5 bg-gradient-to-r from-secondary-dark to-transparent" />
      <div className="overflow-y-hidden overflow-x-visible flex flex-col h-full">
        <div
          style={{ direction: "rtl" }}
          className="funded-bets overflow-y-auto overflow-x-visible h-full flex flex-col"
        >
          <div
            className="overflow-x-visible h-0 flex flex-col"
            style={{ direction: "ltr" }}
          >
            {lobby &&
              lobby
                .sort((a, b) => b.amount - a.amount)
                .filter((bet) => bet.status === "funded")
                .map((bet) => (
                  <MiniBet
                    key={bet.id}
                    amount={bet.amount}
                    betSide={bet.betSide}
                    multiplier={bet.multiplier}
                    user1PhotoURL={bet.user1PhotoURL}
                    user2PhotoURL={bet.user2PhotoURL}
                    user1DisplayName={bet.user1DisplayName}
                    user2DisplayName={bet.user2DisplayName}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  )
}
