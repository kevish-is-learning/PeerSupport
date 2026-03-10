import json, os

base = "/Users/kevishsewliya/Downloads/VS Stuff/PeerSupport/frontend"

files = {
    "src/app/page.tsx": '''"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { Loader2 } from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, fetchMe } = useAuthStore();

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }
    if (user?.role === "MENTOR") {
      router.replace("/mentor/dashboard");
    } else if (user?.role === "MENTEE") {
      router.replace("/onboarding");
    } else if (user?.role === "ADMIN") {
      router.replace("/mentor/dashboard");
    } else {
      router.replace("/onboarding");
    }
  }, [isLoading, isAuthenticated, user, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}
''',
}

for rel_path, content in files.items():
    full_path = os.path.join(base, rel_path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, 'w') as f:
        f.write(content)
    print(f"Wrote: {rel_path}")
