"use client";

import { useAuth } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/Button";
import { useRouter } from "@/i18n/routing";
import {
  User,
  LogOut,
  BarChart3,
  Dices,
  ChevronDown,
  Home,
  History,
} from "lucide-react";
import toast from "react-hot-toast";
import { LanguageSelector } from "@/components/ui/LanguageSelector";
import { useTranslations } from "next-intl";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const t = useTranslations("common");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      router.push("/auth");
    } catch (error) {
      toast.error("Logout failed");
      console.error(error);
    }
  };

  return (
    <nav className="glass-effect border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 hover:scale-105 transition-transform duration-200 group"
          >
            <div className="relative">
              <Dices className="w-8 h-8 text-primary group-hover:rotate-12 transition-transform duration-200" />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:blur-lg transition-all duration-200"></div>
            </div>
            <h1 className="text-2xl font-bold">TrueNumber</h1>
          </button>

          <div className="flex items-center space-x-4">
            {user && (
              <>
                {/* Navigation Links */}
                <div className="hidden md:flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.push("/history")}
                    className="text-white/80 hover:text-white hover:bg-white/10"
                  >
                    <History className="h-4 w-4 mr-2" />
                    {t("history")}
                  </Button>
                  {user.role === "ADMIN" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => router.push("/admin")}
                      className="text-white/80 hover:text-white hover:bg-white/10"
                    >
                      <BarChart3 className="h-4 w-4 mr-2" />
                      {t("admin")}
                    </Button>
                  )}
                </div>
                <LanguageSelector />
                {/* Profile Dropdown */}
                <div className="relative z-auto" ref={profileMenuRef}>
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center space-x-2 bg-white/10 rounded-full px-3 py-2 backdrop-blur-sm hover:bg-white/20 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <span className="hidden sm:block font-medium text-white">
                      {user.username}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-white/70 transition-transform duration-200 ${
                        showProfileMenu ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Profile Dropdown Menu */}
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-64 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-2xl z-50 overflow-hidden">
                      <div className="p-4 border-b border-white/20">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                            <User className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-white">
                              {user.username}
                            </p>
                            <p className="text-sm text-white/70">
                              {user.email}
                            </p>
                            <p className="text-xs text-accent font-medium">
                              {user.role}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-2">
                        <button
                          onClick={() => {
                            router.push("/history");
                            setShowProfileMenu(false);
                          }}
                          className="w-full flex items-center space-x-3 px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                        >
                          <History className="h-4 w-4" />
                          <span>{t("history")}</span>
                        </button>

                        {user.role === "ADMIN" && (
                          <button
                            onClick={() => {
                              router.push("/admin");
                              setShowProfileMenu(false);
                            }}
                            className="w-full flex items-center space-x-3 px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                          >
                            <BarChart3 className="h-4 w-4" />
                            <span>{t("admin")}</span>
                          </button>
                        )}

                        <div className="border-t border-white/20 my-2"></div>

                        <button
                          onClick={() => {
                            handleLogout();
                            setShowProfileMenu(false);
                          }}
                          className="w-full flex items-center space-x-3 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>{t("logout")}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
