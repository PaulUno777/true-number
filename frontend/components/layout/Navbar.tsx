"use client";

import { useAuth } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/Button";
import { useRouter } from "@/i18n/routing";
import { usePathname } from "next/navigation";
import {
  User,
  LogOut,
  BarChart3,
  Dices,
  ChevronDown,
  History,
  Menu,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("common");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setShowMobileMenu(false);
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
    <nav className="glass-effect border-b border-white/20 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 hover:scale-105 transition-transform duration-200 group"
          >
            <div className="relative">
              <Dices className="w-6 h-6 sm:w-8 sm:h-8 text-primary group-hover:rotate-12 transition-transform duration-200" />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:blur-lg transition-all duration-200"></div>
            </div>
            <h1 className="text-lg sm:text-2xl font-bold">TrueNumber</h1>
          </button>

          <div className="flex items-center space-x-2 sm:space-x-4">
            {user && (
              <>
                {/* Desktop Navigation Links */}
                <div className="hidden md:flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.push("/history")}
                    className={`text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 hover:scale-105 active:scale-95 ${
                      pathname.includes("/history") 
                        ? "nav-active text-white" 
                        : ""
                    }`}
                  >
                    <History className="h-4 w-4 mr-2" />
                    {t("history")}
                  </Button>
                  {user.role === "ADMIN" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => router.push("/admin")}
                      className={`text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 hover:scale-105 active:scale-95 ${
                        pathname.includes("/admin") 
                          ? "nav-active text-white" 
                          : ""
                      }`}
                    >
                      <BarChart3 className="h-4 w-4 mr-2" />
                      {t("admin")}
                    </Button>
                  )}
                </div>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  {showMobileMenu ? (
                    <X className="h-5 w-5 text-white" />
                  ) : (
                    <Menu className="h-5 w-5 text-white" />
                  )}
                </button>
                {/* Profile Dropdown */}
                <div className="relative z-[100]" ref={profileMenuRef}>
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center space-x-1 sm:space-x-2 bg-white/10 rounded-full px-2 sm:px-3 py-2 backdrop-blur-sm hover:bg-white/20 transition-colors"
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                      <User className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                    </div>
                    <span className="hidden sm:block font-medium text-white text-sm">
                      {user.username}
                    </span>
                    <ChevronDown
                      className={`h-3 w-3 sm:h-4 sm:w-4 text-white/70 transition-transform duration-200 ${
                        showProfileMenu ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Profile Dropdown Menu */}
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-56 sm:w-64 bg-gray-900/95 backdrop-blur-md rounded-xl border border-white/20 shadow-2xl z-[9999] overflow-hidden">
                      <div className="p-3 sm:p-4 border-b border-white/20">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                            <User className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-white text-sm sm:text-base truncate">
                              {user.username}
                            </p>
                            <p className="text-xs sm:text-sm text-white/70 truncate">
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
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleLogout();
                            setShowProfileMenu(false);
                          }}
                          className="w-full flex items-center space-x-3 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                        >
                          <LogOut className="h-4 w-4" />
                          <span className="text-sm sm:text-base">{t("logout")}</span>
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

      {/* Mobile Menu */}
      {user && showMobileMenu && (
        <div
          ref={mobileMenuRef}
          className="md:hidden absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-md border-b border-white/20 shadow-2xl z-[9999]"
        >
          <div className="px-4 py-3 space-y-2">
            <button
              onClick={() => {
                router.push("/dashboard");
                setShowMobileMenu(false);
              }}
              className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors text-left ${
                pathname === "/dashboard" || pathname.includes("/dashboard")
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              <Dices className="h-5 w-5" />
              <span className="font-medium">{t("dashboard")}</span>
            </button>

            <button
              onClick={() => {
                router.push("/history");
                setShowMobileMenu(false);
              }}
              className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors text-left ${
                pathname.includes("/history")
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              <History className="h-5 w-5" />
              <span className="font-medium">{t("history")}</span>
            </button>

            {user.role === "ADMIN" && (
              <button
                onClick={() => {
                  router.push("/admin");
                  setShowMobileMenu(false);
                }}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors text-left ${
                  pathname.includes("/admin")
                    ? "bg-primary/20 text-primary border border-primary/30"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                <BarChart3 className="h-5 w-5" />
                <span className="font-medium">{t("admin")}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
