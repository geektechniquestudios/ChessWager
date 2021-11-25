import { DropdownItem } from "./DropdownItem"

export const Menu: React.FC = () => {
    return (
        <div className="menu">
            <DropdownItem leftIcon="🔒">Privacy</DropdownItem>
            <DropdownItem>My Profile</DropdownItem>
            <DropdownItem rightIcon="🚪">Logout</DropdownItem>
        </div>
    )
}
