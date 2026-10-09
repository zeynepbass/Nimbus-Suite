import StatCard from "@/components/common/StatCard";
import { cn } from "@/lib/utils";

export default function StatGrid({ stats, className }) {
  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-4 gap-4 mb-6", className)}>
      {stats.map(({ title, value, icon }) => (
        <StatCard key={title} title={title} value={value} icon={icon} />
      ))}
    </div>
  );
}
