import "../../../style/header.scss"

interface Props {
  children: React.ReactNode
}

export const DropdownMenu: React.FC<Props> = ({ children }) => {
  return (
    <nav className="">
      <ul className="flex justify-end">{children}</ul>
    </nav>
  )
}
