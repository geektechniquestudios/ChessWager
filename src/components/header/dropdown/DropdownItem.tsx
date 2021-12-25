interface Props {
  children?: React.ReactNode
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  goToMenu?: string
  setActiveMenu: any
}

export const DropdownItem: React.FC<Props> = ({
  children,
  leftIcon,
  rightIcon,
  goToMenu,
  setActiveMenu,
}) => {
  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a
      href="#"
      className="menu-item color-shift"
      onClick={() => goToMenu && setActiveMenu(goToMenu)}
    >
      <span className="icon-button">{leftIcon}</span>
      {children}
      <span className="icon-right">{rightIcon}</span>
    </a>
  )
}
