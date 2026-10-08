"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export default function InlineNumberInput({
  initialValue,
  onCommit,
  onCancel,
  min = 0,
  max,
  step = 1,
  label,
  className,
}) {
  const [value, setValue] = useState(String(initialValue));

  const commit = () => {
    const number = Number(value);
    const isValid =
      value.trim() !== "" &&
      Number.isFinite(number) &&
      number >= min &&
      (max === undefined || number <= max);

    if (isValid) onCommit(number);
    else onCancel();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") commit();
    if (event.key === "Escape") onCancel();
  };

  return (
    <input
      autoFocus
      type="number"
      min={min}
      max={max}
      step={step}
      aria-label={label}
      value={value}
      onChange={(event) => setValue(event.target.value)}
      onBlur={commit}
      onKeyDown={handleKeyDown}
      className={cn("border px-2 py-1 rounded w-20 text-center", className)}
    />
  );
}
