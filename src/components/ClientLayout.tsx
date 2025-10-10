"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/ui/Sidebar";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/pages/login";

  return (
    <div className={isLoginPage ? "" : "flex h-screen"}>
      {!isLoginPage && <Sidebar />}
      <main className={isLoginPage ? "" : "flex-1 overflow-y-auto bg-main"}>
        {children}
      </main>
    </div>
  );
}
