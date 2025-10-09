"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("Overview");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Atualiza o item ativo baseado na rota atual
    if (pathname === "/pages/overview") {
      setActiveItem("Overview");
    } else if (pathname === "/pages/profile") {
      setActiveItem("Profile");
    } else if (pathname === "/") {
      setActiveItem("Home");
    }
  }, [pathname]);

  const handleNavigation = (itemName: string, path?: string) => {
    setActiveItem(itemName);
    if (path) {
      router.push(path);
    }
  };

  return (
    <div className="w-64 h-screen bg-dark-primary text-primary flex flex-col border-r border-dark-tertiary">
      {/* Header */}
      <div className="p-6 border-b border-dark-tertiary">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 glass-accent rounded-lg flex items-center justify-center animate-liquid">
            <span className="text-white font-bold text-lg">💰</span>
          </div>
          <span className="text-xl font-semibold text-primary">
            Phablo Carvalho
          </span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 py-6">
        {/* Dashboard Section */}
        <div className="mb-8">
          <h3 className="text-muted text-sm font-medium uppercase tracking-wide mb-3">
            DASHBOARDS
          </h3>
          <nav className="space-y-1">
            {[
              {
                name: "Overview",
                icon: "📊",
                path: "/pages/overview",
              },
              { name: "Análise", icon: "📈" },
              { name: "Receita", icon: "💰" },
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.name, item.path)}
                className={`cursor-pointer w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-300 ${
                  activeItem === item.name
                    ? "glass-accent text-white shadow-lg"
                    : "text-secondary hover:bg-dark-secondary hover:text-primary"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm font-medium">{item.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Statistics Section */}
      </div>

      {/* Settings Section */}
      <div className="px-4 py-4 border-t border-dark-tertiary">
        <h3 className="text-muted text-sm font-medium uppercase tracking-wide mb-3">
          CONFIGURAÇÕES
        </h3>
        <nav className="space-y-1">
          {[{ name: "Perfil", icon: "👤", path: "/pages/profile" }].map(
            (item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.name, item.path)}
                className={`cursor-pointer w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-300 ${
                  activeItem === item.name
                    ? "glass-accent text-white shadow-lg"
                    : "text-secondary hover:bg-dark-secondary hover:text-primary"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm font-medium">{item.name}</span>
              </button>
            )
          )}
        </nav>

        {/* User Profile */}
        <div className="mt-6 flex items-center space-x-3 px-3 py-2">
          <div className="w-10 h-10 glass-accent rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-primary">Phablo</p>
            <p className="text-xs text-muted">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}
