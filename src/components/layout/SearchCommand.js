"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { Settings, User } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { getMenuLinks } from "@/config/menu";
import useCurrentUser from "@/hooks/useCurrentUser";

const SETTINGS_PATH = "/settings";

const SETTINGS_LINKS = [
  { label: "Profil", href: SETTINGS_PATH, icon: User },
  { label: "Ayarlar", href: SETTINGS_PATH, icon: Settings },
];

export default function SearchCommand() {
  const router = useRouter();
  const user = useCurrentUser();
  const [open, setOpen] = useState(false);

  const quickLinks = getMenuLinks(user?.role).filter(
    (link) => link.href !== SETTINGS_PATH
  );

  const navigate = (href) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <Command className="relative hidden md:flex text-[#102E46]">
      <CommandInput
        placeholder="Ara…"
        aria-label="Sayfalarda ara"
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        className="w-56 placeholder:text-[#102E46]"
      />

      {open &&
        createPortal(
          <CommandList className="fixed top-16 right-40 w-64 rounded-md border bg-background shadow-lg z-[9999]">
            <CommandEmpty>Sonuç bulunamadı.</CommandEmpty>

            <CommandGroup heading="Hızlı Erişim">
              {quickLinks.map(({ label, href }) => (
                <CommandItem key={href} onSelect={() => navigate(href)}>
                  {label}
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup heading="Ayarlar">
              {SETTINGS_LINKS.map(({ label, href, icon: Icon }) => (
                <CommandItem key={label} onSelect={() => navigate(href)}>
                  <Icon className="mr-2 h-4 w-4" />
                  {label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>,
          document.body
        )}
    </Command>
  );
}
