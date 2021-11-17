import React from 'react'

interface Props {
    msg: string
}

const NavItem: React.FC<Props> = ({msg}) => {
    return (
        <li>
            <a href="#" className="">
                {msg}
            </a>
        </li>
    )
}

export default NavItem
