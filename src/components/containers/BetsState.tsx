import { createContainer } from "unstated-next"
import firebase from "firebase/compat/app"
import { GameState } from "./GameState"
import { Bet } from "../../interfaces/Bet"
import { FirebaseError } from "@firebase/util"
import { useCollectionData } from "react-firebase-hooks/firestore"

const firestore = firebase.firestore()

const useBetState = () => {
  const { gameId } = GameState.useContainer()
  const lobbyCollectionRef = firestore.collection("lobby")
  const query = lobbyCollectionRef.where("gameId", "==", gameId)
  const [bets, isLoading]: [Bet[] | undefined, boolean, FirebaseError | undefined] =
    useCollectionData(query, { idField: "id" }) ?? []
  return { bets, isLoading }
}
export const BetsState = createContainer(useBetState)
