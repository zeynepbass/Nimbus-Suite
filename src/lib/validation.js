const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isBlank = (value) => !String(value ?? "").trim();

export const isEmail = (value) => EMAIL_PATTERN.test(String(value ?? "").trim());
