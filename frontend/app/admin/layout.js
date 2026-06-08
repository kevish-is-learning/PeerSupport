"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Calendar,
  CreditCard,
  Banknote,
  Star
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/mentors", label: "Mentors", icon: GraduationCap },
  { href: "/admin/bookings", label: "Bookings", icon: Calendar },
  { href: "/admin/payments", label: "Payments", icon: CreditCard },
  { href: "/admin/payouts", label: "Payouts", icon: Banknote },
  { href: "/admin/reviews", label: "Reviews", icon: Star },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen flex-col bg-black text-zinc-100 font-sans selection:bg-zinc-800">
      <main className="flex-1 pb-32 pt-8 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto w-full">
        {children}
      </main>

      {/* Floating Pill Navigation */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[95vw] sm:max-w-max overflow-x-auto no-scrollbar">
        <nav className="flex items-center gap-1 sm:gap-1.5 rounded-[2.5rem] bg-[#0a0a0a] p-2 sm:p-2.5 border border-zinc-800/60 shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)] w-max mx-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center justify-center transition-all duration-300 ease-in-out ${
                  isActive 
                    ? "bg-zinc-800/80 text-white rounded-full px-4 sm:px-5 py-2.5 sm:py-3 gap-2 sm:gap-3 shadow-inner border border-zinc-700/30" 
                    : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900/40 rounded-full w-[46px] h-[46px] sm:w-[50px] sm:h-[50px] border border-transparent"
                }`}
              >
                <Icon strokeWidth={isActive ? 2.5 : 2} className={`shrink-0 ${isActive ? "w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]" : "w-5 h-5 sm:w-[22px] sm:h-[22px]"} transition-all`} />
                {isActive && (
                  <span className="text-[13px] sm:text-sm font-semibold tracking-wide whitespace-nowrap">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
