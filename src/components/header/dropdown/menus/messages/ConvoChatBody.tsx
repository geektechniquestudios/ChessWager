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
import { LayoutGroup } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { useCollectionData } from "react-firebase-hooks/firestore"
import InfiniteScroll from "react-infinite-scroll-component"
import type { Message } from "../../../../../interfaces/Message"
import { AuthState } from "../../../../../containers/AuthState"
import { UserDataState } from "../../../../../containers/UserDataState"
import { UserMenuState } from "../../../../../containers/UserMenuState"
import { ConversationMenuHeader } from "./ConversationMenuHeader"
import { ConvoChatMessage } from "./ConvoChatMessage"

interface Props {}

export const ConvoChatBody: React.FC<Props> = ({}) => {
  const { userData } = UserDataState.useContainer()
  const { auth, db } = AuthState.useContainer()
  const { userIdFromMessages } = UserMenuState.useContainer()
  const convoId = [auth.currentUser?.uid, userIdFromMessages].sort().join("-")
  const messagesRef = collection(db, "conversations", convoId, "messages")

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
    const lastVisible =
      fullMessages?.[fullMessages.length - 1]?.createdAt ?? timestamp
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

  const scrollingContainerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className="scrollbar flex h-96 flex-col-reverse justify-between overflow-y-auto overflow-x-hidden"
      style={{ direction: "rtl" }}
      id="convo-scroll-div"
      ref={scrollingContainerRef}
    >
      <ConversationMenuHeader scrollingContainerRef={scrollingContainerRef} />
      <div className="flex h-full flex-col-reverse">
        <InfiniteScroll
          scrollThreshold="100px"
          scrollableTarget="convo-scroll-div"
          dataLength={fullMessages?.length ?? 0}
          next={loadMoreMessages}
          hasMore={hasMore}
          loader={fullMessages.length > 6 && <LinearProgress />}
          className="flex flex-col-reverse"
          initialScrollY={1}
          inverse
        >
          <div
            style={{ direction: "ltr" }}
            id="convo-body"
            className="flex flex-col overflow-hidden pt-2"
          >
            <LayoutGroup>
              {fullMessages
                .slice()
                .reverse()
                ?.filter(
                  (message) => !userData?.blockedUsers.includes(message.uid),
                )
                .map((message: Message) => (
                  <ConvoChatMessage
                    key={message.createdAt.toString()}
                    message={message}
                  />
                ))}
            </LayoutGroup>
          </div>
        </InfiniteScroll>
      </div>
    </div>
  )
}
