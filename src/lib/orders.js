export const getLastStep = (order) => order.timeline?.at(-1) ?? null;

export const countByLastStep = (orders, key) =>
  orders.filter((order) => getLastStep(order)?.key === key).length;

export function getTopSellingProducts(orders) {
  const totals = new Map();

  orders.forEach((order) => {
    order.items.forEach((item) => {
      const current = totals.get(item.productId) ?? {
        productId: item.productId,
        name: item.name,
        price: item.price,
        totalQuantity: 0,
        totalRevenue: 0,
      };

      current.totalQuantity += item.quantity;
      current.totalRevenue += item.price * item.quantity;
      totals.set(item.productId, current);
    });
  });

  return [...totals.values()].sort((a, b) => b.totalQuantity - a.totalQuantity);
}
