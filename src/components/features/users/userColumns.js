import { sortableHeader } from "@/components/common/columns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/format";

export const userColumns = {
  id: (header) => ({ accessorKey: "id", header, filterFn: "includesString" }),
  avatar: {
    accessorKey: "resim",
    header: sortableHeader("Resim"),
    cell: ({ row }) => (
      <div className="flex items-center justify-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={row.original.resim} alt={row.original.name} />
          <AvatarFallback>{getInitials(row.original.name)}</AvatarFallback>
        </Avatar>
      </div>
    ),
  },
  name: {
    accessorKey: "name",
    header: "Ad Soyad",
    cell: ({ row }) => <span>{row.getValue("name")}</span>,
  },
  email: {
    accessorKey: "email",
    header: sortableHeader("Email"),
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{row.getValue("email")}</span>
    ),
  },
};
