import { STORAGE_KEYS } from "@/constants/storage";
import { readStorage, writeStorage } from "@/lib/storage";

function detectBrowser() {
  const agent = navigator.userAgent;

  if (agent.includes("Edg/")) return "Edge";
  if (agent.includes("Chrome")) return "Chrome";
  if (agent.includes("Firefox")) return "Firefox";
  if (agent.includes("Safari")) return "Safari";
  return "Bilinmeyen";
}

const toDateLabel = (date) => date.toLocaleDateString("tr-TR");

export function saveLastLogin() {
  const now = new Date();

  writeStorage(STORAGE_KEYS.LAST_LOGIN, {
    time: now.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
    date: toDateLabel(now),
    browser: detectBrowser(),
  });
}

export function getLastLogin() {
  const lastLogin = readStorage(STORAGE_KEYS.LAST_LOGIN);
  if (!lastLogin) return null;

  return { ...lastLogin, isToday: lastLogin.date === toDateLabel(new Date()) };
}
