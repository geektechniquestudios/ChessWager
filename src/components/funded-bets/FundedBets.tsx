import firebase from "firebase/compat/app"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { GameState } from "../containers/GameState"
import { FirebaseError } from "@firebase/util"
import { MiniBet } from "./MiniBet"
import { Price } from "../containers/Price"
import "../../style/scrollbar.scss"
import { Auth } from "../containers/Auth"
import { BetsState } from "../containers/BetsState"

const firestore = firebase.firestore()

interface Props {}

interface Bet {
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
  const gameIdContainer = GameState.useContainer()

  const { avaxPrice } = Price.useContainer()

  const { bets } = BetsState.useContainer()

  const amountAtStake = (
    (bets
      ?.filter((bet) => bet.status === "funded")
      .map((bet) => bet.amount + bet.amount * bet.multiplier)
      .reduce((a, b) => a + b, 0) ?? 0) * avaxPrice
  )
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  const { auth } = Auth.useContainer()
  const isBetRelatedToUser = (bet: Bet): boolean => {
    return (
      auth.currentUser?.uid === bet.user1Id ||
      auth.currentUser?.uid === bet.user2Id
    )
  }

  return (
    <div
      className="w-52 overflow-y-hidden flex flex-col overflow-x-visible shrink-0"
      style={{ direction: "rtl" }}
    >
      <div className="flex w-full justify-between px-0.5 py-1 bg-gradient-to-r from-stone-300 via-stone-300 to-transparent dark:from-stone-800 dark:via-stone-800 dark:to-transparent dark:text-stone-50">
        <div />
        <div
          className="mx-1 text-sm"
          style={{ direction: "ltr" }}
        >{`$${amountAtStake} at Stake`}</div>
      </div>
      <div className="h-0.5 bg-gradient-to-r from-stone-600 to-transparent" />
      <div className="overflow-y-hidden overflow-x-visible flex flex-col h-full">
        <div
          style={{ direction: "rtl" }}
          className="scrollbar-funded overflow-y-auto overflow-x-visible h-full flex flex-col"
        >
          <div
            className="overflow-x-visible h-0 flex flex-col"
            style={{ direction: "ltr" }}
          >
            {bets
              ?.sort((a, b) => b.amount - a.amount)
              .filter(
                (bet) => bet.status === "funded" && isBetRelatedToUser(bet),
              )
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
          <div
            className="overflow-x-visible h-0 flex flex-col"
            style={{ direction: "ltr" }}
          >
            {bets
              ?.sort((a, b) => b.amount - a.amount)
              .filter(
                (bet) => bet.status === "funded" && !isBetRelatedToUser(bet),
              )
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
