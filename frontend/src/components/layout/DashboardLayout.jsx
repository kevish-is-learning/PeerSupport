"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { LoadingScreen } from "../ui/spinner";
import { useAuthStore } from "../../stores/authStore";

export function DashboardLayout({ children }) {
  const router = useRouter();
  const { user, isLoading, isAuthenticated, fetchUser } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      fetchUser().then((user) => {
        if (!user) {
          router.push("/login");
        }
      });
    }
  }, [isAuthenticated, isLoading, fetchUser, router]);

  if (isLoading) {
    return <LoadingScreen message="Loading your dashboard..." />;
  }

  if (!isAuthenticated || !user) {
    return <LoadingScreen message="Redirecting to login..." />;
  }

  return (
    <div className="flex h-screen bg-muted/30">
      <Sidebar />
      
      {/* Mobile sidebar overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header onMenuClick={() => setMobileMenuOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
