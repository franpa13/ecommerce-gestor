import { cn } from "../../lib/utils";
import { CustomButton } from "./custom-button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./dialog";

interface CustomDialogProps {
    trigger?: React.ReactNode;
    title?: string;
    description?: string;
    children?: React.ReactNode;
    className?: string;
    size?: "sm" | "md" | "lg" | "xl" | "full" | string; // Permite cualquier string
    width?: string; // opcional y sobrescribe al size
}

/** Conversión de size → width(px) */
const sizeToWidth: Record<string, string> = {
    sm: "400px",
    md: "500px",
    lg: "600px",
    xl: "900px",
    full: "95vw",
};

export const CustomDialog = ({
    trigger = "Open",
    title,
    description,
    children,
    className,
    size = "md",
    width,
}: CustomDialogProps) => {
    // Determina el ancho final
    const getFinalWidth = () => {
        if (width) return width;
        
        // Si el size es uno de los predefinidos, usa el mapeo
        if (size in sizeToWidth) {
            return sizeToWidth[size];
        }
        
        // Si el size es un string personalizado, úsalo directamente
        // Verifica si ya incluye unidades, si no, añade 'px'
        if (typeof size === "string" && size.match(/^\d/)) {
            return size.includes('px') || size.includes('%') || size.includes('vw') || size.includes('rem') 
                ? size 
                : `${size}px`;
        }
        
        // Si es otro string (como clases de Tailwind), devuélvelo tal cual
        return size;
    };

    const finalWidth = getFinalWidth();

    return (
        <Dialog>
            <DialogTrigger asChild>
                {typeof trigger === "string" ? (
                    <CustomButton label={trigger} />
                ) : (
                    trigger
                )}
            </DialogTrigger>

            <DialogContent
                className={cn(
                    "p-4", 
                    className,
                    // Solo aplica max-width si el tamaño no es una clase de Tailwind
                    typeof finalWidth === "string" && 
                    !finalWidth.includes(' ') && 
                    (finalWidth.includes('px') || finalWidth.includes('%') || finalWidth.includes('vw') || finalWidth.includes('rem'))
                        ? `max-w-[${finalWidth}]`
                        : finalWidth
                )}
                style={{
                    // Aplica el ancho directamente como estilo para valores numéricos
                    ...(typeof finalWidth === "string" && 
                         !finalWidth.includes(' ') && 
                         (finalWidth.includes('px') || finalWidth.includes('%') || finalWidth.includes('vw') || finalWidth.includes('rem'))
                         ? { maxWidth: finalWidth }
                         : {})
                }}
            >
                {(title || description) && (
                    <DialogHeader>
                        {title && <DialogTitle>{title}</DialogTitle>}
                        {description && (
                            <DialogDescription>{description}</DialogDescription>
                        )}
                    </DialogHeader>
                )}

                {children}
            </DialogContent>
        </Dialog>
    );
};