import { ComponentPropsWithoutRef } from "react"

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
    onClick?: () => void,
    children: React.ReactNode,
}

const Button: React.FC<ButtonProps> = ({ children, type }) => {
    return (
        <button type={type}>
            {children}
        </button>
    )
} 

export default Button