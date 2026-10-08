export async function exportToExcel(rows, name = "export") {
  const XLSX = await import("xlsx");
  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, name.slice(0, 31));
  XLSX.writeFile(workbook, `${name}.xlsx`);
}
