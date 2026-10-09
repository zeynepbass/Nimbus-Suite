const GREEN = { className: "bg-green-100 text-green-700", dot: "bg-green-500" };
const YELLOW = { className: "bg-yellow-100 text-yellow-700", dot: "bg-yellow-500" };
const RED = { className: "bg-red-100 text-red-700", dot: "bg-red-500" };
const GRAY = { className: "bg-gray-100 text-gray-600", dot: "bg-gray-400" };

export const STATUS = {
  active: { label: "Aktif", ...GREEN },
  passive: { label: "Pasif", ...GRAY },
  paused: { label: "Pasif", ...YELLOW },
  inactive: { label: "Pasif", ...RED },
  critical: { label: "Kritik", ...RED },
  out_of_stock: { label: "Stok Yok", ...YELLOW },
  completed: { label: "Tamamlandı", ...GREEN },
  pending: { label: "Beklemede", ...YELLOW },
  cancelled: { label: "İptal", ...RED },
};

export const FALLBACK_STATUS = GRAY;

export const PAYMENT_LABELS = {
  credit_card: "Kredi Kartı",
  cash: "Nakit",
  transfer: "Havale",
};
