"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

const PUBLIC_ROUTES = ["/", "/login", "/signup", "/market-rates"];

export default function ProtectRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      if (!user && !PUBLIC_ROUTES.includes(pathname)) {
        router.push("/login");
      } else if (user && (pathname === "/login" || pathname === "/signup")) {
        router.push("/");
      }
    }
  }, [user, loading, pathname, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F4F5] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-6" />
        <h2 className="text-xl font-black text-text-primary uppercase tracking-widest italic animate-pulse">
          IndiaLand Auth
        </h2>
        <p className="text-xs font-bold text-text-muted uppercase tracking-widest mt-2">
          Verifying your session...
        </p>
      </div>
    );
  }

  // If not a public route and no user, don't render anything while redirecting
  if (!user && !PUBLIC_ROUTES.includes(pathname)) {
    return null;
  }

  return <>{children}</>;
}
