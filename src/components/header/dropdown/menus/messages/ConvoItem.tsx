import { CollectionReference, DocumentData } from "firebase/firestore"
import { DropdownState } from "../../../../containers/DropdownState"

interface Props {
  isRead: boolean
  userId: string
  userName?: React.ReactNode
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  goToMenu?: string
  url?: string
  onClick?: () => void
  specificConvoCollectionRef: (
    docId: string,
  ) => CollectionReference<DocumentData>
  messageThumbnail: string
}

export const ConvoItem: React.FC<Props> = ({
  isRead,
  userId,
  userName,
  leftIcon,
  rightIcon,
  goToMenu,
  url,
  messageThumbnail,
  onClick,
}) => {
  const unreadStyle = isRead
    ? "dark:text-stone-400 text-stone-600"
    : "font-bold dark:text-stone-300 text-stone-700"

  const { goToMenu: goToMenuDropdown } = DropdownState.useContainer()

  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a
      href={url ?? "#"}
      target={url ? "_blank" : ""}
      rel="noreferrer noopener"
      className={`${unreadStyle} color-shift flex h-12 items-center text-stone-900 hover:bg-stone-300 dark:text-stone-200 dark:hover:bg-stone-600 dark:hover:text-stone-200`}
      onClick={() => {
        onClick && onClick()
        goToMenu && goToMenuDropdown(goToMenu)
      }}
    >
      <div className="flex h-full w-full">
        <div className="mx-3 flex w-6 flex-col justify-center">{leftIcon}</div>
        <div className="flex flex-col justify-center">
          <p className="flex">{userName}</p>
          <p className="overflow-hidden whitespace-nowrap text-sm text-stone-500 dark:text-stone-400">
            {messageThumbnail.length > 20
              ? messageThumbnail.substring(0, 20) + "..."
              : messageThumbnail}
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-center">{rightIcon}</div>
    </a>
  )
}
