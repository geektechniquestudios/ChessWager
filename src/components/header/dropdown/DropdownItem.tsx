interface Props {
    leftIcon?: string
    rightIcon?: string
    children?: React.ReactNode
}

export const DropdownItem: React.FC<Props> = ({leftIcon, rightIcon, children}) => {
    return (
        <a href="#" className="menu-item color-shift">
            <span className="icon-button color-shift">{leftIcon}</span>
            {children}
            <span className="icon-right color-shift">{rightIcon}</span>
        </a>
    )
}
