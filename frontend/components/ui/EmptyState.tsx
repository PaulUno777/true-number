"use client";

import { ReactNode } from "react";
import { Button } from "./Button";

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <div className={`text-center py-12 space-y-4 ${className}`}>
      <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center">
        {icon}
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        {description && (
          <p className="text-muted-foreground max-w-md mx-auto">{description}</p>
        )}
      </div>
      {action && (
        <Button
          onClick={action.onClick}
          className="mt-4 rainbow-bg hover:scale-105 transition-transform"
        >
          {action.label}
        </Button>
      )}
    </div>
  );
}