import { DropdownState } from "../../containers/DropdownState"

interface Props {
  text?: React.ReactNode
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  goToMenu?: string
  url?: string
  onClick?: () => void
}

export const DropdownItem: React.FC<Props> = ({
  text,
  leftIcon,
  rightIcon,
  goToMenu,
  url,
  onClick,
}) => {
  const { setActiveMenu } = DropdownState.useContainer()
  const address = url ?? "#"
  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a
      href={address}
      className="h-14 flex items-center rounded-md hover:bg-stone-300 dark:hover:bg-stone-600 px-2 m-0.5 w-full dark:text-stone-200 dark:hover:text-stone-200 color-shift"
      onClick={() => {
        onClick && onClick()
        goToMenu && setActiveMenu(goToMenu)
      }}
    >
      <div className="w-full flex gap-3">
        <div className="flex flex-col justify-center">{leftIcon}</div>
        <div className="">{text}</div>
      </div>
      <div className="flex flex-col justify-center">{rightIcon}</div>
    </a>
  )
}
