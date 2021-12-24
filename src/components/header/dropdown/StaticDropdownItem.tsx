interface Props {
  children?: React.ReactNode
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  clickAction?: any
}

export const StaticDropdownItem: React.FC<Props> = ({
  children,
  leftIcon,
  rightIcon,
  clickAction
}) => {
  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a
      href="#"
      className="menu-item"
      onClick={clickAction}
    >
      <span className="icon-button">{leftIcon}</span>
      {children}
      <span className="icon-right">{rightIcon}</span>
    </a>
  )
}
