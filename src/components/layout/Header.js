"use client";

import { useState } from "react";
import { BarChart3 } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Breadcrumb from "@/components/layout/Breadcrumb";
import NotificationsMenu from "@/components/layout/NotificationsMenu";
import SearchCommand from "@/components/layout/SearchCommand";
import { getLastLogin } from "@/lib/lastLogin";

const POWER_BI_URL = "https://app.powerbi.com/";

export default function Header() {
  const [lastLogin] = useState(getLastLogin);

  return (
    <>
      <header className="flex items-center justify-between w-full h-14 border-b">
        <div className="flex items-center gap-2 min-w-0">
          <SidebarTrigger />
          <div className="min-w-0">
            <span className="text-sm font-semibold tracking-wide">ERP Dashboard</span>
            {lastLogin && (
              <div className="hidden sm:block text-xs text-muted-foreground mt-1 truncate">
                Son giriş:{" "}
                <span className="font-medium text-foreground">
                  {lastLogin.isToday ? "Bugün" : lastLogin.date} {lastLogin.time}
                </span>
                {" · "}
                {lastLogin.browser}
              </div>
            )}
          </div>
        </div>

        <div className="relative flex pr-3 items-center gap-3">
          <SearchCommand />

          <a
            href={POWER_BI_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="h-9 w-9 flex items-center justify-center rounded-md text-[#102E46]"
            aria-label="Power BI raporları (yeni sekmede açılır)"
            title="Power BI Reports"
          >
            <BarChart3 className="h-5 w-5" />
          </a>

          <NotificationsMenu />
        </div>
      </header>

      <div className="flex justify-end py-3 px-3 bg-gray-50">
        <Breadcrumb />
      </div>
    </>
  );
}
