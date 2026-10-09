"use client";

import { AlertTriangle, CheckCircle2, Package, Wallet } from "lucide-react";
import PageContainer from "@/components/common/PageContainer";
import StatGrid from "@/components/common/StatGrid";
import ProductTable from "@/components/features/products/ProductTable";
import products from "@/data/product";
import useList from "@/hooks/useList";
import { formatCurrency } from "@/lib/format";
import { getTotalRevenue, isCriticalStock } from "@/lib/products";

export default function LastOrders() {
  const { items, remove } = useList(products);

  const stats = [
    { title: "Toplam Ürün", icon: Package, value: items.length },
    { title: "Toplam Ciro", icon: Wallet, value: formatCurrency(getTotalRevenue(items)) },
    { title: "Tamamlanan", icon: CheckCircle2, value: items.filter((item) => item.status === "active").length },
    { title: "Kritik Stok", icon: AlertTriangle, value: items.filter(isCriticalStock).length },
  ];

  return (
    <PageContainer>
      <StatGrid stats={stats} />
      <ProductTable
        title="Son Siparişler Listesi"
        products={items}
        onDelete={remove}
        exportable
      />
    </PageContainer>
  );
}
