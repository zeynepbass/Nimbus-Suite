import { FALLBACK_STATUS, STATUS } from "@/constants/status";
import { cn } from "@/lib/utils";

export default function StatusBadge({ status, label, dot = false, map = STATUS }) {
  const config = map[status];
  const className = config?.className ?? FALLBACK_STATUS.className;
  const text = label ?? config?.label ?? status;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
        className
      )}
    >
      {dot && (
        <span
          className={cn("h-1.5 w-1.5 rounded-full", config?.dot ?? FALLBACK_STATUS.dot)}
        />
      )}
      {text}
    </span>
  );
}
