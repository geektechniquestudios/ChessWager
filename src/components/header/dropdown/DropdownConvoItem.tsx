import { CollectionReference, DocumentData } from "firebase/firestore"
import { DropdownState } from "../../containers/DropdownState"

interface Props {
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

export const DropdownConvoItem: React.FC<Props> = ({
  userName,
  leftIcon,
  rightIcon,
  goToMenu,
  url,
  messageThumbnail,
  onClick,
}) => {
  const { setActiveMenu } = DropdownState.useContainer()
  const address = url ?? "#"
  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a
      href={address}
      target={url ? "_blank" : ""}
      rel="noreferrer"
      className={`h-14 w-64 flex items-center hover:bg-stone-300 dark:hover:bg-stone-600 dark:text-stone-200 text-stone-900 dark:hover:text-stone-200 color-shift`}
      onClick={() => {
        onClick && onClick()
        goToMenu && setActiveMenu(goToMenu)
      }}
    >
      <div className="flex h-full w-full">
        <div className="flex flex-col justify-center w-6 mx-3">{leftIcon}</div>
        <div className="flex flex-col">
          <p className="flex flex-col justify-start my-0.5">{userName}</p>
          <div className="flex w-44">
            <p className="overflow-hidden text-sm text-stone-500 dark:text-stone-400 whitespace-nowrap">
              {messageThumbnail.length > 20
                ? messageThumbnail.substring(0, 20) + "..."
                : messageThumbnail}
            </p>
            {/* <p className="text-sm">...</p> */}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center">{rightIcon}</div>
    </a>
  )
}
