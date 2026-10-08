import Link from "next/link";
import { ChevronDown } from "lucide-react";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { isActivePath } from "@/config/menu";
import { cn } from "@/lib/utils";

const HIDE_WHEN_COLLAPSED = "group-data-[collapsible=icon]:hidden";

export default function SidebarNavGroup({ group, pathname, isOpen, onToggle }) {
  const Icon = group.icon;
  const hasChildren = Boolean(group.children);

  const content = (
    <>
      <Icon className="text-[#102E46]" />
      <span className={HIDE_WHEN_COLLAPSED}>{group.label}</span>
      {hasChildren && (
        <ChevronDown
          className={cn("ml-auto transition", isOpen && "rotate-180", HIDE_WHEN_COLLAPSED)}
        />
      )}
    </>
  );

  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem>
          {group.href ? (
            <SidebarMenuButton
              tooltip={group.label}
              isActive={isActivePath(pathname, group.href)}
              asChild
            >
              <Link href={group.href}>{content}</Link>
            </SidebarMenuButton>
          ) : (
            <SidebarMenuButton
              tooltip={group.label}
              aria-expanded={isOpen}
              onClick={onToggle}
            >
              {content}
            </SidebarMenuButton>
          )}
        </SidebarMenuItem>

        {isOpen &&
          group.children?.map((item) => {
            const ChildIcon = item.icon;

            return (
              <SidebarMenuItem key={item.href} className={cn("ml-8", HIDE_WHEN_COLLAPSED)}>
                <SidebarMenuButton isActive={isActivePath(pathname, item.href)} asChild>
                  <Link href={item.href}>
                    <ChildIcon className="text-[#102E46]" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
