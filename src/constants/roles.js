export const ROLES = {
  ADMIN: "ADMIN",
  MANAGER: "MANAGER",
  USER: "USER",
  TEST: "TEST",
};

export const ROLE_BADGES = {
  [ROLES.ADMIN]: { label: ROLES.ADMIN, className: "bg-blue-100 text-blue-700" },
  [ROLES.MANAGER]: { label: ROLES.MANAGER, className: "bg-blue-100 text-blue-700" },
  [ROLES.USER]: { label: ROLES.USER, className: "bg-blue-100 text-blue-700" },
  [ROLES.TEST]: { label: ROLES.TEST, className: "bg-red-100 text-red-700" },
};

export const ASSIGNABLE_ROLES = {
  [ROLES.ADMIN]: [ROLES.MANAGER, ROLES.USER, ROLES.TEST],
  [ROLES.MANAGER]: [ROLES.USER, ROLES.TEST],
};

export const ROUTE_ACCESS = {
  "/role": [ROLES.ADMIN, ROLES.MANAGER],
};
