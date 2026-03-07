"use client";

import { useAuthStore } from "../../stores/authStore";
import { MenteeDashboard } from "../../components/dashboards/MenteeDashboard";
import { MentorDashboard } from "../../components/dashboards/MentorDashboard";
import { AdminDashboard } from "../../components/dashboards/AdminDashboard";

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);

  if (!user) return null;

  switch (user.role) {
    case "MENTOR":
      return <MentorDashboard />;
    case "ADMIN":
      return <AdminDashboard />;
    default:
      return <MenteeDashboard />;
  }
}
