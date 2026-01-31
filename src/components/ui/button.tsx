import { cn } from "../../lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  children: React.ReactNode
}

export function Button({ 
  className, 
  variant = "default", 
  size = "default", 
  children,
  ...props 
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
        {
          "bg-primary text-primary-foreground hover:bg-primary/90": variant === "default",
          "border border-border bg-transparent hover:bg-secondary text-foreground": variant === "outline",
          "hover:bg-secondary text-foreground": variant === "ghost",
        },
        {
          "h-10 px-4 py-2": size === "default",
          "h-9 px-3": size === "sm",
          "h-11 px-8": size === "lg",
          "h-10 w-10": size === "icon",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}