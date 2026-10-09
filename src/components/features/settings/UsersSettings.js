"use client";

import DataTable from "@/components/common/DataTable";
import { actionsColumn, copyAction, selectColumn } from "@/components/common/columns";
import UserCreateSheet from "@/components/features/users/UserCreateSheet";
import { userColumns as col } from "@/components/features/users/userColumns";

const columns = (onRemove) => [
  selectColumn,
  col.id("Kullanıcı No"),
  col.avatar,
  col.name,
  col.email,
  { accessorKey: "tel", header: "Telefon" },
  { accessorKey: "adres", header: "Adres" },
  actionsColumn((user) => [
    copyAction(user.email, "Email Kopyala"),
    { label: "Sil", tone: "danger", onClick: () => onRemove(user.id) },
  ]),
];

export default function UsersSettings({ users, onCreate, onRemove }) {
  return (
    <DataTable
      title="Kullanıcılar Listesi"
      searchPlaceholder="Kullanıcı No ile filtreleme yöntemi"
      data={users.toReversed()}
      columns={columns(onRemove)}
      toolbarActions={<UserCreateSheet onCreate={onCreate} />}
    />
  );
}
