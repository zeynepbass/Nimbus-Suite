"use client";

import { useMemo, useSyncExternalStore } from "react";
import { STORAGE_KEYS } from "@/constants/storage";
import { resolveUser } from "@/lib/auth";
import { parseStored, readRawStorage, subscribeStorage } from "@/lib/storage";

const getSnapshot = () => readRawStorage(STORAGE_KEYS.USER);
const getServerSnapshot = () => undefined;

// Hydration tamamlanana kadar undefined, oturum yoksa null döner.
export default function useCurrentUser() {
  const raw = useSyncExternalStore(subscribeStorage, getSnapshot, getServerSnapshot);

  return useMemo(
    () => (raw === undefined ? undefined : resolveUser(parseStored(raw))),
    [raw]
  );
}
