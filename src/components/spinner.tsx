import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface SpinnerProps {
  className?: string;
  size?: number;
  text?: string;
}

function Spinner({ className, size = 18, text }: SpinnerProps) {
  return (
    <div className={cn("flex items-center gap-2 text-white", className)}>
      <Loader2 size={size} className="animate-spin" />
      <span>{text}</span>
    </div>
  );
}

export default Spinner;
