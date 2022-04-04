import "../../../../style/scrollbar.scss"
import { collection, getFirestore, query, where } from "firebase/firestore"
import { firebaseApp } from "../../../../config"
import { Auth } from "../../../containers/Auth"
import { useCollectionDataOnce } from "react-firebase-hooks/firestore"
import { Bet } from "../../../../interfaces/Bet"

const db = getFirestore(firebaseApp)

export const BetsList: React.FC = ({}) => {
  const { auth } = Auth.useContainer()
  const betsRef = collection(db, "lobby")
  const q = query(
    betsRef,
    where("users", "array-contains", auth.currentUser?.uid ?? ""),
    // where("user2Id", "==", auth.currentUser?.uid ?? ""),
  )

  const [bets] =
    useCollectionDataOnce<[Bet[]] | any>(q, { idField: "id" }) ?? []

  return (
    <>
      {bets?.length ?? 0 > 0 ? (
        <div
          className="scrollbar-dropdown h-72 w-full overflow-y-auto overflow-x-hidden ml-0.5"
          style={{ direction: "rtl" }}
        >
          <div className="" style={{ direction: "ltr" }}>
            {bets?.map((bet: Bet) => (
              <div>{bet.id}</div>
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
