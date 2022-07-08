import { createTheme, LinearProgress, ThemeProvider } from "@mui/material"
import {
  collection,
  doc,
  DocumentData,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  startAfter,
  Timestamp,
  where,
} from "firebase/firestore"
import { useEffect, useRef, useState } from "react"
import { useCollectionData } from "react-firebase-hooks/firestore"
import InfiniteScroll from "react-infinite-scroll-component"
import { firebaseApp } from "../../../../../config"
import type { Message } from "../../../../../interfaces/Message"
import { Auth } from "../../../../containers/Auth"
import { DarkMode } from "../../../../containers/DarkMode"
import { UserDataState } from "../../../../containers/UserDataState"
import { UserMenuState } from "../../../../containers/UserMenuState"
import { ConvoChatMessage } from "./ConvoChatMessage"
const db = getFirestore(firebaseApp)

interface Props {}

export const ConvoChatBody: React.FC<Props> = ({}) => {
  const { isDarkOn } = DarkMode.useContainer()
  const theme = createTheme({
    palette: {
      primary: {
        main: isDarkOn ? "#34d399" : "#166534",
      },
    },
  })
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
  )

  const [messages] =
    useCollectionData<[Message[]] | any>(q, { idField: "id" }) ?? []

  const [hasMore, setHasMore] = useState(true)

  const [oldMessages, setOldMessages] = useState<Message[] | DocumentData[]>([])
  const fullMessages = [...(messages ?? []), ...oldMessages]

  const loadMoreMessages = async () => {
    const lastVisible = fullMessages?.[0]?.createdAt ?? timestamp
    const q2 = query(
      messagesRef,
      orderBy("createdAt", "desc"),
      limit(15),
      startAfter(lastVisible),
    )
    const moreOldMessages = (await getDocs(q2)).docs.map((d) => d.data())
    setOldMessages([...oldMessages, ...moreOldMessages])
    if (moreOldMessages.length < 15) setHasMore(false)
  }

  useEffect(() => {
    loadMoreMessages()
  }, [])

  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className="scrollbar flex h-96 flex-col-reverse justify-between overflow-y-auto overflow-x-hidden"
      style={{ direction: "rtl" }}
      id="scroll-div"
      ref={scrollRef}
    >
      <InfiniteScroll
        scrollThreshold="200px"
        scrollableTarget="scroll-div"
        dataLength={fullMessages?.length ?? 0}
        next={loadMoreMessages}
        hasMore={hasMore}
        loader={
          <ThemeProvider theme={theme}>
            <LinearProgress />
          </ThemeProvider>
        }
        inverse={true}
        className="flex flex-col-reverse"
      >
        <div style={{ direction: "ltr" }} id="convo-body" className="pt-2">
          {fullMessages
            .reverse()
            ?.filter(
              (message) =>
                !userData.blockedUsers.includes(message.user1Id) &&
                !userData.blockedUsers.includes(message.user2Id),
            )
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
