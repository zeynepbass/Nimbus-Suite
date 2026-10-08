"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function DetailPage({ className, children }) {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className={cn("p-6 max-w-4xl mx-auto", className)}>{children}</div>
    </div>
  );
}

export function DetailActions({ onPrint, onDownload, printLabel = "Yazdır", children }) {
  const handleDownload = async () => {
    try {
      await onDownload();
    } catch {
      toast.error("PDF oluşturulamadı");
    }
  };

  return (
    <div className="flex flex-wrap justify-end gap-2 pt-4">
      <Button onClick={onPrint} className="bg-[#6C120B]">
        {printLabel}
      </Button>
      <Button variant="outline" onClick={handleDownload}>
        PDF İndir
      </Button>
      {children}
    </div>
  );
}
