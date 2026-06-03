"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WalletRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/mentor/payments");
  }, [router]);

  return null;
}
