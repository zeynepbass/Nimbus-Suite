import { FileText } from "lucide-react";

export default function StatCard({ title, value, icon: Icon = FileText }) {
  return (
    <div className="rounded-xl border bg-white p-4 shadow-xs">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-gray-500">{title}</p>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#DEE6F1] text-[#102E46]">
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <p className="mt-2 text-2xl font-bold tabular-nums text-[#102E46]">{value}</p>
    </div>
  );
}
