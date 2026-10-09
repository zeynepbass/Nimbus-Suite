import OrderDetails from "@/components/features/orders/OrderDetails";
import orders from "@/data/orders.json";

export default async function Page({ params }) {
  const { id } = await params;
  const order = orders.find((item) => item.id === id);

  if (!order) return <p className="p-6 text-center text-muted-foreground">Sipariş bulunamadı</p>;

  return <OrderDetails order={order} />;
}
