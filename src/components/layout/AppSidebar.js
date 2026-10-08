"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import SidebarNavGroup from "@/components/layout/SidebarNavGroup";
import UserProfile from "@/components/layout/UserProfile";
import { isActivePath, isVisibleFor, menu } from "@/config/menu";
import useCurrentUser from "@/hooks/useCurrentUser";

const findActiveGroup = (pathname) =>
  menu.find((group) =>
    group.children?.some((item) => isActivePath(pathname, item.href))
  )?.id ?? null;

export default function AppSidebar() {
  const user = useCurrentUser();
  const pathname = usePathname();
  const { state, isMobile, setOpen } = useSidebar();
  const [openMenu, setOpenMenu] = useState(() => findActiveGroup(pathname));

  const visibleMenu = menu.filter((item) => isVisibleFor(item, user?.role));

  const toggleGroup = (id) => {
    if (state === "collapsed" && !isMobile) {
      setOpen(true);
      setOpenMenu(id);
      return;
    }

    setOpenMenu(openMenu === id ? null : id);
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center justify-between px-2 py-1 group-data-[collapsible=icon]:hidden">
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-[#6C120B]">
              Nimbus ERP
            </span>
            <span className="text-xs text-muted-foreground">Enterprise ERP Platform</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground">
            DEV
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {visibleMenu.map((group) => (
          <SidebarNavGroup
            key={group.id}
            group={group}
            pathname={pathname}
            isOpen={openMenu === group.id}
            onToggle={() => toggleGroup(group.id)}
          />
        ))}
      </SidebarContent>

      <SidebarFooter>
        <UserProfile />
      </SidebarFooter>
    </Sidebar>
  );
}
