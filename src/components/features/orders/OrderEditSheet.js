"use client";

import { useId, useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import FormSheet from "@/components/common/FormSheet";
import TextField from "@/components/common/TextField";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { PAYMENT_LABELS } from "@/constants/status";
import useForm from "@/hooks/useForm";
import { formatCurrency } from "@/lib/format";
import { sumBy } from "@/lib/stats";
import { isBlank } from "@/lib/validation";

const SELECT_STYLE =
  "w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

const StepButton = ({ children, ...props }) => (
  <button type="button" className="px-2 bg-gray-200 rounded disabled:opacity-50" {...props}>
    {children}
  </button>
);

const toDraftItems = (order) =>
  order.items.map((item) => ({ ...item, selectedQuantity: item.quantity }));

export default function OrderEditSheet({ order, onSave }) {
  const paymentId = useId();
  const { values, setValue } = useForm({
    customerName: order.customerName,
    paymentMethod: order.paymentMethod,
    createdAt: order.createdAt.slice(0, 10),
  });
  const [items, setItems] = useState(() => toDraftItems(order));

  const total = sumBy(items, (item) => item.price * item.selectedQuantity);

  const changeQuantity = (productId, delta) =>
    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? {
              ...item,
              selectedQuantity: Math.min(
                Math.max(item.selectedQuantity + delta, 1),
                item.quantity
              ),
            }
          : item
      )
    );

  const removeItem = (productId) =>
    setItems((prev) => prev.filter((item) => item.productId !== productId));

  const handleSave = () => {
    if (isBlank(values.customerName)) {
      toast.error("Müşteri adı zorunlu");
      return false;
    }
    if (!values.createdAt) {
      toast.error("Tarih zorunlu");
      return false;
    }
    if (items.length === 0) {
      toast.error("Siparişte en az bir ürün olmalı");
      return false;
    }

    const savedItems = items.map(({ selectedQuantity, ...item }) => ({
      ...item,
      quantity: selectedQuantity,
    }));

    onSave({
      ...order,
      customerName: values.customerName.trim(),
      paymentMethod: values.paymentMethod,
      createdAt: `${values.createdAt}${order.createdAt.slice(10)}`,
      items: savedItems,
      totalPrice: total,
    });
    setItems(savedItems.map((item) => ({ ...item, selectedQuantity: item.quantity })));
    toast.success("Kaydedildi!");
  };

  return (
    <FormSheet
      title="Güncelle"
      description="Değişiklikler yapmak için buraya tıklayın. İşleminiz bittiğinde Kaydet'e tıklayın."
      onSave={handleSave}
      trigger={<Button variant="secondary">Güncelle</Button>}
    >
      <div className="grid flex-1 auto-rows-min gap-6 px-4">
        <TextField
          label="Müşteri"
          value={values.customerName}
          onChange={(value) => setValue("customerName", value)}
        />
        <TextField
          type="date"
          label="Tarih"
          value={values.createdAt}
          onChange={(value) => setValue("createdAt", value)}
        />
        <div className="space-y-1">
          <Label htmlFor={paymentId} className="text-gray-500">
            Ödeme
          </Label>
          <select
            id={paymentId}
            className={SELECT_STYLE}
            value={values.paymentMethod}
            onChange={(event) => setValue("paymentMethod", event.target.value)}
          >
            {Object.entries(PAYMENT_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <TextField label="Toplam" value={formatCurrency(total)} readOnly />

        <div className="overflow-x-auto max-h-64">
          <Table>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.productId}>
                  <TableCell>{item.name}</TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <StepButton
                        aria-label={`${item.name} adedini azalt`}
                        disabled={item.selectedQuantity <= 1}
                        onClick={() => changeQuantity(item.productId, -1)}
                      >
                        -
                      </StepButton>
                      {item.selectedQuantity}
                      <StepButton
                        aria-label={`${item.name} adedini artır`}
                        disabled={item.selectedQuantity >= item.quantity}
                        onClick={() => changeQuantity(item.productId, 1)}
                      >
                        +
                      </StepButton>
                    </div>
                  </TableCell>

                  <TableCell>{formatCurrency(item.price)}</TableCell>
                  <TableCell>{formatCurrency(item.price * item.selectedQuantity)}</TableCell>

                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      title="İptal / İade"
                      aria-label={`${item.name} ürününü iptal / iade et`}
                      onClick={() => removeItem(item.productId)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </FormSheet>
  );
}
