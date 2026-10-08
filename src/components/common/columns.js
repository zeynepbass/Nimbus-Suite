import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import RowActions from "@/components/common/RowActions";
import SortableHeader from "@/components/common/SortableHeader";

export function sortableHeader(title) {
  function Header({ column }) {
    return <SortableHeader column={column} title={title} />;
  }

  Header.title = title;
  return Header;
}

export const selectColumn = {
  id: "select",
  header: ({ table }) => (
    <Checkbox
      aria-label="Sayfadaki tüm satırları seç"
      checked={
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && "indeterminate")
      }
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    />
  ),
  cell: ({ row }) => (
    <Checkbox
      aria-label="Satırı seç"
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
    />
  ),
  enableSorting: false,
  enableHiding: false,
};

export const actionsColumn = (getActions, label) => ({
  id: "actions",
  enableHiding: false,
  cell: ({ row }) => <RowActions label={label} actions={getActions(row.original)} />,
});

export const copyAction = (value, label = "No Kopyala") => ({
  label,
  onClick: async () => {
    try {
      await navigator.clipboard.writeText(String(value));
      toast.success("Kopyalandı");
    } catch {
      toast.error("Kopyalanamadı");
    }
  },
});

export const centered = (accessorKey, header) => ({
  accessorKey,
  header,
  cell: ({ row }) => (
    <div className="text-center font-semibold">{row.getValue(accessorKey)}</div>
  ),
});
