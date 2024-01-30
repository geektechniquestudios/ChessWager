import { LinearProgress } from "@mui/material"
import {
  collection,
  getDocs,
  limit,
  orderBy,
  Query,
  query,
  startAfter,
  Timestamp,
  where,
} from "firebase/firestore"
import { useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { Bet } from "../../../../../interfaces/Bet"
import "../../../../../style/scrollbar.scss"
import { AuthState } from "../../../../../containers/AuthState"
import { BetsListItem } from "./BetsListItem"

export const BetsListArea: React.FC = ({}) => {
  const { auth, db } = AuthState.useContainer()
  const betsRef = collection(db, "lobby")

  const [hasMore, setHasMore] = useState(true)
  const [bets, setBets] = useState<Bet[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [timestamp] = useState<Timestamp>(Timestamp.now())

  const loadMoreBets = async () => {
    const amountToLoad = 6
    const lastVisible = bets?.[bets.length - 1]?.createdAt ?? timestamp
    const q = query(
      betsRef,
      where("users", "array-contains", auth.currentUser?.uid ?? ""),
      orderBy("createdAt", "desc"),
      limit(amountToLoad),
      startAfter(lastVisible),
    ) as Query<Bet>
    const oldBets: Bet[] = (await getDocs(q)).docs.map((d) => {
      let bet = d.data() as Bet
      bet.id = d.id
      return bet
    }) as Bet[]
    setBets([...(bets ?? []), ...(oldBets ?? [])])
    if (oldBets.length < amountToLoad) setHasMore(false)
  }

  useEffect(() => {
    loadMoreBets().then(() => setIsLoading(false))
  }, [])

  return (
    <div
      className="scrollbar-dropdown h-72 overflow-y-auto overflow-x-clip"
      style={{ direction: "rtl" }}
      id="bets-scroll-div"
    >
      {(bets?.length ?? 0) > 0 ? (
        <InfiniteScroll
          scrollThreshold="200px"
          scrollableTarget="bets-scroll-div"
          dataLength={bets?.length ?? 0}
          next={loadMoreBets}
          hasMore={hasMore}
          loader={<LinearProgress />}
          className="flex flex-col"
        >
          <div style={{ direction: "ltr" }} id="bets-list">
            {bets
              ?.filter(
                (bet) => bet.status === "approved" || bet.status === "funded",
              )
              .map((bet: Bet) => <BetsListItem key={bet.id} bet={bet} />)}
          </div>
        </InfiniteScroll>
      ) : (
        <div className="mt-10 flex h-60 w-full justify-center text-stone-400 dark:text-stone-400">
          {!isLoading && "No bets yet"}
        </div>
      )}
    </div>
  )
}
