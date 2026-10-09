"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import EditDialog from "@/components/common/EditDialog";
import TextField from "@/components/common/TextField";
import { validateSupplier } from "@/components/features/suppliers/supplierForm";
import useForm from "@/hooks/useForm";

export default function SupplierUpdateDialog({ supplier, open, onOpenChange, onSave }) {
  const { values, setValues, setValue } = useForm(supplier ?? {});

  useEffect(() => {
    if (open && supplier) setValues(supplier);
  }, [open, supplier, setValues]);

  if (!supplier || !values.contact) return null;

  const handleSave = () => {
    const error = validateSupplier(values);

    if (error) {
      toast.error(error);
      return;
    }

    onSave(values);
    onOpenChange(false);
  };

  const field = (path, label, current) => (
    <TextField
      label={label}
      value={current}
      onChange={(value) => setValue(path, value)}
    />
  );

  return (
    <EditDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Tedarikçi Güncelle"
      description="Tedarikçi bilgilerini düzenleyin"
      onSave={handleSave}
      className="sm:max-w-2xl"
    >
      <div className="space-y-4 text-sm">
        {field("name", "Firma Adı", values.name)}
        {field("companyType", "Firma Türü", values.companyType)}
        {field("contact.person", "Yetkili", values.contact.person)}
        {field("contact.email", "Email", values.contact.email)}
        {field("contact.phone", "Telefon", values.contact.phone)}
        {field("address.city", "Şehir", values.address.city)}
        {field("address.district", "İlçe", values.address.district)}
        {field("address.fullAddress", "Adres", values.address.fullAddress)}
      </div>
    </EditDialog>
  );
}
