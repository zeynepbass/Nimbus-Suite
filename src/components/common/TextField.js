import { useId } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export default function TextField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  multiline = false,
  className,
  ...props
}) {
  const id = useId();
  const Control = multiline ? Textarea : Input;

  return (
    <div className={cn("space-y-1", className)}>
      {label && (
        <Label htmlFor={id} className="text-gray-500">
          {label}
        </Label>
      )}
      <Control
        id={id}
        type={multiline ? undefined : type}
        value={value ?? ""}
        placeholder={placeholder ?? label}
        aria-label={label ? undefined : placeholder}
        onChange={(event) => onChange(event.target.value)}
        {...props}
      />
    </div>
  );
}
