import { cn } from "@/lib/utils";

export default function Panel({ title, description, className, children }) {
  return (
    <div className={cn("bg-white border rounded-2xl shadow-xs p-5", className)}>
      {title && (
        <h3 className="text-xs font-semibold tracking-wide text-gray-500 mb-4">{title}</h3>
      )}
      {description && (
        <p className="text-sm text-muted-foreground pb-3 mb-4">{description}</p>
      )}
      {children}
    </div>
  );
}
