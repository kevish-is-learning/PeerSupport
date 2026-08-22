"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  LayoutDashboard,
  Users,
  GraduationCap,
  Calendar,
  CreditCard,
  Banknote,
  Star,
  Sun,
  Moon,
  Keyboard,
  LogOut,
  ArrowRight,
  Filter,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";
import useAdminTheme from "../../store/useAdminTheme";
import useAuthStore from "../../store/useAuthStore";

export default function AdminCommandPalette({
  isOpen,
  onClose,
  onOpenShortcuts,
}) {
  const router = useRouter();
  const { theme, toggleTheme } = useAdminTheme();
  const { logout } = useAuthStore();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const COMMAND_ITEMS = [
    // Navigation
    {
      category: "Navigation",
      id: "nav-dashboard",
      title: "Dashboard Overview",
      subtitle: "Platform health, active metrics & revenue overview",
      icon: LayoutDashboard,
      shortcut: "G D",
      action: () => router.push("/admin/dashboard"),
    },
    {
      category: "Navigation",
      id: "nav-mentors",
      title: "Mentors Directory",
      subtitle: "Review applications, verify credentials & manage approvals",
      icon: GraduationCap,
      shortcut: "G M",
      action: () => router.push("/admin/mentors"),
    },
    {
      category: "Navigation",
      id: "nav-users",
      title: "Users Management",
      subtitle: "Inspect registered accounts, roles & status controls",
      icon: Users,
      shortcut: "G U",
      action: () => router.push("/admin/users"),
    },
    {
      category: "Navigation",
      id: "nav-bookings",
      title: "Bookings & Sessions",
      subtitle: "Live sessions, booking statuses & override actions",
      icon: Calendar,
      shortcut: "G B",
      action: () => router.push("/admin/bookings"),
    },
    {
      category: "Navigation",
      id: "nav-payments",
      title: "Payments & Revenue",
      subtitle: "Track transactions, platform commissions & order records",
      icon: CreditCard,
      shortcut: "G P",
      action: () => router.push("/admin/payments"),
    },
    {
      category: "Navigation",
      id: "nav-payouts",
      title: "Payouts & Withdrawals",
      subtitle: "Process mentor withdrawal requests & disbursement ledger",
      icon: Banknote,
      shortcut: "G O",
      action: () => router.push("/admin/payouts"),
    },
    {
      category: "Navigation",
      id: "nav-reviews",
      title: "Reviews & Feedback",
      subtitle: "Student ratings, session feedback & testimonial moderation",
      icon: Star,
      shortcut: "G R",
      action: () => router.push("/admin/reviews"),
    },

    // Quick Actions
    {
      category: "Quick Actions",
      id: "action-pending-mentors",
      title: "Review Pending Mentor Applications",
      subtitle: "Filter mentors with PENDING approval status",
      icon: Clock,
      shortcut: "Filter",
      action: () => router.push("/admin/mentors"),
    },
    {
      category: "Quick Actions",
      id: "action-theme",
      title: theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode",
      subtitle: `Currently using ${theme} mode`,
      icon: theme === "dark" ? Sun : Moon,
      shortcut: "T",
      action: () => toggleTheme(),
    },
    {
      category: "Quick Actions",
      id: "action-shortcuts",
      title: "View Keyboard Shortcuts",
      subtitle: "Display the cheat sheet for power-user shortcuts",
      icon: Keyboard,
      shortcut: "?",
      action: () => {
        onClose();
        onOpenShortcuts?.();
      },
    },
    {
      category: "Account",
      id: "action-logout",
      title: "Sign Out of Admin Console",
      subtitle: "End current administrator session securely",
      icon: LogOut,
      shortcut: "Shift+Q",
      action: async () => {
        await logout();
        router.replace("/auth?mode=login");
      },
    },
  ];

  const filteredItems = COMMAND_ITEMS.filter((item) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + (filteredItems.length || 1)) % (filteredItems.length || 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const selected = filteredItems[selectedIndex];
      if (selected) {
        selected.action();
        onClose();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-3xl admin-bg-card admin-border-base border shadow-2xl overflow-hidden admin-text-base flex flex-col max-h-[75vh]"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Header */}
        <div className="flex items-center px-4 py-3.5 border-b admin-border-subtle gap-3">
          <Search className="w-5 h-5 text-indigo-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command, page name, or quick action..."
            className="w-full bg-transparent outline-none text-sm font-medium admin-text-base placeholder:admin-text-muted"
          />
          <kbd className="px-2 py-0.5 rounded text-[10px] font-mono font-bold admin-bg-inner admin-border-subtle border admin-text-muted">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 space-y-1 divide-y divide-transparent">
          {filteredItems.length === 0 ? (
            <div className="py-10 text-center text-xs admin-text-muted">
              <p>No matching commands found for &ldquo;{query}&rdquo;</p>
              <p className="mt-1 text-[11px] opacity-75">Try searching &ldquo;Mentors&rdquo;, &ldquo;Theme&rdquo;, or &ldquo;Dashboard&rdquo;</p>
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const Icon = item.icon;
              const isSelected = index === selectedIndex;

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    item.action();
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all duration-150 ${
                    isSelected
                      ? "bg-indigo-500/15 border border-indigo-500/30 text-indigo-500 dark:text-indigo-400"
                      : "border border-transparent hover:admin-bg-inner admin-text-base"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? "bg-indigo-500 text-white"
                          : "admin-bg-inner admin-text-muted"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className={`text-sm font-semibold truncate ${isSelected ? "text-indigo-600 dark:text-indigo-300" : "admin-text-base"}`}>
                        {item.title}
                      </p>
                      <p className="text-xs admin-text-muted truncate mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {item.shortcut && (
                      <kbd className="px-2 py-0.5 rounded text-[10px] font-mono font-bold admin-bg-inner admin-border-subtle border admin-text-muted">
                        {item.shortcut}
                      </kbd>
                    )}
                    {isSelected && <ArrowRight className="w-4 h-4 text-indigo-500 shrink-0" />}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 border-t admin-border-subtle flex items-center justify-between text-[11px] admin-text-muted admin-bg-inner">
          <div className="flex items-center gap-2">
            <span>Use <kbd className="px-1 py-0.5 rounded border admin-border-subtle admin-bg-surface font-mono">↑</kbd> <kbd className="px-1 py-0.5 rounded border admin-border-subtle admin-bg-surface font-mono">↓</kbd> to navigate</span>
            <span>·</span>
            <span><kbd className="px-1.5 py-0.5 rounded border admin-border-subtle admin-bg-surface font-mono">↵</kbd> to select</span>
          </div>
          <span className="font-semibold text-indigo-500 dark:text-indigo-400">⌘K Palette</span>
        </div>
      </div>
    </div>
  );
}
