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
  const { setActiveMenu, menuStack, setMenuStack } =
    DropdownState.useContainer()
  const unreadStyle = isRead ? "" : "bg-stone-400 dark:bg-stone-800"
  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a
      href={url ?? "#"}
      target={url ? "_blank" : ""}
      rel="noreferrer"
      className={`h-12 w-64 flex items-center hover:bg-stone-300 dark:hover:bg-stone-600 dark:text-stone-200 text-stone-900 dark:hover:text-stone-200 color-shift ${unreadStyle}`}
      onClick={() => {
        onClick && onClick()
        goToMenu && setActiveMenu(goToMenu)
        goToMenu && setMenuStack([...menuStack, goToMenu])
      }}
    >
      <div className="flex h-full w-full">
        <div className="flex flex-col justify-center w-6 mx-3">{leftIcon}</div>
        <div className="flex flex-col justify-center">
          <p className="flex">{userName}</p>
          <div className="flex w-44">
            <p className="overflow-hidden text-sm text-stone-500 dark:text-stone-400 whitespace-nowrap">
              {messageThumbnail.length > 20
                ? messageThumbnail.substring(0, 20) + "..."
                : messageThumbnail}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center">{rightIcon}</div>
    </a>
  )
}
