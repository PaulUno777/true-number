"use client";

import { useState, useEffect } from "react";
import { Sun, Moon, Monitor } from "lucide-react";

type Theme = "light" | "dark" | "system";

interface ThemeToggleProps {
  variant?: "dropdown" | "standalone";
}

export function ThemeToggle({ variant = "standalone" }: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = window.document.documentElement;
    
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.remove("light", "dark");
      root.classList.add(systemTheme);
    } else {
      root.classList.remove("light", "dark");
      root.classList.add(theme);
    }
    
    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  if (!mounted) {
    return null;
  }

  const themes: { value: Theme; label: string; icon: typeof Sun }[] = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ];

  if (variant === "dropdown") {
    return (
      <div className="space-y-1">
        {themes.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            onClick={() => handleThemeChange(value)}
            className={`w-full flex items-center space-x-3 px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors ${
              theme === value ? "bg-white/10 text-white" : ""
            }`}
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center bg-white/10 rounded-xl p-1 backdrop-blur-sm border border-white/20">
      {themes.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          onClick={() => handleThemeChange(value)}
          className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 ${
            theme === value
              ? "bg-accent text-accent-foreground shadow-lg"
              : "text-white/60 hover:text-white hover:bg-white/10"
          }`}
          title={label}
        >
          <Icon className="h-4 w-4" />
        </button>
      ))}
    </div>
  );
}