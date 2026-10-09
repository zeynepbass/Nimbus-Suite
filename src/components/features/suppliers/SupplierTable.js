"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CheckCircle2, PauseCircle, Star, Truck } from "lucide-react";
import DataTable from "@/components/common/DataTable";
import PageContainer from "@/components/common/PageContainer";
import StatGrid from "@/components/common/StatGrid";
import StatusBadge from "@/components/common/StatusBadge";
import { actionsColumn, selectColumn, sortableHeader } from "@/components/common/columns";
import SupplierCreateSheet from "@/components/features/suppliers/SupplierCreateSheet";
import SupplierUpdateDialog from "@/components/features/suppliers/SupplierUpdateDialog";
import { toSupplierRows } from "@/components/features/suppliers/supplierExcel";
import suppliersData from "@/data/supplier";
import useList from "@/hooks/useList";
import { nextId } from "@/lib/ids";
import { averageBy } from "@/lib/stats";

const staticColumns = [
  selectColumn,
  {
    accessorKey: "id",
    header: sortableHeader("Firma No"),
    cell: ({ row }) => <span className="font-semibold">{row.getValue("id")}</span>,
  },
  {
    accessorKey: "name",
    header: sortableHeader("Firma Adı"),
    cell: ({ row }) => <span className="font-semibold">{row.getValue("name")}</span>,
  },
  {
    accessorKey: "contact.person",
    header: "Yetkili",
    cell: ({ row }) => (
      <span className="text-sm text-gray-600">{row.original.contact.person}</span>
    ),
  },
  { accessorKey: "address.city", header: "Şehir" },
  {
    id: "productCount",
    header: "Ürün Sayısı",
    cell: ({ row }) => <span className="font-medium">{row.original.products.length}</span>,
  },
  {
    accessorKey: "status",
    header: "Durum",
    cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
  },
];

export default function SupplierTable() {
  const router = useRouter();
  const { items: suppliers, add, update, remove } = useList(suppliersData, {
    removeMessage: "Tedarikçi silindi",
  });
  const [selected, setSelected] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const activeCount = suppliers.filter((s) => s.status === "active").length;

  const stats = [
    { title: "Toplam Tedarikçi", icon: Truck, value: suppliers.length },
    { title: "Aktif", icon: CheckCircle2, value: activeCount },
    { title: "Pasif", icon: PauseCircle, value: suppliers.length - activeCount },
    { title: "Ortalama Puan", icon: Star, value: averageBy(suppliers, (s) => s.rating).toFixed(1) },
  ];

  const handleCreate = (values) => {
    add({
      ...values,
      id: nextId("SUP", suppliers),
      createdAt: new Date().toISOString(),
    });
    toast.success("Tedarikçi eklendi");
  };

  const handleUpdate = (supplier) => {
    update(supplier.id, supplier);
    toast.success("Güncellendi");
  };

  const openUpdateDialog = (supplier) => {
    setSelected(supplier);
    setDialogOpen(true);
  };

  const columns = [
    ...staticColumns,
    actionsColumn(
      (supplier) => [
        {
          label: "Detayı Gör",
          onClick: () => router.push(`/supplier/${supplier.id}`),
        },
        { label: "Güncelle", onClick: () => openUpdateDialog(supplier) },
        { label: "Sil", tone: "danger", onClick: () => remove(supplier.id) },
      ],
      "Aksiyonlar"
    ),
  ];

  return (
    <PageContainer>
      <StatGrid stats={stats} className="mb-0" />

      <SupplierUpdateDialog
        supplier={selected}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleUpdate}
      />

      <DataTable
        title="Tedarikçiler Listesi"
        searchPlaceholder="Firma No ile filtreleme yöntemi"
        data={suppliers.toReversed()}
        columns={columns}
        exportRows={toSupplierRows(suppliers)}
        toolbarActions={<SupplierCreateSheet onCreate={handleCreate} />}
      />
    </PageContainer>
  );
}
