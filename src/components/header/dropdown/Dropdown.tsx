interface Props {
  children: React.ReactNode
}

export const Dropdown: React.FC<Props> = ({children}) => {
  return (
    <nav className="">
      <ul className="flex justify-end">{children}</ul>
    </nav>
  )
}
