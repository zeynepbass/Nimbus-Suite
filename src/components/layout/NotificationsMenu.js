"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import products from "@/data/product";
import { isCriticalStock } from "@/lib/products";

const criticalProducts = products.filter(isCriticalStock).toReversed();

export default function NotificationsMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="relative h-9 w-9 flex items-center justify-center rounded-md"
          aria-label={`Bildirimler, ${criticalProducts.length} kritik stok uyarısı`}
        >
          <Bell className="h-5 w-5 text-[#102E46]" />
          {criticalProducts.length > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 text-xs bg-[#6C120B] text-white rounded-full flex items-center justify-center">
              {criticalProducts.length}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>Bildirimler</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {criticalProducts.length === 0 && (
          <p className="px-2 py-3 text-sm text-muted-foreground text-center">
            Kritik stok uyarısı yok
          </p>
        )}

        {criticalProducts.map((product) => (
          <DropdownMenuItem key={product.id} asChild>
            <Link
              href={`/dashboard/critical/${product.id}`}
              className="flex justify-between gap-2"
            >
              <span className="font-medium text-gray-700">{product.name}</span>
              <span className="text-red-900 font-semibold">Stok: {product.stock}</span>
            </Link>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            href="/dashboard/critical"
            className="justify-center text-xs text-muted-foreground"
          >
            Stokları görüntüle
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
