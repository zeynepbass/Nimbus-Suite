"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import useCurrentUser from "@/hooks/useCurrentUser";
import { logout } from "@/lib/auth";
import { getInitials } from "@/lib/format";

export default function UserProfile() {
  const router = useRouter();
  const user = useCurrentUser();

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex items-center gap-3 px-2 py-1">
        <Avatar className="h-9 w-9 group-data-[collapsible=icon]:hidden">
          <AvatarImage src={user?.resim} alt="" className="object-cover" />
          <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col text-left group-data-[collapsible=icon]:hidden">
          <span className="text-sm font-medium">{user?.name}</span>
          <span className="text-xs text-muted-foreground">{user?.email}</span>
        </div>

        <SidebarMenuButton
          tooltip="Çıkış"
          aria-label="Çıkış yap"
          className="ml-auto w-auto justify-end"
          onClick={handleLogout}
        >
          <LogOut />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
