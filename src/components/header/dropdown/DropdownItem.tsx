import { DropdownState } from "../../containers/DropdownState"

interface Props {
  children?: React.ReactNode
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  goToMenu?: string
}

export const DropdownItem: React.FC<Props> = ({
  children,
  leftIcon,
  rightIcon,
  goToMenu,
}) => {
  const { setActiveMenu } = DropdownState.useContainer()
  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a
      href="#"
      className="menu-item color-shift"
      onClick={() => {
        goToMenu && setActiveMenu(goToMenu)
      }}
    >
      <span className="icon-button">{leftIcon}</span>
      <div className="mx-2"> {children}</div>
      <span className="icon-right">{rightIcon}</span>
    </a>
  )
}
