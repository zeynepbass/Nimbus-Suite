import SupplierDetails from "@/components/features/suppliers/SupplierDetails";
import suppliers from "@/data/supplier.json";

export default async function Page({ params }) {
  const { id } = await params;
  const supplier = suppliers.find((item) => item.id === id);

  if (!supplier) return <p className="p-6 text-center text-muted-foreground">Tedarikçi bulunamadı</p>;

  return <SupplierDetails supplier={supplier} />;
}
