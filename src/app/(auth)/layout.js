"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useCurrentUser from "@/hooks/useCurrentUser";
import { getHomePath } from "@/lib/auth";

export default function AuthLayout({ children }) {
  const router = useRouter();
  const user = useCurrentUser();

  useEffect(() => {
    if (user) router.replace(getHomePath(user));
  }, [user, router]);

  if (user !== null) return null;

  return children;
}
