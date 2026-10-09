"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CalendarDays, Star, UserCheck, Users } from "lucide-react";
import DataTable from "@/components/common/DataTable";
import PageContainer from "@/components/common/PageContainer";
import StatGrid from "@/components/common/StatGrid";
import StatusBadge from "@/components/common/StatusBadge";
import { actionsColumn, copyAction } from "@/components/common/columns";
import EmployeeCreateSheet from "@/components/features/employees/EmployeeCreateSheet";
import EmployeeUpdateDialog from "@/components/features/employees/EmployeeUpdateDialog";
import { withFullName } from "@/components/features/employees/employeeForm";
import { toEmployeeRows } from "@/components/features/employees/employeeExcel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import employeesData from "@/data/employees";
import useList from "@/hooks/useList";
import { isOnLeaveToday } from "@/lib/employees";
import { formatDate, getInitials } from "@/lib/format";
import { nextId } from "@/lib/ids";
import { averageBy } from "@/lib/stats";

const staticColumns = [
  { accessorKey: "id", header: "Personel No" },
  {
    accessorKey: "avatar",
    header: "Resim",
    cell: ({ row }) => (
      <Avatar className="mx-auto">
        <AvatarImage src={row.getValue("avatar")} alt={row.original.fullName} />
        <AvatarFallback>{getInitials(row.original.fullName)}</AvatarFallback>
      </Avatar>
    ),
  },
  {
    accessorKey: "fullName",
    header: "Ad Soyad",
    cell: ({ row }) => <span className="font-semibold">{row.getValue("fullName")}</span>,
  },
  { accessorKey: "department", header: "Departman" },
  { accessorKey: "position", header: "Pozisyon" },
  {
    accessorKey: "employment.startDate",
    header: "İşe Giriş",
    cell: ({ row }) => formatDate(row.original.employment.startDate),
  },
  { accessorKey: "phone", header: "Telefon" },
  {
    accessorKey: "performanceScore",
    header: "Performans",
    cell: ({ row }) => (
      <span className="font-semibold text-green-600">{row.getValue("performanceScore")}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Durum",
    cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
  },
];

export default function EmployeeTable() {
  const router = useRouter();
  const { items: employees, add, update, remove } = useList(employeesData, {
    removeMessage: "Personel silindi",
  });
  const [selected, setSelected] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const stats = [
    { title: "Toplam Personel", icon: Users, value: employees.length },
    { title: "Aktif Personel", icon: UserCheck, value: employees.filter((e) => e.status === "active").length },
    { title: "İzinde Olanlar", icon: CalendarDays, value: employees.filter(isOnLeaveToday).length },
    {
      title: "Ortalama Performans", icon: Star,
      value: averageBy(employees, (e) => e.performanceScore).toFixed(1),
    },
  ];

  const handleCreate = (values) => {
    const employee = {
      ...withFullName(values),
      id: nextId("P", employees),
      leaveDates: [],
      createdAt: new Date().toISOString().slice(0, 10),
    };

    add(employee);
    toast.success(`${employee.fullName} eklendi!`);
  };

  const handleUpdate = (employee) => {
    update(employee.id, employee);
    toast.success("Güncellendi");
  };

  const openUpdateDialog = (employee) => {
    setSelected(employee);
    setDialogOpen(true);
  };

  const columns = [
    ...staticColumns,
    actionsColumn((employee) => [
      copyAction(employee.id),
      { label: "Güncelle", onClick: () => openUpdateDialog(employee) },
      {
        label: "Detay Gör",
        tone: "accent",
        onClick: () => router.push(`/humanresources/employees/${employee.id}`),
      },
      { label: "Sil", tone: "danger", onClick: () => remove(employee.id) },
    ]),
  ];

  return (
    <PageContainer>
      <StatGrid stats={stats} />

      <EmployeeUpdateDialog
        employee={selected}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleUpdate}
      />

      <DataTable
        title="Personel Listesi"
        searchPlaceholder="Personel No ile filtreleme yöntemi"
        data={employees.toReversed()}
        columns={columns}
        exportRows={toEmployeeRows(employees)}
        toolbarActions={<EmployeeCreateSheet onCreate={handleCreate} />}
      />
    </PageContainer>
  );
}
