import { ComponentPropsWithoutRef } from "react"

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
    onClick?: () => void,
    children: React.ReactNode,
}

const Button: React.FC<ButtonProps> = ({ children, type, onClick }) => {
    return (
        <button type={type} onClick={onClick}>
            {children}
        </button>
    )
} 

export default Button