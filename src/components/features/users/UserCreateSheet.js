"use client";

import { toast } from "sonner";
import FormSheet from "@/components/common/FormSheet";
import TextField from "@/components/common/TextField";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ROLES } from "@/constants/roles";
import useForm from "@/hooks/useForm";
import { isBlank, isEmail } from "@/lib/validation";

const EMPTY_USER = {
  name: "",
  email: "",
  tel: "",
  adres: "",
  role: ROLES.USER,
  resim: null,
};

const randomAvatar = () =>
  `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 90)}.jpg`;

export default function UserCreateSheet({ onCreate }) {
  const { values, setValue, reset } = useForm(EMPTY_USER);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setValue("resim", reader.result);
    reader.onerror = () => toast.error("Resim okunamadı");
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (isBlank(values.name) || isBlank(values.email)) {
      toast.error("Ad ve Email zorunlu");
      return false;
    }
    if (!isEmail(values.email)) {
      toast.error("Geçerli bir e-posta girin");
      return false;
    }

    onCreate({
      name: values.name.trim(),
      email: values.email.trim(),
      tel: values.tel,
      adres: values.adres,
      role: values.role,
      resim: values.resim ?? randomAvatar(),
    });
    reset();
    toast.success("Eklendi");
  };

  return (
    <FormSheet
      title="Yeni Kullanıcı Ekle"
      description="Kullanıcı bilgilerini girin ve Kaydet'e tıklayın."
      onSave={handleSave}
    >
      <div className="grid grid-cols-1 gap-4 mt-4 p-4">
        <div className="flex flex-col items-center gap-3">
          <Avatar className="h-24 w-24">
            <AvatarImage src={values.resim ?? undefined} alt="" />
            <AvatarFallback>{values.name?.charAt(0) || "?"}</AvatarFallback>
          </Avatar>
          <Input
            type="file"
            accept="image/*"
            aria-label="Profil resmi"
            onChange={handleImageChange}
            className="w-full"
          />
        </div>

        <TextField placeholder="Ad Soyad" value={values.name} onChange={(v) => setValue("name", v)} />
        <TextField
          placeholder="Email"
          type="email"
          value={values.email}
          onChange={(v) => setValue("email", v)}
        />
        <TextField
          placeholder="Telefon"
          type="tel"
          value={values.tel}
          onChange={(v) => setValue("tel", v)}
        />
        <TextField
          placeholder="Adres"
          multiline
          value={values.adres}
          onChange={(v) => setValue("adres", v)}
          className="[&_textarea]:resize-none"
        />
      </div>
    </FormSheet>
  );
}
