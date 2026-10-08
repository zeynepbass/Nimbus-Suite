import { useId } from "react";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";

const SELECT_STYLE =
  "w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

const LEAVE_TYPES = ["Yıllık İzin", "Mazeret İzni", "Rapor"];

function LabeledInput({ label, ...props }) {
  const id = useId();

  return (
    <InputGroup>
      <InputGroupInput id={id} {...props} />
      <InputGroupAddon>
        <Label htmlFor={id} className="pr-2">
          {label}
        </Label>
      </InputGroupAddon>
    </InputGroup>
  );
}

export default function LeaveForm({ values, onChange, onSave, onCancel }) {
  const typeId = useId();
  const statusId = useId();

  const bind = (name) => ({
    value: values[name],
    onChange: (event) => onChange({ ...values, [name]: event.target.value }),
  });

  const leaveTypes = LEAVE_TYPES.includes(values.type)
    ? LEAVE_TYPES
    : [values.type, ...LEAVE_TYPES];

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border bg-white shadow-sm p-6 space-y-6">
        <div className="flex items-center gap-2 border-b pb-3">
          <h2 className="text-lg font-semibold">Personel İzin Güncelle</h2>
        </div>

        <LabeledInput label="Ad Soyad" value={values.fullName} readOnly />
        <LabeledInput label="Departman" value={values.department} readOnly />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <LabeledInput label="Başlangıç" type="date" {...bind("from")} />
          <LabeledInput label="Bitiş" type="date" min={values.from} {...bind("to")} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor={typeId}>İzin Türü</Label>
            <select id={typeId} className={SELECT_STYLE} {...bind("type")}>
              {leaveTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <Label htmlFor={statusId}>Durum</Label>
            <select id={statusId} className={SELECT_STYLE} {...bind("status")}>
              <option value="active">Aktif</option>
              <option value="passive">Pasif</option>
            </select>
          </div>
        </div>

        <div className="flex justify-center gap-2">
          <Button variant="outline" onClick={onCancel}>
            Vazgeç
          </Button>
          <Button onClick={onSave} className="w-1/2">
            Güncelle
          </Button>
        </div>
      </div>
    </div>
  );
}
