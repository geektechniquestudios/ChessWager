import { DropdownItem } from "./DropdownItem"

export const Menu: React.FC = () => {
    return (
        <div className="menu">
            <DropdownItem>My Profile</DropdownItem>
            <DropdownItem leftIcon="🔒">Privacy</DropdownItem>
            <DropdownItem rightIcon="🚪">Logout</DropdownItem>
        </div>
    )
}
