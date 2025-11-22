import { AlertCircle } from "lucide-react";

interface FormErrorProps {
  message?: string;
  icon?: boolean;
  className?: string;
}

export const FormError = ({
  message = "Ocurrió un error.",
  icon = true,
  className = "",
}: FormErrorProps) => {
  return (
    <div className={`flex items-center gap-2 text-sm text-red-600 ${className}`}>
      {icon && <AlertCircle className="w-4 h-4" />}
      <p>{message}</p>
    </div>
  );
};
