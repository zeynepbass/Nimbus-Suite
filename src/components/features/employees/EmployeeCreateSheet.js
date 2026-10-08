"use client";

import { toast } from "sonner";
import FormSheet from "@/components/common/FormSheet";
import TextField from "@/components/common/TextField";
import {
  EMPTY_EMPLOYEE,
  validateEmployee,
} from "@/components/features/employees/employeeForm";
import useForm from "@/hooks/useForm";

export default function EmployeeCreateSheet({ onCreate }) {
  const { values, setValue, reset } = useForm(EMPTY_EMPLOYEE);

  const handleSave = () => {
    const error = validateEmployee(values);

    if (error) {
      toast.error(error);
      return false;
    }

    onCreate(values);
    reset();
  };

  const field = (path, placeholder, current, extra = {}) => (
    <TextField
      placeholder={placeholder}
      value={current}
      onChange={(value) => setValue(path, value)}
      {...extra}
    />
  );

  return (
    <FormSheet
      title="Yeni Personel Ekle"
      description="Personel bilgilerini girin ve Kaydet'e tıklayın."
      onSave={handleSave}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3 p-4">
        {field("firstName", "Ad", values.firstName)}
        {field("lastName", "Soyad", values.lastName)}
        {field("department", "Departman", values.department)}
        {field("position", "Pozisyon", values.position)}
        {field("email", "E-posta", values.email, { type: "email" })}
        {field("phone", "Telefon", values.phone, { type: "tel" })}

        {field("address.city", "Şehir", values.address.city)}
        {field("address.district", "İlçe", values.address.district)}
        {field("address.fullAddress", "Açık Adres", values.address.fullAddress, {
          className: "sm:col-span-2",
        })}

        {field("education.university", "Üniversite", values.education.university)}
        {field("education.faculty", "Fakülte", values.education.faculty)}
        {field("education.degree", "Derece", values.education.degree)}

        {field("employment.startDate", "İşe Başlama Tarihi", values.employment.startDate, {
          type: "date",
          label: "İşe Başlama Tarihi",
        })}
        {field("employment.workType", "Çalışma Tipi", values.employment.workType)}
      </div>
    </FormSheet>
  );
}
