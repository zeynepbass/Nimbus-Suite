"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getMenuLinks } from "@/config/menu";

const ROUTE_LABELS = {
  dashboard: "Gösterge Paneli",
  summary: "Genel Özet",
  lastOrders: "Son Siparişler",
  critical: "Kritik Stok",
  sales: "Satışlar",
  orders: "Siparişler",
  invoices: "Faturalar",
  supplier: "Tedarikçiler",
  humanresources: "İnsan Kaynakları",
  employees: "Personel Listesi",
  leaves: "İzinler",
  role: "Roller ve Yetkilendirmeler",
  settings: "Ayarlar",
  profile: "Profil",
};

const PAGE_PATHS = new Set(getMenuLinks().map((link) => link.href));

export default function Breadcrumb() {
  const segments = usePathname().split("/").filter(Boolean);

  return (
    <nav aria-label="Sayfa yolu" className="text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center">
        <li>Dashboard</li>

        {segments.map((segment, index) => {
          const href = "/" + segments.slice(0, index + 1).join("/");
          const label = ROUTE_LABELS[segment] ?? segment;
          const isLast = index === segments.length - 1;

          return (
            <li key={href} className="flex items-center">
              <span className="mx-2" aria-hidden="true">
                /
              </span>
              {isLast ? (
                <span className="font-medium text-foreground" aria-current="page">
                  {label}
                </span>
              ) : PAGE_PATHS.has(href) ? (
                <Link href={href} className="hover:text-foreground">
                  {label}
                </Link>
              ) : (
                <span>{label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
