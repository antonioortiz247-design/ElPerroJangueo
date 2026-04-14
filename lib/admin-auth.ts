"use client";

const CREDENTIALS_KEY = "epj_admin_credentials";
const SESSION_KEY = "epj_admin_session";

export interface AdminCredentials {
  email: string;
  password: string;
}

const defaults: AdminCredentials = {
  email: "admin@elperrojangueo.com",
  password: "jangueo123"
};

export const bootstrapAdminCredentials = () => {
  if (typeof window === "undefined") return;
  if (!localStorage.getItem(CREDENTIALS_KEY)) {
    localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(defaults));
  }
};

export const getAdminCredentials = (): AdminCredentials => {
  if (typeof window === "undefined") return defaults;
  bootstrapAdminCredentials();
  const raw = localStorage.getItem(CREDENTIALS_KEY);
  if (!raw) return defaults;
  try {
    return JSON.parse(raw) as AdminCredentials;
  } catch {
    return defaults;
  }
};

export const loginAsAdmin = (email: string, password: string) => {
  const creds = getAdminCredentials();
  const success = creds.email === email.trim() && creds.password === password;
  if (success && typeof window !== "undefined") {
    localStorage.setItem(SESSION_KEY, "true");
  }
  return success;
};

export const isAdminAuthenticated = () => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(SESSION_KEY) === "true";
};

export const logoutAdmin = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SESSION_KEY);
};
