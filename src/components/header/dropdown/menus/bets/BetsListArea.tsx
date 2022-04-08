import "../../../../../style/scrollbar.scss"
import { collection, getFirestore, query, where } from "firebase/firestore"
import { firebaseApp } from "../../../../../config"
import { Auth } from "../../../../containers/Auth"
import { useCollectionDataOnce } from "react-firebase-hooks/firestore"
import { Bet } from "../../../../../interfaces/Bet"
import { BetsListItem } from "./BetsListItem"

const db = getFirestore(firebaseApp)

export const BetsListArea: React.FC = ({}) => {
  const { auth } = Auth.useContainer()
  const betsRef = collection(db, "lobby")
  const q = query(
    betsRef,
    where("users", "array-contains", auth.currentUser?.uid ?? ""),
  )

  const [bets, isLoading] =
    useCollectionDataOnce<[Bet[], boolean] | any>(q, { idField: "id" }) ?? []

  return (
    <>
      {(bets?.length ?? 0) > 0 || isLoading ? (
        <div
          className="scrollbar-dropdown h-72 w-full overflow-y-auto overflow-x-hidden ml-0.5"
          style={{ direction: "rtl" }}
        >
          <div style={{ direction: "ltr" }}>
            {bets
              ?.sort((a, b) => b.createdAt - a.createdAt)
              .filter(
                (bet) => bet.status === "approved" || bet.status === "funded",
              )
              .map((bet: Bet, index: number) => (
                <BetsListItem key={bet.id + index} {...bet} bet={bet} />
              ))}
          </div>
        </div>
      ) : (
        <div className="h-72 mt-10 w-full justify-center flex dark:text-stone-400 text-stone-400">
          No bets yet
        </div>
      )}
    </>
  )
}
