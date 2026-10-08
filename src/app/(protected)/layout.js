"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import AppSidebar from "@/components/layout/AppSidebar";
import Header from "@/components/layout/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import useCurrentUser from "@/hooks/useCurrentUser";
import { getRedirectPath } from "@/lib/auth";

export default function ProtectedLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useCurrentUser();

  const redirectPath = user === undefined ? null : getRedirectPath(user, pathname);

  useEffect(() => {
    if (redirectPath) router.replace(redirectPath);
  }, [redirectPath, router]);

  if (user === undefined || redirectPath) return null;

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar />

        <div className="flex min-w-0 flex-col flex-1">
          <Header />

          <main className="flex-1 overflow-auto">{children}</main>
          <footer className="text-right text-gray-500 p-3 text-sm">
            Nimbus ERP © 2026 · Role-based Access · Audit Ready
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
}
