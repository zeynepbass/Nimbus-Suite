"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useCurrentUser from "@/hooks/useCurrentUser";
import { getHomePath } from "@/lib/auth";

export default function HomePage() {
  const router = useRouter();
  const user = useCurrentUser();

  useEffect(() => {
    if (user === undefined) return;
    router.replace(user ? getHomePath(user) : "/login");
  }, [user, router]);

  return null;
}
