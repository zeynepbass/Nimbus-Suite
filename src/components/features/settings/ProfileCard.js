"use client";

import { useRef, useState } from "react";
import { Camera, Pencil, X } from "lucide-react";
import { toast } from "sonner";
import TextField from "@/components/common/TextField";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useCurrentUser from "@/hooks/useCurrentUser";
import { saveUser } from "@/lib/auth";
import { getInitials } from "@/lib/format";
import { isBlank, isEmail } from "@/lib/validation";

const MAX_IMAGE_SIZE = 1024 * 1024;

export default function ProfileCard() {
  const user = useCurrentUser();
  const [draft, setDraft] = useState(null);
  const fileRef = useRef(null);

  if (!user) return null;

  const isEditing = draft !== null;
  const profile = draft ?? user;

  const handleChange = (key, value) => setDraft((prev) => ({ ...prev, [key]: value }));

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_IMAGE_SIZE) {
      toast.error("Resim en fazla 1 MB olabilir");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => handleChange("resim", reader.result);
    reader.onerror = () => toast.error("Resim okunamadı");
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (isBlank(draft.name)) {
      toast.error("Ad Soyad zorunlu");
      return;
    }
    if (!isEmail(draft.email)) {
      toast.error("Geçerli bir e-posta girin");
      return;
    }
    if (!saveUser(draft)) {
      toast.error("Profil kaydedilemedi");
      return;
    }

    setDraft(null);
    toast.success("Profil güncellendi");
  };

  const fieldClass = isEditing ? "[&_input]:border-primary [&_textarea]:border-primary" : "";

  const avatar = (
    <Avatar className="h-[100px] w-[100px]">
      <AvatarImage src={profile.resim} alt={profile.name} className="object-cover" />
      <AvatarFallback className="text-2xl">{getInitials(profile.name)}</AvatarFallback>
    </Avatar>
  );

  return (
    <Card className="relative h-auto w-full max-w-[320px] p-6 shadow-sm">
      <h4 className="text-xl font-semibold text-gray-600">Profil</h4>

      <button
        onClick={() => setDraft(isEditing ? null : user)}
        className="absolute top-4 right-4 rounded text-muted-foreground hover:text-primary"
        aria-label={isEditing ? "Düzenlemeyi iptal et" : "Profili düzenle"}
      >
        {isEditing ? <X size={18} /> : <Pencil size={18} />}
      </button>

      <CardContent className="flex flex-col items-center gap-6 px-0 pt-6">
        {isEditing ? (
          <button
            type="button"
            className="relative group rounded-full"
            aria-label="Profil resmini değiştir"
            onClick={() => fileRef.current.click()}
          >
            {avatar}
            <span className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition">
              <Camera className="text-white" />
            </span>
          </button>
        ) : (
          avatar
        )}

        <input ref={fileRef} type="file" accept="image/*" hidden onChange={handleImageChange} />

        <fieldset disabled={!isEditing} className="w-full space-y-4">
          <TextField
            placeholder="Ad Soyad"
            value={profile.name}
            onChange={(value) => handleChange("name", value)}
            className={fieldClass}
          />
          <TextField
            placeholder="Email"
            type="email"
            value={profile.email}
            onChange={(value) => handleChange("email", value)}
            className={fieldClass}
          />
          <TextField
            placeholder="Telefon"
            type="tel"
            value={profile.tel}
            onChange={(value) => handleChange("tel", value)}
            className={fieldClass}
          />
          <TextField
            placeholder="Adres"
            multiline
            value={profile.adres}
            onChange={(value) => handleChange("adres", value)}
            className={`[&_textarea]:resize-none ${fieldClass}`}
          />
        </fieldset>

        {isEditing && (
          <Button className="w-full mt-2" onClick={handleSave}>
            Güncelle
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
