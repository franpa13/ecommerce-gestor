import { cn } from "../../lib/utils"
import { Button, buttonVariants } from "./button"
import type { VariantProps } from "class-variance-authority"


interface CustomButtonProps {
    label: string
    loading?: boolean
    icon?: React.ReactElement
    onClick?: () => void
    className?: string
    variant?: VariantProps<typeof buttonVariants>["variant"]
    disabled?: boolean
}

export const CustomButton = ({
    label,
    loading = false,
    icon,
    onClick,
    className,
    variant = "default",
    disabled = false
}: CustomButtonProps) => {
    return (
        <Button
            onClick={onClick}
            disabled={disabled || loading}
            variant={variant}
            className={cn("flex items-center gap-2", className)}
        >
            {loading ? (
                <span className="animate-spin h-4 w-4 border-2 border-t-transparent rounded-full" />
            ) : (
                icon
            )}

            {label}
        </Button>
    );
};
