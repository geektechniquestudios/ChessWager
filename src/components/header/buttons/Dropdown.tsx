interface Props {
  children: React.ReactNode
}

const Dropdown: React.FC = props => {
  return (
    <nav className="">
      <ul className="flex justify-end">{props.children}</ul>
    </nav>
  )
}

export default Dropdown
