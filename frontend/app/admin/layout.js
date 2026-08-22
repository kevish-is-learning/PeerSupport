"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import useAdminTheme from "../../store/useAdminTheme";
import AdminThemeToggle from "../../components/admin/AdminThemeToggle";
import AdminFloatingNav from "../../components/admin/AdminFloatingNav";
import AdminCommandPalette from "../../components/admin/AdminCommandPalette";
import AdminShortcutsModal from "../../components/admin/AdminShortcutsModal";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const { theme, initializeTheme, toggleTheme } = useAdminTheme();
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);

  // Key tracking for sequential shortcuts (e.g. 'g' then 'm')
  const lastKeyRef = useRef({ key: null, time: 0 });

  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  // Global Keyboard Shortcuts Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if typing inside an editable field
      const activeElement = document.activeElement;
      const isInput =
        activeElement &&
        (activeElement.tagName === "INPUT" ||
          activeElement.tagName === "TEXTAREA" ||
          activeElement.isContentEditable);

      // 1. Command Palette: Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
        return;
      }

      if (isInput) return;

      // 2. Search shortcut: '/'
      if (e.key === "/") {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
        return;
      }

      // 3. Theme toggle: 't' or 'T'
      if (e.key.toLowerCase() === "t" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        toggleTheme();
        return;
      }

      // 4. Shortcuts helper: '?'
      if (e.key === "?") {
        e.preventDefault();
        setIsShortcutsOpen((prev) => !prev);
        return;
      }

      // 5. Sequential Navigation shortcuts: 'g' then key
      const now = Date.now();
      const last = lastKeyRef.current;
      const isSequence = last.key === "g" && now - last.time < 1200;

      if (e.key.toLowerCase() === "g" && !isSequence) {
        lastKeyRef.current = { key: "g", time: now };
        return;
      }

      if (isSequence) {
        lastKeyRef.current = { key: null, time: 0 };
        const key = e.key.toLowerCase();
        switch (key) {
          case "d":
            e.preventDefault();
            router.push("/admin/dashboard");
            break;
          case "m":
            e.preventDefault();
            router.push("/admin/mentors");
            break;
          case "u":
            e.preventDefault();
            router.push("/admin/users");
            break;
          case "b":
            e.preventDefault();
            router.push("/admin/bookings");
            break;
          case "p":
            e.preventDefault();
            router.push("/admin/payments");
            break;
          case "o":
            e.preventDefault();
            router.push("/admin/payouts");
            break;
          case "r":
            e.preventDefault();
            router.push("/admin/reviews");
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router, toggleTheme]);

  return (
    <div
      className={`admin-shell min-h-screen flex flex-col font-sans transition-colors duration-200 ${
        theme === "dark" ? "theme-dark dark bg-[#09090b] text-zinc-100" : "theme-light bg-[#f8fafc] text-zinc-900"
      }`}
    >
      {/* Top Right Theme Toggle Only */}
      <AdminThemeToggle />

      {/* Main Content Area */}
      <main className="flex-1 pb-36 pt-10 sm:pt-12 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto w-full">
        {children}
      </main>

      {/* Bottom Floating Navigation Dock */}
      <AdminFloatingNav />

      {/* Global Command Palette */}
      <AdminCommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
      />

      {/* Keyboard Shortcuts Cheat Sheet Modal */}
      <AdminShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />
    </div>
  );
}


