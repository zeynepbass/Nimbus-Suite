"use client";

import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { exportToExcel } from "@/lib/excel";

const SORT_LABELS = { asc: "ascending", desc: "descending" };

function getColumnLabel(column) {
  const { header } = column.columnDef;

  if (typeof header === "string" && header) return header;
  return header?.title ?? column.id;
}

export default function DataTable({
  title,
  data,
  columns,
  searchPlaceholder = "Sipariş No ile filtreleme yöntemi",
  searchColumn = "id",
  exportRows,
  toolbarActions,
}) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters, columnVisibility, rowSelection },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const searchField = table.getColumn(searchColumn);
  const pageCount = table.getPageCount();

  const handleExport = async () => {
    try {
      await exportToExcel(exportRows, title);
    } catch {
      toast.error("Excel dosyası oluşturulamadı");
    }
  };

  return (
    <div className="w-full">
      {title && (
        <div className="flex flex-col gap-2 py-3 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="font-semibold">{title}</h2>
          <div className="flex flex-wrap items-center gap-2">
            <Input
              aria-label={searchPlaceholder}
              placeholder={searchPlaceholder}
              value={searchField?.getFilterValue() ?? ""}
              onChange={(event) => searchField?.setFilterValue(event.target.value)}
              className="w-full sm:w-xs"
            />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Sütunlar <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {getColumnLabel(column)}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {exportRows && (
              <Button
                className="bg-[#6C120B] text-white"
                onClick={handleExport}
              >
                Excel İndir
              </Button>
            )}

            {toolbarActions}
          </div>
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((group) => (
              <TableRow key={group.id}>
                {group.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-center"
                    aria-sort={SORT_LABELS[header.column.getIsSorted()]}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-center">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  Veri bulunamadı.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end gap-2 py-2">
        <span className="mr-auto text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} kayıt
          {pageCount > 1 &&
            ` · Sayfa ${table.getState().pagination.pageIndex + 1} / ${pageCount}`}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Önceki
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Sonraki
        </Button>
      </div>
    </div>
  );
}
