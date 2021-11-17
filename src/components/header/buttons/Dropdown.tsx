import React from "react"

interface Props {
  children: React.ReactNode
}

const Dropdown: React.FC = props => {
  return (
    <nav className="bg-secondary dark:bg-secondary-secondaryDark">
      <ul className="flex justify-end">{props.children}</ul>
    </nav>
  )
}

export default Dropdown
