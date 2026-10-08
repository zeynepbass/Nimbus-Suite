"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getHomePath, login } from "@/lib/auth";
import { saveLastLogin } from "@/lib/lastLogin";

const INPUT_STYLE = "h-9 rounded-sm border-gray-300 text-sm focus-visible:ring-1 focus-visible:ring-[#102E46] focus-visible:border-[#102E46]";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("user@gmail.com");
  const [password, setPassword] = useState("123");

  const handleSubmit = (event) => {
    event.preventDefault();

    const user = login(email, password);

    if (!user) {
      toast.error("Email veya şifre hatalı");
      return;
    }

    saveLastLogin();
    router.replace(getHomePath(user));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm rounded-md border border-gray-200 p-6 space-y-4"
    >
      <h1 className="text-lg font-semibold text-[#102E46] text-center">ERP Sistem Girişi</h1>

      <div className="space-y-1">
        <Label htmlFor="email" className="text-xs text-gray-600">
          E-posta
        </Label>
        <Input
          id="email"
          type="email"
          autoComplete="username"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={INPUT_STYLE}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="password" className="text-xs text-gray-600">
          Şifre
        </Label>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className={INPUT_STYLE}
        />
      </div>

      <Button
        type="submit"
        className="w-full h-9 rounded-sm bg-[#102E46] hover:bg-[#0B2236] text-sm font-normal"
      >
        Giriş
      </Button>

      <p className="text-[11px] text-gray-500 text-center pt-2">
        Yetkisiz erişimler kayıt altına alınmaktadır
      </p>
    </form>
  );
}
