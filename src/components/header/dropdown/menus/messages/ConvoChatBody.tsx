import { LinearProgress } from "@mui/material"
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  Query,
  query,
  startAfter,
  Timestamp,
  where,
} from "firebase/firestore"
import { useEffect, useRef, useState } from "react"
import { useCollectionData } from "react-firebase-hooks/firestore"
import InfiniteScroll from "react-infinite-scroll-component"
import { firebaseApp } from "../../../../../../firestore.config"
import type { Message } from "../../../../../interfaces/Message"
import { Auth } from "../../../../containers/Auth"
import { UserDataState } from "../../../../containers/UserDataState"
import { UserMenuState } from "../../../../containers/UserMenuState"
import { ConvoChatMessage } from "./ConvoChatMessage"

const db = getFirestore(firebaseApp)

interface Props {}

export const ConvoChatBody: React.FC<Props> = ({}) => {
  const { userData } = UserDataState.useContainer()
  const { auth } = Auth.useContainer()
  const { userIdFromMessages } = UserMenuState.useContainer()
  const convoId = [auth.currentUser?.uid, userIdFromMessages].sort().join("-")
  const messagesRef = collection(doc(db, "conversations", convoId), "messages")

  const [timestamp] = useState<Timestamp>(Timestamp.now())
  const q = query(
    messagesRef,
    orderBy("createdAt", "desc"),
    where("createdAt", ">", timestamp),
  ) as Query<Message>

  const [messages] = useCollectionData<Message>(q, { idField: "id" }) ?? []

  const [hasMore, setHasMore] = useState(true)

  const [oldMessages, setOldMessages] = useState<Message[]>([])
  const fullMessages = [...(messages ?? []), ...(oldMessages ?? [])]

  const loadMoreMessages = async () => {
    const amountToLoad = 15
    const lastVisible = fullMessages?.[0]?.createdAt ?? timestamp
    const q2 = query(
      messagesRef,
      orderBy("createdAt", "desc"),
      limit(amountToLoad),
      startAfter(lastVisible),
    )
    const moreOldMessages = (await getDocs(q2)).docs.map((d) =>
      d.data(),
    ) as Message[]

    setOldMessages([...oldMessages, ...moreOldMessages])
    if (moreOldMessages.length < amountToLoad) setHasMore(false)
  }

  useEffect(() => {
    loadMoreMessages()
  }, [])

  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className="scrollbar flex h-96 flex-col-reverse justify-between overflow-y-auto overflow-x-hidden"
      style={{ direction: "rtl" }}
      id="convo-scroll-div"
      ref={scrollRef}
    >
      <InfiniteScroll
        scrollThreshold="200px"
        scrollableTarget="convo-scroll-div"
        dataLength={fullMessages?.length ?? 0}
        next={loadMoreMessages}
        hasMore={hasMore}
        loader={<LinearProgress />}
        inverse
        className="flex flex-col-reverse"
      >
        <div style={{ direction: "ltr" }} id="convo-body" className="pt-2">
          {fullMessages
            .reverse()
            ?.filter((message) => !userData?.blockedUsers.includes(message.uid))
            .map((message: Message) => (
              <ConvoChatMessage
                key={message.createdAt.toMillis()}
                {...message}
              />
            ))}
        </div>
      </InfiniteScroll>
    </div>
  )
}
