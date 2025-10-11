"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/ui/Sidebar";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();
  const isAuthPage =
    pathname === "/pages/login" || pathname === "/pages/cadastro";

  return (
    <div className={isAuthPage ? "" : "flex h-screen"}>
      {!isAuthPage && <Sidebar />}
      <main className={isAuthPage ? "" : "flex-1 overflow-y-auto bg-main"}>
        {children}
      </main>
    </div>
  );
}
