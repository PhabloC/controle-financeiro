"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { useAvatar } from "@/hooks/useAvatar";

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("Overview");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const { avatar } = useAvatar();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Atualiza o item ativo baseado na rota atual
    if (pathname === "/pages/overview") {
      setActiveItem("Overview");

      setActiveItem("Análise");
    } else if (pathname === "/pages/revenue") {
      setActiveItem("Receita");
    } else if (pathname === "/pages/profile") {
      setActiveItem("Perfil");
    } else if (pathname === "/") {
      setActiveItem("Home");
    }
  }, [pathname]);

  // Fecha o dropdown quando clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNavigation = (itemName: string, path?: string) => {
    setActiveItem(itemName);
    if (path) {
      router.push(path);
    }
  };

  const handleLogout = async () => {
    await signOut();
    router.push("/pages/login");
  };

  // Não mostrar sidebar na tela de login
  if (pathname === "/pages/login") {
    return null;
  }

  return (
    <div className="w-64 h-screen bg-dark-primary text-primary flex flex-col border-r border-dark-tertiary">
      {/* Header */}
      <div className="p-6 border-b border-dark-tertiary">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 glass-accent rounded-full flex items-center justify-center animate-liquid overflow-hidden">
            {avatar ? (
              <Image
                src={avatar}
                alt="Avatar do usuário"
                width={40}
                height={40}
                className="w-full h-full object-cover"
                unoptimized
                key={avatar}
              />
            ) : (
              <span className="text-white font-bold text-lg">�</span>
            )}
          </div>
          <span className="text-xl font-semibold text-primary">
            {user?.user_metadata?.full_name ||
              user?.user_metadata?.name ||
              user?.email?.split("@")[0] ||
              "Controle Financeiro"}
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
                name: "Home",
                icon: "🏠",
                path: "/",
              },
              {
                name: "Overview",
                icon: "📊",
                path: "/pages/overview",
              },

              { name: "Receita", icon: "💰", path: "/pages/revenue" },
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.name, item.path)}
                className={`group cursor-pointer w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-all duration-300 transform ${
                  activeItem === item.name
                    ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 text-white shadow-lg scale-[1.02]"
                    : "text-secondary hover:bg-gradient-to-r hover:from-gray-500/10 hover:to-gray-400/10 hover:text-primary hover:scale-[1.01] hover:shadow-md border border-transparent"
                }`}
              >
                <span
                  className={`text-lg transition-transform duration-300 ${
                    activeItem === item.name
                      ? "scale-110"
                      : "group-hover:scale-110"
                  }`}
                >
                  {item.icon}
                </span>
                <span className="text-sm font-medium">{item.name}</span>
                {activeItem === item.name && (
                  <div className="ml-auto w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Statistics Section */}
      </div>

      {/* User Profile Section */}
      <div
        className="px-4 py-4 border-t border-dark-tertiary relative"
        ref={dropdownRef}
      >
        {/* User Profile Dropdown Trigger */}
        <div
          className="flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-gray-500/10 hover:to-gray-400/10 hover:shadow-md cursor-pointer group"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <div className="w-10 h-10 glass-accent rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <span className="text-white font-bold text-sm">
              {user?.email?.charAt(0).toUpperCase() || "U"}
            </span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-primary group-hover:text-white transition-colors duration-300">
              {user?.email?.split("@")[0] || "Usuário"}
            </p>
            <p className="text-xs text-muted group-hover:text-blue-200 transition-colors duration-300 truncate">
              {user?.email || "usuario@email.com"}
            </p>
          </div>
          <div
            className={`transition-all duration-300 ${
              isDropdownOpen
                ? "rotate-90 opacity-100"
                : "opacity-0 group-hover:opacity-100"
            }`}
          >
            <svg
              className="w-4 h-4 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="mt-2 bg-dark-secondary rounded-lg border border-dark-tertiary shadow-xl overflow-hidden animate-in slide-in-from-top-2 duration-200">
            <button
              onClick={() => {
                handleNavigation("Perfil", "/pages/profile");
                setIsDropdownOpen(false);
              }}
              className={`cursor-pointer w-full flex items-center space-x-3 px-4 py-3 text-left transition-all duration-200 ${
                activeItem === "Perfil"
                  ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white"
                  : "text-secondary hover:bg-gradient-to-r hover:from-gray-500/10 hover:to-gray-400/10 hover:text-primary"
              }`}
            >
              <span className="text-lg">👤</span>
              <span className="text-sm font-medium">Perfil</span>
              {activeItem === "Perfil" && (
                <div className="ml-auto w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
              )}
            </button>

            <div className="h-px bg-dark-tertiary"></div>

            <button
              onClick={() => {
                handleLogout();
                setIsDropdownOpen(false);
              }}
              className="cursor-pointer w-full flex items-center space-x-3 px-4 py-3 text-left transition-all duration-200 text-secondary hover:bg-gradient-to-r hover:from-red-500/10 hover:to-red-400/10 hover:text-red-400"
            >
              <span className="text-lg">🚪</span>
              <span className="text-sm font-medium">Sair</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
