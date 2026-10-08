const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;

export function formatDate(date) {
  if (!date) return "-";

  const value = new Date(date);
  if (Number.isNaN(value.getTime())) return "-";

  const options = { year: "numeric", month: "2-digit", day: "2-digit" };

  // Saat bilgisi olmayan tarihler UTC olarak ayrıştırılır; saat eklenmez.
  if (typeof date === "string" && DATE_ONLY.test(date)) {
    return value.toLocaleDateString("tr-TR", { ...options, timeZone: "UTC" });
  }

  return value.toLocaleDateString("tr-TR", {
    ...options,
    hour: "2-digit",
    minute: "2-digit",
  });
}

export const formatCurrency = (value) =>
  `₺${(Number(value) || 0).toLocaleString("tr-TR")}`;

export function isToday(date) {
  const target = new Date(date);
  const today = new Date();

  return (
    target.getFullYear() === today.getFullYear() &&
    target.getMonth() === today.getMonth() &&
    target.getDate() === today.getDate()
  );
}

export function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}
