import * as React from "react"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "destructive" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", ...props }, ref) => {
    const baseClasses = "btn-base"
    const variantClasses = {
      default: "btn-primary",
      secondary: "btn-secondary", 
      outline: "btn-outline",
      destructive: "btn-primary", // fallback
      ghost: "btn-outline", // fallback
      link: "btn-outline" // fallback
    }
    
    const sizeClasses = {
      default: "",
      sm: "text-sm px-3 py-1",
      lg: "text-lg px-6 py-3",
      icon: "w-10 h-10 p-0"
    }

    const combinedClasses = [
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      props.disabled ? "btn-disabled" : "",
      className
    ].filter(Boolean).join(" ")

    return (
      <button
        className={combinedClasses}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }