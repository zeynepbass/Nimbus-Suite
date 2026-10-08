"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import DataTable from "@/components/common/DataTable";
import PageContainer from "@/components/common/PageContainer";
import StatGrid from "@/components/common/StatGrid";
import { actionsColumn, copyAction, selectColumn } from "@/components/common/columns";
import { orderColumns as col } from "@/components/features/orders/orderColumns";
import { toOrderRows } from "@/components/features/orders/orderExcel";
import {
  getInvoices,
  removeInvoice,
} from "@/components/features/invoices/invoiceStorage";
import useList from "@/hooks/useList";
import { formatCurrency } from "@/lib/format";
import { countByLastStep } from "@/lib/orders";
import { downloadOrderPDF } from "@/lib/pdf";
import { sumBy } from "@/lib/stats";

export default function InvoiceTable() {
  const router = useRouter();
  const [initialInvoices] = useState(getInvoices);
  const { items: invoices, remove } = useList(initialInvoices, {
    removeMessage: "Fatura silindi",
  });

  const stats = [
    { title: "Toplam Fatura", value: invoices.length },
    { title: "Toplam Ciro", value: formatCurrency(sumBy(invoices, (invoice) => invoice.totalPrice)) },
    { title: "Tamamlanan", value: countByLastStep(invoices, "completed") },
    { title: "Bekleyen", value: countByLastStep(invoices, "pending") },
  ];

  const handleRemove = (id) => {
    removeInvoice(id);
    remove(id);
  };

  const handleDownload = async (invoice) => {
    try {
      await downloadOrderPDF(invoice);
    } catch {
      toast.error("PDF oluşturulamadı");
    }
  };

  const columns = [
    selectColumn,
    col.id,
    col.customerName,
    col.createdAt,
    col.paymentMethod,
    col.totalPrice,
    col.timeline,
    actionsColumn((invoice) => [
      copyAction(invoice.id),
      {
        label: "Siparişi Gör",
        tone: "accent",
        onClick: () => router.push(`/sales/orders/${invoice.id}`),
      },
      { label: "PDF İndir", onClick: () => handleDownload(invoice) },
      { label: "Sil", tone: "danger", onClick: () => handleRemove(invoice.id) },
    ]),
  ];

  return (
    <PageContainer className="space-y-0">
      <StatGrid stats={stats} />
      <DataTable
        title="Faturalar Listesi"
        data={invoices.toReversed()}
        columns={columns}
        exportRows={toOrderRows(invoices)}
      />
    </PageContainer>
  );
}
