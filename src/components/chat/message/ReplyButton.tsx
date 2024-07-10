import { BsReply } from "react-icons/bs"
import { ChatFormState } from "../../../containers/ChatFormState"
import { AuthState } from "../../../containers/AuthState"

interface Props {
  messageId: string
  uid: string
}

export const ReplyButton: React.FC<Props> = ({ messageId, uid }) => {
  const { setReplyingToMessageId } = ChatFormState.useContainer()
  const { user } = AuthState.useContainer()

  const shouldShowReplyButton = user && uid !== user.uid
  return (
    <>
      {shouldShowReplyButton && (
        <button
          className="color-shift opacity-shift clickable !hover:opacity-100 absolute right-0.5 top-0.5 grid h-8 w-8 place-content-center rounded-md border bg-stone-50 text-stone-800 opacity-0 hover:border-stone-400 hover:bg-stone-200 hover:text-black group-hover:opacity-70 dark:border-stone-500 dark:bg-stone-600 dark:text-stone-300 dark:hover:border-white dark:hover:bg-stone-500 dark:hover:text-white"
          onClick={() => {
            setReplyingToMessageId(messageId)
          }}
        >
          <BsReply />
        </button>
      )}
    </>
  )
}
