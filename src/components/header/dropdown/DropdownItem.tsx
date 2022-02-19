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
      className="h-14 flex items-center rounded-md hover:bg-stone-300 dark:hover:bg-stone-600 p-1 m-0.5 w-full dark:text-stone-200 dark:hover:text-stone-200 color-shift"
      onClick={() => {
        onClick && onClick()
        goToMenu && setActiveMenu(goToMenu)
      }}
    >
      <div>{leftIcon}</div>
      <div className="mx-2">{text}</div>
      <div>{rightIcon}</div>
    </a>
  )
}
