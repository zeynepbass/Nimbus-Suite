"use client";

import { useId } from "react";
import { toast } from "sonner";
import FormSheet from "@/components/common/FormSheet";
import TextField from "@/components/common/TextField";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { STATUS } from "@/constants/status";
import useForm from "@/hooks/useForm";
import { formatCurrency } from "@/lib/format";
import { getProductRevenue } from "@/lib/products";
import { isBlank } from "@/lib/validation";

const SELECT_STYLE =
  "w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

const PRODUCT_STATUSES = ["active", "critical", "out_of_stock", "passive"];

const toFormValues = (product) => ({
  name: product.name,
  category: product.category,
  price: product.price,
  stock: product.stock,
  criticalStock: product.criticalStock,
  sold: product.sold,
  status: product.status,
  createdAt: product.createdAt.slice(0, 10),
});

const TEXT_FIELDS = [
  { name: "name", label: "Ürün Adı" },
  { name: "category", label: "Kategori" },
];

const NUMBER_FIELDS = [
  { name: "price", label: "Fiyat" },
  { name: "stock", label: "Stok" },
  { name: "criticalStock", label: "Kritik Stok" },
  { name: "sold", label: "Satılan Ürün Sayısı" },
];

const isValidAmount = (value) =>
  !isBlank(value) && Number.isFinite(Number(value)) && Number(value) >= 0;

export default function ProductEditSheet({ product, onSave }) {
  const statusId = useId();
  const { values, setValue } = useForm(toFormValues(product));

  const total = getProductRevenue({
    price: Number(values.price) || 0,
    sold: Number(values.sold) || 0,
  });

  const handleSave = () => {
    if (isBlank(values.name) || isBlank(values.category)) {
      toast.error("Ürün adı ve kategori zorunlu");
      return false;
    }

    const invalid = NUMBER_FIELDS.find(({ name }) => !isValidAmount(values[name]));

    if (invalid) {
      toast.error(`${invalid.label} için geçerli bir değer girin`);
      return false;
    }
    if (!values.createdAt) {
      toast.error("Tarih zorunlu");
      return false;
    }

    onSave({
      ...product,
      name: values.name.trim(),
      category: values.category.trim(),
      price: Number(values.price),
      stock: Number(values.stock),
      criticalStock: Number(values.criticalStock),
      sold: Number(values.sold),
      status: values.status,
      createdAt: `${values.createdAt}${product.createdAt.slice(10)}`,
    });
    toast.success("Kaydedildi!");
  };

  return (
    <FormSheet
      title="Güncelle"
      description="Değişiklikler yapmak için buraya tıklayın. İşleminiz bittiğinde Kaydet'e tıklayın."
      onSave={handleSave}
      trigger={<Button variant="secondary">Güncelle</Button>}
    >
      <div className="grid flex-1 auto-rows-min gap-4 px-4">
        {TEXT_FIELDS.map(({ name, label }) => (
          <TextField
            key={name}
            label={label}
            value={values[name]}
            onChange={(value) => setValue(name, value)}
          />
        ))}
        {NUMBER_FIELDS.map(({ name, label }) => (
          <TextField
            key={name}
            label={label}
            type="number"
            min={0}
            value={values[name]}
            onChange={(value) => setValue(name, value)}
          />
        ))}
        <div className="space-y-1">
          <Label htmlFor={statusId} className="text-gray-500">
            Durum
          </Label>
          <select
            id={statusId}
            className={SELECT_STYLE}
            value={values.status}
            onChange={(event) => setValue("status", event.target.value)}
          >
            {PRODUCT_STATUSES.map((status) => (
              <option key={status} value={status}>
                {STATUS[status].label}
              </option>
            ))}
          </select>
        </div>
        <TextField
          label="Tarih"
          type="date"
          value={values.createdAt}
          onChange={(value) => setValue("createdAt", value)}
        />
        <TextField label="Toplam" value={formatCurrency(total)} readOnly />
      </div>
    </FormSheet>
  );
}
