import {
  Ban,
  Boxes,
  Calendar,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Truck,
  TrendingUp,
  User,
  Wallet,
} from "lucide-react";
import { ROLES } from "@/constants/roles";

export const menu = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    children: [
      { label: "Genel Özet", icon: TrendingUp, href: "/dashboard/summary" },
      { label: "Son Siparişler", icon: ShoppingCart, href: "/dashboard/lastOrders" },
      { label: "Kritik Stok", icon: Boxes, href: "/dashboard/critical" },
    ],
  },
  {
    id: "sales",
    label: "Satış Yönetimi",
    icon: ShoppingCart,
    children: [
      { label: "Siparişler", icon: Truck, href: "/sales/orders" },
      { label: "Faturalar", icon: Wallet, href: "/sales/invoices" },
    ],
  },
  {
    id: "suppliers",
    label: "Tedarikçiler",
    icon: Package,
    href: "/supplier",
  },
  {
    id: "hr",
    label: "İnsan Kaynakları",
    icon: User,
    children: [
      { label: "Personel Listesi", icon: User, href: "/humanresources/employees" },
      { label: "İzinler", icon: Calendar, href: "/humanresources/leaves" },
    ],
  },
  {
    id: "role",
    label: "Roller ve Yetkilendirmeler",
    icon: Ban,
    href: "/role",
    roles: [ROLES.ADMIN, ROLES.MANAGER],
  },
  {
    id: "settings",
    label: "Ayarlar",
    icon: Settings,
    href: "/settings",
  },
];

export const isVisibleFor = (item, role) => !item.roles || item.roles.includes(role);

export const isActivePath = (pathname, href) =>
  pathname === href || pathname.startsWith(`${href}/`);

export const getMenuLinks = (role) =>
  menu
    .filter((item) => role === undefined || isVisibleFor(item, role))
    .flatMap((item) => item.children ?? [item]);
