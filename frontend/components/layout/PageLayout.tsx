"use client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Home } from "lucide-react";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  breadcrumbs?: Array<{
    label: string;
    href?: string;
    current?: boolean;
  }>;
  headerActions?: ReactNode;
  className?: string;
}

export default function PageLayout({
  title,
  subtitle,
  children,
  breadcrumbs,
  headerActions,
  className = "",
}: PageLayoutProps) {
  const router = useRouter();
  const t = useTranslations("common");

  return (
    <div className={`space-y-8 relative ${className}`}>
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold neon-text bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>

      {/* Breadcrumb Navigation */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/dashboard")}
            className="hover:text-primary transition-colors flex items-center space-x-1 p-1 h-auto"
          >
            <Home className="h-3 w-3" />
            <span>{t("dashboard")}</span>
          </Button>
          {breadcrumbs.map((breadcrumb, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span className="text-white/40">/</span>
              {breadcrumb.href && !breadcrumb.current ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push(breadcrumb.href!)}
                  className="hover:text-primary transition-colors p-1 h-auto"
                >
                  {breadcrumb.label}
                </Button>
              ) : (
                <span
                  className={
                    breadcrumb.current ? "text-white" : "text-muted-foreground"
                  }
                >
                  {breadcrumb.label}
                </span>
              )}
            </div>
          ))}
        </nav>
      )}

      {/* Header Actions */}
      {headerActions && (
        <div className="flex justify-center">{headerActions}</div>
      )}

      {/* Main Content */}
      <div className="space-y-6">{children}</div>
    </div>
  );
}