import { doc, DocumentReference, getDoc } from "firebase/firestore"
import { AuthState } from "../../../containers/AuthState"
import { Message } from "../../../interfaces/Message"
import { GlobalChatState } from "../../../containers/GlobalChatState"
import { useEffect, useState } from "react"

interface Props {
  message: Message
}

export const ReplyTo: React.FC<Props> = ({ message }) => {
  const { db } = AuthState.useContainer()
  const { messages, setMessageIdBeingRepliedTo } =
    GlobalChatState.useContainer()
  const [replyingToMessageData, setReplyingToMessageData] =
    useState<Message | null>(null)

  useEffect(() => {
    const fetchReplyingToMessageData = async () => {
      const replyingToMessage = messages?.find(
        (m) => m.id === message?.replyingToMessageId,
      )
      if (replyingToMessage) {
        setReplyingToMessageData(replyingToMessage)
        return
      }

      if (message.replyingToMessageId !== "") {
        const replyingToMessageRef = doc(
          db,
          "messages",
          message.replyingToMessageId,
        ) as DocumentReference<Message>
        const docSnap = await getDoc(replyingToMessageRef)
        if (docSnap.exists()) setReplyingToMessageData(docSnap.data())
      }
    }

    fetchReplyingToMessageData()
  }, [message, messages, db])

  return (
    <>
      {replyingToMessageData && (
        <button
          className="color-shift flex gap-0.5 px-4 text-xs text-stone-600 hover:text-stone-700 dark:text-stone-400 hover:dark:text-stone-300"
          onClick={() =>
            setMessageIdBeingRepliedTo(message.replyingToMessageId)
          }
        >
          <div className="line-clamp-1 shrink-0 font-semibold">Replying to</div>
          <div className="line-clamp-1 shrink-0 font-semibold">
            {replyingToMessageData.userName}:
          </div>
          <div className="line-clamp-1 text-start">
            {replyingToMessageData.text}
          </div>
        </button>
      )}
    </>
  )
}
