"use client";

import LeaveTable from "@/components/features/leaves/LeaveTable";
import StockSettings from "@/components/features/products/StockSettings";
import UsersSettings from "@/components/features/settings/UsersSettings";
import SupplierList from "@/components/features/suppliers/SupplierList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ROLES } from "@/constants/roles";
import productsData from "@/data/product";
import suppliersData from "@/data/supplier";
import usersData from "@/data/users";
import useList from "@/hooks/useList";
import { nextNumericId } from "@/lib/ids";

const members = usersData.filter((user) => user.role === ROLES.USER);

const TABS = [
  { value: "account", label: "Kullanıcılar" },
  { value: "supplier", label: "Tedarikçiler" },
  { value: "stock", label: "Stok ve Ürün Ayarı" },
  { value: "leaves", label: "İzinler" },
];

const TAB_TRIGGER = "bg-white text-gray-500";
const TAB_CONTENT = "bg-white gap-1 text-gray-500 rounded-lg shadow-sm";

export default function SettingsTabs() {
  const users = useList(members, { removeMessage: "Kullanıcı silindi" });
  const suppliers = useList(suppliersData);
  const products = useList(productsData);

  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="h-auto flex-wrap justify-start gap-2 bg-gray-50">
        {TABS.map(({ value, label }) => (
          <TabsTrigger key={value} value={value} className={TAB_TRIGGER}>
            {label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="account" className={`${TAB_CONTENT} p-6`}>
        <UsersSettings
          users={users.items}
          onCreate={(user) => users.add({ ...user, id: nextNumericId(usersData.concat(users.items)) })}
          onRemove={users.remove}
        />
      </TabsContent>

      <TabsContent value="supplier" className={TAB_CONTENT}>
        <SupplierList
          suppliers={suppliers.items}
          onRatingChange={(id, rating) => suppliers.update(id, { rating })}
        />
      </TabsContent>

      <TabsContent value="stock" className={TAB_CONTENT}>
        <div className="p-6">
          <StockSettings
            products={products.items}
            onStockChange={(id, stock) => products.update(id, { stock })}
            onDelete={products.remove}
          />
        </div>
      </TabsContent>

      <TabsContent value="leaves" className={TAB_CONTENT}>
        <LeaveTable editable />
      </TabsContent>
    </Tabs>
  );
}
