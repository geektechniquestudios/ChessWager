import { BsX } from "react-icons/bs"
import { ChatFormState } from "../../../containers/ChatFormState"
import { GlobalChatState } from "../../../containers/GlobalChatState"
import { DropdownButton } from "../../header/dropdown/menus/persona/buttons/DropdownButton"

interface Props {}

export const ReplyingTo: React.FC<Props> = ({}) => {
  const { replyingToMessageId, setReplyingToMessageId } =
    ChatFormState.useContainer()
  const { messages } = GlobalChatState.useContainer()

  const message = messages?.find(
    (message) => message.id === replyingToMessageId,
  )

  return (
    <>
      {replyingToMessageId !== "" && message && (
        <div className="flex w-full items-center justify-between gap-2 border-b border-t border-stone-500 bg-stone-100 px-1 py-1 text-center text-sm font-semibold text-stone-800 dark:border-stone-500 dark:bg-stone-600 dark:text-stone-300">
          <p className="line-clamp-1">
            Replying to {message.userName}: {message.text}
          </p>
          <DropdownButton
            content={<BsX />}
            className="h-4 w-4"
            onClick={() => {
              setReplyingToMessageId("")
            }}
            title="Dismiss"
          />
        </div>
      )}
    </>
  )
}
