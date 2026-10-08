import users from "@/data/users.json";
import { ROLES, ROUTE_ACCESS } from "@/constants/roles";
import { STORAGE_KEYS } from "@/constants/storage";
import { readStorage, removeStorage, writeStorage } from "@/lib/storage";

// Rol ve kimlik her zaman kullanıcı kaydından okunur; tarayıcıda saklanan
// oturum verisi yalnızca profil alanlarını taşır.
export function resolveUser(stored) {
  if (!stored) return null;

  const account = users.find((item) => item.id === stored.id);
  if (!account) return null;

  return { ...stored, id: account.id, role: account.role };
}

export const getCurrentUser = () => resolveUser(readStorage(STORAGE_KEYS.USER));

export const saveUser = (user) => writeStorage(STORAGE_KEYS.USER, user);

export function login(email, password) {
  const normalizedEmail = email.trim().toLowerCase();
  const account = users.find(
    (item) =>
      item.email.toLowerCase() === normalizedEmail &&
      String(item.password) === String(password)
  );

  if (!account) return null;

  const { password: _password, ...user } = account;
  saveUser(user);
  return user;
}

export function logout() {
  removeStorage(STORAGE_KEYS.USER, STORAGE_KEYS.LAST_LOGIN);
}

export function getHomePath(user) {
  return user?.role === ROLES.ADMIN ? "/role" : "/dashboard/summary";
}

const matchesRoute = (pathname, route) =>
  pathname === route || pathname.startsWith(`${route}/`);

export function getRedirectPath(user, pathname) {
  if (!user) return "/login";

  const restricted = Object.entries(ROUTE_ACCESS).find(([route]) =>
    matchesRoute(pathname, route)
  );

  if (restricted && !restricted[1].includes(user.role)) {
    return getHomePath(user);
  }

  if (user.role === ROLES.ADMIN && matchesRoute(pathname, "/dashboard/summary")) {
    return getHomePath(user);
  }

  return null;
}
