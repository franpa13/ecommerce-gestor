import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

interface ReusableTooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
}

export function ReusableTooltip({
  content,
  children,
  side = "top",
  align = "center",
}: ReusableTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side} align={align}>
        {content}
      </TooltipContent>
    </Tooltip>
  );
}
