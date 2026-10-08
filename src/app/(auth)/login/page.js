import Image from "next/image";
import LoginForm from "@/components/features/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-12 bg-gray-100">
      <div className="relative hidden md:col-span-7 md:block">
        <Image
          src="/images/85332.jpg"
          alt=""
          fill
          priority
          sizes="(min-width: 768px) 58vw, 0px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gray-900/30" />

        <div className="absolute bottom-8 left-8 text-gray-100 text-sm">
          <p className="font-medium">Kurumsal Yönetim Sistemi</p>
          <p className="text-xs opacity-80">Güvenli • Stabil • Ölçeklenebilir</p>
        </div>
      </div>

      <div className="md:col-span-5 flex items-center justify-center px-6">
        <LoginForm />
      </div>
    </div>
  );
}
