import { AlertTriangle } from "lucide-react";

export const ErrorComponent = ({ message = "Ocurrió un error inesperado.", icon = true }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 p-3 border border-red-300 bg-red-50 rounded-xl">
      {icon && (
        <AlertTriangle className="w-10 h-10 text-red-600" />
      )}
      <h2 className="text-lg font-semibold text-red-700">Error</h2>
      <p className="text-red-600 text-center">{message}</p>
    </div>
  );
};
