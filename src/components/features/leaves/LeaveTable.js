"use client";

import { useState } from "react";
import { toast } from "sonner";
import { CalendarDays, Star, UserCheck, Users } from "lucide-react";
import DataTable from "@/components/common/DataTable";
import StatGrid from "@/components/common/StatGrid";
import StatusBadge from "@/components/common/StatusBadge";
import { actionsColumn } from "@/components/common/columns";
import LeaveForm from "@/components/features/leaves/LeaveForm";
import employeesData from "@/data/employees";
import useList from "@/hooks/useList";
import { isOnLeaveToday } from "@/lib/employees";
import { formatDate } from "@/lib/format";
import { averageBy } from "@/lib/stats";

const EMPTY_FORM = {
  fullName: "",
  department: "",
  from: "",
  to: "",
  type: "Yıllık İzin",
  status: "active",
};

const toLeaveRows = (employees) =>
  employees.flatMap((employee) =>
    employee.leaveDates.map((leave, leaveIndex) => ({
      id: employee.id,
      leaveIndex,
      fullName: employee.fullName,
      department: employee.department,
      from: leave.from,
      to: leave.to,
      type: leave.type,
      status: employee.status,
    }))
  );

const staticColumns = [
  { accessorKey: "id", header: "Personel No" },
  {
    accessorKey: "fullName",
    header: "Ad Soyad",
    cell: ({ row }) => <span className="font-semibold">{row.getValue("fullName")}</span>,
  },
  { accessorKey: "department", header: "Departman" },
  {
    accessorKey: "from",
    header: "Başlangıç",
    cell: ({ row }) => formatDate(row.getValue("from")),
  },
  {
    accessorKey: "to",
    header: "Bitiş",
    cell: ({ row }) => formatDate(row.getValue("to")),
  },
  {
    accessorKey: "type",
    header: "İzin Türü",
    cell: ({ row }) => (
      <span className="px-2 py-1 rounded-md bg-blue-100 text-blue-700 text-xs">
        {row.getValue("type")}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Durum",
    cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
  },
];

export default function LeaveTable({ editable = false }) {
  const { items: employees, update, remove } = useList(employeesData, {
    removeMessage: "Personel silindi",
  });
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const leaves = toLeaveRows(employees);

  const stats = [
    { title: "Toplam Personel", icon: Users, value: employees.length },
    { title: "Aktif Personel", icon: UserCheck, value: employees.filter((e) => e.status === "active").length },
    { title: "İzinde Olanlar", icon: CalendarDays, value: employees.filter(isOnLeaveToday).length },
    {
      title: "Ortalama Performans", icon: Star,
      value: averageBy(employees, (e) => e.performanceScore).toFixed(1),
    },
  ];

  const startEditing = (leave) => {
    setSelected(leave);
    setForm({
      fullName: leave.fullName,
      department: leave.department,
      from: leave.from,
      to: leave.to,
      type: leave.type,
      status: leave.status,
    });
  };

  const handleSave = () => {
    const employee = employees.find((item) => item.id === selected?.id);
    if (!employee) return;

    if (!form.from || !form.to) {
      toast.error("Başlangıç ve bitiş tarihi zorunlu");
      return;
    }
    if (form.to < form.from) {
      toast.error("Bitiş tarihi başlangıçtan önce olamaz");
      return;
    }

    update(employee.id, {
      leaveDates: employee.leaveDates.map((leave, index) =>
        index === selected.leaveIndex
          ? { ...leave, from: form.from, to: form.to, type: form.type }
          : leave
      ),
      status: form.status,
    });
    setSelected(null);
    toast.success("İzin güncellendi");
  };

  const columns = [
    ...staticColumns,
    actionsColumn((leave) => [
      ...(editable
        ? [{ label: "İzni Güncelle", onClick: () => startEditing(leave) }]
        : []),
      { label: "Personel Sil", tone: "danger", onClick: () => remove(leave.id) },
    ]),
  ];

  return (
    <div className="p-6 space-y-8">
      {!editable && <StatGrid stats={stats} />}

      {selected && (
        <LeaveForm
          values={form}
          onChange={setForm}
          onSave={handleSave}
          onCancel={() => setSelected(null)}
        />
      )}

      <DataTable
        title="Personel İzin Listesi"
        searchPlaceholder="Personel No ile filtreleme yöntemi"
        data={leaves.toReversed()}
        columns={columns}
      />
    </div>
  );
}
