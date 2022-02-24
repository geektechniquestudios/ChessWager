import { DropdownState } from "../../containers/DropdownState"

interface Props {
  text?: React.ReactNode
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  goToMenu?: string
  url?: string
  onClick?: () => void
  height?: number
}

export const DropdownItem: React.FC<Props> = ({
  text,
  leftIcon,
  rightIcon,
  goToMenu,
  url,
  onClick,
  height,
}) => {
  const { setActiveMenu } = DropdownState.useContainer()
  const address = url ?? "#"
  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a
      href={address}
      target={url ? "_blank" : ""}
      rel="noreferrer"
      className={`h-14 w-64 px-4 flex items-center hover:bg-stone-300 dark:hover:bg-stone-600 dark:text-stone-200 text-stone-900 dark:hover:text-stone-200 color-shift`}
      onClick={() => {
        onClick && onClick()
        goToMenu && setActiveMenu(goToMenu)
      }}
    >
      <div className="w-full flex gap-3">
        <div className="flex flex-col justify-center">{leftIcon}</div>
        <p>{text}</p>
      </div>
      <div className="flex flex-col justify-center">{rightIcon}</div>
    </a>
  )
}
