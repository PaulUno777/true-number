"use client";

import React from "react";
import { Home, Users, TrendingUp } from "lucide-react";

interface TabNavigationProps {
  viewMode: "overview" | "users" | "stats";
  onViewModeChange: (mode: "overview" | "users" | "stats") => void;
  t: (key: string, params?: Record<string, string | number | Date>) => string;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  viewMode,
  onViewModeChange,
  t,
}) => {
  return (
    <div className="relative">
      {/* Tab Container */}
      <div className="flex items-center justify-center bg-white/5 rounded-2xl p-2 backdrop-blur-md border border-white/20 shadow-2xl">
        <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto scrollbar-hide">
          {/* Overview Tab */}
          <button
            onClick={() => onViewModeChange("overview")}
            className={`tab-button group relative ${
              viewMode === "overview"
                ? "tab-button-active"
                : "tab-button-inactive"
            }`}
            style={{
              background: viewMode === "overview" 
                ? "linear-gradient(135deg, #fbbf24, #f59e0b)" 
                : undefined
            }}
          >
            <div className="relative z-10 flex items-center space-x-2">
              <Home className={`h-4 w-4 transition-transform duration-300 ${
                viewMode === "overview" ? "animate-bounce" : "group-hover:scale-110"
              }`} />
              <span className="hidden sm:inline font-semibold">
                {t("overview")}
              </span>
            </div>
            {viewMode === "overview" && (
              <div className="absolute inset-0 bg-yellow-400/20 rounded-xl blur-xl animate-pulse" />
            )}
          </button>

          {/* Users Tab */}
          <button
            onClick={() => onViewModeChange("users")}
            className={`tab-button group relative ${
              viewMode === "users"
                ? "tab-button-active"
                : "tab-button-inactive"
            }`}
            style={{
              background: viewMode === "users" 
                ? "linear-gradient(135deg, #3b82f6, #1d4ed8)" 
                : undefined
            }}
          >
            <div className="relative z-10 flex items-center space-x-2">
              <Users className={`h-4 w-4 transition-transform duration-300 ${
                viewMode === "users" ? "animate-bounce" : "group-hover:scale-110"
              }`} />
              <span className="hidden sm:inline font-semibold">
                {t("userManagement")}
              </span>
            </div>
            {viewMode === "users" && (
              <div className="absolute inset-0 bg-blue-400/20 rounded-xl blur-xl animate-pulse" />
            )}
          </button>

          {/* Statistics Tab */}
          <button
            onClick={() => onViewModeChange("stats")}
            className={`tab-button group relative ${
              viewMode === "stats"
                ? "tab-button-active"
                : "tab-button-inactive"
            }`}
            style={{
              background: viewMode === "stats" 
                ? "linear-gradient(135deg, #8b5cf6, #7c3aed)" 
                : undefined
            }}
          >
            <div className="relative z-10 flex items-center space-x-2">
              <TrendingUp className={`h-4 w-4 transition-transform duration-300 ${
                viewMode === "stats" ? "animate-bounce" : "group-hover:scale-110"
              }`} />
              <span className="hidden sm:inline font-semibold">
                {t("statistics")}
              </span>
            </div>
            {viewMode === "stats" && (
              <div className="absolute inset-0 bg-purple-400/20 rounded-xl blur-xl animate-pulse" />
            )}
          </button>
        </div>
      </div>

      {/* Tab Indicator Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
      
      {/* Mobile Tab Labels */}
      <div className="sm:hidden mt-2 text-center">
        <span className="text-xs text-white/60 bg-white/5 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
          {viewMode === "overview" && t("overview")}
          {viewMode === "users" && t("userManagement")}
          {viewMode === "stats" && t("statistics")}
        </span>
      </div>
    </div>
  );
};

export default React.memo(TabNavigation);