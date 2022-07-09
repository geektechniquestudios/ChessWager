import "../../../../../style/scrollbar.scss"
import {
  collection,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  Query,
  query,
  startAfter,
  where,
} from "firebase/firestore"
import { firebaseApp } from "../../../../../config"
import { Auth } from "../../../../containers/Auth"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { Bet } from "../../../../../interfaces/Bet"
import { BetsListItem } from "./BetsListItem"
import { useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { ThemeProvider } from "@mui/system"
import { LinearProgress } from "@mui/material"

const db = getFirestore(firebaseApp)

export const BetsListArea: React.FC = ({}) => {
  const { auth } = Auth.useContainer()
  const betsRef = collection(db, "lobby")
  const q = query(
    betsRef,
    where("users", "array-contains", auth.currentUser?.uid ?? ""),
    orderBy("createdAt", "desc"),
    limit(10),
  ) as Query<Bet>

  const [bets, isLoading] = useCollectionData<Bet>(q, { idField: "id" }) ?? []
  const [oldBets, setOldBets] = useState<Bet[]>([])

  const fullBets = [...(bets as Bet[]), ...oldBets]

  const [hasMore, setHasMore] = useState(true)

  const loadMoreBets = async () => {
    const lastBet = fullBets[fullBets.length - 1]
    const lastBetId = lastBet.id
    const q = query(
      betsRef,
      where("users", "array-contains", auth.currentUser?.uid ?? ""),
      limit(10),
      orderBy("createdAt", "desc"),
      startAfter(lastBetId),
    ) as Query<Bet>
    const moreOldBets = (await getDocs(q)).docs.map((d) => d.data()) as Bet[]
    setOldBets([...oldBets, ...moreOldBets])
    if (moreOldBets.length < 10) setHasMore(false)
  }

  return (
    <>
      {(bets?.length ?? 0) > 0 || isLoading ? (
        <div
          className="scrollbar-dropdown ml-0.5 h-72 w-full overflow-y-auto overflow-x-hidden"
          style={{ direction: "rtl" }}
        >
          <InfiniteScroll
            scrollThreshold="200px"
            scrollableTarget="scroll-div"
            dataLength={fullBets?.length ?? 0}
            next={loadMoreBets}
            hasMore={hasMore}
            loader={
              
                <LinearProgress />
              
            }
            inverse={true}
            className="flex flex-col-reverse"
          >
            <div style={{ direction: "ltr" }} id="bets-list">
              {bets
                ?.sort(
                  (a, b) => b.createdAt.nanoseconds - a.createdAt.nanoseconds,
                )
                .filter(
                  (bet) => bet.status === "approved" || bet.status === "funded",
                )
                .map((bet: Bet, index: number) => (
                  <BetsListItem key={bet.id + index} {...bet} bet={bet} />
                ))}
            </div>
          </InfiniteScroll>
        </div>
      ) : (
        <div className="mt-10 flex h-72 w-full justify-center text-stone-400 dark:text-stone-400">
          No bets yet
        </div>
      )}
    </>
  )
}
