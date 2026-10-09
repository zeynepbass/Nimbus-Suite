import Image from "next/image";
import { Boxes, ShieldCheck, Users } from "lucide-react";
import LoginForm from "@/components/features/auth/LoginForm";

const HIGHLIGHTS = [
  { icon: Boxes, text: "Stok, sipariş ve fatura süreçleri tek panelde" },
  { icon: Users, text: "Personel, izin ve tedarikçi yönetimi" },
  { icon: ShieldCheck, text: "Rol tabanlı erişim ve yetkilendirme" },
];

export default function LoginPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
      <div className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-[#102E46] p-12 text-white">
        <Image
          src="/images/85332.jpg"
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 0px"
          className="object-cover opacity-10"
        />

        <div className="relative flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg font-bold text-[#6C120B]">
            N
          </span>
          <div className="leading-tight">
            <p className="font-semibold">Nimbus ERP</p>
            <p className="text-xs text-white/60">Kurumsal Yönetim Sistemi</p>
          </div>
        </div>

        <div className="relative space-y-8">
          <Image
            src="/images/curve-rafiki.png"
            alt=""
            width={300}
            height={300}
            priority
            className="-ml-6 h-auto w-72"
          />

          <div className="space-y-3">
            <h2 className="text-3xl font-semibold leading-tight">
              Tüm operasyonlarınız
              <br />
              tek bir panelde.
            </h2>
            <p className="max-w-md text-sm text-white/70">
              Satıştan insan kaynaklarına, işletmenizin günlük akışını tek yerden takip edin.
            </p>
          </div>

          <ul className="space-y-3">
            {HIGHLIGHTS.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-sm text-white/90">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                  <Icon className="h-4 w-4" />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-white/50">Nimbus ERP © 2026</p>
      </div>

      <div className="flex items-center justify-center bg-gray-50 px-6 py-12">
        <LoginForm />
      </div>
    </div>
  );
}
