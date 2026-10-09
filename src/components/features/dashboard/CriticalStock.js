"use client";

import { Boxes, Package, ShoppingCart, Wallet } from "lucide-react";
import PageContainer from "@/components/common/PageContainer";
import StatGrid from "@/components/common/StatGrid";
import CriticalStockTable from "@/components/features/products/CriticalStockTable";
import products from "@/data/product";
import useList from "@/hooks/useList";
import { formatCurrency } from "@/lib/format";
import { getTotalRevenue, isCriticalStock } from "@/lib/products";
import { sumBy } from "@/lib/stats";

const criticalProducts = products.filter(isCriticalStock);

export default function CriticalStock() {
  const { items, remove } = useList(criticalProducts);

  const stats = [
    { title: "Toplam Ürün Sayısı", icon: Package, value: items.length },
    { title: "Toplam Ciro", icon: Wallet, value: formatCurrency(getTotalRevenue(items)) },
    { title: "Satılan Toplam Ürün Sayısı", icon: ShoppingCart, value: sumBy(items, (product) => product.sold) },
    { title: "Kritik Toplam Stok", icon: Boxes, value: sumBy(items, (product) => product.stock) },
  ];

  return (
    <PageContainer>
      <StatGrid stats={stats} />
      <CriticalStockTable products={items} onDelete={remove} />
    </PageContainer>
  );
}
