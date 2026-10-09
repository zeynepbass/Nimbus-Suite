import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import employees from "@/data/employees";
import { getInitials } from "@/lib/format";
import { cn } from "@/lib/utils";

const ranked = employees.toSorted((a, b) => b.performanceScore - a.performanceScore);

export default function PerformanceTable() {
  return (
    <ol className="max-h-80 space-y-1 overflow-y-auto">
      {ranked.map((employee, index) => (
        <li key={employee.id} className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-gray-50">
          <span className="w-4 text-xs font-semibold text-gray-400">{index + 1}</span>
          <Avatar className="h-8 w-8">
            <AvatarImage src={employee.avatar} alt="" />
            <AvatarFallback>{getInitials(employee.fullName)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{employee.fullName}</p>
            <p className="truncate text-xs text-muted-foreground">{employee.position}</p>
          </div>
          <span
            className={cn(
              "flex items-center gap-1 text-sm font-semibold tabular-nums",
              index === 0 ? "text-[#6C120B]" : "text-[#102E46]"
            )}
          >
            <Star className="h-3.5 w-3.5 fill-current" />
            {employee.performanceScore.toFixed(1)}
          </span>
        </li>
      ))}
    </ol>
  );
}
