import { ChatFormState } from "../../containers/ChatFormState"

interface Props {}

export const CharacterConuter: React.FC<Props> = ({}) => {
  const { chatFormValue } = ChatFormState.useContainer()

  const textOverColor =
    chatFormValue.length > 500
      ? "!text-red-500 dark:!text-red-600 font-bold"
      : ""

  return (
    <div className="flex w-full justify-between p-2">
      <div className="flex text-xs">
        <p
          className={`${textOverColor} w-full text-xs text-stone-950 dark:text-stone-300`}
        >
          {chatFormValue.length}
        </p>
        <p className="font-bold text-stone-800 dark:text-stone-400">/500</p>
      </div>
      <button className="cw-button" type="submit" id="global-chat-button">
        Chat
      </button>
    </div>
  )
}
