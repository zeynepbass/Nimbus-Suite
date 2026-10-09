"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getHomePath, login } from "@/lib/auth";
import { saveLastLogin } from "@/lib/lastLogin";

const INPUT_STYLE =
  "h-11 rounded-lg border-gray-300 bg-white pl-10 text-sm focus-visible:ring-2 focus-visible:ring-[#628DD0]/40 focus-visible:border-[#102E46]";

const ICON_STYLE = "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400";

const DEMO_ACCOUNTS = [
  { label: "Yönetici", email: "zeynepbas@gmail.com" },
  { label: "Kullanıcı", email: "user@gmail.com" },
];

const DEMO_PASSWORD = "123";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("user@gmail.com");
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const [showPassword, setShowPassword] = useState(false);

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

  const fillDemo = (account) => {
    setEmail(account.email);
    setPassword(DEMO_PASSWORD);
  };

  return (
    <div className="w-full max-w-sm">
      <div className="mb-8 flex items-center gap-3 lg:hidden">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#102E46] text-lg font-bold text-white">
          N
        </span>
        <p className="font-semibold text-[#102E46]">Nimbus ERP</p>
      </div>

      <div className="mb-8 space-y-2">
        <h1 className="text-2xl font-semibold text-[#102E46]">Tekrar hoş geldiniz</h1>
        <p className="text-sm text-gray-500">Devam etmek için hesabınıza giriş yapın.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-sm text-gray-700">
            E-posta
          </Label>
          <div className="relative">
            <Mail className={ICON_STYLE} />
            <Input
              id="email"
              type="email"
              autoComplete="username"
              placeholder="ornek@firma.com"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={INPUT_STYLE}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password" className="text-sm text-gray-700">
            Şifre
          </Label>
          <div className="relative">
            <Lock className={ICON_STYLE} />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={`${INPUT_STYLE} pr-10`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-gray-500 hover:text-[#102E46]"
              aria-label={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
              aria-pressed={showPassword}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          className="h-11 w-full rounded-lg bg-[#102E46] text-sm font-medium hover:bg-[#0B2236]"
        >
          Giriş Yap
        </Button>
      </form>

      <div className="mt-8 rounded-lg border border-dashed border-gray-300 bg-white p-4">
        <p className="text-xs font-medium text-gray-600">Demo hesapları</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {DEMO_ACCOUNTS.map((account) => (
            <Button
              key={account.email}
              type="button"
              variant="outline"
              size="sm"
              aria-pressed={email === account.email}
              onClick={() => fillDemo(account)}
              className={email === account.email ? "border-[#102E46] text-[#102E46]" : ""}
            >
              {account.label}
            </Button>
          ))}
        </div>
      </div>

      <p className="mt-6 text-center text-[11px] text-gray-500">
        Yetkisiz erişimler kayıt altına alınmaktadır
      </p>
    </div>
  );
}
