export function nextId(prefix, items, digits = 3) {
  const highest = items.reduce(
    (max, item) => Math.max(max, parseInt(String(item.id).split("-")[1], 10) || 0),
    0
  );

  return `${prefix}-${String(highest + 1).padStart(digits, "0")}`;
}

export const nextNumericId = (items) =>
  items.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1;
