import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/format";

function Metric({ label, children }) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-muted-foreground">{label}:</span>
      {children}
    </div>
  );
}

export default function TopProductsList({ products }) {
  return (
    <div className="space-y-4 overflow-y-auto max-h-100">
      <h3 className="text-xs font-semibold tracking-wide text-gray-500">EN ÇOK SATAN ÜRÜNLER</h3>

      {products.map((product) => (
        <div
          key={product.productId}
          className="flex items-center gap-4 rounded-xl border p-4 hover:shadow-sm transition"
        >
          <Avatar className="h-10 w-10 bg-gray-600">
            <AvatarFallback className="text-xs font-semibold">
              {product.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-1">
            <h4 className="text-sm font-semibold">{product.name}</h4>
            <Separator />

            <div className="flex items-center gap-4 text-sm">
              <Metric label="ID">
                <span className="font-semibold">{product.productId}</span>
              </Metric>
              <Separator orientation="vertical" />
              <Metric label="Adet">
                <span className="font-semibold">{product.totalQuantity}</span>
              </Metric>
              <Separator orientation="vertical" />
              <Metric label="Ciro">
                <span className="font-semibold text-[#6C120B]">
                  {formatCurrency(product.totalRevenue)}
                </span>
              </Metric>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
