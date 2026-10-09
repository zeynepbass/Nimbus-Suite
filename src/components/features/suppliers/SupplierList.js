"use client";

import { useState } from "react";
import { Building2, Pencil } from "lucide-react";
import InlineNumberInput from "@/components/common/InlineNumberInput";
import StatusBadge from "@/components/common/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SupplierList({ suppliers, onRatingChange }) {
  const [editingId, setEditingId] = useState(null);

  const commit = (id, rating) => {
    onRatingChange(id, rating);
    setEditingId(null);
  };

  return (
    <Card className="w-full bg-transparent shadow-none border-none">
      <CardHeader>
        <CardTitle className="text-xs font-semibold tracking-wide text-gray-500">TEDARİKÇİLER</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 border-0">
        {suppliers.map((supplier) => (
          <div
            key={supplier.id}
            className="flex items-center justify-between gap-3 rounded-xl border p-4 hover:bg-muted/50 transition"
          >
            <div className="space-y-1 mr-auto">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <p className="text-base font-semibold">{supplier.name}</p>
              </div>
              <p className="text-sm text-muted-foreground">Firma No: {supplier.id}</p>
              <p className="text-sm">
                Yetkili: <span className="font-medium">{supplier.contact.person}</span>
              </p>
            </div>

            <div className="flex flex-col items-end gap-2">
              {onRatingChange && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  aria-label={`${supplier.name} puanını düzenle`}
                  onClick={() => setEditingId(supplier.id)}
                >
                  <Pencil />
                </Button>
              )}

              {editingId === supplier.id ? (
                <InlineNumberInput
                  label={`${supplier.name} puanı`}
                  initialValue={supplier.rating}
                  max={5}
                  step={0.1}
                  onCommit={(rating) => commit(supplier.id, rating)}
                  onCancel={() => setEditingId(null)}
                />
              ) : (
                <Badge className="bg-[#6c120b] text-white gap-1">⭐ {supplier.rating}</Badge>
              )}

              <StatusBadge status={supplier.status} />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
