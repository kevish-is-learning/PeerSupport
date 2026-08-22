"use client";

import React, { useEffect } from "react";
import { X, Command, Sparkles, Navigation, Moon, Sun, Search, LogOut } from "lucide-react";

export default function AdminShortcutsModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const SHORTCUT_SECTIONS = [
    {
      title: "Navigation (Press 'G' then key)",
      icon: Navigation,
      items: [
        { keys: ["G", "D"], label: "Go to Dashboard", desc: "View platform metrics & activity" },
        { keys: ["G", "M"], label: "Go to Mentors", desc: "Review applications & verification" },
        { keys: ["G", "U"], label: "Go to Users", desc: "Manage accounts & permissions" },
        { keys: ["G", "B"], label: "Go to Bookings", desc: "Live sessions & booking overrides" },
        { keys: ["G", "P"], label: "Go to Payments", desc: "Transactions & revenue shares" },
        { keys: ["G", "O"], label: "Go to Payouts", desc: "Mentor withdrawal requests" },
        { keys: ["G", "R"], label: "Go to Reviews", desc: "Student ratings & feedback" },
      ],
    },
    {
      title: "Quick Actions & Search",
      icon: Sparkles,
      items: [
        { keys: ["⌘ / Ctrl", "K"], label: "Command Palette", desc: "Search anything & run actions" },
        { keys: ["/"], label: "Focus Search", desc: "Jump straight into search" },
        { keys: ["T"], label: "Toggle Theme", desc: "Switch Light / Dark mode instantly" },
        { keys: ["?"], label: "Keyboard Shortcuts", desc: "Toggle this helper modal" },
        { keys: ["Esc"], label: "Close Modal / Palette", desc: "Dismiss active drawer or dialog" },
      ],
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-3xl admin-bg-card admin-border-base border shadow-2xl p-6 sm:p-8 overflow-hidden relative admin-text-base"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b admin-border-subtle">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 flex items-center justify-center border border-indigo-500/20">
              <Command className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold admin-text-base">Admin Keyboard Shortcuts</h2>
              <p className="text-xs admin-text-muted">Boost your productivity with quick navigation &amp; action keys</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center admin-text-muted hover:admin-text-base admin-hover-bg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-6 space-y-6 max-h-[65vh] overflow-y-auto pr-1">
          {SHORTCUT_SECTIONS.map((section, idx) => {
            const SectionIcon = section.icon;
            return (
              <div key={idx} className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-500 dark:text-indigo-400">
                  <SectionIcon className="w-3.5 h-3.5" />
                  <span>{section.title}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {section.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-xl admin-bg-inner admin-border-subtle border text-xs transition-colors hover:border-indigo-500/30"
                    >
                      <div className="pr-2">
                        <p className="font-semibold admin-text-base">{item.label}</p>
                        <p className="text-[11px] admin-text-muted mt-0.5 truncate">{item.desc}</p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        {item.keys.map((k, ki) => (
                          <kbd
                            key={ki}
                            className="px-2 py-1 rounded-md text-[11px] font-mono font-bold admin-bg-surface admin-border-base border shadow-sm admin-text-base"
                          >
                            {k}
                          </kbd>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t admin-border-subtle flex items-center justify-between text-xs admin-text-muted">
          <span>Press <kbd className="px-1.5 py-0.5 rounded font-mono admin-bg-inner border admin-border-subtle text-[10px]">Esc</kbd> to close</span>
          <span className="font-medium text-indigo-500 dark:text-indigo-400">PeerSupport Admin Suite</span>
        </div>
      </div>
    </div>
  );
}
