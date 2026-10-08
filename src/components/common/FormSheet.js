"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const DefaultTrigger = (
  <Button className="bg-[#628DD0] text-white px-4 py-2">+ Ekle</Button>
);

export default function FormSheet({
  title,
  description,
  onSave,
  trigger = DefaultTrigger,
  children,
}) {
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    if (onSave() !== false) setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <div className="flex justify-end">
        <SheetTrigger asChild>{trigger}</SheetTrigger>
      </div>

      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>

        {children}

        <SheetFooter className="mt-2 flex justify-between">
          <Button onClick={handleSave} className="bg-[#102E46]">
            Kaydet
          </Button>
          <SheetClose asChild>
            <Button variant="outline">Çık</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
