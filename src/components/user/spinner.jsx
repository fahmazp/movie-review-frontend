import { cn } from "@/lib/utils";
import { Loader } from 'lucide-react';

const sizesClasses = {
  xs: "w-4 h-4",
  sm: "w-5 h-5",
  md: "w-6 h-6",
  lg: "w-8 h-8",
  xl: "w-10 h-10",
};

const strokeClasses = {
  gray: "stroke-foreground",
  blue: "stroke-blue-500",
  red: "stroke-red-500",
  green: "stroke-emerald-500",
  yellow: "stroke-yellow-500",
};

export const SpokeSpinner = ({ size = "md", color = "yellow" }) => {
  return (
    <div aria-label="Loading..." role="status">
      <Loader
        className={cn(
          "animate-spin",
          sizesClasses[size],
          strokeClasses[color]
        )}
      />
    </div>
  );
};
