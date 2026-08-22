"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import useAdminTheme from "../../store/useAdminTheme";

export default function AdminThemeToggle() {
  const { theme, toggleTheme, isMounted } = useAdminTheme();

  return (
    <div className="fixed top-6 right-6 z-40">
      <button
        onClick={toggleTheme}
        type="button"
        title={theme === "dark" ? "Switch to Light Mode (T)" : "Switch to Dark Mode (T)"}
        aria-label="Toggle theme"
        className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white shadow-md hover:shadow-lg backdrop-blur-md transition-all duration-200 cursor-pointer group"
      >
        {isMounted && theme === "light" ? (
          <>
            <Moon className="w-4 h-4 text-indigo-600 transition-transform group-hover:-rotate-12" />
            <span className="text-xs font-semibold text-zinc-700">Dark</span>
          </>
        ) : (
          <>
            <Sun className="w-4 h-4 text-amber-400 transition-transform group-hover:rotate-45" />
            <span className="text-xs font-semibold text-zinc-300">Light</span>
          </>
        )}
      </button>
    </div>
  );
}
