"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import DataTable from "@/components/common/DataTable";
import InlineNumberInput from "@/components/common/InlineNumberInput";
import { actionsColumn, copyAction, selectColumn } from "@/components/common/columns";
import { productColumns as col } from "@/components/features/products/productColumns";
import { toProductRows } from "@/components/features/products/productExcel";
import { useRouter } from "next/navigation";

export default function StockSettings({ products, onStockChange, onDelete }) {
  const router = useRouter();
  const [editingId, setEditingId] = useState(null);

  const commit = (id, stock) => {
    onStockChange(id, stock);
    setEditingId(null);
  };

  const stockColumn = {
    ...col.stock,
    cell: ({ row }) => {
      const product = row.original;

      return (
        <div className="text-center font-semibold">
          {editingId === product.id ? (
            <InlineNumberInput
              label={`${product.name} stok miktarı`}
              initialValue={product.stock}
              onCommit={(stock) => commit(product.id, stock)}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <div className="flex items-center gap-2 justify-center">
              <span>{product.stock}</span>
              <button
                type="button"
                className="rounded p-1 hover:bg-gray-100"
                aria-label={`${product.name} stok miktarını düzenle`}
                onClick={() => setEditingId(product.id)}
              >
                <Pencil width="15" height="15" />
              </button>
            </div>
          )}
        </div>
      );
    },
  };

  const columns = [
    selectColumn,
    col.id,
    col.name,
    col.createdAt,
    stockColumn,
    col.status,
    actionsColumn((product) => [
      copyAction(product.id),
      {
        label: "Detay Gör",
        tone: "accent",
        onClick: () => router.push(`/dashboard/critical/${product.id}`),
      },
      { label: "İptal Et", tone: "danger", onClick: () => onDelete(product.id) },
    ]),
  ];

  return (
    <DataTable
      title="Stok ve Ürün Ayarları"
      searchPlaceholder="Ürün No ile filtreleme yöntemi"
      data={products.toReversed()}
      columns={columns}
      exportRows={toProductRows(products)}
    />
  );
}
