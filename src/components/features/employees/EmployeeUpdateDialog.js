"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import EditDialog from "@/components/common/EditDialog";
import TextField from "@/components/common/TextField";
import {
  validateEmployee,
  withFullName,
} from "@/components/features/employees/employeeForm";
import useForm from "@/hooks/useForm";

export default function EmployeeUpdateDialog({ employee, open, onOpenChange, onSave }) {
  const { values, setValues, setValue } = useForm(employee ?? {});

  useEffect(() => {
    if (open && employee) setValues(employee);
  }, [open, employee, setValues]);

  if (!employee || !values.address) return null;

  const handleSave = () => {
    const error = validateEmployee(values);

    if (error) {
      toast.error(error);
      return;
    }

    onSave(withFullName(values));
    onOpenChange(false);
  };

  const field = (path, label, current, extra = {}) => (
    <TextField
      label={label}
      value={current}
      onChange={(value) => setValue(path, value)}
      {...extra}
    />
  );

  return (
    <EditDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Personel Güncelle"
      description="Personel bilgilerini düzenleyin"
      onSave={handleSave}
      className="sm:max-w-4xl"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
        {field("firstName", "Ad", values.firstName)}
        {field("lastName", "Soyad", values.lastName)}
        {field("phone", "Telefon", values.phone, { type: "tel" })}
        {field("department", "Departman", values.department)}
        {field("position", "Pozisyon", values.position)}
        {field("email", "E-posta", values.email, { type: "email" })}
        {field("address.city", "Şehir", values.address.city)}
        {field("address.district", "İlçe", values.address.district)}
        {field("employment.workType", "Çalışma Tipi", values.employment.workType)}
        {field("education.university", "Üniversite", values.education.university)}
        {field("education.faculty", "Fakülte", values.education.faculty)}
        {field("address.fullAddress", "Açık Adres", values.address.fullAddress, {
          multiline: true,
          className: "sm:col-span-3",
        })}
      </div>
    </EditDialog>
  );
}
