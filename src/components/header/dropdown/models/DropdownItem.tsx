import { DropdownState } from "../../../../containers/DropdownState"

interface Props {
  text?: React.ReactNode
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  goToMenu?: string
  url?: string
  onClick?: () => void
  isBackButton?: boolean
  id?: string
}

export const DropdownItem: React.FC<Props> = ({
  id,
  text,
  leftIcon,
  rightIcon,
  goToMenu,
  url,
  onClick,
  isBackButton,
}) => {
  const {
    setActiveMenu,
    menuStack,
    setMenuStack,
    goToMenu: goToMenuDropdown,
  } = DropdownState.useContainer()
  const address = url ?? "#"
  const backStyle = isBackButton ? "h-8 text-sm" : "h-12"
  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a
      id={id}
      href={address}
      target={url ? "_blank" : ""}
      rel="noreferrer noopener"
      className={`${backStyle} color-shift flex items-center px-4 text-stone-900 hover:bg-stone-300 dark:text-stone-200 dark:hover:bg-stone-600 dark:hover:text-stone-200`}
      onClick={() => {
        onClick && onClick()
        goToMenu && goToMenuDropdown(goToMenu)
        isBackButton && setActiveMenu(menuStack[menuStack.length - 2])
        isBackButton && setMenuStack(menuStack.slice(0, -1))
      }}
    >
      {isBackButton ? (
        <>
          <div className="flex items-center ">{leftIcon}</div>
          <p className=" mx-2">{text}</p>
        </>
      ) : (
        <div className="flex w-full gap-3">
          <div className="flex items-center">{leftIcon}</div>
          <p className="flex items-center">{text}</p>
        </div>
      )}
      <div className="flex items-center">{rightIcon}</div>
    </a>
  )
}
