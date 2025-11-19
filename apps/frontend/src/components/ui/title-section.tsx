import React from "react";

interface TitleSectionProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  children?: React.ReactNode;
}

export const TitleSection: React.FC<TitleSectionProps> = ({
  title,
  subtitle,
  align = "left",
  className = "",
  titleClassName = "",
  subtitleClassName = "",
  children,
}) => {
  const alignment = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <div
      className={`w-full  pt-4 flex ${alignment[align]} ${className}`}
    >
      {/* Borde izquierdo */}
      <div className="border-l-4 border-accent mr-3" />

      {/* Contenido */}
      <div>
        <h2 className={`text-sm md:text-lg font-bold ${titleClassName}`}>{title}</h2>

        {subtitle && (
          <p className={`text-gray-500 mt-1 ${subtitleClassName}`}>
            {subtitle}
          </p>
        )}

        {children && <div className="mt-3">{children}</div>}
      </div>
    </div>
  );
};
