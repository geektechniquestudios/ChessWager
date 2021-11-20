interface Props {
    leftIcon?: string
    rightIcon?: string
}

export const DropdownItem: React.FC<Props> = (props) => {
    return (
        <a href="#" className="menu-item">
            <span className="icon-button">{props.leftIcon}</span>
            {props.children}
            <span className="icon-right">{props.rightIcon}</span>
        </a>
    )
}
