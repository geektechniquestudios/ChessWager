import { ChatFormState } from "../../containers/ChatFormState"

interface Props {}

export const ReplyingTo: React.FC<Props> = ({}) => {
  const { chatFormValue, setChatFormValue, replyingTo } =
    ChatFormState.useContainer()
  return (
    <div className="grid h-6 w-full place-content-center rounded-tl-lg rounded-tr-lg border-t border-stone-500 bg-stone-300 text-sm font-semibold text-stone-800 dark:border-stone-500 dark:bg-stone-600 dark:text-stone-300">
      Replying to user: some message...
    </div>
  )
}
