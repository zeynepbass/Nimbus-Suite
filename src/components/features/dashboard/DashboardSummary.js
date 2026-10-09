"use client";

import { AlertTriangle, CheckCircle2, Package, Wallet } from "lucide-react";
import OrderStatusChart from "@/components/charts/OrderStatusChart";
import SalesChart from "@/components/charts/SalesChart";
import Panel from "@/components/common/Panel";
import StatGrid from "@/components/common/StatGrid";
import NewHires from "@/components/features/dashboard/NewHires";
import PerformanceTable from "@/components/features/dashboard/PerformanceTable";
import TodayLeaves from "@/components/features/dashboard/TodayLeaves";
import TopProductsList from "@/components/features/dashboard/TopProductsList";
import WelcomeBanner from "@/components/features/dashboard/WelcomeBanner";
import ProductTable from "@/components/features/products/ProductTable";
import SupplierList from "@/components/features/suppliers/SupplierList";
import employees from "@/data/employees";
import orders from "@/data/orders";
import productsData from "@/data/product";
import suppliers from "@/data/supplier";
import useCurrentUser from "@/hooks/useCurrentUser";
import useList from "@/hooks/useList";
import { formatCurrency } from "@/lib/format";
import { getTopSellingProducts } from "@/lib/orders";
import { getTotalRevenue, isCriticalStock } from "@/lib/products";

const topProducts = getTopSellingProducts(orders);
const topSuppliers = suppliers.toSorted((a, b) => b.rating - a.rating);

export default function DashboardSummary() {
  const user = useCurrentUser();
  const { items: products, remove } = useList(productsData);

  const stats = [
    { title: "Toplam Ürün", icon: Package, value: products.length },
    { title: "Toplam Ciro", icon: Wallet, value: formatCurrency(getTotalRevenue(products)) },
    { title: "Aktif Ürünler", icon: CheckCircle2, value: products.filter((p) => p.status === "active").length },
    { title: "Kritik Stok", icon: AlertTriangle, value: products.filter(isCriticalStock).length },
  ];

  return (
    <div className="grid grid-cols-12 gap-4 bg-gray-50 p-5">
      <div className="col-span-12 xl:col-span-9 space-y-8">
        <WelcomeBanner name={user?.name} />

        <div className="space-y-4">
          <StatGrid
            stats={stats}
            className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-0"
          />

          <Panel title="SATIŞ GRAFİĞİ">
            <SalesChart products={products} />
          </Panel>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="bg-white border rounded-2xl shadow-xs">
              <SupplierList suppliers={topSuppliers} />
            </div>
            <Panel>
              <TopProductsList products={topProducts} />
            </Panel>
          </div>
        </div>
      </div>

      <div className="col-span-12 xl:col-span-3 space-y-4 mb-3">
        <Panel title="ÜRÜN DETAY GRAFİĞİ">
          <OrderStatusChart orders={orders} />
        </Panel>
        <Panel title="PERFORMANS GRAFİĞİ">
          <PerformanceTable />
        </Panel>
        <Panel title="BUGÜN İZİNLİ OLAN PERSONELLER">
          <TodayLeaves employees={employees} />
        </Panel>
        <Panel
          title="YENİ İŞE BAŞLAYAN PERSONEL LİSTESİ"
          description="Bugün sisteme eklenen ekip üyeleri"
        >
          <NewHires employees={employees} />
        </Panel>
      </div>

      <div className="col-span-12 bg-white border rounded-2xl shadow-xs px-5 pt-2 pb-3">
        <ProductTable title="ÜRÜN LİSTESİ" products={products} onDelete={remove} />
      </div>
    </div>
  );
}
