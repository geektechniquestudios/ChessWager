import React from 'react'

const NavItem: React.FC = ({logo}) => {
    return (
        <li>
            <a href="#" className="">
                {logo}
            </a>
        </li>
    )
}

export default NavItem
