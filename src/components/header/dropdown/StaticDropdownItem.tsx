interface Props {
  children?: React.ReactNode
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  onClick?: any
  url?: string
}

export const StaticDropdownItem: React.FC<Props> = ({
  children,
  leftIcon,
  rightIcon,
  onClick,
  url,
}) => {

  const address = url ?? "#"

  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a href={address} className="menu-item" onClick={onClick}>
      <span className="icon-button">{leftIcon}</span>
      <div className="mx-2"> {children}</div>
      <span className="icon-right">{rightIcon}</span>
    </a>
  )
}
