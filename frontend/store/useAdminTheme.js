"use client";

import { create } from "zustand";

const THEME_STORAGE_KEY = "peersupport-admin-theme";

export const useAdminTheme = create((set, get) => ({
  theme: "dark", // 'dark' | 'light'
  isMounted: false,

  initializeTheme: () => {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      const theme = stored === "light" || stored === "dark" ? stored : "dark";
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      set({ theme, isMounted: true });
    } catch {
      if (typeof document !== "undefined") {
        document.documentElement.classList.add("dark");
      }
      set({ theme: "dark", isMounted: true });
    }
  },

  setTheme: (newTheme) => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(THEME_STORAGE_KEY, newTheme);
        if (newTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      } catch {
        // ignore
      }
    }
    set({ theme: newTheme });
  },

  toggleTheme: () => {
    const current = get().theme;
    const next = current === "dark" ? "light" : "dark";
    get().setTheme(next);
    return next;
  },
}));

export default useAdminTheme;

