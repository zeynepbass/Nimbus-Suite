"use client";

import { toast } from "sonner";
import DataTable from "@/components/common/DataTable";
import PageContainer from "@/components/common/PageContainer";
import StatusBadge from "@/components/common/StatusBadge";
import { actionsColumn, copyAction, selectColumn } from "@/components/common/columns";
import UserCreateSheet from "@/components/features/users/UserCreateSheet";
import { userColumns as col } from "@/components/features/users/userColumns";
import { ASSIGNABLE_ROLES, ROLES, ROLE_BADGES } from "@/constants/roles";
import usersData from "@/data/users";
import useCurrentUser from "@/hooks/useCurrentUser";
import useList from "@/hooks/useList";
import { nextNumericId } from "@/lib/ids";

const members = usersData.filter((user) => user.role === ROLES.USER);

const roleColumn = {
  accessorKey: "role",
  header: "Rol",
  cell: ({ row }) => <StatusBadge status={row.getValue("role")} map={ROLE_BADGES} />,
};

export default function RoleTable() {
  const currentUser = useCurrentUser();
  const { items: users, add, update, remove } = useList(members, {
    removeMessage: "Kullanıcı silindi",
  });

  const assignableRoles = ASSIGNABLE_ROLES[currentUser?.role] ?? [];

  const handleCreate = (user) =>
    add({ ...user, id: nextNumericId(usersData.concat(users)) });

  const handleRoleUpdate = (id, role) => {
    update(id, { role });
    toast.success("Rol güncellendi");
  };

  const columns = [
    selectColumn,
    col.id("Role No"),
    col.avatar,
    col.name,
    col.email,
    roleColumn,
    actionsColumn((user) => [
      copyAction(user.email, "Email Kopyala"),
      ...assignableRoles
        .filter((role) => role !== user.role)
        .map((role) => ({
          label: `${role} yap`,
          onClick: () => handleRoleUpdate(user.id, role),
        })),
      { label: "Sil", tone: "danger", onClick: () => remove(user.id) },
    ]),
  ];

  return (
    <PageContainer className="space-y-0">
      <DataTable
        title="Roller Listesi"
        searchPlaceholder="Role No ile filtrele"
        data={users.toReversed()}
        columns={columns}
        toolbarActions={<UserCreateSheet onCreate={handleCreate} />}
      />
    </PageContainer>
  );
}
