const CHANGE_EVENT = "nimbus:storage";

const isBrowser = () => typeof window !== "undefined";

const notify = () => window.dispatchEvent(new Event(CHANGE_EVENT));

export function readRawStorage(key) {
  if (!isBrowser()) return null;

  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function parseStored(raw, fallback = null) {
  if (raw === null || raw === undefined) return fallback;

  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export const readStorage = (key, fallback = null) =>
  parseStored(readRawStorage(key), fallback);

export function writeStorage(key, value) {
  if (!isBrowser()) return false;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    return false;
  }

  notify();
  return true;
}

export function removeStorage(...keys) {
  if (!isBrowser()) return;

  keys.forEach((key) => window.localStorage.removeItem(key));
  notify();
}

export function subscribeStorage(callback) {
  window.addEventListener("storage", callback);
  window.addEventListener(CHANGE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}
