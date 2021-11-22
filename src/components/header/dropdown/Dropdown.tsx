interface Props {
  children: React.ReactNode
}

export const Dropdown: React.FC = props => {
  return (
    <nav className="">
      <ul className="flex justify-end">{props.children}</ul>
    </nav>
  )
}
